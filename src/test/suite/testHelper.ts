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

        await this.changeCase(caseType.name, 0, 0, 0, text.length, text, caseType.example);
    }

    public async changeCase(caseType: string, startLine: number, startPostion: number, endLine: number, endPosition: number, content:string, expectedContent: string) {
        const document = await vscode.workspace.openTextDocument({ content: content });
        const editor = await vscode.window.showTextDocument(document);

        // Select the text
        const startPos = new vscode.Position(startLine, startPostion);
        const endPos = new vscode.Position(endLine, endPosition);
        editor.selection = new vscode.Selection(startPos, endPos);
        const oldText = editor.document.getText(editor.selection);
        const runExtension = `extension.changeCase.${caseType}`;
        console.log(`extension: ${runExtension}`);

        // Run the context menu command to change case
        await vscode.commands.executeCommand(runExtension);

        // Verify the text has been changed
        const updatedText = document.getText();

        console.log(`Testing ${caseType}  with ${oldText}  == ${updatedText}`);

        assert.strictEqual(updatedText, expectedContent);
    }


}