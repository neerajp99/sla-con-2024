// import { inferAsyncReturnType } from "@trpc/server";
// import { CreateAWSLambdaContextOptions } from "@trpc/server/adapters/aws-lambda";
// import { APIGatewayProxyEvent } from "aws-lambda";

// export function createContext({
//   event,
// }: CreateAWSLambdaContextOptions<APIGatewayProxyEvent>) {
//   return {
//     auth: event.headers.authorization,
//     // Add any other context properties you need
//   };
// }

// export type Context = inferAsyncReturnType<typeof createContext>;
