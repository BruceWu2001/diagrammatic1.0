import * as vscode from 'vscode';
import { runBackend } from './server/index';
import { getWebViewContent } from './utils';


export let latestActiveEditor = vscode.window.activeTextEditor;
let currentWebview: vscode.WebviewPanel | undefined = undefined;

export function getCurWebView() {
  return currentWebview;
}

export function activate(context: vscode.ExtensionContext) {
  vscode.window.onDidChangeActiveTextEditor((editor) => {
    if (!editor) { return; }
    latestActiveEditor = editor;
  });

  // Register the command
  const disposable = vscode.commands.registerCommand('catCoding.start', () => {
    const bestCol = vscode.ViewColumn.One;  

    if (currentWebview) {
      currentWebview.reveal(bestCol);
    }

    // Create and show a new webview
    currentWebview = vscode.window.createWebviewPanel(
      'vsc-trpc-template', // Identifies the type of the webview. Used internally
      'vsc-trpc-template', // Title of the panel displayed to the user
      bestCol, // Editor column to show the new webview panel in.
      {
        enableScripts: true,
        retainContextWhenHidden: true,
      }
    );

    currentWebview.webview.html = getWebViewContent(context.extensionUri, currentWebview.webview);

    // backend listening for message
    runBackend(currentWebview, context);

    currentWebview.onDidDispose(
      () => {
        currentWebview = undefined;
      },
      null,
      context.subscriptions
    );
    return;
  });

  // Push the command to the subscriptions
  context.subscriptions.push(disposable);
}

