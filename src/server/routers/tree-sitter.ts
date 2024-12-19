import z from "zod";
import { router, publicProcedure } from "../setup";
import { getAllFiles } from "../controllers/tree-sitter/filePaths";
import { getContentOfFile } from "../controllers/tree-sitter/contents";

export const tsRouter = router({
  // Greeting procedure
  filePaths: publicProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .query(async({ input }) => {
      const files = await getAllFiles();
      return files;
    }),
  contents: publicProcedure
    .input(
      z.object({
        filePath: z.string(),
      })
    )
    .query(async({input}) => {
      const {filePath} = input;
      const content = await getContentOfFile(filePath);
      return content;
    })
});