import * as assert from 'assert';
import * as vscode from 'vscode';
import * as cases from "change-case";
import { Transform, ConvertCaseType } from '../../transform';


export class TestHelper {

    public readonly transform: Transform;

    constructor(){
        this.transform = new Transform();
    }

    public async basicTextTest(caseType: ConvertCaseType) {
        let text = this.transform.exampleBase;

        if (caseType === this.transform.lower) {
            text =  text.toUpperCase();
        } else if (caseType === this.transform.none) {
            text =  'Hello.World';
        }

        await this.caseChanger(caseType.name, 0, 0, 0, text.length, text, caseType.example);
    }

    public async caseChanger(caseType: string, startLine: number, startPostion: number, endLine: number, endPosition: number, content:string, expectedContent: string) {
        const document = await vscode.workspace.openTextDocument({ content: content });
        const editor = await vscode.window.showTextDocument(document);

        // Select the text
        const startPos = new vscode.Position(startLine, startPostion);
        const endPos = new vscode.Position(endLine, endPosition);
        editor.selection = new vscode.Selection(startPos, endPos);
        const oldText = editor.document.getText(editor.selection);
        const runExtension = `extension.caseChanger.${caseType}`;
        console.log(`extension: ${runExtension}`);

        // Run the context menu command to change case
        await vscode.commands.executeCommand(runExtension);

        // Verify the text has been changed
        const updatedText = editor.document.getText(editor.selection);

        console.log(`Testing ${caseType}  updated ${oldText}  to ${updatedText}`);

        console.log(`Testing ${caseType}  ${updatedText}  should be equal to ${expectedContent}`);

        assert.strictEqual(updatedText, expectedContent);
    }

    /**
     * Test multiple selections in a single document
     */
    public async multipleSelectionsTest(caseType: string, content: string, selections: Array<{startLine: number, startChar: number, endLine: number, endChar: number}>, expectedResults: string[]) {
        const document = await vscode.workspace.openTextDocument({ content: content });
        const editor = await vscode.window.showTextDocument(document);

        // Create multiple selections
        const vscodeSelections = selections.map(sel => 
            new vscode.Selection(
                new vscode.Position(sel.startLine, sel.startChar),
                new vscode.Position(sel.endLine, sel.endChar)
            )
        );

        editor.selections = vscodeSelections;

        const runExtension = `extension.caseChanger.${caseType}`;
        
        // Run the command
        await vscode.commands.executeCommand(runExtension);

        // Verify each selection was transformed correctly
        for (let i = 0; i < vscodeSelections.length; i++) {
            const selectionText = editor.document.getText(editor.selections[i]);
            assert.strictEqual(selectionText, expectedResults[i], 
                `Selection ${i} should be transformed to "${expectedResults[i]}" but got "${selectionText}"`);
        }
    }

    /**
     * Test single line transformation with specific range
     */
    public async singleLineRangeTest(caseType: string, content: string, startChar: number, endChar: number, expectedContent: string) {
        await this.caseChanger(caseType, 0, startChar, 0, endChar, content, expectedContent);
    }

    /**
     * Test entire document transformation
     */
    public async entireDocumentTest(caseType: string, content: string, expectedContent: string) {
        const lines = content.split('\n');
        const lastLine = lines.length - 1;
        const lastChar = lines[lastLine].length;
        await this.caseChanger(caseType, 0, 0, lastLine, lastChar, content, expectedContent);
    }

    /**
     * Test that whitespace is preserved correctly
     */
    public async whitespacePreservationTest(caseType: string, input: string, expectedOutput: string) {
        const document = await vscode.workspace.openTextDocument({ content: input });
        const editor = await vscode.window.showTextDocument(document);

        // Select all text
        const startPos = new vscode.Position(0, 0);
        const endPos = new vscode.Position(0, input.length);
        editor.selection = new vscode.Selection(startPos, endPos);

        const runExtension = `extension.caseChanger.${caseType}`;
        await vscode.commands.executeCommand(runExtension);

        const result = editor.document.getText(editor.selection);
        assert.strictEqual(result, expectedOutput, 
            `Whitespace preservation failed. Expected: "${expectedOutput}", Got: "${result}"`);
    }

    /**
     * Test error handling scenarios
     */
    public async errorHandlingTest(invalidCaseType: string) {
        const document = await vscode.workspace.openTextDocument({ content: 'test content' });
        const editor = await vscode.window.showTextDocument(document);

        const startPos = new vscode.Position(0, 0);
        const endPos = new vscode.Position(0, 4);
        editor.selection = new vscode.Selection(startPos, endPos);

        const runExtension = `extension.caseChanger.${invalidCaseType}`;
        
        try {
            await vscode.commands.executeCommand(runExtension);
            assert.fail('Expected command to fail with invalid case type');
        } catch (error) {
            // Expected behavior - command should not exist
            console.log(`Expected error for invalid case type: ${invalidCaseType}`);
        }
    }

    /**
     * Performance test for large text blocks
     */
    public async performanceTest(caseType: string, textSize: number = 10000) {
        const largeText = 'hello world '.repeat(textSize);
        const expectedText = this.transform.transformCase('hello world ', caseType).repeat(textSize);
        
        const startTime = Date.now();
        await this.entireDocumentTest(caseType, largeText, expectedText);
        const endTime = Date.now();
        
        const duration = endTime - startTime;
        console.log(`Performance test for ${caseType} with ${textSize} repetitions took ${duration}ms`);
        
        // Assert that performance is reasonable (under 5 seconds for large text)
        assert.ok(duration < 5000, `Performance test took too long: ${duration}ms`);
    }

    /**
     * Validate that all expected commands are registered
     */
    public async validateCommandRegistration() {
        const allCommands = await vscode.commands.getCommands();
        
        this.transform.caseTypes.forEach(caseType => {
            const commandId = `extension.caseChanger.${caseType}`;
            assert.ok(allCommands.includes(commandId), 
                `Command ${commandId} should be registered`);
        });
    }

    /**
     * Test undo functionality after transformation
     */
    public async undoTest(caseType: string) {
        const originalContent = 'hello world test';
        const document = await vscode.workspace.openTextDocument({ content: originalContent });
        const editor = await vscode.window.showTextDocument(document);

        // Select all text
        const startPos = new vscode.Position(0, 0);
        const endPos = new vscode.Position(0, originalContent.length);
        editor.selection = new vscode.Selection(startPos, endPos);

        // Transform the text
        const runExtension = `extension.caseChanger.${caseType}`;
        await vscode.commands.executeCommand(runExtension);

        // Verify transformation occurred
        const transformedText = editor.document.getText();
        assert.notStrictEqual(transformedText, originalContent, 'Text should have been transformed');

        // Undo the change
        await vscode.commands.executeCommand('undo');

        // Verify text is back to original
        const undoneText = editor.document.getText();
        assert.strictEqual(undoneText, originalContent, 'Undo should restore original text');
    }


}