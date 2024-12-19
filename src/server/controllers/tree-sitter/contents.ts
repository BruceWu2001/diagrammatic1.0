import * as vscode from 'vscode';
import { getFolderUri } from './filePaths';
import { posix } from 'path/posix';


export const getContentOfFile = async(relativeFilePath:string): Promise<string> => {
    console.log("relative:", relativeFilePath);
    const folderUri = getFolderUri();
	const fileUri = folderUri.with({ path: posix.join(folderUri.path, relativeFilePath) });
    console.log("fileUri:", fileUri);
    const fileContent = await vscode.workspace.fs.readFile(fileUri);
    return fileContent.toString();
};