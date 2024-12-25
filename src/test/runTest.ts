import * as path from 'path';
import { runTests } from '@vscode/test-electron';

async function go() {
    const extensionDevelopmentPath = path.resolve(__dirname, '../../../');
    const extensionTestsPath = path.resolve(__dirname, './suite');
    const testWorkspace = path.resolve(__dirname, '../../src/');

    const versions = [
        '1.96.2'
    ];

    for (const version of versions) {
        try {
            console.log(`Running tests for VSCode version ${version}`);
            await runTests({
                version,
                extensionDevelopmentPath,
                extensionTestsPath,
                launchArgs: [testWorkspace],
            });
        } catch (err) {
            console.error(`Failed to run tests for VSCode version ${version}`, err);
        }
    }
}

go();