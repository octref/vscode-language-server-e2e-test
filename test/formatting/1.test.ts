import * as assert from 'assert'
import * as path from 'path'
import * as fs from 'fs'

import * as vscode from 'vscode'

import { ext, activate, doc, editor, docUri, expectedDocPath, setTestContent } from '../helper'

function readFileAsync(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(err)
      }

      resolve(data)
    })
  })
}

describe('Should format', () => {
  before(async () => {
    await activate(docUri)
  })

  it('formats', async () => {
    // const doc = await vscode.workspace.openTextDocument(j)
    // const editor = await vscode.window.showTextDocument(docUri)

    const result = (await vscode.commands.executeCommand('vscode.executeFormatDocumentProvider', docUri, {
      tabSize: 2,
      insertSpaces: true
    })) as vscode.TextEdit[]
    const oldContent = editor.document.getText()
    await editor.edit(b => result.forEach(f => b.replace(f.range, f.newText)))
    const expected = await readFileAsync(expectedDocPath)
    assert.equal(editor.document.getText(), expected)
    setTestContent(oldContent)
  })
})
