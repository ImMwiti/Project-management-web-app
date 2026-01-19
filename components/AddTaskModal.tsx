'use client';

import { useState, useEffect } from 'react';
import { X, Plus, Circle, Zap, CheckCircle2 } from 'lucide-react';
import { TaskStatus } from '@/lib/types';

interface AddTaskModalProps {
  isOpen: boolean;
  status: TaskStatus;
  onClose: () => void;
  onAdd: (title: string, description: string, status: TaskStatus) => void;
}

const statusConfig: Record<TaskStatus, {
  label: string;
  icon: typeof Circle;
  color: string;
  bg: string;
}> = {
  'todo': {
    label: 'Backlog',
    icon: Circle,
    color: 'text-text-secondary',
    bg: 'bg-text-secondary/10',
  },
  'in-progress': {
    label: 'In Progress',
    icon: Zap,
    color: 'text-amber',
    bg: 'bg-amber/10',
  },
  'complete': {
    label: 'Completed',
    icon: CheckCircle2,
    color: 'text-green',
    bg: 'bg-green/10',
  },
};

export default function AddTaskModal({ isOpen, status, onClose, onAdd }: AddTaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const config = statusConfig[status];
  const Icon = config.icon;

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timeout = setTimeout(() => setIsVisible(false), 200);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!isVisible && !isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim(), description.trim(), status);
      setTitle('');
      setDescription('');
      onClose();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center p-4
        transition-all duration-200
        ${isOpen ? 'bg-void/70 backdrop-blur-sm' : 'bg-transparent pointer-events-none'}
      `}
      onClick={handleBackdropClick}
    >
      <div
        className={`
          w-full max-w-md bg-surface border border-border rounded-xl shadow-2xl shadow-void/50
          transition-all duration-200 transform
          ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-cyan/10 border border-cyan/20 flex items-center justify-center">
              <Plus size={16} className="text-cyan" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-text-primary">
                Create Task
              </h2>
              <div className="flex items-center gap-2 mt-0.5">
                <Icon size={10} className={config.color} />
                <span className={`text-[10px] ${config.color}`}>
                  Adding to {config.label}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-hover transition-all"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs text-text-secondary mb-2">
              Task title <span className="text-red">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              className="w-full bg-void border border-border rounded-lg px-4 py-3 text-sm text-text-primary placeholder:text-text-muted/50"
              autoFocus
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs text-text-secondary mb-2">
              Description <span className="text-text-muted">(optional)</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add more details..."
              rows={3}
              className="w-full bg-void border border-border rounded-lg px-4 py-3 text-sm text-text-primary placeholder:text-text-muted/50 resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className="px-5 py-2 text-sm bg-cyan hover:bg-cyan-dim text-void font-medium rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
