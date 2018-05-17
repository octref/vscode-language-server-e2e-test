import {
  IPCMessageReader,
  IPCMessageWriter,
  createConnection,
  IConnection,
  TextDocuments,
  InitializeResult,
  TextDocumentPositionParams,
  CompletionItem,
  CompletionItemKind,
  TextDocumentSyncKind,
  TextEdit
} from 'vscode-languageserver'

import { Range, Position } from 'vscode-languageserver-types'

const connection: IConnection = createConnection(new IPCMessageReader(process), new IPCMessageWriter(process))
const documents: TextDocuments = new TextDocuments()
documents.listen(connection)

connection.onInitialize((params): InitializeResult => {
  return {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Full,
      documentFormattingProvider: true
    }
  }
})

connection.onDocumentFormatting(params => {
  console.log('Formatting')
  const fullDocument = documents.get(params.textDocument.uri)
  const firstCharRange = Range.create(
    // fullDocument.positionAt(0),
    // fullDocument.positionAt(1)
    Position.create(0, 0),
    Position.create(0, 1)
  );
  return [TextEdit.del(firstCharRange)]
})

connection.listen()