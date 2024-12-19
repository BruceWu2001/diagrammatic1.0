import * as vscode from 'vscode';
import * as path from 'path';
import { shouldIgnore } from './utils';

const readDirectory = async(dir:string, ignorePatterns: string[]):Promise<string[]> =>  {
    const files = [];
    const dirEntries = await vscode.workspace.fs.readDirectory(vscode.Uri.file(dir));
    for (const [name, type] of dirEntries){
        const fullPath = path.join(dir, name);
        if (shouldIgnore(fullPath, name, ignorePatterns)) {
            continue;
        }
        if (type === vscode.FileType.Directory){
            const nestedfiles = await readDirectory(fullPath, ignorePatterns);
            files.push(...nestedfiles);
        }else{
            files.push(fullPath);
        }
    }
    return files;
};

export const getFolderUri = ():vscode.Uri|never => {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders){
        throw new Error('no workspace is open');
    }
    const folderUri = workspaceFolders[0].uri;
    return folderUri;
};

export const getAllFiles = async() : Promise<string[]>  => {
    try {
        const folderPath = getFolderUri().fsPath;
        const ignorePatterns = ['dist/', 'out/', 'node_modules'];
        const files : string [] = await readDirectory(folderPath, ignorePatterns);
        return files;
    } catch (error) {
        if (error instanceof Error){
            vscode.window.showErrorMessage(error.message);
        }
        return [];
    }
};

