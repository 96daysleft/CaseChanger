import * as assert from 'assert';
import * as vscode from 'vscode';
import { beforeEach, afterEach } from 'mocha';
import { TestHelper } from './testHelper';

suite('Advanced CaseChanger Tests', () => {
    const testHelper = new TestHelper();

    beforeEach(async () => {
        await vscode.commands.executeCommand('workbench.action.closeAllEditors');
    });

    afterEach(async () => {
        await vscode.commands.executeCommand('workbench.action.closeAllEditors');
    });

    suite('Multiple Selection Tests', () => {
        test('Multiple selections with same case type', async () => {
            const content = 'hello world\ngoodbye world\ntest example';
            const selections = [
                { startLine: 0, startChar: 0, endLine: 0, endChar: 11 },
                { startLine: 1, startChar: 0, endLine: 1, endChar: 13 },
                { startLine: 2, startChar: 0, endLine: 2, endChar: 12 }
            ];
            const expectedResults = ['helloWorld', 'goodbyeWorld', 'testExample'];
            
            await testHelper.multipleSelectionsTest('camel', content, selections, expectedResults);
        });

        test('Multiple selections with different lengths', async () => {
            const content = 'a\nhello world\ntest';
            const selections = [
                { startLine: 0, startChar: 0, endLine: 0, endChar: 1 },
                { startLine: 1, startChar: 0, endLine: 1, endChar: 11 },
                { startLine: 2, startChar: 0, endLine: 2, endChar: 4 }
            ];
            const expectedResults = ['A', 'HELLO_WORLD', 'TEST'];
            
            await testHelper.multipleSelectionsTest('constant', content, selections, expectedResults);
        });
    });

    suite('Whitespace Preservation Edge Cases', () => {
        test('Multiple spaces between words', async () => {
            await testHelper.whitespacePreservationTest(
                'camel',
                'hello     world',
                'helloWorld'
            );
        });

        test('Mixed tabs and spaces', async () => {
            await testHelper.whitespacePreservationTest(
                'snake',
                '\t hello \t world \t',
                '\t hello_world \t'
            );
        });

        test('Newlines in selection', async () => {
            const content = 'hello\nworld';
            const expectedContent = 'hello\nworld'; // No case transformation expected for newlines
            await testHelper.caseChanger('camel', 0, 0, 1, 5, content, expectedContent);
        });
    });

    suite('Performance Tests', () => {
        test('Large text transformation performance - camel case', async () => {
            await testHelper.performanceTest('camel', 1000);
        });

        test('Large text transformation performance - snake case', async () => {
            await testHelper.performanceTest('snake', 1000);
        });

        test('Large text transformation performance - constant case', async () => {
            await testHelper.performanceTest('constant', 500);
        });
    });

    suite('Command Registration Tests', () => {
        test('All commands should be registered', async () => {
            await testHelper.validateCommandRegistration();
        });

        test('Invalid command should not exist', async () => {
            await testHelper.errorHandlingTest('invalidCaseType');
        });
    });

    suite('Undo/Redo Functionality', () => {
        test('Undo after camel case transformation', async () => {
            await testHelper.undoTest('camel');
        });

        test('Undo after snake case transformation', async () => {
            await testHelper.undoTest('snake');
        });

        test('Undo after constant case transformation', async () => {
            await testHelper.undoTest('constant');
        });
    });

    suite('Real-world Scenarios', () => {
        test('Code variable transformation in JavaScript', async () => {
            const content = `const first_name = 'John';
const last_name = 'Doe';
const user_age = 25;`;
            
            // Transform variable names to camelCase
            await testHelper.caseChanger('camel', 0, 6, 0, 16, content, 'firstName');
            
            // Reset and test another variable
            const content2 = `const first_name = 'John';`;
            await testHelper.caseChanger('camel', 0, 6, 0, 16, content2, 'firstName');
        });

        test('CSS class name transformation', async () => {
            const content = '.navigation-menu-item { color: blue; }';
            await testHelper.caseChanger('snake', 0, 1, 0, 21, content, 'navigation_menu_item');
        });

        test('API endpoint transformation', async () => {
            const content = '/api/user-profile/get-settings';
            await testHelper.caseChanger('camel', 0, 5, 0, 17, content, 'userProfile');
        });

        test('Database column name transformation', async () => {
            const content = 'SELECT user_id, first_name, last_name FROM users';
            await testHelper.caseChanger('camel', 0, 7, 0, 14, content, 'userId');
        });
    });

    suite('Unicode and Special Character Handling', () => {
        test('Unicode characters transformation', async () => {
            const content = 'héllo wörld';
            const expectedContent = 'hélloWörld';
            await testHelper.caseChanger('camel', 0, 0, 0, 11, content, expectedContent);
        });

        test('Numbers and symbols', async () => {
            const content = 'hello123 world456';
            const expectedContent = 'hello123World456';
            await testHelper.caseChanger('camel', 0, 0, 0, 17, content, expectedContent);
        });

        test('Emoji and special symbols', async () => {
            const content = 'hello 🌍 world';
            const expectedContent = 'helloWorld';
            await testHelper.caseChanger('camel', 0, 0, 0, 14, content, expectedContent);
        });
    });

    suite('Boundary Conditions', () => {
        test('Text at beginning of line', async () => {
            const content = 'hello world\nother text';
            await testHelper.caseChanger('camel', 0, 0, 0, 11, content, 'helloWorld');
        });

        test('Text at end of line', async () => {
            const content = 'other text\nhello world';
            await testHelper.caseChanger('camel', 1, 0, 1, 11, content, 'helloWorld');
        });

        test('Text spanning multiple lines with partial selection', async () => {
            const content = 'hello world\ngoodbye cruel world\nfinal text';
            await testHelper.caseChanger('snake', 0, 6, 1, 7, content, 'world\ngoodbye');
        });

        test('Single character at line boundaries', async () => {
            const content = 'a\nb\nc';
            await testHelper.caseChanger('upper', 1, 0, 1, 1, content, 'B');
        });
    });

    suite('State Management Tests', () => {
        test('Multiple consecutive transformations', async () => {
            const document = await vscode.workspace.openTextDocument({ content: 'hello world' });
            const editor = await vscode.window.showTextDocument(document);

            // Select all text
            const startPos = new vscode.Position(0, 0);
            const endPos = new vscode.Position(0, 11);
            editor.selection = new vscode.Selection(startPos, endPos);

            // First transformation
            await vscode.commands.executeCommand('extension.caseChanger.camel');
            let result = editor.document.getText(editor.selection);
            assert.strictEqual(result, 'helloWorld');

            // Second transformation on same selection
            await vscode.commands.executeCommand('extension.caseChanger.snake');
            result = editor.document.getText(editor.selection);
            assert.strictEqual(result, 'hello_world');

            // Third transformation
            await vscode.commands.executeCommand('extension.caseChanger.constant');
            result = editor.document.getText(editor.selection);
            assert.strictEqual(result, 'HELLO_WORLD');
        });

        test('Transformation with cursor movement', async () => {
            const document = await vscode.workspace.openTextDocument({ 
                content: 'hello world\ngoodbye world' 
            });
            const editor = await vscode.window.showTextDocument(document);

            // Transform first line
            editor.selection = new vscode.Selection(
                new vscode.Position(0, 0),
                new vscode.Position(0, 11)
            );
            await vscode.commands.executeCommand('extension.caseChanger.camel');

            // Move to second line and transform
            editor.selection = new vscode.Selection(
                new vscode.Position(1, 0),
                new vscode.Position(1, 13)
            );
            await vscode.commands.executeCommand('extension.caseChanger.pascal');

            // Verify both transformations
            const finalText = editor.document.getText();
            assert.strictEqual(finalText, 'helloWorld\nGoodbyeWorld');
        });
    });
});