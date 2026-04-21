# ResumeMaker: Project Analysis

## Directory Structure

```text
/
├── public/                 # Static assets and HTML template
│   ├── favicon.ico
│   ├── index.html          # Main HTML entry
│   └── logo.svg
├── src/
│   ├── assets/             # Global styles, images, and LaTeX templates
│   │   ├── basics.tex      # LaTeX template for resume
│   │   ├── bootstrap.min.css
│   │   ├── styles.css      # Custom global styles
│   │   └── ...
│   ├── components/
│   │   ├── inner/          # Base UI components (Inputs, TextAreas, etc.)
│   │   │   ├── Input.vue
│   │   │   ├── TextArea.vue
│   │   │   └── ...
│   │   ├── pages/          # High-level section editors and Preview page
│   │   │   ├── Education.vue
│   │   │   ├── Experience.vue
│   │   │   ├── Preview.vue      # Central preview and template selector
│   │   │   └── ...
│   │   ├── previews/       # Real-time preview components for each section
│   │   │   ├── Award.vue
│   │   │   ├── Education.vue
│   │   │   └── ...
│   │   └── templates/       # Major resume templates (A4 size)
│   │       ├── Template.vue      # Classic Professional
│   │       ├── Template2.vue     # Modern Minimal
│   │       ├── Template7.vue     # Corporate Elegant
│   │       └── ...
│   ├── App.vue             # Main Application component (State & Navigation)
│   └── main.js             # Project entry point
├── Dockerfile              # Docker configuration
├── docker-compose.yml      # Docker compose for development/deployment
├── nginx.conf              # Nginx configuration for hosting
├── package.json            # Dependencies and scripts
└── README.md
```

## Technical Stack

- **Core Framework**: [Vue.js 2.7](https://vuejs.org/) (Composition API supported)
- **Styling**: Bootstrap 5 (CSS only) & Custom CSS
- **PDF Generation**: Native Browser Print (`window.print()`) with custom HTML/CSS capturing logic.
- **Data Persistence**: `localStorage` (Browser-based)
- **Deployment**: Docker & Nginx
- **Dependencies**:
    - `axios`: For API requests (if any)
    - `jspdf`: For potential PDF generation (though native print is primarily used)
    - `netlify-lualatex`: Potential server-side LaTeX rendering integration

## Component Architecture

### 1. State Management (`App.vue`)
The application uses a **monolithic state pattern**. Almost all resume data is stored in the `data()` function of `App.vue`. This data is passed down to child components via props.
- **Persistence**: Data is saved to `localStorage` on every change/save, ensuring users don't lose progress.
- **Navigation**: Controlled by a `current` section variable that toggles between form editors (Education, Experience, etc.) and the final `Preview`.

### 2. Data Entry (`src/components/pages/`)
Each section of the resume has a dedicated component for data entry. These components use low-level components from `src/components/inner/` to maintain a consistent UI.

### 3. Real-time Preview (`src/components/previews/`)
As users type in the editors, a real-time preview is often shown (side-by-side) using these components. They reflect the current state of a single section.

### 4. Resume Templates (`src/components/templates/`)
The final resume is rendered using one of several templates. These templates are designed to fit an A4 page exactly. They are managed and toggled within `Preview.vue`.

## Data Flow

1. **User Input**: User types in a section editor (e.g., `Experience.vue`).
2. **State Update**: The editor emits events or directly modifies the props (in a Vue 2 non-strict way or via direct reference) which updates the state in `App.vue`.
3. **Reactive Render**: `App.vue` passes the updated state to the active template in `Preview.vue`.
4. **Persistence**: `localStorage.setItem` is called periodically or on save.

## Key Features

- **Template Switching**: Users can swap between multiple professional designs instantly.
- **Live Preview**: Real-time feedback as the resume is built.
- **Backup & Load**: Users can download their resume as a `.json` file and reload it later.
- **PDF Export**: Uses a sophisticated "Print to PDF" approach that captures all styles and renders an A4 layout accurately.
- **Section Reordering**: Supports moving sections up/down for custom layouts.

## Planned/Recent Work
- **Vue 3 Migration**: The project is in the process of migrating to Vue 3.
- **Style Refinement**: Recent work focused on ensuring inline styles (like `list-style: none`) are correctly applied for cross-browser print consistency.
