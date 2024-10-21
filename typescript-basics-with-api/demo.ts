/**
 * Comprehensive TypeScript Example
 */

// Basic Types
/**
 * Demonstrates the use of basic TypeScript types.
 * TypeScript supports several basic types including boolean, number, string,
 * array, tuple, enum, any, void, null, undefined, and never.
 */
let isDone: boolean = false;
let decimal: number = 6;
let color: string = "blue";

let list: number[] = [1, 2, 3];
// list.push("String"); // Error: Argument of type 'string' is not assignable to parameter of type 'number'

let tuple: [string, number] = ["hello", 10];
// tuple = [10, "hello"]; // Error: Type 'number' is not assignable to type 'string'

// Enum
/**
 * Enums allow us to define a set of named constants.
 * TypeScript provides both numeric and string-based enums.
 */
enum Color {
  Red,
  Green,
  Blue,
}

let c: Color = Color.Green;
console.log("Color output", c); //?? Output

// Any
/**
 * The 'any' type is used when we don't know the type of a value, typically
 * when working with dynamic content or gradual typing from JavaScript.
 */
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean

// Void
/**
 * 'void' is used as the return type for functions that do not return a value.
 */
function warnUser(): void {
  console.log("This is my warning message");
}

// Interfaces
/**
 * Interfaces define contracts in your code and provide explicit names for type checking.
 * They can describe object shapes, function types, and even classes.
 */
interface LabeledValue {
  label: string;
  optional?: string; // Optional property
  readonly id: number; // Read-only property
}

function printLabel(labeledObj: LabeledValue) {
  console.log(labeledObj.label);
  // labeledObj.id = 42; // Error: Cannot assign to 'id' because it is a read-only property
}

let myObj = { label: "Size 10 Object", id: 1 };
printLabel(myObj);

// Classes
/**
 * TypeScript offers full support for class-based object-oriented programming.
 * Classes can include properties, methods, constructors, and access modifiers.
 */
class Animal {
  private name: string;

  constructor(theName: string) {
    this.name = theName;
  }

  public move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

class Dog extends Animal {
  bark() {
    console.log("Woof! Woof!");
  }
}

const dog = new Dog("Buddy");
dog.bark();
dog.move(10);

// Generics
/**
 * Generics allow you to create reusable components that can work over a variety of types.
 * They provide a way to make components work with any data type and not restrict to one data type.
 */
function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>("myString");
let output2 = identity(42); // Type inference allows type argument to be omitted
console.log("OUTPUT:", output2);

// Union Types
/**
 * Union types allow you to specify that a value can be one of several types.
 */
// id: '1'
function padLeft(value: string, padding: string | number) {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}
// Call the padLeft function
console.log(padLeft("Hello, world", 4)); // Returns "    Hello, world"

// Type Aliases
/**
 * Type aliases create a new name for a type. They can be used to name primitive types,
 * union types, tuples, and any other types that you'd otherwise have to write by hand.
 */
// type ObjectType = {
//   name: string;
//   age: number;
// }
type StringOrNumber = string | number;
let snValue: StringOrNumber = "hello";
snValue = 42; // This is also valid
// snValue = { name: "hello" }; // Error: Object literal may only specify known properties

// Literal Types
/**
 * Literal types allow you to specify exact values that a string, number, or boolean must have.
 */
type Easing = "ease-in" | "ease-out" | "ease-in-out";
let easing: Easing = "ease-in";

// Intersection Types
/**
 * Intersection types combine multiple types into one, allowing you to add together existing types to get a single type that has all the features you need.
 */
interface ErrorHandling {
  success: boolean;
  error?: { message: string };
}

interface ArtworksData {
  artworks: { title: string }[];
}

type ArtworksResponse = ArtworksData & ErrorHandling;

// Example using the intersection type
const handleArtworksResponse = (response: ArtworksResponse) => {
  if (response.success) {
    response.artworks.forEach((artwork) => {
      console.log(artwork.title);
    });
  } else {
    console.error(response.error?.message);
  }
};
handleArtworksResponse({
  success: true,
  artworks: [{ title: "The Great Wave" }],
  error: { message: "Error fetching artworks" },
});

// Function Overloads
/**
 * Function overloads allow you to specify multiple function signatures for the same function.
 */

function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    console.log("Creating date from", mOrTimestamp, d, y);
    return new Date(y, mOrTimestamp, d);
  } else {
    console.log("Creating date from timestamp", mOrTimestamp);
    return new Date(mOrTimestamp);
  }
}

makeDate(12345678);

// Asynchronous Programming with Promises
/**
 * TypeScript has built-in support for Promises, making asynchronous programming easier and type-safe.
 */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function asyncExample() {
  console.log("Start");
  await delay(1000);
  console.log("End after 1 second");
}

asyncExample();

// Create a simple Promise that resolves after a given time
function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

// Usage
wait(1000).then(() => console.log("1 second passed"));

// Create a Promise that don't resolve and give an error after a given time
function timeout(timeout: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject("Timeout"), timeout);
  });
}

// Usage
timeout(1000).catch((err) => console.log(err));

// Decorators
/**
 * Decorators provide a way to add both annotations and a meta-programming syntax for class declarations and members.
 * To enable experimental support for decorators, you must enable the experimentalDecorators compiler option.
 */
function sealed(constructor: Function) {
  // Object.seal() prevents new properties from being added to an object and marks all existing properties as non-configurable
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class Greeter {
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return "Hello, " + this.greeting;
  }
}

// Usage of the Greeter class
const greeter = new Greeter("world");
console.log(greeter.greet());
// greeter.newProperty = "new property";

// Modules
/**
 * TypeScript uses modules to organize code. Modules are executed within their own scope, not in the global scope.
 * This example shows how to export and import modules.
 */
export interface StringValidator {
  isAcceptable(s: string): boolean;
}

export const numberRegexp = /^[0-9]+$/;

export class ZipCodeValidator implements StringValidator {
  isAcceptable(s: string) {
    return s.length === 5 && numberRegexp.test(s);
  }
}

// Usage (in another file):
// import { StringValidator, ZipCodeValidator } from "./StringValidator";
