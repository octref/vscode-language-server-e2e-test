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

import { Range, Position, Location } from 'vscode-languageserver-types'

const connection: IConnection = createConnection(new IPCMessageReader(process), new IPCMessageWriter(process))
const documents: TextDocuments = new TextDocuments()
documents.listen(connection)

connection.onInitialize((params): InitializeResult => {
  return {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Full,
      documentFormattingProvider: true,
      definitionProvider: true
    }
  }
})

connection.onDocumentFormatting(params => {
  const fullDocument = documents.get(params.textDocument.uri)
  const firstCharRange = Range.create(
    Position.create(0, 0),
    Position.create(0, 1)
  );
  return [TextEdit.del(firstCharRange)]
})

connection.onDefinition(params => {
  const fullDocument = documents.get(params.textDocument.uri)
  const firstCharRange = Range.create(
    Position.create(0, 0),
    Position.create(0, 1)
  );
  return Location.create(params.textDocument.uri, firstCharRange);
})

connection.listen()