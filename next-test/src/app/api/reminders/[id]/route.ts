import { NextRequest, NextResponse } from "next/server";
import { Reminder, NewReminder } from "@/app/types/reminder";

// In-memory storage for reminders (replace with a database in a real application)
const reminders: Reminder[] = [];

/**
 * Retrieves a specific reminder by ID.
 *
 * @param {NextRequest} request - The incoming request object.
 * @param {Object} params - The route parameters.
 * @param {string} params.id - The ID of the reminder to retrieve.
 * @returns {Promise<NextResponse<Reminder | { message: string }>>} The reminder object if found, or an error message.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<Reminder | { message: string }>> {
  const reminder = reminders.find((r) => r.id === params.id);
  if (reminder) {
    return NextResponse.json(reminder);
  } else {
    return NextResponse.json(
      { message: "Reminder not found" },
      { status: 404 }
    );
  }
}

/**
 * Updates a specific reminder by ID.
 *
 * @param {NextRequest} request - The incoming request object containing the updated reminder data.
 * @param {Object} params - The route parameters.
 * @param {string} params.id - The ID of the reminder to update.
 * @returns {Promise<NextResponse<Reminder | { message: string }>>} The updated reminder object if successful, or an error message.
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<Reminder | { message: string }>> {
  const body: NewReminder = await request.json();
  const { title, description, dueDate } = body;
  const index = reminders.findIndex((r) => r.id === params.id);

  if (index === -1) {
    return NextResponse.json(
      { message: "Reminder not found" },
      { status: 404 }
    );
  }

  if (!title || !description || !dueDate) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  reminders[index] = { ...reminders[index], title, description, dueDate };
  return NextResponse.json(reminders[index]);
}

/**
 * Deletes a specific reminder by ID.
 *
 * @param {NextRequest} request - The incoming request object.
 * @param {Object} params - The route parameters.
 * @param {string} params.id - The ID of the reminder to delete.
 * @returns {Promise<NextResponse<null | { message: string }>>} A success response if deleted, or an error message.
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<null | { message: string }>> {
  const index = reminders.findIndex((r) => r.id === params.id);

  if (index === -1) {
    return NextResponse.json(
      { message: "Reminder not found" },
      { status: 404 }
    );
  }

  reminders.splice(index, 1);
  return new NextResponse(null, { status: 204 });
}
