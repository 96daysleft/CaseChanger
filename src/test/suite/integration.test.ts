import * as assert from 'assert';
import * as vscode from 'vscode';
import { before, after, beforeEach, afterEach, suiteTeardown } from 'mocha';
import { TestHelper } from './testHelper';
import { Transform, ConvertCaseType } from '../../transform';

suite('CaseChanger Extension Integration Tests', () => {
    const testHelper = new TestHelper();

    suiteTeardown(() => {
        vscode.window.showInformationMessage('All integration tests done!');
    });

    before(async () => {
        await vscode.commands.executeCommand('workbench.action.closeAllEditors');
        vscode.window.showInformationMessage('Start all integration tests.');
    });

    after(async () => {
        await vscode.commands.executeCommand('workbench.action.closeAllEditors');
        vscode.window.showInformationMessage('Integration tests complete');
    });

    beforeEach(async () => {
        try {
            await vscode.commands.executeCommand('workbench.action.closeAllEditors');
        } catch (error) {
            console.error('Error in beforeEach:', error);
            throw error;
        }
    });

    afterEach(async () => {
        try {
            await vscode.commands.executeCommand('workbench.action.closeAllEditors');
        } catch (error) {
            console.error('Error in afterEach:', error);
            throw error;
        }
    });

    suite('Basic Case Transformation Commands', () => {
        test('Test camel case command', async () => {
            try {
                await testHelper.basicTextTest(testHelper.transform.camel);
            } catch (error) {
                console.error('Camel case test failed:', error);
                throw error;
            }
        });

        test('Test constant case command', async () => {
            try {
                await testHelper.basicTextTest(testHelper.transform.constant);
            } catch (error) {
                console.error('Constant case test failed:', error);
                throw error;
            }
        });

        test('Test dot case command', async () => {
            try {
                await testHelper.basicTextTest(testHelper.transform.dot);
            } catch (error) {
                console.error('Dot case test failed:', error);
                throw error;
            }
        });

        test('Test kebab case command', async () => {
            try {
                await testHelper.basicTextTest(testHelper.transform.kebab);
            } catch (error) {
                console.error('Kebab case test failed:', error);
                throw error;
            }
        });

        test('Test lower case command', async () => {
            try {
                await testHelper.basicTextTest(testHelper.transform.lower);
            } catch (error) {
                console.error('Lower case test failed:', error);
                throw error;
            }
        });

        test('Test pascal case command', async () => {
            try {
                await testHelper.basicTextTest(testHelper.transform.pascal);
            } catch (error) {
                console.error('Pascal case test failed:', error);
                throw error;
            }
        });

        test('Test sentence case command', async () => {
            try {
                await testHelper.basicTextTest(testHelper.transform.sentence);
            } catch (error) {
                console.error('Sentence case test failed:', error);
                throw error;
            }
        });

        test('Test snake case command', async () => {
            try {
                await testHelper.basicTextTest(testHelper.transform.snake);
            } catch (error) {
                console.error('Snake case test failed:', error);
                throw error;
            }
        });

        test('Test no case command', async () => {
            try {
                await testHelper.basicTextTest(testHelper.transform.none);
            } catch (error) {
                console.error('No case test failed:', error);
                throw error;
            }
        });

        test('Test capital case command', async () => {
            try {
                await testHelper.basicTextTest(testHelper.transform.capital);
            } catch (error) {
                console.error('Capital case test failed:', error);
                throw error;
            }
        });

        test('Test upper case command', async () => {
            try {
                await testHelper.basicTextTest(testHelper.transform.upper);
            } catch (error) {
                console.error('Upper case test failed:', error);
                throw error;
            }
        });
    });

    suite('Multi-line Text Handling', () => {
        test('Multi-line camel case transformation', async () => {
            const content = 'hello world\nGOODBYE CRUEL WORLD\ncamelCaseText';
            const expectedContent = 'helloWorld\ngoodbyeCruelWorld\ncamelCaseText';
            await testHelper.caseChanger('camel', 0, 0, 2, 13, content, expectedContent);
        });

        test('Multi-line snake case transformation', async () => {
            const content = 'Hello World\nGoodbye Cruel World\nAnotherExample';
            const expectedContent = 'hello_world\ngoodbye_cruel_world\nanother_example';
            await testHelper.caseChanger('snake', 0, 0, 2, 14, content, expectedContent);
        });

        test('Multi-line constant case transformation', async () => {
            const content = 'hello world\ngoodbye world\ntest example';
            const expectedContent = 'HELLO_WORLD\nGOODBYE_WORLD\nTEST_EXAMPLE';
            await testHelper.caseChanger('constant', 0, 0, 2, 12, content, expectedContent);
        });

        test('Multi-line pascal case transformation', async () => {
            const content = 'hello world\ngoodbye world\nfinal test';
            const expectedContent = 'HelloWorld\nGoodbyeWorld\nFinalTest';
            await testHelper.caseChanger('pascal', 0, 0, 2, 10, content, expectedContent);
        });

        test('Partial multi-line selection', async () => {
            const content = 'hello world\ngoodbye cruel world\nfinal test';
            const expectedContent = 'hello world\nGOODBYE_CRUEL_WORLD\nfinal test';
            await testHelper.caseChanger('constant', 1, 0, 1, 18, content, expectedContent);
        });
    });

    suite('Whitespace and Formatting Preservation', () => {
        test('Leading whitespace preservation', async () => {
            const content = '    hello world';
            const expectedContent = '    helloWorld';
            await testHelper.caseChanger('camel', 0, 0, 0, 15, content, expectedContent);
        });

        test('Trailing whitespace preservation', async () => {
            const content = 'hello world    ';
            const expectedContent = 'helloWorld    ';
            await testHelper.caseChanger('camel', 0, 0, 0, 15, content, expectedContent);
        });

        test('Leading and trailing whitespace preservation', async () => {
            const content = '  hello world  ';
            const expectedContent = '  helloWorld  ';
            await testHelper.caseChanger('camel', 0, 0, 0, 15, content, expectedContent);
        });

        test('Tab character preservation', async () => {
            const content = '\thello world\t';
            const expectedContent = '\thelloWorld\t';
            await testHelper.caseChanger('camel', 0, 0, 0, 13, content, expectedContent);
        });

        test('Mixed whitespace preservation', async () => {
            const content = ' \t hello world \t ';
            const expectedContent = ' \t helloWorld \t ';
            await testHelper.caseChanger('camel', 0, 0, 0, 17, content, expectedContent);
        });
    });

    suite('Edge Cases and Special Scenarios', () => {
        test('Empty selection handling', async () => {
            const content = '';
            const expectedContent = '';
            await testHelper.caseChanger('camel', 0, 0, 0, 0, content, expectedContent);
        });

        test('Only whitespace selection', async () => {
            const content = '   ';
            const expectedContent = '   ';
            await testHelper.caseChanger('camel', 0, 0, 0, 3, content, expectedContent);
        });

        test('Single character transformation', async () => {
            const content = 'a';
            const expectedContent = 'A';
            await testHelper.caseChanger('upper', 0, 0, 0, 1, content, expectedContent);
        });

        test('Single word transformation', async () => {
            const content = 'hello';
            const expectedContent = 'HELLO';
            await testHelper.caseChanger('upper', 0, 0, 0, 5, content, expectedContent);
        });

        test('Numbers in text transformation', async () => {
            const content = 'hello world 123';
            const expectedContent = 'helloWorld123';
            await testHelper.caseChanger('camel', 0, 0, 0, 15, content, expectedContent);
        });

        test('Special characters transformation', async () => {
            const content = 'hello-world_test';
            const expectedContent = 'helloWorldTest';
            await testHelper.caseChanger('camel', 0, 0, 0, 16, content, expectedContent);
        });

        test('Text with punctuation', async () => {
            const content = 'hello, world!';
            const expectedContent = 'helloWorld';
            await testHelper.caseChanger('camel', 0, 0, 0, 13, content, expectedContent);
        });
    });

    suite('Complex Input Scenarios', () => {
        test('Already camelCase text to snake_case', async () => {
            const content = 'alreadyCamelCase';
            const expectedContent = 'already_camel_case';
            await testHelper.caseChanger('snake', 0, 0, 0, 16, content, expectedContent);
        });

        test('Mixed case text normalization', async () => {
            const content = 'MiXeD cAsE TeXt';
            const expectedContent = 'mixedCaseText';
            await testHelper.caseChanger('camel', 0, 0, 0, 15, content, expectedContent);
        });

        test('snake_case to PascalCase', async () => {
            const content = 'snake_case_example';
            const expectedContent = 'SnakeCaseExample';
            await testHelper.caseChanger('pascal', 0, 0, 0, 18, content, expectedContent);
        });

        test('kebab-case to CONSTANT_CASE', async () => {
            const content = 'kebab-case-example';
            const expectedContent = 'KEBAB_CASE_EXAMPLE';
            await testHelper.caseChanger('constant', 0, 0, 0, 18, content, expectedContent);
        });

        test('dot.case to sentence case', async () => {
            const content = 'dot.case.example';
            const expectedContent = 'Dot case example';
            await testHelper.caseChanger('sentence', 0, 0, 0, 16, content, expectedContent);
        });

        test('CONSTANT_CASE to no case', async () => {
            const content = 'CONSTANT_CASE_EXAMPLE';
            const expectedContent = 'constant case example';
            await testHelper.caseChanger('none', 0, 0, 0, 21, content, expectedContent);
        });
    });

    suite('Partial Selection Tests', () => {
        test('Partial line selection - beginning', async () => {
            const content = 'hello world and more text';
            const expectedContent = 'helloWorld and more text';
            await testHelper.caseChanger('camel', 0, 0, 0, 11, content, expectedContent);
        });

        test('Partial line selection - middle', async () => {
            const content = 'start hello world end';
            const expectedContent = 'start helloWorld end';
            await testHelper.caseChanger('camel', 0, 6, 0, 17, content, expectedContent);
        });

        test('Partial line selection - end', async () => {
            const content = 'start text hello world';
            const expectedContent = 'start text helloWorld';
            await testHelper.caseChanger('camel', 0, 11, 0, 22, content, expectedContent);
        });
    });

    suite('Real-world Code Examples', () => {
        test('JavaScript variable name transformation', async () => {
            const content = 'const user_name = "john";';
            const expectedContent = 'const userName = "john";';
            await testHelper.caseChanger('camel', 0, 6, 0, 15, content, expectedContent);
        });

        test('CSS class name transformation', async () => {
            const content = '.navigation-menu-item';
            const expectedContent = '.navigation_menu_item';
            await testHelper.caseChanger('snake', 0, 1, 0, 21, content, expectedContent);
        });

        test('Function name transformation', async () => {
            const content = 'function getUserData() {';
            const expectedContent = 'function get_user_data() {';
            await testHelper.caseChanger('snake', 0, 9, 0, 20, content, expectedContent);
        });

        test('API endpoint transformation', async () => {
            const content = 'api/user-profile/settings';
            const expectedContent = 'api/userProfile/settings';
            await testHelper.caseChanger('camel', 0, 4, 0, 16, content, expectedContent);
        });
    });
});