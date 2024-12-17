import z from "zod";
import { router, publicProcedure } from "../setup";

export const greetingRouter = router({
  // Greeting procedure
  get: publicProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .query(({ input }) => `Hello, ${input.name}!`),
});