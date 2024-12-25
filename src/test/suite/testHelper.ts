import * as assert from 'assert';
import * as vscode from 'vscode';
import * as cases from "change-case";



export class TestHelper {

    public async basicTextTest(caseType: string) {
        let text = 'hello world';
        let expectedText;;

        if (caseType === 'camel') {
           expectedText = 'helloWorld';
        } else if (caseType === 'constant') {
            expectedText = 'HELLO_WORLD';
        }  else if (caseType === 'dot') {
            expectedText = 'hello.world';
        }


        await this.changeCase('kebab', 0, 0, 0, 11, 'hello world', 'hello-world');
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