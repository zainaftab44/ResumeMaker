# Contributing to ResumeForge

Thank you for your interest in contributing! ResumeForge is a Vue.js 2 resume builder — contributions of any size are welcome, whether that's a bug fix, a new template, or a feature addition.

By submitting a pull request or updating documentation, you agree that your contributions are licensed under the [MIT License](https://opensource.org/licenses/MIT).

---

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Adding a New Template](#adding-a-new-template)
- [Adding a New Section / Form Page](#adding-a-new-section--form-page)
- [Code Style](#code-style)
- [Opening a Pull Request](#opening-a-pull-request)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v14 or higher
- npm v6 or higher
- [Vue CLI](https://cli.vuejs.org/) (optional but recommended globally)

```bash
npm install -g @vue/cli
```

### Fork and clone

1. Click **Fork** on the [ResumeForge GitHub page](https://github.com/zainaftab44/ResumeMaker) to create your own copy.
2. Clone your fork locally:

```bash
git clone https://github.com/<your-username>/ResumeMaker.git
cd ResumeMaker
```

3. Add the upstream remote so you can pull in future changes:

```bash
git remote add upstream https://github.com/zainaftab44/ResumeMaker.git
```

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run serve
```

The app will be available at `http://localhost:8080`. Changes to `.vue` files hot-reload automatically.

### Other available scripts

| Command | Purpose |
|---|---|
| `npm run serve` | Start local dev server with hot reload |
| `npm run build` | Build optimized production bundle into `dist/` |
| `npm run lint` | Run ESLint across the project |

---

## Project Structure

```
src/
├── App.vue                      # Root component — holds all shared state and navigation
├── main.js                      # App entry point
├── assets/                      # Global CSS, fonts, images
│   ├── styles.css
│   └── modern-design-system.css
├── components/
│   ├── pages/                   # Editor form pages (one per resume section)
│   │   ├── Profile.vue
│   │   ├── Experience.vue
│   │   ├── Education.vue
│   │   ├── Skills.vue
│   │   ├── Projects.vue
│   │   ├── Award.vue
│   │   ├── Certifications.vue
│   │   ├── Preview.vue          # Template selector + live preview
│   │   ├── Import.vue           # JSON import/export
│   │   └── CoverLetter.vue
│   ├── templates/               # Resume templates rendered for preview & PDF
│   │   ├── dragMixin.js         # Shared mixin for drag-and-drop section reordering
│   │   ├── Template.vue         # Template 1 — Classic Professional
│   │   ├── Template2.vue        # Template 2 — Modern Minimal
│   │   ├── Template4.vue        # Template 4
│   │   ├── Template5.vue        # Template 5
│   │   ├── Template6.vue        # Template 6
│   │   ├── Template7.vue        # Template 7 — Corporate Elegant
│   │   ├── Template8.vue        # Template 8
│   │   ├── TemplateModernPortfolio.vue
│   │   ├── TemplateSidebarLeft.vue
│   │   ├── TemplateSplitRight.vue
│   │   └── TwoColumns/
│   │       └── TemplateTwoColumns.vue
│   ├── previews/                # Section preview sub-components used inside templates
│   │   ├── Experience.vue
│   │   ├── Education.vue
│   │   ├── Skills.vue
│   │   ├── Skills2.vue
│   │   ├── Project.vue
│   │   ├── Award.vue
│   │   └── profile/
│   │       ├── First.vue
│   │       ├── Second.vue
│   │       └── Third.vue
│   └── inner/                   # Reusable base UI components
│       ├── Input.vue
│       ├── TextArea.vue
│       ├── DraggableInput.vue
│       ├── AccordionHeader.vue
│       └── AccordionBody.vue
├── data/
│   └── skillsDatabase.js        # Industry keywords used by ATS features
└── services/
    ├── atsService.js             # ATS compatibility scoring logic
    ├── industryOptimization.js   # Industry-specific keyword matching
    ├── grammarChecker.js         # Grammar and spelling validation
    ├── importServices.js         # LinkedIn data parsing
    └── storageService.js         # localStorage / IndexedDB management
```

**Key architecture notes:**

- All resume data lives in `App.vue` as a single `data` object and is passed down to child components via props.
- Child components emit events (`$emit`) to mutate state in `App.vue`.
- Templates receive the full resume data object as a `data` prop and render it into a print-ready A4 layout.
- The active template is selected in `Preview.vue` and rendered with a `v-if` switch in `App.vue`.

---

## Development Workflow

1. Sync your fork before starting work:

```bash
git fetch upstream
git checkout master
git merge upstream/master
```

2. Create a feature branch with a descriptive name:

```bash
git checkout -b feat/my-new-template
# or
git checkout -b fix/skills-section-overflow
```

3. Make your changes, test them in the browser, then commit:

```bash
git add src/components/templates/TemplateMyNew.vue
git commit -m "feat: add MyNew template with sidebar layout"
```

4. Push to your fork:

```bash
git push origin feat/my-new-template
```

5. Open a pull request (see [Opening a Pull Request](#opening-a-pull-request)).

---

## Adding a New Template

Templates are the most common contribution. Here is the full process.

### 1. Create the template file

Add a new file at `src/components/templates/TemplateMyName.vue`.

Every template receives one prop:

```javascript
props: {
  data: {
    type: Object,
    required: true
  }
}
```

The `data` object has this shape:

```javascript
{
  profile: {
    name, title, email, phone, address,
    website, github, linkedin, summary
  },
  exps: [
    { title, company, location, start, end, resp: [] }
  ],
  eds: [
    { degree, school, location, start, end, gpa }
  ],
  skills:  [{ name: [] }],   // style 1
  skills2: [{ name: [] }],   // style 2
  projs:   [{ title, link, desc, tech }],
  awds:    [{ title, org, date, desc }],
  sectionOrder: ['exps', 'skills', 'eds', 'projs']
}
```

Use the existing templates as a reference. `Template.vue` is the simplest starting point. Use `dragMixin` if you want to support drag-and-drop section reordering:

```javascript
import dragMixin from './dragMixin.js'

export default {
  mixins: [dragMixin],
  props: { data: { type: Object, required: true } }
}
```

**Print CSS tips:**
- Target `@media print` for print-specific overrides.
- Keep the root element at `width: 210mm` (A4) with `min-height: 297mm`.
- Avoid fixed viewport units (`vw`, `vh`) — they don't translate to PDF correctly.
- Test with the browser's print preview (Ctrl+P) before submitting.

### 2. Register the template in `App.vue`

Open `src/App.vue` and make two changes:

**Import the component** (near the top with the other template imports):

```javascript
import TemplateMyName from './components/templates/TemplateMyName.vue'
```

**Add it to the `components` map:**

```javascript
components: {
  // ... existing templates
  TemplateMyName,
}
```

**Add a `v-if` block** in the template section where the other templates are rendered, assigning it the next available ID:

```html
<TemplateMyName v-if="selectedTemplate === 9" :data="resumeData" />
```

### 3. Add a thumbnail in `Preview.vue`

Open `src/components/pages/Preview.vue` and add an entry to the template list so users can select it. Match the format of the existing entries, including the template ID and a display name.

### 4. Test your template

- Fill in all resume sections through the editor.
- Switch to your new template in the Preview page.
- Verify all sections render correctly, including empty/optional ones (guard with `v-if`).
- Open the browser print dialog and check the A4 output.
- Test with a long resume to check for overflow issues.

---

## Adding a New Section / Form Page

1. Create your form component at `src/components/pages/MySection.vue`. Model it after an existing page like `Award.vue`.
2. Add the corresponding data key to the `data` object in `App.vue`.
3. Add a nav item in `App.vue` to navigate to the new page.
4. Pass the new data field as a prop to any templates that should render it.
5. Add a preview sub-component under `src/components/previews/` if needed.

---

## Code Style

- **Vue 2 Options API** — keep consistency with the existing codebase; do not introduce Composition API.
- **No TypeScript** — the project is plain JavaScript.
- **ESLint** — run `npm run lint` before committing. The config is in `package.json` under `eslintConfig`.
- **Comments** — only add comments when the reason behind the code is non-obvious. Do not write comments that just restate what the code does.
- **CSS** — scoped styles (`<style scoped>`) preferred inside components. Avoid touching global stylesheets unless necessary.
- **Naming** — template files use PascalCase (`TemplateMyName.vue`); component files in `pages/` and `inner/` also use PascalCase.

---

## Opening a Pull Request

1. Ensure `npm run lint` passes with no errors.
2. Verify the app builds without warnings: `npm run build`.
3. Push your branch and open a PR against the `master` branch of the upstream repo.
4. Use a clear title that summarizes what the PR does:
   - `feat: add SidebarRight template`
   - `fix: skills overflow on Template 5 in Firefox`
   - `docs: update contributing guide`
5. In the PR description include:
   - **What** — a short summary of the change.
   - **Why** — the motivation or the problem it solves.
   - **Screenshots** — for template additions or UI changes, include a screenshot of the rendered output and the print preview.
   - **Testing done** — what you verified manually.

PRs with screenshots and clear descriptions get reviewed faster.

---

## Reporting Bugs

Open a [GitHub Issue](https://github.com/zainaftab44/ResumeMaker/issues) and include:

- A clear description of the bug.
- Steps to reproduce.
- Expected vs. actual behavior.
- Browser and OS.
- A screenshot if the issue is visual.

---

## Suggesting Features

Open a [GitHub Issue](https://github.com/zainaftab44/ResumeMaker/issues) with the `enhancement` label. Describe the feature, the problem it solves, and any implementation ideas you have. Discussing first before building avoids duplicate or conflicting work.

---

## Questions?

Open a GitHub Issue or start a Discussion. All contributors are expected to be respectful and constructive.
