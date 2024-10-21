/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import ReminderForm from "./ReminderForm";
import ReminderList from "./ReminderList";
import { Reminder } from "@/app/types/reminder";

export default function RemindersPage() {
  const [key, setKey] = useState(0);

  const handleAddReminder = (reminder: Reminder) => {
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="container mx-auto px-4 py-8 font-mono">
      <h1 className="text-5xl font-bold mb-8">SLA Con Reminder App</h1>
      <ReminderForm onAddReminder={handleAddReminder} />
      <ReminderList key={key} />
    </div>
  );
}
