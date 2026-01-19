'use client';

import { useState } from 'react';
import { Plus, X, FileText, Check, Edit3 } from 'lucide-react';
import { Note } from '@/lib/types';

interface NotesListProps {
  notes: Note[];
  activeNoteId: string | null;
  onSelectNote: (id: string) => void;
  onAddNote: () => void;
  onDeleteNote: (id: string) => void;
  onRenameNote: (id: string, title: string) => void;
}

export default function NotesList({
  notes,
  activeNoteId,
  onSelectNote,
  onAddNote,
  onDeleteNote,
  onRenameNote,
}: NotesListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const startEditing = (note: Note) => {
    setEditingId(note.id);
    setEditTitle(note.title);
  };

  const saveTitle = () => {
    if (editingId && editTitle.trim()) {
      onRenameNote(editingId, editTitle.trim());
    }
    setEditingId(null);
    setEditTitle('');
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditTitle('');
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="flex-shrink-0 border-b border-border">
      {/* Subheader */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-border/50 bg-surface/20">
        <span className="text-xs text-text-muted">Recent notes</span>
        <button
          onClick={onAddNote}
          className="p-1 rounded text-text-muted hover:text-amber hover:bg-amber/10 transition-all"
        >
          <Plus size={14} />
        </button>
      </div>

      {/* List */}
      <div className="max-h-40 overflow-y-auto">
        {notes.length === 0 ? (
          <div className="p-5 text-center">
            <p className="text-xs text-text-muted mb-2">No notes yet</p>
            <button
              onClick={onAddNote}
              className="text-xs text-amber hover:underline"
            >
              + Create your first note
            </button>
          </div>
        ) : (
          <ul>
            {notes.map((note) => (
              <li
                key={note.id}
                className={`
                  group border-b border-border/30 last:border-b-0
                  ${activeNoteId === note.id ? 'bg-amber/5' : 'hover:bg-surface-hover'}
                `}
              >
                <div
                  className="flex items-center gap-3 px-5 py-2.5 cursor-pointer"
                  onClick={() => {
                    if (editingId !== note.id) {
                      onSelectNote(note.id);
                    }
                  }}
                >
                  {/* Icon */}
                  <FileText
                    size={14}
                    className={activeNoteId === note.id ? 'text-amber' : 'text-text-muted'}
                  />

                  {editingId === note.id ? (
                    <div className="flex-1 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') saveTitle();
                          if (e.key === 'Escape') cancelEditing();
                        }}
                        className="flex-1 bg-void border border-amber/30 rounded px-2 py-1 text-xs text-text-primary"
                        autoFocus
                      />
                      <button
                        onClick={saveTitle}
                        className="p-1 rounded text-green hover:bg-green/10"
                      >
                        <Check size={12} />
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="p-1 rounded text-text-muted hover:text-text-primary"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <span
                        className={`
                          flex-1 text-sm truncate
                          ${activeNoteId === note.id ? 'text-amber' : 'text-text-primary'}
                        `}
                      >
                        {note.title}
                      </span>
                      <span className="text-[10px] text-text-muted font-mono">
                        {formatDate(note.updatedAt)}
                      </span>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            startEditing(note);
                          }}
                          className="p-1 rounded text-text-muted hover:text-amber hover:bg-amber/10"
                        >
                          <Edit3 size={12} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteNote(note.id);
                          }}
                          className="p-1 rounded text-text-muted hover:text-red hover:bg-red/10"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
