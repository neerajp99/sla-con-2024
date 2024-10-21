import { initTRPC } from "@trpc/server";
import { awsLambdaRequestHandler } from "@trpc/server/adapters/aws-lambda";
import { z } from "zod";
import { APIGatewayProxyEventV2 } from "aws-lambda";

// Initialize tRPC
const t = initTRPC.create();

// Create a router
const appRouter = t.router({
  hello: t.procedure.query(() => {
    return "Hello from tRPC on Lambda using awsLambdaRequestHandler!";
  }),
  greet: t.procedure
    .input(z.object({ name: z.string() }))
    .mutation(({ input }) => {
      return `Hello, ${input.name}! This is a POST request.`;
    }),
});

// Export API types (optional)
export type AppRouter = typeof appRouter;

// Create AWS Lambda handler using awsLambdaRequestHandler
export const handler = awsLambdaRequestHandler({
  router: appRouter,
  createContext: ({ event }: { event: APIGatewayProxyEventV2 }) => {
    // Parse the body of the event
    const body = event.body ? JSON.parse(event.body) : {};
    console.log("Received body:", body);
    // Return the parsed body as the context
    return { body };
  },
  onError: ({ error }) => {
    console.error("Error:", error);
  },
});

// Modify the router to use the context
const appRouterWithContext = t.router({
  hello: t.procedure.query(() => {
    return "Hello from tRPC on Lambda using awsLambdaRequestHandler!";
  }),
  greet: t.procedure
    .input(z.object({ name: z.string() }))
    .mutation(({ input, ctx }) => {
      console.log("Context:", ctx);
      console.log("Input:", input);
      return `Hello, ${input.name}! This is a POST request.`;
    }),
});

export const handlerWithContext = awsLambdaRequestHandler({
  router: appRouterWithContext,
  createContext: ({ event }: { event: APIGatewayProxyEventV2 }) => {
    const body = event.body ? JSON.parse(event.body) : {};
    console.log("Received body:", body);
    return { body };
  },
  onError: ({ error }) => {
    console.error("Error:", error);
  },
});
