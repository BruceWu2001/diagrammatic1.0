import { initTRPC } from '@trpc/server';

// import superjson from 'superjson';

// Initialize tRPC
const t = initTRPC.create({
//   transformer: superjson,
  isServer: true,
  allowOutsideOfServer: true,
});
export const router = t.router;
export const publicProcedure = t.procedure;
export const createCallerFactory = t.createCallerFactory;