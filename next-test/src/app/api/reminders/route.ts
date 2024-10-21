import { NextRequest, NextResponse } from "next/server";
import { Reminder, NewReminder } from "@/app/types/reminder";

// In-memory storage for reminders (replace with a database in a real application)
const reminders: Reminder[] = [];

/**
 * Retrieves all reminders.
 *
 * @returns {Promise<NextResponse<Reminder[]>>} A response containing an array of all reminders.
 */
export async function GET(): Promise<NextResponse<Reminder[]>> {
  return NextResponse.json(reminders);
}

/**
 * Creates a new reminder.
 *
 * @param {NextRequest} request - The incoming request object containing the new reminder data.
 * @returns {Promise<NextResponse<Reminder | { message: string }>>} The created reminder object if successful, or an error message.
 */
export async function POST(
  request: NextRequest
): Promise<NextResponse<Reminder | { message: string }>> {
  const body: NewReminder = await request.json();
  const { title, description, dueDate } = body;

  if (!title || !description || !dueDate) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  const newReminder: Reminder = {
    id: Date.now().toString(),
    title,
    description,
    dueDate,
  };

  reminders.push(newReminder);
  return NextResponse.json(newReminder, { status: 201 });
}
