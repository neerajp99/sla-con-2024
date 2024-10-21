import React, { useState } from "react";
import { NewReminder, Reminder } from "@/app/types/reminder";

interface ReminderFormProps {
  onAddReminder: (reminder: Reminder) => void;
}

export default function ReminderForm({ onAddReminder }: ReminderFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newReminder: NewReminder = { title, description, dueDate };

    try {
      const response = await fetch("/api/reminders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReminder),
      });

      if (response.ok) {
        const data: Reminder = await response.json();
        onAddReminder(data);
        setTitle("");
        setDescription("");
        setDueDate("");
      } else {
        console.error("Failed to add reminder");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-200"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 block w-full border-gray-300 border-b-2 focus:border-blue-500 focus:ring-0 bg-gray-50 text-gray-800 px-2 py-3 text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-200"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="mt-1 block w-full border-gray-300 border-b-2 focus:border-blue-500 focus:ring-0 bg-gray-50 text-gray-800 px-2 py-3 text-sm"
        ></textarea>
      </div>
      <div>
        <label
          htmlFor="dueDate"
          className="block text-sm font-medium text-gray-200"
        >
          Due Date
        </label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
          className="mt-1 block w-full border-gray-300 border-b-2 focus:border-blue-500 focus:ring-0 bg-gray-50 text-gray-800 px-2 py-3 text-sm"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Add Reminder
      </button>
    </form>
  );
}
