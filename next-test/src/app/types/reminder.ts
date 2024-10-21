export interface Reminder {
  id: string;
  title: string;
  description: string;
  dueDate: string;
}

export interface NewReminder {
  title: string;
  description: string;
  dueDate: string;
}
