'use client';

import { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  pointerWithin,
  DragOverlay,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Task, TaskStatus } from '@/lib/types';
import KanbanColumn from './KanbanColumn';
import TaskCard from './TaskCard';
import AddTaskModal from './AddTaskModal';

interface KanbanBoardProps {
  tasks: Task[];
  onTasksChange: (tasks: Task[]) => void;
}

const columns: { id: TaskStatus; title: string }[] = [
  { id: 'todo', title: 'Todo' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'complete', title: 'Complete' },
];

export default function KanbanBoard({ tasks, onTasksChange }: KanbanBoardProps) {
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState<TaskStatus>('todo');

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const getTasksByStatus = (status: TaskStatus) =>
    tasks.filter((task) => task.status === status);

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((t) => t.id === event.active.id);
    if (task) setActiveTask(task);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeTask = tasks.find((t) => t.id === active.id);
    if (!activeTask) return;

    const overId = over.id as string;
    const overTask = tasks.find((t) => t.id === overId);

    if (columns.some((col) => col.id === overId) || overTask) {
      const newStatus = overTask ? overTask.status : (overId as TaskStatus);

      if (activeTask.status !== newStatus) {
        const updatedTasks = tasks.map((t) =>
          t.id === activeTask.id ? { ...t, status: newStatus } : t
        );
        onTasksChange(updatedTasks);
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeTask = tasks.find((t) => t.id === activeId);
    const overTask = tasks.find((t) => t.id === overId);

    if (!activeTask) return;

    if (overTask && activeTask.status === overTask.status) {
      const columnTasks = getTasksByStatus(activeTask.status);
      const activeIndex = columnTasks.findIndex((t) => t.id === activeId);
      const overIndex = columnTasks.findIndex((t) => t.id === overId);

      if (activeIndex !== overIndex) {
        const reorderedColumn = arrayMove(columnTasks, activeIndex, overIndex);
        const otherTasks = tasks.filter((t) => t.status !== activeTask.status);
        onTasksChange([...otherTasks, ...reorderedColumn]);
      }
    }
  };

  const handleAddTask = (status: TaskStatus) => {
    setModalStatus(status);
    setModalOpen(true);
  };

  const handleCreateTask = (title: string, description: string, status: TaskStatus) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description: description || undefined,
      status,
      createdAt: Date.now(),
    };
    onTasksChange([...tasks, newTask]);
  };

  const handleDeleteTask = (id: string) => {
    onTasksChange(tasks.filter((t) => t.id !== id));
  };

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={pointerWithin}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="h-full grid grid-cols-3 divide-x divide-border">
          {columns.map((column, index) => (
            <div
              key={column.id}
              className="h-full"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <KanbanColumn
                id={column.id}
                title={column.title}
                tasks={getTasksByStatus(column.id)}
                onAddTask={handleAddTask}
                onDeleteTask={handleDeleteTask}
              />
            </div>
          ))}
        </div>

        <DragOverlay dropAnimation={{
          duration: 200,
          easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
        }}>
          {activeTask && (
            <div className="scale-105 opacity-95">
              <div className="ring-2 ring-cyan/40 rounded-lg shadow-xl shadow-cyan/20">
                <TaskCard task={activeTask} onDelete={() => {}} />
              </div>
            </div>
          )}
        </DragOverlay>
      </DndContext>

      <AddTaskModal
        isOpen={modalOpen}
        status={modalStatus}
        onClose={() => setModalOpen(false)}
        onAdd={handleCreateTask}
      />
    </>
  );
}
