import type { DeepKeys, Action } from "../types";
import * as vscode from 'vscode';


export const findAndCallProcedure = async (
    router: any,
    commandPath: string[],
    input: any
  ): Promise<any> => {
    const [current, ...rest] = commandPath;
    const available = Object.keys(router);

    if (!router[current]){
        throw new Error(`Procedure or router not found for command: ${current}, available: ${available}`);
    }
  
    // Check if the current part of the command matches a router or procedure
    if (router[current]) {
      const procedureOrRouter = router[current];
  
      // If there are more parts in the path, recursively go deeper
      if (rest.length > 0 && Object.keys(procedureOrRouter)) {
        return findAndCallProcedure(procedureOrRouter, rest, input);
      }
  
      console.log(input);
      // If no more parts, call the procedure
      return procedureOrRouter({ ...input });
    }
};

export function getAllKeys<T extends object>(
    obj: T,
    prefix: string = '',
    ): DeepKeys<T>[] {
    return Object.entries(obj).reduce((result: string[], [key, value]) => {
        const newPrefix = prefix ? `${prefix}.${key}` : key;
    
        return result.concat([
        newPrefix,
        ...(typeof value === 'object' && value !== null
            ? getAllKeys(value, newPrefix)
            : []),
        ]);
    }, []) as DeepKeys<T>[];
}

export const sendMessage = ({action, method, webview, message} : {action: Action, method:string, webview: vscode.WebviewPanel, message: object}) => {
  webview.webview.postMessage({ action: action, method:method, data: message });
};
  