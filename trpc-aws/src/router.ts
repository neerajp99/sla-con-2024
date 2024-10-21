// import { z } from "zod";
// import { router, publicProcedure } from "./trpc";

// export const appRouter = router({
//   hello: publicProcedure
//     .input(z.object({ name: z.string().optional() }))
//     .query(({ input }) => {
//       return { greeting: `Hello ${input.name || "World"}!` };
//     }),
//   greet: publicProcedure
//     .input(z.object({ name: z.string().optional() }))
//     .mutation(({ input }) => {
//       return { greeting: `Greetings, ${input.name || "Friend"}!` };
//     }),
// });

// export type AppRouter = typeof appRouter;
