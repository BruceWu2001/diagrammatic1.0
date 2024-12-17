import { posix } from 'path';
import * as vscode from 'vscode';
import { AppRouter } from './server';

function getNonce() {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < 32; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

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
	currentWebview.webview.onDidReceiveMessage(
        message => {
          switch (message.command) {
            case 'alert':
              vscode.window.showErrorMessage(message.text);

			  if(!currentWebview){return ;}

			//   backend reply
			  currentWebview.webview.postMessage({ command: 'refactor' });
              return;
          }
        },
        undefined,
        context.subscriptions
      );

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

function getWebViewContent(extensionUri: vscode.Uri, webview: vscode.Webview): string {
	const viewPath = posix.join('dist', 'views');
	const scriptPathOnDisk = vscode.Uri.joinPath(extensionUri, viewPath, 'index.js');

	// And the uri we use to load this script in the webview
	const scriptUri = webview.asWebviewUri(scriptPathOnDisk);

	// Local path to css styles
	const stylesPathMainPath = vscode.Uri.joinPath(extensionUri, 'src', 'views', 'vscode.css');

	const styleMainUri = webview.asWebviewUri(stylesPathMainPath);

	// Use a nonce to only allow specific scripts to be run
	const nonce = getNonce();

	return `<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">

			<!--
				Use a content security policy to only allow loading styles from our extension directory,
				and only allow scripts that have a specific nonce.
				(See the 'webview-sample' extension sample for img-src content security policy examples)
			-->
			<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">

			<meta name="viewport" content="width=device-width, initial-scale=1.0">

			<link href="${styleMainUri}" rel="stylesheet">
			<title>Cat Colors</title>
			
		</head>
		<body>
			<div id="root"></div>
			<script nonce="${nonce}" src="${scriptUri}"></script>
		</body>
		</html>`;
}
