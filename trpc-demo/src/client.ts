import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "./server";

// Create tRPC client
const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000",
    }),
  ],
});

async function main() {
  try {
    // Query: Get all users
    const allUsers = await trpc.getUsers.query();
    console.log("All users:", allUsers);

    // Query: Get user by ID
    const user = await trpc.getUserById.query(1);
    console.log("User with ID 1:", user);

    // Mutation: Create a new user
    const newUser = await trpc.createUser.mutate({
      name: "Charlie",
      email: "charlie@example.com",
      password: "AAAA1112@makaka",
    });
    console.log("New user created:", newUser);

    // Mutation: Login
    const loggedInUser = await trpc.login.mutate({
      email: "alice@example.com",
      password: "password123",
    });
    console.log("Logged in user:", loggedInUser);

    // Protected query: Get current user
    const currentUser = await trpc.getCurrentUser.query();
    console.log("Current user:", currentUser);
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
