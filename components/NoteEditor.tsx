'use client';

import { useEffect, useRef } from 'react';
import { FileText, Clock, PenLine } from 'lucide-react';
import { Note } from '@/lib/types';

interface NoteEditorProps {
  note: Note | null;
  onUpdate: (id: string, content: string) => void;
}

export default function NoteEditor({ note, onUpdate }: NoteEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (note && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [note?.id]);

  if (!note) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="w-12 h-12 rounded-full bg-surface-elevated border border-border flex items-center justify-center mb-4">
          <FileText size={20} className="text-text-muted" />
        </div>
        <p className="text-sm text-text-secondary text-center mb-1">
          No note selected
        </p>
        <p className="text-xs text-text-muted text-center">
          Select or create a note to start writing
        </p>
      </div>
    );
  }

  const formatDateTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  const wordCount = note.content.trim() ? note.content.trim().split(/\s+/).length : 0;
  const charCount = note.content.length;

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Editor Header */}
      <div className="flex-shrink-0 px-4 py-2.5 border-b border-border/50 flex items-center justify-between bg-surface/30">
        <div className="flex items-center gap-2 text-[10px] text-text-muted">
          <PenLine size={10} className="text-amber" />
          <span className="text-text-secondary">{note.title}</span>
        </div>
        <div className="flex items-center gap-4 text-[10px] text-text-muted">
          <div className="flex items-center gap-1.5">
            <Clock size={10} />
            <span>{formatDateTime(note.updatedAt)}</span>
          </div>
          <div className="flex items-center gap-2 font-mono">
            <span>{wordCount}w</span>
            <span className="text-border">/</span>
            <span>{charCount}c</span>
          </div>
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 min-h-0 bg-void/20">
        <textarea
          ref={textareaRef}
          value={note.content}
          onChange={(e) => onUpdate(note.id, e.target.value)}
          placeholder="Start writing your note..."
          spellCheck={false}
          className="
            w-full h-full bg-transparent text-text-primary
            placeholder:text-text-muted/30 font-mono text-sm
            px-4 py-4 resize-none focus:outline-none
            leading-relaxed
          "
        />
      </div>
    </div>
  );
}
