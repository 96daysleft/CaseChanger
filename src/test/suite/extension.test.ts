import * as assert from 'assert';
import * as vscode from 'vscode';
import { before, after, beforeEach, afterEach } from 'mocha';
import { TestHelper } from './testHelper';
import { Transform, ConvertCaseType } from '../../transform';

suite('Extension Basic Test Suite', () => {
    const testHelper = new TestHelper();

    before(async () => {
        // Activate the extension
        const extension = vscode.extensions.getExtension('extension.changeCase.id');
        if (extension) {
            await extension.activate();
        }
        vscode.window.showInformationMessage('Start all tests.');
    });

    after(async () => {
        vscode.window.showInformationMessage('Tests over');
    });

    // beforeEach(async () => {

    // });

    afterEach(async () => {
        // Close the current editor if any
        await vscode.commands.executeCommand('workbench.action.closeActiveEditor');
        // Open a new untitled document before each test
        //await vscode.commands.executeCommand('workbench.action.files.newUntitledFile');
        console.log('close editor');
    });

    test('Test Change case type upper using context menu', async () => {
        await testHelper.basicTextTest(testHelper.transform.upper);
    });

    test('Test Change case type lower using context menu', async () => {
        await testHelper.basicTextTest(testHelper.transform.lower);
    });

    // test('Test Change case type kebab using context menu', async () => {
    //     await testHelper.basicTextTest(testHelper.transform.kebab);
    // });

    // test('Test Change case type camel using context menu', async () => {
    //     await testHelper.basicTextTest(testHelper.transform.camel);
    // });

    // test('Test Change case type snake using context menu', async () => {
    //     await testHelper.basicTextTest(testHelper.transform.snake);
    // });

    // test('Test Change case type pascal using context menu', async () => {
    //     await testHelper.basicTextTest(testHelper.transform.pascal);
    // });

    // test('Test Change case type capital using context menu', async () => {
    //     await testHelper.basicTextTest(testHelper.transform.capital);
    // });

    // test('Test Change case type sentence using context menu', async () => {
    //     await testHelper.basicTextTest(testHelper.transform.sentence);
    // });

    // test('Test Change case type none using context menu', async () => {
    //     await testHelper.basicTextTest(testHelper.transform.none);
    // });



    // test('Change case using context menu - multie line', async () => {
    //     // Open a new text document
    //     const document = await vscode.workspace.openTextDocument({ content: 'hello world/nthis is test/nwhat should this look like/nthis is my test' });
    //     const editor = await vscode.window.showTextDocument(document);

    //     // Select the text
    //     const startPos = new vscode.Position(0, 0);
    //     const endPos = new vscode.Position(0, 11);
    //     editor.selection = new vscode.Selection(startPos, endPos);

    //     // Run the context menu command to change case
    //     await vscode.commands.executeCommand('extension.changeCase.kebab');

    //     // Verify the text has been changed
    //     const updatedText = document.getText();
    //     assert.strictEqual(updatedText, 'hello_world/nthis_is_test/nwhat_should_this_look_like/nthis_is_my_test');
    // });


});