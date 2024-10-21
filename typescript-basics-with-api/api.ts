import express, { Request, Response } from "express";

// Define an interface for our Todo item
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory storage for our todos
let todos: Todo[] = [];

// GET /todos - Retrieve all todos
app.get("/todos", (req: Request, res: Response) => {
  res.json(todos);
});

// POST /todos - Create a new todo
app.post("/todos", (req: Request, res: Response) => {
  const newTodo: Todo = {
    id: todos.length + 1,
    title: req.body.title,
    completed: false,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT /todos/:id - Update a todo
app.put("/todos/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  console.log("Todos:", todos);

  if (todoIndex > -1) {
    todos[todoIndex] = { ...todos[todoIndex], ...req.body };
    res.json(todos[todoIndex]);
  } else {
    res.status(404).send("Todo not found");
  }
});

// DELETE /todos/:id - Delete a todo
app.delete("/todos/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  todos = todos.filter((todo) => todo.id !== id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
