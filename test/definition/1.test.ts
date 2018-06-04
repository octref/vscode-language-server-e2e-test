import * as vscode from 'vscode';
import { testDefinition, getDocUri } from '../helper';

describe('Should find definition', () => {
  const docUri = getDocUri('definition/1.md')

  it('find definition', async () => {
    await testDefinition(docUri, new vscode.Position(0, 0), {
      range: new vscode.Range(
        new vscode.Position(0, 0),
        new vscode.Position(0, 1)
      ),
      uri: docUri
    })
  })
})
