'use client';

import { StickyNote } from 'lucide-react';
import { Note } from '@/lib/types';
import NotesList from './NotesList';
import NoteEditor from './NoteEditor';

interface NotesPanelProps {
  notes: Note[];
  activeNoteId: string | null;
  onNotesChange: (notes: Note[]) => void;
  onActiveNoteChange: (id: string | null) => void;
}

export default function NotesPanel({
  notes,
  activeNoteId,
  onNotesChange,
  onActiveNoteChange,
}: NotesPanelProps) {
  const activeNote = notes.find((n) => n.id === activeNoteId) || null;

  const handleAddNote = () => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: 'Untitled Note',
      content: '',
      updatedAt: Date.now(),
    };
    onNotesChange([newNote, ...notes]);
    onActiveNoteChange(newNote.id);
  };

  const handleDeleteNote = (id: string) => {
    const newNotes = notes.filter((n) => n.id !== id);
    onNotesChange(newNotes);
    if (activeNoteId === id) {
      onActiveNoteChange(newNotes.length > 0 ? newNotes[0].id : null);
    }
  };

  const handleRenameNote = (id: string, title: string) => {
    onNotesChange(
      notes.map((n) =>
        n.id === id ? { ...n, title, updatedAt: Date.now() } : n
      )
    );
  };

  const handleUpdateContent = (id: string, content: string) => {
    onNotesChange(
      notes.map((n) =>
        n.id === id ? { ...n, content, updatedAt: Date.now() } : n
      )
    );
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 p-5 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber/10 border border-amber/20 flex items-center justify-center">
            <StickyNote size={16} className="text-amber" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-text-primary">
              Notes
            </h2>
            <p className="text-[10px] text-text-muted mt-0.5">
              {notes.length} {notes.length === 1 ? 'note' : 'notes'}
            </p>
          </div>
        </div>
      </div>

      {/* Notes List */}
      <NotesList
        notes={notes}
        activeNoteId={activeNoteId}
        onSelectNote={onActiveNoteChange}
        onAddNote={handleAddNote}
        onDeleteNote={handleDeleteNote}
        onRenameNote={handleRenameNote}
      />

      {/* Editor */}
      <NoteEditor note={activeNote} onUpdate={handleUpdateContent} />
    </div>
  );
}
