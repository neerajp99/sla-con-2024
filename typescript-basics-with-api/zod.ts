/**
 * Simple walkthrough of Zod, a TypeScript-first schema declaration and validation library.
 */

import { string, z } from "zod";

// Basic Schemas
/**
 * Zod allows you to define schemas for various data types.
 * These schemas can be used for validation and type inference.
 */
const stringSchema = z.string();
const numberSchema = z.number();
const booleanSchema = z.boolean();

// Usage
const validString = stringSchema.parse("hello");
const validNumber = numberSchema.parse(42);
const validBoolean = booleanSchema.parse(true);

// console.log("Expected String, Received a number", stringSchema.parse(42));

// Object Schemas
/**
 * Object schemas define the shape of objects, including which properties
 * are required, optional, or have default values.
 */
const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  age: z.number().min(0).max(120).optional(),
  isActive: z.boolean().default(true),
});

type User = z.infer<typeof userSchema>; // Infer TypeScript type from schema

// Usage for valid and invalid data
const validUser = userSchema.parse({
  id: 1,
  name: "John Doe",
  email: "check@mail.com",
  age: 30,
});

// console.log("Valid User:", validUser);

// const invalidUser = userSchema.parse({
//   id: "not a number",
//   name: 123,
//   email: "not an email",
// });

// console.log("Invalid User:", invalidUser);

// Array Schemas
/**
 * Array schemas define the type of elements in an array.
 */
const numberArraySchema = z.array(z.number());
const userArraySchema = z.array(userSchema);

// Usgae for valid and invalid data
const validNumbers = numberArraySchema.parse([1, 2, 3]);
const validUsers = userArraySchema.parse([
  {
    id: 1,
    name: "John Doe",
    email: "neeraj@mail.com",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "neeraj2@mail.com",
  },
]);

// console.log("Valid Numbers:", validNumbers);

// console.log("Valid Users:", validUsers);

// const invalidNumbers = numberArraySchema.parse(["one", "two", "three"]);

// console.log("Invalid Numbers:", invalidNumbers);

// Union Types
/**
 * Union types allow a value to be one of several types.
 */
const stringOrNumberSchema = z.union([z.string(), z.number()]);

// Usage
// const validStringOrNumber = stringOrNumberSchema.parse("hello");
// console.log("Valid String or Number:", validStringOrNumber);

// Enum Schemas
/**
 * Enum schemas restrict a value to a predetermined set of values.
 */
const ColorEnum = z.enum(["red", "green", "blue"]);
// console.log(ColorEnum.parse("red")); // Outputs red instead of 0

// Refinements
/**
 * Refinements allow you to add custom validation logic to schemas.
 */
const evenNumberSchema = z.number().refine((n) => n % 2 === 0, {
  message: "Number must be even",
});

// console.log(evenNumberSchema.parse(19)); // Not even, will throw an error

// Transformations
/**
 * Transformations allow you to modify the data during parsing.
 */
const dateStringSchema = z.string().transform((str) => new Date(str));
console.log("Data String Schema: ", dateStringSchema.parse("2021-10-01"));

// Parsing and Validation
/**
 * Zod schemas can be used to parse and validate data.
 * This function demonstrates proper error handling with TypeScript.
 */
function validateUser(data: unknown): User {
  const result = userSchema.safeParse(data);
  if (result.success) {
    return result.data;
  } else {
    console.error(result.error.issues);
    throw new Error("Invalid user data");
  }
}

// Usage examples with proper error handling
// try {
//   const validUser = validateUser({
//     id: 1,
//     name: "John Doe",
//     email: "john@example.com",
//     age: 30,
//   });
//   console.log("Valid user:", validUser);

//   const invalidUser = validateUser({
//     id: "not a number",
//     name: 123,
//     email: "not an email",
//   });
// } catch (error) {
//   // Proper error handling for unknown type
//   if (error instanceof Error) {
//     console.error("Error:", error.message);
//   } else {
//     console.error("An unknown error occurred:", error);
//   }
// }

// Async Validation
/**
 * Zod also supports async validation for more complex scenarios.
 * This exampel demonstrates async validation with proper error handling.
 */
const asyncEmailSchema = z
  .string()
  .email()
  .refine(async (email) => {
    // Simulate checking email uniqueness in a database
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return email !== "taken@example.com";
  }, "Email is already taken");

async function validateEmail(email: string) {
  try {
    await asyncEmailSchema.parseAsync(email);
    console.log("Email is valid and unique");
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Email validation failed:", error.issues);
    } else if (error instanceof Error) {
      console.error("An unexpected error occurred:", error.message);
    } else {
      console.error("An unknown error occurred:", error);
    }
  }
}

// Usage of async validation
async function runEmailValidations() {
  await validateEmail("new@example.com");
  await validateEmail("taken@example.com");
  await validateEmail("notanemail");
}

runEmailValidations().catch((error) => {
  console.error("Error in runEmailValidations:", error);
});

// Partial Schemas
/**
 * Zod allows creating partial schemas, useful for update operations.
 */
const partialUserSchema = userSchema.partial();
type PartialUser = z.infer<typeof partialUserSchema>;

// Usage fo Partial Schema
const partialUserData: PartialUser = {
  id: 1,
  name: "John Doe",
};
console.log("Partial User Data:", partialUserSchema.parse(partialUserData));

// Merging Schemas
/**
 * Schemas can be merged to create new schemas.
 */
const basePersonSchema = z.object({
  name: z.string(),
  age: z.number(),
});

const employeeSchema = basePersonSchema.extend({
  role: z.string(),
  salary: z.number(),
});

// Recursive Schemas
/**
 * Zod supports recursive schemas for nested structures.
 */
interface CategoryNode {
  name: string;
  subcategories?: CategoryNode[];
}

// I'm going to define something that refers to itself, so wait a moment before fully processing it.
const categorySchema: z.ZodType<CategoryNode> = z.lazy(() =>
  z.object({
    name: z.string(),
    subcategories: z.array(categorySchema).optional(),
  })
);

// Usage
const category: CategoryNode = {
  name: "Root",
  subcategories: [
    { name: "Subcategory 1" },
    { name: "Subcategory 2", subcategories: [{ name: "Sub-subcategory" }] },
  ],
};

console.log("Valid category:", categorySchema.parse(category));
