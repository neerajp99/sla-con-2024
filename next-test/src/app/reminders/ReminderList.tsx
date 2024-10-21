import React, { useState, useEffect } from "react";
import { Reminder } from "@/app/types/reminder";

export default function ReminderList() {
  const [reminders, setReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      const response = await fetch("/api/reminders");
      if (response.ok) {
        const data: Reminder[] = await response.json();
        setReminders(data);
      } else {
        console.error("Failed to fetch reminders");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Reminders</h2>
      {reminders.length === 0 ? (
        <p className="text-gray-500">No reminders yet. Add one above!</p>
      ) : (
        <ul className="space-y-4">
          {reminders.map((reminder) => (
            <li
              key={reminder.id}
              className="bg-white shadow overflow-hidden sm:rounded-lg"
            >
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {reminder.title}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  {reminder.description}
                </p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <p className="text-sm font-medium text-gray-500">
                  Due Date: {reminder.dueDate}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
