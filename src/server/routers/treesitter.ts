import z from "zod";
import { router, publicProcedure } from "../setup";
import { readCodebase } from "../helpers/read-codebase/utils";

export const tsRouter = router({
  // Greeting procedure
  filePaths: publicProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .query(async({ input }) => {
      const files = await readCodebase();
      return `FILES INCLUDE: \n\n ${files}`;
    }),
});