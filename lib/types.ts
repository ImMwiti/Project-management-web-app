export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'complete';
  createdAt: number;
}

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: number;
}

export interface AppState {
  tasks: Task[];
  todos: TodoItem[];
  notes: Note[];
  activeNoteId: string | null;
}

export type TaskStatus = Task['status'];
