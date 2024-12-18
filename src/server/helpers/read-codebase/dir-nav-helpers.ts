import * as vscode from 'vscode';
import * as path from 'path';

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

const getFolderPath = ():string|never => {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders){
        throw new Error('no workspace is open');
    }
    const folderUri = workspaceFolders[0].uri;
    const folderPath = folderUri.fsPath;
    return folderPath;
};

export const getAllFiles = async() : Promise<string[]>  => {
    try {
        const folderPath = getFolderPath();
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

// Helper function to check if a path should be ignored
const shouldIgnore = (fullPath: string, name: string, ignorePatterns: string[]) => {
    return (
        name.startsWith('.') || // Ignore hidden directories/files
        ignorePatterns.some(pattern => fullPath.includes(pattern)) // Match ignore patterns
    );
};
