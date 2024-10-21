// import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
// import type { AppRouter } from "./router";

// const client = createTRPCProxyClient<AppRouter>({
//   links: [
//     httpBatchLink({
//       url: process.env.API_URL || "http://localhost:3000/trpc",
//     }),
//   ],
// });

// // Example usage
// async function main() {
//   try {
//     const helloResult = await client.hello.query("tRPC");
//     console.log(helloResult);

//     const newUser = await client.createUser.mutate({
//       name: "John Doe",
//       email: "john@example.com",
//     });
//     console.log(newUser);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

// main();
