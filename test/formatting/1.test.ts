import * as vscode from 'vscode'
import { getDocUri, testFormat } from '../helper';

describe('Should format', () => {
  const docUri = getDocUri('formatting/1.md')
  const expectedDocUri = getDocUri('formatting/1.expected.md')

  it('formats', async () => {
    await testFormat(docUri, expectedDocUri)
  })
})
