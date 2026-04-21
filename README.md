# ResumeForge - Fully frontend Vue.js based resume maker

ResumeForge is a vue.js based resume maker with easy to use UI to create awesome resumes. It is Privacy Friendly. Everything is stored in your own browser when you save and reloaded when you open ResumeForge next time you want to update your resume. You can download a backup for the resume in json file.


[![Netlify Status](https://api.netlify.com/api/v1/badges/c23094b0-601e-446d-9cdc-da4a9f13d0c7/deploy-status?branch=master)](https://app.netlify.com/sites/resumeforge/deploys) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- Easy to use UI
- Live previews
- Preview whole resume
- Cross platform
- Privacy friendly
- 7 Professional Templates
- Real-time Preview
- PDF Export
- Multiple Sections (Profile, Experience, Education, Skills, Projects)
- Customizable Fonts
- Drag & Drop Reordering
- ATS Compatibility Scanner

### 🆕 Advanced Features (NEW!)
1. ✅ Scan History & Score Tracking
2. ✅ Industry-Specific Optimization (8 industries)
3. ✅ LinkedIn Profile Import
4. ✅ Auto-Suggest Keywords from Job Descriptions
5. ✅ Grammar and Spelling Check
6. ✅ IndexedDB Storage (better than localStorage)

### ATS Features ✅
- ✅ ATS Compatibility Scanner (0-100 score)
- ✅ Real-time ATS Sidebar (on Preview page)
- ✅ Keyword Matching
- ✅ Format Validation
- ✅ Actionable Suggestions


## Tech Stack
- Vue.js
- HTML/CSS
- Tailwind
- Javascript


## Roadmap

- [X] Adding Browser Fonts
- [ ] Drag/Drop template creation
- [X] Improve Preview
- [X] Refactoring
- [X] ATS scanner Friendly

## Run Locally

Clone the project

```bash
  git clone https://github.com/zainaftab44/ResumeMaker.git
```

Go to the project directory

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run serve
```
You need [Vue2 installed](https://v2.vuejs.org/v2/guide/installation.html)
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).





## 📋 Feature Details

### 1. Scan History & Score Tracking 📊

**Track your progress over time!**

```
Initial Score: 58/100
After 1 week: 75/100 (+17 points)
After 2 weeks: 92/100 (+34 points total)
```

**Features:**
- Unlimited scan storage (IndexedDB)
- Score improvement charts
- Historical analysis
- Progress statistics

**How to use:**
1. Go to Preview page
2. See ATS score in sidebar
3. Make improvements
4. Return to see score increase
5. View history chart

---

### 2. Industry-Specific Optimization 🎯

**Optimize for your industry!**

**8 Industries Supported:**
- 💻 Software Development
- 📊 Data Science & Analytics
- 📢 Marketing & Communications
- 🎨 Design & UX
- 📋 Project Management
- 🤝 Sales & Business Development
- 💰 Finance & Accounting
- 🏥 Healthcare & Medical

**What you get:**
- Industry-specific keywords
- Required skills list
- Appropriate action verbs
- Tailored suggestions
- Metrics to include

**Example (Software):**
```
Keywords: agile, API, cloud, DevOps...
Skills: JavaScript, React, Docker...
Verbs: developed, architected, optimized...
Metrics: performance %, uptime %, code coverage
```

---

### 3. LinkedIn Profile Import 🔗

**Import your LinkedIn in seconds!**

**3 Methods:**

**Method 1: Copy-Paste** (Easiest)
1. Open LinkedIn profile
2. Select all (Ctrl+A / Cmd+A)
3. Copy (Ctrl+C / Cmd+C)
4. Paste into import box
5. Click Import

**Method 2: JSON Export**
1. Download LinkedIn data archive
2. Upload JSON file
3. Automatic import

**Method 3: Manual**
1. Copy sections individually
2. Paste as needed

**What gets imported:**
- Name & Title
- Professional Summary
- Work Experience
- Education
- Skills

---

### 4. Job Description Keyword Extractor 🔍

**Match any job description!**

**How it works:**
1. Copy job description from any site
2. Paste into analyzer
3. See required keywords
4. See missing keywords from your resume
5. Add them to your resume
6. Score improves!

**Example:**
```
Job Description: "Looking for Python developer..."

Extracted Keywords:
- python (8 times)
- machine learning (5 times)
- aws (3 times)
- docker (2 times)

Your Resume:
✅ Has: python, machine learning
❌ Missing: aws, docker

Suggestion: Add AWS and Docker to skills section
```

**Features:**
- Keyword frequency analysis
- Required vs preferred split
- Experience requirements detection
- Education requirements detection
- Job level detection
- Remote work detection

---



## Contributing

Contributions are always welcome!

All your contributions are handled as MIT License. When you create a pull request or update the documentation, we assume you agreed this clause.
