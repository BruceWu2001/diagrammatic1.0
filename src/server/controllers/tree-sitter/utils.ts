import { getAllFiles } from "./filePaths";

export const readCodebase = async():Promise<string[]> => {
    const filePaths = await getAllFiles();
    return filePaths;
};

// Helper function to check if a path should be ignored
export const shouldIgnore = (fullPath: string, name: string, ignorePatterns: string[]) => {
    return (
        name.startsWith('.') || // Ignore hidden directories/files
        ignorePatterns.some(pattern => fullPath.includes(pattern)) // Match ignore patterns
    );
};
