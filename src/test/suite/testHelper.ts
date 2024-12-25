import * as assert from 'assert';
import * as vscode from 'vscode';
import * as cases from "change-case";
import { Transform, ConvertCaseType } from '../../transform';


export class TestHelper {

    private transform: Transform;

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

        await this.changeCase(caseType.name, 0, 0, 0, text.length, 'hello world', 'hello-world');
    }

    public async changeCase(caseType: string, startLine: number, startPostion: number, endLine: number, endPosition: number, content:string, expectedContent: string) {
        const document = await vscode.workspace.openTextDocument({ content: content });
        const editor = await vscode.window.showTextDocument(document);

        // Select the text
        const startPos = new vscode.Position(startLine, startPostion);
        const endPos = new vscode.Position(endLine, endPosition);
        editor.selection = new vscode.Selection(startPos, endPos);

        // Run the context menu command to change case
        await vscode.commands.executeCommand(`extension.changeCase.${caseType}`);

        // Verify the text has been changed
        const updatedText = document.getText();
        assert.strictEqual(updatedText, expectedContent);

    }


}