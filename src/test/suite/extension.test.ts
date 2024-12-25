import * as assert from 'assert';
import * as vscode from 'vscode';
import { before, after } from 'mocha';
import { TestHelper } from './testHelper';

suite('Extension Test Suite', () => {
    const testHelper = new TestHelper();


    before(async () => {
        // Activate the extension
        const extension = vscode.extensions.getExtension('extension.changeCase.id');
        if (extension) {
            await extension.activate();
        }
    });

    after(async () => {
        // Close all editors
        await vscode.commands.executeCommand('workbench.action.closeAllEditors');
    });

    test('Test Change case type kebab using context menu', async () => {
        await testHelper.changeCase('kebab', 0, 0, 0, 11, 'hello world', 'hello-world');
    });

    test('Test Change case type camel using context menu', async () => {
        await testHelper.changeCase('camel', 0, 0, 0, 11, 'hello world', 'helloWorld');
    });

    test('Test Change case type snake using context menu', async () => {
        await testHelper.changeCase('snake', 0, 0, 0, 11, 'hello world', 'hello_world');
    });

    test('Test Change case type pascal using context menu', async () => {
        await testHelper.changeCase('pascal', 0, 0, 0, 11, 'hello world', 'HelloWorld');
    });

    test('Test Change case type title using context menu', async () => {
        await testHelper.changeCase('title', 0, 0, 0, 11, 'hello world', 'Hello World');
    });

    test('Test Change case type sentence using context menu', async () => {
        await testHelper.changeCase('sentence', 0, 0, 0, 11, 'hello world', 'Hello world');
    });

    test('Test Change case type upper using context menu', async () => {
        await testHelper.changeCase('upper', 0, 0, 0, 11, 'hello world', 'HELLO WORLD');
    });

    test('Test Change case type lower using context menu', async () => {
        await testHelper.changeCase('lower', 0, 0, 0, 11, 'HELLO WORLD', 'hello world');
    });

    test('Test Change case type swap using context menu', async () => {
        await testHelper.changeCase('swap', 0, 0, 0, 11, 'Hello World', 'hELLO wORLD');
    });



    test('Test all Change case types using context menu', async () => {
        // Test camel case
        await testHelper.changeCase('camel', 0, 0, 0, 11, 'hello world', 'helloWorld');
        // Test constant case
        //await testHelper.changeCase('constant', 0, 0, 0, 11, 'hello world', 'HELLO_WORLD');
        // Test dot case
        await testHelper.changeCase('dot', 0, 0, 0, 11, 'hello world', 'hello.world');
        // Test kebab case
        await testHelper.changeCase('kebab', 0, 0, 0, 11, 'hello world', 'hello-world');
        // Test lower case
        await testHelper.changeCase('lower', 0, 0, 0, 11, 'HELLO WORLD', 'hello world');
        // Test pascal case
        await testHelper.changeCase('pascal', 0, 0, 0, 11, 'hello world', 'HelloWorld');
        // Test sentence case
        await testHelper.changeCase('sentence', 0, 0, 0, 11, 'hello world', 'Hello world');
        // Test snake case
        await testHelper.changeCase('snake', 0, 0, 0, 11, 'hello world', 'hello_world');
        // Test swap case
        await testHelper.changeCase('swap', 0, 0, 0, 11, 'Hello World', 'hELLO wORLD');
        // Test title case
        await testHelper.changeCase('title', 0, 0, 0, 11, 'hello world', 'Hello World');
        // Test upper case
        await testHelper.changeCase('upper', 0, 0, 0, 11, 'hello world', 'HELLO WORLD');
    });

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