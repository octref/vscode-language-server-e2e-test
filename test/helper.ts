import * as vscode from 'vscode'
import * as path from 'path'

export const ext = vscode.extensions.getExtension('octref.vscode-language-server-e2e-test')

export let doc: vscode.TextDocument
export let editor: vscode.TextEditor
export let documentEol: string
export let platformEol: string

export async function activate(docUri: vscode.Uri) {
  await ext.activate()
  try {
    doc = await vscode.workspace.openTextDocument(docUri)
    editor = await vscode.window.showTextDocument(doc)
  } catch (e) {
    console.error(e)
  }
}

const docPath = path.resolve(__dirname, '../../fixture/formatting/1.md')
export const docUri = vscode.Uri.file(docPath)
export const expectedDocPath = path.resolve(__dirname, '../../fixture/formatting/1.expected.md')

export async function setTestContent(content: string): Promise<boolean> {
  const all = new vscode.Range(doc.positionAt(0), doc.positionAt(doc.getText().length))
  // TODO: May be able to replace this with
  // return editor.edit((eb) => eb.replace(all, content));
  // once the fix for https://github.com/dart-lang/sdk/issues/32914
  // has made it all the way through.
  return editor.edit(eb => eb.replace(all, content))
}
