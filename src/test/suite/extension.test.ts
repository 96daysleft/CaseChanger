import * as assert from 'assert';
import * as vscode from 'vscode';
import { caseTypes } from '../../transformCase.js';

const EXT_ID = '96daysleft.vscode-case-changer-context';

async function withEditor(initial: string): Promise<vscode.TextEditor> {
  const doc = await vscode.workspace.openTextDocument({ content: initial, language: 'plaintext' });
  const editor = await vscode.window.showTextDocument(doc);
  editor.selection = new vscode.Selection(
    doc.positionAt(0),
    doc.positionAt(initial.length),
  );
  return editor;
}

// The command applies its edit asynchronously without awaiting, so poll.
async function waitForText(doc: vscode.TextDocument, expected: string): Promise<void> {
  for (let i = 0; i < 50; i++) {
    if (doc.getText() === expected) {
      return;
    }
    await new Promise(r => setTimeout(r, 50));
  }
  assert.strictEqual(doc.getText(), expected);
}

suite('Extension Test Suite', () => {
  suiteTeardown(async () => {
    await vscode.commands.executeCommand('workbench.action.closeAllEditors');
  });

  test('extension activates', async () => {
    const ext = vscode.extensions.getExtension(EXT_ID);
    assert.ok(ext, `extension ${EXT_ID} not found`);
    await ext!.activate();
    assert.strictEqual(ext!.isActive, true);
  });

  test('registers a command per case type', async () => {
    const commands = await vscode.commands.getCommands(true);
    for (const value of Object.values(caseTypes)) {
      assert.ok(
        commands.includes(`extension.changeCase.${value}`),
        `missing command extension.changeCase.${value}`,
      );
    }
  });

  test('constant command transforms the selection', async () => {
    const editor = await withEditor('hello world');
    await vscode.commands.executeCommand('extension.changeCase.constant');
    await waitForText(editor.document, 'HELLO_WORLD');
  });

  test('upper command transforms the selection', async () => {
    const editor = await withEditor('hello world');
    await vscode.commands.executeCommand('extension.changeCase.upper');
    await waitForText(editor.document, 'HELLO WORLD');
  });
});
