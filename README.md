# Project Management Web App

A sleek, dark-themed project management application built for developers and vibe coders. Features a Kanban board, todo list, and note-taking capabilities with local storage persistence.

## Features

- **Kanban Board** - Drag-and-drop task management with three columns:
  - Backlog (Todo)
  - In Progress
  - Completed

- **Todo List** - Quick checkbox-style task tracking in the sidebar

- **Notes Panel** - Multi-note support with:
  - Create, rename, and delete notes
  - Auto-save functionality
  - Clean, distraction-free editor

- **Local Storage** - All data persists in your browser

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Styling**: Tailwind CSS v4
- **Drag & Drop**: @dnd-kit/core, @dnd-kit/sortable
- **Icons**: Lucide React
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/ImMwiti/Project-management-web-app.git

# Navigate to the project
cd Project-management-web-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── layout.tsx        # Root layout with dark theme
│   ├── page.tsx          # Main app page
│   └── globals.css       # Global styles + Tailwind theme
├── components/
│   ├── KanbanBoard.tsx   # Main kanban container with DnD context
│   ├── KanbanColumn.tsx  # Individual column with drop zone
│   ├── TaskCard.tsx      # Draggable task card
│   ├── TodoList.tsx      # Sidebar todo list
│   ├── NotesPanel.tsx    # Notes panel container
│   ├── NotesList.tsx     # List of notes
│   ├── NoteEditor.tsx    # Note textarea editor
│   └── AddTaskModal.tsx  # Modal for creating tasks
├── hooks/
│   └── useLocalStorage.ts # Custom hook for persistence
└── lib/
    └── types.ts          # TypeScript interfaces
```

## Design

The app features a neo-terminal aesthetic with:
- Dark void background (#08080c)
- Cyan, amber, and green accent colors
- JetBrains Mono + Outfit fonts
- Subtle scan lines and vignette effects
- Smooth animations and transitions

## License

MIT
