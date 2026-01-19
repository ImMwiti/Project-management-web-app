'use client';

import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus, Circle, Zap, CheckCircle2 } from 'lucide-react';
import { Task, TaskStatus } from '@/lib/types';
import TaskCard from './TaskCard';

interface KanbanColumnProps {
  id: TaskStatus;
  title: string;
  tasks: Task[];
  onAddTask: (status: TaskStatus) => void;
  onDeleteTask: (id: string) => void;
}

const columnConfig: Record<TaskStatus, {
  icon: typeof Circle;
  label: string;
  sublabel: string;
  accentColor: string;
  accentBg: string;
  borderColor: string;
}> = {
  'todo': {
    icon: Circle,
    label: 'BACKLOG',
    sublabel: 'Queued tasks',
    accentColor: 'text-text-secondary',
    accentBg: 'bg-text-secondary/10',
    borderColor: 'border-text-secondary/20',
  },
  'in-progress': {
    icon: Zap,
    label: 'IN PROGRESS',
    sublabel: 'Currently active',
    accentColor: 'text-amber',
    accentBg: 'bg-amber/10',
    borderColor: 'border-amber/30',
  },
  'complete': {
    icon: CheckCircle2,
    label: 'COMPLETED',
    sublabel: 'Finished work',
    accentColor: 'text-green',
    accentBg: 'bg-green/10',
    borderColor: 'border-green/30',
  },
};

export default function KanbanColumn({
  id,
  title,
  tasks,
  onAddTask,
  onDeleteTask,
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id });
  const config = columnConfig[id];
  const Icon = config.icon;

  return (
    <div className="flex flex-col h-full">
      {/* Column Header */}
      <div className={`flex-shrink-0 p-5 border-b ${config.borderColor}`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg ${config.accentBg} flex items-center justify-center`}>
              <Icon size={16} className={config.accentColor} />
            </div>
            <div>
              <h3 className={`text-xs font-bold tracking-wider ${config.accentColor}`}>
                {config.label}
              </h3>
              <p className="text-[10px] text-text-muted mt-0.5">
                {config.sublabel}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-mono ${config.accentColor} ${config.accentBg} px-2 py-0.5 rounded`}>
              {tasks.length}
            </span>
            <button
              onClick={() => onAddTask(id)}
              className={`
                p-1.5 rounded-lg border border-border
                hover:border-cyan hover:bg-cyan/10 hover:text-cyan
                text-text-muted transition-all
              `}
            >
              <Plus size={14} />
            </button>
          </div>
        </div>

        {/* Progress bar for in-progress */}
        {id === 'in-progress' && tasks.length > 0 && (
          <div className="h-1 bg-surface rounded-full overflow-hidden">
            <div className="h-full w-2/3 bg-gradient-to-r from-amber to-amber/50 rounded-full" />
          </div>
        )}
      </div>

      {/* Drop Zone */}
      <div
        ref={setNodeRef}
        className={`
          flex-1 p-4 overflow-y-auto min-h-0 transition-all duration-200
          ${isOver ? 'bg-cyan/5 ring-2 ring-inset ring-cyan/20 rounded-b-lg' : ''}
        `}
      >
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task, index) => (
            <div
              key={task.id}
              style={{ animationDelay: `${index * 40}ms` }}
              className="animate-fade-in-up"
            >
              <TaskCard task={task} onDelete={onDeleteTask} />
            </div>
          ))}
        </SortableContext>

        {/* Empty State */}
        {tasks.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center py-12">
            <div className={`w-14 h-14 rounded-xl border-2 border-dashed ${config.borderColor} flex items-center justify-center mb-4`}>
              <Icon size={22} className="text-text-muted" />
            </div>
            <p className="text-xs text-text-muted text-center mb-1">
              No tasks here
            </p>
            <button
              onClick={() => onAddTask(id)}
              className={`mt-2 text-xs ${config.accentColor} hover:underline`}
            >
              + Add a task
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
