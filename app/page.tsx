'use client';

import { useEffect, useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Task, TodoItem, Note } from '@/lib/types';
import KanbanBoard from '@/components/KanbanBoard';
import TodoList from '@/components/TodoList';
import NotesPanel from '@/components/NotesPanel';
import { Layers, Activity, Clock } from 'lucide-react';

export default function Home() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('pm-tasks', []);
  const [todos, setTodos] = useLocalStorage<TodoItem[]>('pm-todos', []);
  const [notes, setNotes] = useLocalStorage<Note[]>('pm-notes', []);
  const [activeNoteId, setActiveNoteId] = useLocalStorage<string | null>('pm-active-note', null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  const dateString = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  const activeCount = tasks.filter(t => t.status === 'in-progress').length;
  const completedCount = tasks.filter(t => t.status === 'complete').length;

  return (
    <main className="h-screen flex flex-col bg-void">
      {/* Header */}
      <header className="flex-shrink-0 border-b border-border bg-surface/60 backdrop-blur-md">
        <div className="px-6 py-5">
          <div className="flex items-center justify-between">
            {/* Logo & Title */}
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan/20 to-cyan/5 border border-cyan/30 flex items-center justify-center">
                <Layers className="w-5 h-5 text-cyan" />
              </div>
              <div>
                <h1 className="font-display text-lg font-semibold text-text-primary tracking-tight">
                  Project Hub
                </h1>
                <p className="text-xs text-text-muted mt-0.5">
                  {dateString}
                </p>
              </div>
            </div>

            {/* Stats & Time */}
            <div className="flex items-center gap-8">
              {/* Quick Stats */}
              <div className="hidden md:flex items-center gap-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-cyan" />
                  <span className="text-xs text-text-secondary">
                    <span className="text-cyan font-semibold">{tasks.length}</span> Total
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-amber" />
                  <span className="text-xs text-text-secondary">
                    <span className="text-amber font-semibold">{activeCount}</span> Active
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-green" />
                  <span className="text-xs text-text-secondary">
                    <span className="text-green font-semibold">{completedCount}</span> Done
                  </span>
                </div>
              </div>

              {/* Time */}
              <div className="flex items-center gap-3 pl-6 border-l border-border">
                <Clock className="w-4 h-4 text-text-muted" />
                <span className="text-base font-mono font-medium text-text-primary tracking-wider">
                  {timeString}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-[280px_1fr_320px] min-h-0">
        {/* Left Sidebar - Todo List */}
        <aside className="border-r border-border bg-surface/40 overflow-hidden">
          <TodoList todos={todos} onTodosChange={setTodos} />
        </aside>

        {/* Center - Kanban Board */}
        <section className="overflow-hidden">
          <KanbanBoard tasks={tasks} onTasksChange={setTasks} />
        </section>

        {/* Right Sidebar - Notes */}
        <aside className="border-l border-border bg-surface/40 overflow-hidden">
          <NotesPanel
            notes={notes}
            activeNoteId={activeNoteId}
            onNotesChange={setNotes}
            onActiveNoteChange={setActiveNoteId}
          />
        </aside>
      </div>

      {/* Footer */}
      <footer className="flex-shrink-0 h-7 bg-surface/80 border-t border-border flex items-center justify-between px-5 text-[10px] font-mono text-text-muted">
        <div className="flex items-center gap-2">
          <Activity size={10} className="text-green" />
          <span>All systems operational</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Local Storage</span>
          <span className="text-border">|</span>
          <span>Auto-save enabled</span>
        </div>
      </footer>
    </main>
  );
}
