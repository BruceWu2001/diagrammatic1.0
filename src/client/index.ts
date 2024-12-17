
interface vscode {
  postMessage(message: any): void;
}
declare const acquireVsCodeApi: Function;
export const vscode: vscode = acquireVsCodeApi();