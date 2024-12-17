import { posix } from 'path';
import * as vscode from 'vscode';

function getNonce() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

export function getWebViewContent(extensionUri: vscode.Uri, webview: vscode.Webview): string {
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
