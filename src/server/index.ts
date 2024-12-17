import * as vscode from 'vscode';
import { createCallerFactory, router } from './setup';
import { greetingRouter } from './routers/greeting';
import { findAndCallProcedure, getAllKeys, sendMessage } from './helpers/utils';

// Create main router --> include subrouters here
export const appRouter = router({
  greeting: greetingRouter
});
const createCaller = createCallerFactory(appRouter);

// this is used to make server side calls to the router
export const caller = createCaller({/*context*/});
const procedures = getAllKeys(caller);

export type AppRouter = typeof appRouter;
export type Procedures = typeof procedures[number]; 



export const runBackend = (currentWebview: vscode.WebviewPanel, context: vscode.ExtensionContext) => {
  currentWebview.webview.onDidReceiveMessage(
    async(message) => {
      try {  
        if(!currentWebview){return ;}
        const { command, input } = message;
        const commandPath = command.split('.'); 

        // server side call 
        const result = await findAndCallProcedure(caller, commandPath, input);
        // vscode.window.showErrorMessage(result);

        // send to webview
        sendMessage({action:'reply', method: command, webview: currentWebview, message: result});
      } catch (error) {
        console.log(error);
      }
      return;
    },
    undefined,
    context.subscriptions
  );
};