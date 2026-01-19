'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, X } from 'lucide-react';
import { Task } from '@/lib/types';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
}

export default function TaskCard({ task, onDelete }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const statusAccent = {
    'todo': 'border-l-text-muted',
    'in-progress': 'border-l-amber',
    'complete': 'border-l-green',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        group relative bg-surface-elevated border border-border rounded-lg
        border-l-[3px] ${statusAccent[task.status]}
        mb-2.5 transition-all duration-200 ease-out
        hover:bg-surface-hover hover:border-border-glow hover:shadow-lg hover:shadow-void/50
        ${isDragging ? 'opacity-40 scale-[1.02] shadow-2xl shadow-cyan/20' : ''}
      `}
    >
      <div className="p-3.5">
        <div className="flex items-start gap-2.5">
          {/* Drag Handle */}
          <button
            {...attributes}
            {...listeners}
            className="mt-0.5 p-0.5 rounded text-text-muted hover:text-cyan hover:bg-cyan/10 cursor-grab active:cursor-grabbing transition-colors"
          >
            <GripVertical size={14} />
          </button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-text-primary leading-snug group-hover:text-cyan transition-colors">
              {task.title}
            </h4>
            {task.description && (
              <p className="text-xs text-text-secondary mt-1.5 leading-relaxed line-clamp-2">
                {task.description}
              </p>
            )}

            {/* Meta info */}
            <div className="mt-2.5 flex items-center gap-3 text-[10px] text-text-muted">
              <span className="font-mono opacity-60">
                #{task.id.slice(0, 6)}
              </span>
              <span>
                {new Date(task.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>

          {/* Delete Button */}
          <button
            onClick={() => onDelete(task.id)}
            className="opacity-0 group-hover:opacity-100 p-1.5 rounded text-text-muted hover:text-red hover:bg-red/10 transition-all"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
