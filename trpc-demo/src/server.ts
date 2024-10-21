import { initTRPC, TRPCError } from "@trpc/server";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { z } from "zod";

// Simulated database
const users = [
  { id: 1, name: "Alice", email: "alice@example.com", password: "password123" },
  { id: 2, name: "Bob", email: "bob@example.com", password: "password456" },
];

// Context interface
interface Context {
  user?: { id: number; name: string; email: string };
}

// Initialize tRPC
const t = initTRPC.context<Context>().create();

// Define reusable schemas
const UserSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8).max(100),
});

const UserWithoutPasswordSchema = UserSchema.omit({ password: true });

// Create a router
const appRouter = t.router({
  // Query: Get all users
  getUsers: t.procedure.query(() => {
    return users.map(({ id, name, email }) => ({ id, name, email }));
  }),

  // Query: Get user by ID
  getUserById: t.procedure
    .input(z.number().int().positive())
    .query(({ input }) => {
      const user = users.find((u) => u.id === input);
      if (!user)
        throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
      return UserWithoutPasswordSchema.parse(user);
    }),

  // Mutation: Create a new user
  createUser: t.procedure
    .input(
      z.object({
        name: z.string().min(2).max(50),
        email: z.string().email(),
        password: z
          .string()
          .min(8)
          .max(100)
          .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
          ),
      })
    )
    .mutation(({ input }) => {
      const newUser = UserSchema.parse({ id: users.length + 1, ...input });
      users.push(newUser);
      return UserWithoutPasswordSchema.parse(newUser);
    }),

  // Mutation: Login
  login: t.procedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(8).max(100),
      })
    )
    .mutation(({ input }) => {
      const user = users.find(
        (u) => u.email === input.email && u.password === input.password
      );
      if (!user)
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid credentials",
        });
      return UserWithoutPasswordSchema.parse(user);
    }),

  // Protected procedure: Get current user
  getCurrentUser: t.procedure
    .use(
      t.middleware(({ ctx, next }) => {
        if (!ctx.user)
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "You must be logged in",
          });
        return next({ ctx });
      })
    )
    .query(({ ctx }) => {
      return UserWithoutPasswordSchema.parse(ctx.user);
    }),

  // New: Update user
  updateUser: t.procedure
    .input(
      z.object({
        id: z.number().int().positive(),
        name: z.string().min(2).max(50).optional(),
        email: z.string().email().optional(),
      })
    )
    .mutation(({ input }) => {
      const userIndex = users.findIndex((u) => u.id === input.id);
      if (userIndex === -1)
        throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });

      users[userIndex] = { ...users[userIndex], ...input };
      return UserWithoutPasswordSchema.parse(users[userIndex]);
    }),
});

// Export type router type signature
export type AppRouter = typeof appRouter;

// Create HTTP server
const server = createHTTPServer({
  router: appRouter,
  createContext: (): Context => ({
    // In a real app, you'd decode the JWT token here and set the user
    user: { id: 1, name: "Alice", email: "alice@example.com" },
  }),
});

server.listen(3000);
console.log("tRPC server listening on http://localhost:3000");
