import * as path from 'path'

import { ExtensionContext, TextDocument as VTextDocument } from 'vscode'
import * as vscode from 'vscode'
import { LanguageClient, LanguageClientOptions, ServerOptions, TransportKind, Middleware } from 'vscode-languageclient'

export function activate(context: ExtensionContext) {
  const serverModulePath = context.asAbsolutePath(path.join('server', 'dist', 'serverMain.js'))
  const languageClient = createLanguageClient(serverModulePath, {});
  const disposable = languageClient.start()
  context.subscriptions.push(disposable)
}

export function createLanguageClient(serverModulePath: string, middleware: Middleware) {
  const debugOptions = { execArgv: ['--nolazy', '--inspect=6006'] }

  const serverOptions: ServerOptions = {
    run: { module: serverModulePath, transport: TransportKind.ipc },
    debug: { module: serverModulePath, transport: TransportKind.ipc, options: debugOptions }
  }

  const clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: 'file', language: 'markdown' }],
    synchronize: {
      configurationSection: []
    }
  }

  return new LanguageClient('mls', 'Test Markdown Language Server', serverOptions, clientOptions)
}