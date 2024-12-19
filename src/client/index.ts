import type { CommandInput, CommandOutput, Procedures, RouterInput, RouterOutput } from "src/server";
import { useState, useCallback, useEffect } from "react";

type Message = {
    command : Procedures,
    input: object
}
interface vscode {
  postMessage(message: Message): void;
}
declare const acquireVsCodeApi: Function;
export const vscode: vscode = acquireVsCodeApi();


export const useApi = (command: Procedures) => {
  const [response, setResponse] = useState<CommandOutput<typeof command> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Function to send message to the backend
  const api = useCallback((input: CommandInput<typeof command>) => {
    setIsLoading(true);
    vscode.postMessage({
      command,
      input,
    });
  }, [command]);

  // Listening for the reply from the backend
  const listenForReply = useCallback(() => {
    const listener = (event: MessageEvent) => {
      const message = event.data;
      const { data, action, method } = message;
      console.log("Message received", message);

      // must match the method invoking it 
      if (action === 'reply' && method === command) {
        setResponse(data); // Set the response from the backend
        setIsLoading(false); // Set loading to false
      }
    };

    window.addEventListener('message', listener);
    return () => window.removeEventListener('message', listener); // Clean up the event listener
  }, [command]);

  // Trigger the listener when the component mounts
  useEffect(() => {
    const cleanUpListener = listenForReply();
    return cleanUpListener;
  }, [listenForReply]);

  return { api, response, isLoading };
};
