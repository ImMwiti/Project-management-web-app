'use client';

import { useState } from 'react';
import { Plus, X, Check, ListTodo } from 'lucide-react';
import { TodoItem } from '@/lib/types';

interface TodoListProps {
  todos: TodoItem[];
  onTodosChange: (todos: TodoItem[]) => void;
}

export default function TodoList({ todos, onTodosChange }: TodoListProps) {
  const [newTodoText, setNewTodoText] = useState('');

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoText.trim()) {
      const newTodo: TodoItem = {
        id: crypto.randomUUID(),
        text: newTodoText.trim(),
        completed: false,
      };
      onTodosChange([...todos, newTodo]);
      setNewTodoText('');
    }
  };

  const handleToggle = (id: string) => {
    onTodosChange(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id: string) => {
    onTodosChange(todos.filter((todo) => todo.id !== id));
  };

  const completedCount = todos.filter((t) => t.completed).length;
  const percentage = todos.length > 0 ? Math.round((completedCount / todos.length) * 100) : 0;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 p-5 border-b border-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-cyan/10 border border-cyan/20 flex items-center justify-center">
            <ListTodo size={16} className="text-cyan" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-text-primary">
              Quick Tasks
            </h2>
            <p className="text-[10px] text-text-muted mt-0.5">
              Daily checklist
            </p>
          </div>
        </div>

        {/* Progress */}
        {todos.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-text-secondary">Progress</span>
              <span className="text-cyan font-mono font-medium">{percentage}%</span>
            </div>
            <div className="h-1.5 bg-surface rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan to-cyan/60 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Add Form */}
        <form onSubmit={handleAddTodo} className="flex gap-2">
          <input
            type="text"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            placeholder="Add a task..."
            className="flex-1 bg-void border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted/50"
          />
          <button
            type="submit"
            disabled={!newTodoText.trim()}
            className="p-2 rounded-lg border border-border bg-surface hover:bg-cyan/10 hover:border-cyan text-text-muted hover:text-cyan disabled:opacity-30 transition-all"
          >
            <Plus size={16} />
          </button>
        </form>
      </div>

      {/* Todo List */}
      <div className="flex-1 overflow-y-auto">
        {todos.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center p-6">
            <div className="w-14 h-14 rounded-xl border-2 border-dashed border-border flex items-center justify-center mb-4">
              <ListTodo size={22} className="text-text-muted" />
            </div>
            <p className="text-sm text-text-secondary text-center mb-1">
              No tasks yet
            </p>
            <p className="text-xs text-text-muted text-center">
              Add your first task above
            </p>
          </div>
        ) : (
          <ul className="p-2">
            {todos.map((todo, index) => (
              <li
                key={todo.id}
                className="group animate-fade-in-up"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-hover transition-colors">
                  {/* Checkbox */}
                  <button
                    onClick={() => handleToggle(todo.id)}
                    className={`
                      w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all
                      ${todo.completed
                        ? 'bg-green/20 border-green text-green'
                        : 'border-border hover:border-cyan'
                      }
                    `}
                  >
                    {todo.completed && <Check size={12} strokeWidth={3} />}
                  </button>

                  {/* Text */}
                  <span
                    className={`
                      flex-1 text-sm transition-all
                      ${todo.completed
                        ? 'text-text-muted line-through'
                        : 'text-text-primary'
                      }
                    `}
                  >
                    {todo.text}
                  </span>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded text-text-muted hover:text-red hover:bg-red/10 transition-all"
                  >
                    <X size={14} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer */}
      {todos.length > 0 && (
        <div className="flex-shrink-0 px-5 py-3 border-t border-border flex items-center justify-between text-xs text-text-muted">
          <span>{todos.length} tasks</span>
          <span className="text-green">{completedCount} completed</span>
        </div>
      )}
    </div>
  );
}
