// import { awsLambdaRequestHandler } from "@trpc/server/adapters/aws-lambda";
// import {
//   APIGatewayProxyEvent,
//   APIGatewayProxyResult,
//   Context,
// } from "aws-lambda";
// import { appRouter } from "./router";

// const handler = awsLambdaRequestHandler({
//   router: appRouter,
// });

// export const lambdaHandler = async (
//   event: APIGatewayProxyEvent,
//   context: Context
// ): Promise<APIGatewayProxyResult> => {
//   // Extract the tRPC path from the event
//   const trpcPath = event.pathParameters?.trpc;

//   if (!trpcPath) {
//     return {
//       statusCode: 400,
//       body: JSON.stringify({ error: "Invalid tRPC path" }),
//     };
//   }

//   let input: any = {};
//   let httpMethod = event.httpMethod;

//   if (httpMethod === "GET") {
//     // For GET requests, use query parameters
//     input = event.queryStringParameters || {};
//   } else if (httpMethod === "POST") {
//     // For POST requests, parse the JSON body
//     if (event.body) {
//       try {
//         input = JSON.parse(event.body);
//       } catch (error) {
//         return {
//           statusCode: 400,
//           body: JSON.stringify({ error: "Invalid JSON body" }),
//         };
//       }
//     }
//   } else {
//     return {
//       statusCode: 405,
//       body: JSON.stringify({ error: "Method not allowed" }),
//     };
//   }

//   // Construct a new event object for the tRPC handler
//   const trpcEvent: APIGatewayProxyEvent = {
//     ...event,
//     httpMethod: "POST", // tRPC internally expects POST
//     body: JSON.stringify({
//       json: input,
//     }),
//     headers: {
//       ...event.headers,
//       "content-type": "application/json",
//     },
//     path: `/${trpcPath}`,
//   };

//   try {
//     const result = await handler(trpcEvent, context);
//     console.log("::: tRPC result:", result);
//     return {
//       statusCode: result.statusCode ?? 200,
//       headers: result.headers,
//       body: result.body ?? "",
//       isBase64Encoded: result.isBase64Encoded,
//     };
//   } catch (error) {
//     console.error("tRPC error:", error);
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: "Internal server error" }),
//     };
//   }
// };
