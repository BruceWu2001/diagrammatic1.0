import z from "zod";
import { router, publicProcedure } from "../setup";
import { readCodebase } from "../helpers/read-codebase/utils";
import { getAllFiles } from "../helpers/read-codebase/dir-nav-helpers";

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
});