import { getAllFiles } from "./dir-nav-helpers";

export const readCodebase = async():Promise<string> => {
    const filePaths = await getAllFiles();
    return filePaths.join('\n');
  };