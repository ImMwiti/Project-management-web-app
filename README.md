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

Open [http://localhost:3001](http://localhost:3001) in your browser.

## Usage

### Kanban Board
- Click **"+ Add Task"** in any column to create a new task
- **Drag and drop** tasks between columns (Backlog → In Progress → Completed)
- Click the **trash icon** on a task card to delete it
- Tasks automatically save to local storage

### Todo List
- Type in the input field and press **Enter** or click **"+"** to add a new item
- Click the **checkbox** to mark items as complete
- Click the **trash icon** to delete an item
- Great for quick tasks that don't need full Kanban tracking

### Notes
- Click **"+ New Note"** to create a note
- Click on a note in the list to open it in the editor
- **Double-click** a note title to rename it
- Click the **X** button to delete a note
- Notes auto-save as you type

## Available Scripts

Run these commands from the project root:

```bash
# Start development server with hot reload
npm run dev

# Create optimized production build
npm run build

# Run the production server (requires build first)
npm run start

# Run ESLint to check code quality
npm run lint
```

## Production Deployment

### Building for Production

```bash
# Create production build
npm run build

# Start production server
npm run start
```

### Environment Considerations

- The app uses **local storage** for data persistence, so no database setup is required
- Default port is **3001**; set the `PORT` environment variable to change it
- For deployment platforms (Vercel, Netlify, etc.), use:
  - **Build command**: `npm run build`
  - **Start command**: `npm run start`
- Next.js automatically optimizes for production with static generation where possible

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
