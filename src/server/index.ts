import { initTRPC } from '@trpc/server';
import { z } from 'zod';


// Initialize tRPC
const t = initTRPC.create({
  isServer: false,
  allowOutsideOfServer: true,
});

// Create main router
const appRouter = t.router({
  // Greeting procedure
  greeting: t.procedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .query(({ input }) => `Hello, ${input.name}!`),
});

// Export the app router type to be imported on the client side
export type AppRouter = typeof appRouter;