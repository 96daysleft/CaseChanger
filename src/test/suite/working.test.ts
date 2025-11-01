import * as assert from 'assert';
import * as vscode from 'vscode';
import { before, after, beforeEach, afterEach } from 'mocha';

suite('Extension Integration Tests', () => {
    before(async () => {
        // Ensure VS Code is ready
        await vscode.commands.executeCommand('workbench.action.closeAllEditors');
    });

    after(async () => {
        await vscode.commands.executeCommand('workbench.action.closeAllEditors');
    });

    beforeEach(async () => {
        await vscode.commands.executeCommand('workbench.action.closeAllEditors');
    });

    afterEach(async () => {
        await vscode.commands.executeCommand('workbench.action.closeAllEditors');
    });

    suite('Command Registration', () => {
        test('all extension commands are registered', async () => {
            // Ensure extension is activated first
            const extension = vscode.extensions.getExtension('jerky676.vscode-case-changer-context');
            if (extension && !extension.isActive) {
                await extension.activate();
            }

            // Wait a bit for commands to be registered
            await new Promise(resolve => setTimeout(resolve, 1000));

            const allCommands = await vscode.commands.getCommands();
            
            const expectedCommands = [
                'extension.caseChanger.camel',
                'extension.caseChanger.constant',
                'extension.caseChanger.dot',
                'extension.caseChanger.kebab',
                'extension.caseChanger.lower',
                'extension.caseChanger.pascal',
                'extension.caseChanger.sentence',
                'extension.caseChanger.snake',
                'extension.caseChanger.none',
                'extension.caseChanger.capital',
                'extension.caseChanger.upper'
            ];
            
            for (const command of expectedCommands) {
                assert.ok(allCommands.includes(command), 
                    `Command ${command} should be registered`);
            }
        });

        test('commands can be executed without error', async () => {
            // Ensure extension is activated first
            const extension = vscode.extensions.getExtension('jerky676.vscode-case-changer-context');
            if (extension && !extension.isActive) {
                await extension.activate();
            }

            // Wait a bit for commands to be registered
            await new Promise(resolve => setTimeout(resolve, 500));

            // Create a simple document
            const document = await vscode.workspace.openTextDocument({
                content: 'hello world'
            });
            await vscode.window.showTextDocument(document);

            // Try to execute a few commands - they should not throw errors
            const commandsToTest = [
                'extension.caseChanger.camel',
                'extension.caseChanger.upper',
                'extension.caseChanger.snake'
            ];

            for (const command of commandsToTest) {
                try {
                    await vscode.commands.executeCommand(command);
                    // If we get here without an exception, the command executed
                    assert.ok(true, `Command ${command} executed without error`);
                } catch (error) {
                    assert.fail(`Command ${command} threw error: ${error}`);
                }
            }
        });
    });

    suite('Extension Activation', () => {
        test('extension is loaded', () => {
            const extension = vscode.extensions.getExtension('jerky676.vscode-case-changer-context');
            assert.ok(extension, 'Extension should be loaded');
        });

        test('extension can be activated', async () => {
            const extension = vscode.extensions.getExtension('jerky676.vscode-case-changer-context');
            if (extension && !extension.isActive) {
                await extension.activate();
            }
            assert.ok(extension?.isActive, 'Extension should be active');
        });
    });

    suite('Document and Editor Operations', () => {
        test('can create and open documents', async () => {
            const document = await vscode.workspace.openTextDocument({
                content: 'test content'
            });
            assert.ok(document, 'Should be able to create document');
            assert.strictEqual(document.getText(), 'test content');

            const editor = await vscode.window.showTextDocument(document);
            assert.ok(editor, 'Should be able to show document in editor');
        });

        test('can manipulate text selections', async () => {
            const document = await vscode.workspace.openTextDocument({
                content: 'hello world test'
            });
            const editor = await vscode.window.showTextDocument(document);

            // Create a selection
            const startPos = new vscode.Position(0, 0);
            const endPos = new vscode.Position(0, 5);
            editor.selection = new vscode.Selection(startPos, endPos);

            const selectedText = document.getText(editor.selection);
            assert.strictEqual(selectedText, 'hello');
        });
    });

    suite('Basic Extension Environment', () => {
        test('extension contributes expected number of commands', async () => {
            const allCommands = await vscode.commands.getCommands();
            const caseChangerCommands = allCommands.filter(cmd => 
                cmd.startsWith('extension.caseChanger.')
            );
            
            // Should have 11 case transformation commands
            assert.strictEqual(caseChangerCommands.length, 11, 
                'Should have 11 case transformation commands');
        });

        test('workspace and window APIs are available', () => {
            assert.ok(vscode.workspace, 'Workspace API should be available');
            assert.ok(vscode.window, 'Window API should be available');
            assert.ok(vscode.commands, 'Commands API should be available');
        });
    });
});