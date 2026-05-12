<template>
  <div class="fade-in cover-letter-page">
    <!-- Page Header -->
    <div class="glass-panel rounded-2xl p-6 mb-6">
      <div class="flex items-center space-x-3 mb-2">
        <div class="w-8 h-8 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
        <div>
          <h2 class="text-2xl font-bold brand-font">Cover Letter Writer</h2>
          <p class="text-slate-400 text-sm mt-0.5">
            AI-adaptive cover letters — tailored to any industry, fully client-side.
            <span class="text-emerald-400 ml-1">Your data never leaves your browser.</span>
          </p>
        </div>
      </div>
    </div>

    <!-- Two-column layout -->
    <div class="grid lg:grid-cols-2 gap-6">

      <!-- ── LEFT: Inputs ── -->
      <div class="space-y-5">

        <!-- Resume Input -->
        <div class="glass-panel rounded-2xl p-6">
          <div class="flex items-center justify-between mb-3">
            <label class="text-sm font-semibold text-slate-300 flex items-center space-x-2">
              <svg class="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Your Resume</span>
            </label>
            <!-- Source toggle (only show when saved data exists) -->
            <div v-if="hasResumeData" class="flex items-center bg-slate-800/60 rounded-lg p-0.5 border border-slate-700/50">
              <button
                @click="resumeSource = 'saved'"
                :class="[
                  'text-xs px-3 py-1.5 rounded-md transition-all flex items-center space-x-1',
                  resumeSource === 'saved'
                    ? 'bg-emerald-600/30 text-emerald-400 border border-emerald-500/40'
                    : 'text-slate-500 hover:text-slate-300'
                ]"
              >
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                <span>Saved Resume</span>
              </button>
              <button
                @click="resumeSource = 'custom'"
                :class="[
                  'text-xs px-3 py-1.5 rounded-md transition-all flex items-center space-x-1',
                  resumeSource === 'custom'
                    ? 'bg-slate-600/50 text-slate-200 border border-slate-500/40'
                    : 'text-slate-500 hover:text-slate-300'
                ]"
              >
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span>Paste Custom</span>
              </button>
            </div>
          </div>

          <!-- Saved resume summary card -->
          <div v-if="resumeSource === 'saved' && hasResumeData" class="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 space-y-3">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <div class="w-7 h-7 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-semibold text-slate-200">{{ maindata.profile && maindata.profile.name || 'Your Resume' }}</p>
                  <p v-if="maindata.profile && maindata.profile.title" class="text-xs text-slate-400">{{ maindata.profile.title }}</p>
                </div>
              </div>
              <span class="text-xs px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-full border border-emerald-500/30">Live data</span>
            </div>
            <div class="grid grid-cols-3 gap-2 text-xs">
              <div class="flex flex-col items-center bg-slate-800/50 rounded-lg p-2">
                <span class="text-lg font-bold text-emerald-400">{{ maindata.exps ? maindata.exps.length : 0 }}</span>
                <span class="text-slate-500">Jobs</span>
              </div>
              <div class="flex flex-col items-center bg-slate-800/50 rounded-lg p-2">
                <span class="text-lg font-bold text-cyan-400">{{ savedSkillCount }}</span>
                <span class="text-slate-500">Skills</span>
              </div>
              <div class="flex flex-col items-center bg-slate-800/50 rounded-lg p-2">
                <span class="text-lg font-bold text-violet-400">{{ maindata.projs ? maindata.projs.length : 0 }}</span>
                <span class="text-slate-500">Projects</span>
              </div>
            </div>
            <p class="text-xs text-slate-500 flex items-center space-x-1">
              <svg class="w-3 h-3 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Profile, experience, education &amp; skills will be used automatically.</span>
            </p>
          </div>

          <!-- Custom paste textarea -->
          <textarea
            v-if="resumeSource === 'custom'"
            v-model="resumeText"
            rows="14"
            class="form-input w-full font-mono text-xs leading-relaxed resize-none"
            placeholder="Paste your full resume here...

Jane Smith
Software Engineer
jane@example.com | (555) 123-4567 | San Francisco, CA

EXPERIENCE
Senior Developer at Acme Corp, 2021–Present
• Led development of microservices architecture, reducing latency by 40%
• Managed a team of 5 engineers across 3 major product launches

SKILLS
Python, JavaScript, React, AWS, Docker, Kubernetes

EDUCATION
B.S. Computer Science, Stanford University, 2018"
          ></textarea>
          <div v-if="resumeSource === 'custom'" class="flex justify-between items-center mt-2">
            <span class="text-xs text-slate-600">{{ resumeText.length.toLocaleString() }} chars</span>
            <button v-if="resumeText" @click="resumeText = ''" class="text-xs text-slate-500 hover:text-red-400 transition-colors">Clear</button>
          </div>
        </div>

        <!-- Job Description Input -->
        <div class="glass-panel rounded-2xl p-6">
          <label class="text-sm font-semibold text-slate-300 flex items-center space-x-2 mb-3">
            <svg class="w-4 h-4 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Job Description</span>
          </label>
          <textarea
            v-model="jobDescription"
            rows="14"
            class="form-input w-full font-mono text-xs leading-relaxed resize-none"
            placeholder="Paste the full job posting here...

Software Engineer – Full Stack
TechCorp Inc.

About Us:
We are a fast-growing SaaS company dedicated to transforming how businesses manage data...

Responsibilities:
• Build and maintain scalable web applications
• Collaborate with cross-functional teams on new features
• Optimize performance and ensure system reliability

Requirements:
• 3+ years of experience with React and Node.js
• Strong knowledge of cloud platforms (AWS/GCP)
• Experience with microservices and containerization"
          ></textarea>
          <div class="flex justify-between items-center mt-2">
            <span class="text-xs text-slate-600">{{ jobDescription.length.toLocaleString() }} chars</span>
            <button v-if="jobDescription" @click="jobDescription = ''" class="text-xs text-slate-500 hover:text-red-400 transition-colors">Clear</button>
          </div>
        </div>

        <!-- Generation Mode Toggle -->
        <div class="glass-panel rounded-xl p-3 flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <div :class="['w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0', useAI ? 'bg-violet-500/20' : 'bg-slate-700/60']">
              <svg :class="['w-4 h-4', useAI ? 'text-violet-400' : 'text-slate-500']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <p class="text-xs font-medium text-slate-300">{{ useAI ? 'AI Generation - May need signin' : 'Smart Template' }}</p>
              <p class="text-xs text-slate-600">{{ useAI ? 'GPT-4o · streams live · free via Puter' : 'Instant · fully offline · no account needed' }}</p>
            </div>
          </div>
          <button
            @click="useAI = !useAI"
            :class="['relative inline-flex h-5 w-9 items-center rounded-full transition-colors flex-shrink-0', useAI ? 'bg-violet-600' : 'bg-slate-600']"
          >
            <span :class="['inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform', useAI ? 'translate-x-4' : 'translate-x-0.5']"></span>
          </button>
        </div>

        <!-- Generate Button -->
        <button
          @click="generate"
          :disabled="isGenerating"
          :class="[
            'w-full py-3.5 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-semibold text-sm transition-all flex items-center justify-center space-x-2',
            useAI
              ? 'bg-gradient-to-r from-violet-600 to-emerald-600 hover:from-violet-500 hover:to-emerald-500 shadow-lg shadow-violet-900/20'
              : 'bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 shadow-lg shadow-emerald-900/30'
          ]"
        >
          <svg v-if="!isGenerating" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <svg v-else class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>{{ isGenerating ? generatingLabel : 'Generate Cover Letter' }}</span>
        </button>

        <!-- Validation Error -->
        <transition name="fade-in">
          <div v-if="errorMsg" class="flex items-start space-x-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
            <svg class="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{{ errorMsg }}</span>
          </div>
        </transition>

        <!-- Extraction Summary (shown after first generation) -->
        <transition name="fade-in">
          <div v-if="extractedInfo" class="glass-panel rounded-xl p-4">
            <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Detected Information</p>
            <div class="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
              <div v-if="extractedInfo.name" class="flex items-center space-x-2 min-w-0">
                <span class="text-slate-500 flex-shrink-0">Name:</span>
                <span class="text-slate-300 truncate">{{ extractedInfo.name }}</span>
              </div>
              <div v-if="extractedInfo.company" class="flex items-center space-x-2 min-w-0">
                <span class="text-slate-500 flex-shrink-0">Company:</span>
                <span class="text-slate-300 truncate">{{ extractedInfo.company }}</span>
              </div>
              <div v-if="extractedInfo.jobTitle" class="flex items-center space-x-2 min-w-0">
                <span class="text-slate-500 flex-shrink-0">Role:</span>
                <span class="text-slate-300 truncate">{{ extractedInfo.jobTitle }}</span>
              </div>
              <div v-if="extractedInfo.skillCount" class="flex items-center space-x-2">
                <span class="text-slate-500">Skills found:</span>
                <span class="text-emerald-400 font-semibold">{{ extractedInfo.skillCount }}</span>
              </div>
              <div v-if="extractedInfo.matchCount" class="flex items-center space-x-2">
                <span class="text-slate-500">Req. matched:</span>
                <span class="text-cyan-400 font-semibold">{{ extractedInfo.matchCount }}</span>
              </div>
              <div v-if="extractedInfo.tone" class="flex items-center space-x-2 min-w-0">
                <span class="text-slate-500 flex-shrink-0">JD tone:</span>
                <span class="text-slate-300 capitalize truncate">{{ extractedInfo.tone }}</span>
              </div>
              <div v-if="extractedInfo.stage" class="flex items-center space-x-2 min-w-0">
                <span class="text-slate-500 flex-shrink-0">Stage:</span>
                <span class="text-slate-300 capitalize truncate">{{ extractedInfo.stage }}</span>
              </div>
              <div v-if="extractedInfo.seniority" class="flex items-center space-x-2 min-w-0">
                <span class="text-slate-500 flex-shrink-0">Level:</span>
                <span class="text-slate-300 capitalize truncate">{{ extractedInfo.seniority }}</span>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <!-- ── RIGHT: Output ── -->
      <div class="space-y-5">
        <div class="glass-panel rounded-2xl p-6 flex flex-col" style="min-height: 580px;">
          <!-- Output header -->
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm font-semibold text-slate-300 flex items-center space-x-2">
              <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span>Generated Cover Letter</span>
            </h3>
            <div v-if="coverLetterOutput" class="flex items-center space-x-2">
              <button @click="copyToClipboard" class="text-xs px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-lg transition-all flex items-center space-x-1">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span>{{ copied ? 'Copied!' : 'Copy' }}</span>
              </button>
              <button @click="downloadTxt" class="text-xs px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 rounded-lg transition-all border border-emerald-500/30 flex items-center space-x-1">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download .txt</span>
              </button>
            </div>
          </div>

          <!-- Empty state -->
          <div v-if="!coverLetterOutput && !isGenerating" class="flex-1 flex flex-col items-center justify-center text-center py-8">
            <div class="w-16 h-16 bg-slate-800/60 rounded-2xl flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <p class="text-sm font-medium text-slate-500 mb-1">Your cover letter will appear here</p>
            <p class="text-xs text-slate-600 leading-relaxed">Paste your resume and job description,<br>then click <span class="text-emerald-500">Generate Cover Letter</span>.</p>
          </div>

          <!-- AI waiting for first token -->
          <div v-if="isGenerating && !coverLetterOutput" class="flex-1 flex flex-col items-center justify-center text-center py-8">
            <div class="w-16 h-16 bg-violet-500/10 rounded-2xl flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-violet-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <p class="text-sm font-medium text-violet-400 mb-1">{{ generatingLabel }}</p>
            <p class="text-xs text-slate-500">{{ useAI ? 'Connecting to AI…' : 'Matching your experience to the role' }}</p>
          </div>

          <!-- Output (shows during streaming and after) -->
          <div v-if="coverLetterOutput" class="flex-1 flex flex-col">
            <textarea
              v-model="coverLetterOutput"
              class="flex-1 w-full bg-transparent text-slate-200 text-sm leading-[1.8] resize-none focus:outline-none"
              style="min-height: 460px; font-family: 'Georgia', serif;"
              :readonly="isGenerating"
            ></textarea>
            <!-- streaming cursor -->
            <span v-if="isGenerating" class="inline-block w-0.5 h-4 bg-violet-400 animate-pulse ml-0.5"></span>
          </div>

          <!-- Footer stats -->
          <div v-if="coverLetterOutput" class="flex justify-between items-center mt-3 pt-3 border-t border-slate-700/40">
            <span class="text-xs text-slate-600">{{ wordCount }} words</span>
            <span v-if="isGenerating" class="text-xs text-violet-500 flex items-center space-x-1">
              <svg class="w-3 h-3 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Generating…</span>
            </span>
            <span v-else class="text-xs text-slate-600">Editable — click anywhere to modify</span>
          </div>
        </div>

        <!-- Pro Tips (shown after generation) -->
        <transition name="fade-in">
          <div v-if="coverLetterOutput" class="glass-panel rounded-xl p-4">
            <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Pro Tips</p>
            <ul class="space-y-2.5 text-xs text-slate-400">
              <li class="flex items-start space-x-2">
                <span class="text-emerald-400 flex-shrink-0 mt-0.5">✦</span>
                <span>Add one specific company detail you've researched — a recent product launch, news story, or stated value.</span>
              </li>
              <li class="flex items-start space-x-2">
                <span class="text-emerald-400 flex-shrink-0 mt-0.5">✦</span>
                <span>Replace any generic phrases with concrete numbers: percentages, revenue, team sizes, or timeframes.</span>
              </li>
              <li class="flex items-start space-x-2">
                <span class="text-emerald-400 flex-shrink-0 mt-0.5">✦</span>
                <span>Keep it to 3–4 paragraphs. Hiring managers skim — make every sentence earn its place.</span>
              </li>
            </ul>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
/* ─────────────────────────────────────────────
   Cover Letter Engine — pure client-side JS
   No network calls. All data stays in-browser.
───────────────────────────────────────────── */

// ── Text helpers ──────────────────────────────

function decap(s) {
  if (!s || s.length === 0) return s
  return s.charAt(0).toLowerCase() + s.slice(1)
}

function cap(s) {
  if (!s || s.length === 0) return s
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function cleanBullet(s) {
  return s.replace(/^[\s•\-\*\+>◆▸→]+/, '').trim()
}

function joinList(arr) {
  if (!arr || arr.length === 0) return ''
  if (arr.length === 1) return arr[0]
  if (arr.length === 2) return `${arr[0]} and ${arr[1]}`
  return `${arr.slice(0, -1).join(', ')}, and ${arr[arr.length - 1]}`
}

// ── Section extraction ────────────────────────

function extractSection(text, names) {
  const pattern = names.map(n => n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')
  const re = new RegExp(
    `(?:^|\\n)(?:${pattern})\\s*[:\\-]?\\s*\\n([\\s\\S]*?)(?=\\n\\s*\\n\\s*[A-Z][A-Z\\s]{2,}(?::|\\n)|$)`,
    'i'
  )
  const m = text.match(re)
  return m ? m[1].trim() : null
}

function extractBullets(block) {
  if (!block) return []
  return (block.match(/(?:^|[\n])[ \t]*[•\-\*\+>◆▸→][ \t]+([^\n]+)/gm) || [])
    .map(b => cleanBullet(b))
    .filter(b => b.length > 8)
}

// ── Resume extractors ─────────────────────────

function extractName(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean)
  for (let i = 0; i < Math.min(3, lines.length); i++) {
    // Handles "Jane Smith", "Jane A. Smith", "Jean-Pierre Moreau"
    if (/^[A-Z][a-zÀ-ÿ'-]+(?:\s+[A-Z]\.?)?(?:\s+[A-Z][a-zÀ-ÿ'-]+){1,3}$/.test(lines[i])) return lines[i]
  }
  const m = text.match(/(?:name|full name)\s*[:\-]\s*([A-Z][a-z]+(?:\s+[A-Z][a-z'-]+){1,3})/i)
  return m ? m[1].trim() : null
}

function extractEmail(text) {
  const m = text.match(/[\w.+\-]+@[\w.\-]+\.\w{2,}/)
  return m ? m[0] : null
}

function extractPhone(text) {
  const m = text.match(/(?:\+?\d{1,3}[\s.\-]?)?\(?\d{3}\)?[\s.\-]?\d{3}[\s.\-]?\d{4}/)
  return m ? m[0].trim() : null
}

function extractCity(text) {
  const m = text.match(/\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*),\s*([A-Z]{2}|[A-Z][a-z]+)\b/)
  return m ? m[0] : null
}

function extractCurrentTitle(text) {
  const titleWords = /engineer|developer|manager|analyst|designer|architect|consultant|specialist|coordinator|director|lead|scientist|researcher|officer|associate|intern|executive|head of|vp |cto|ceo|coo|product|data|cloud|devops|fullstack|full.stack|frontend|backend/i
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean)
  for (let i = 1; i < Math.min(6, lines.length); i++) {
    const l = lines[i]
    if (l.length < 70 && titleWords.test(l) && !/[@|\/]/.test(l) && !/^\d/.test(l)) return l
  }
  return null
}

function extractYearsExperience(text) {
  const yearMatches = text.match(/\b(20\d{2}|19[89]\d)\b/g)
  if (!yearMatches || yearMatches.length < 2) return null
  const years = yearMatches.map(Number).sort((a, b) => a - b)
  const span = new Date().getFullYear() - years[0]
  return (span > 0 && span < 45) ? span : null
}

function extractSkills(text) {
  const skills = []
  const seen = new Set()
  const stopWords = new Set(['and', 'the', 'for', 'with', 'are', 'was', 'were', 'has', 'have', 'had', 'our', 'your', 'you', 'also', 'from', 'this', 'that', 'they', 'able', 'well', 'both'])

  const section = extractSection(text, ['skills', 'technical skills', 'core competencies', 'technologies', 'tech stack', 'expertise', 'proficiencies', 'tools'])
  if (section) {
    section.split(/[\n\|\/•\*]/).forEach(line => {
      // Strip "Category Label: " prefix before splitting on commas (e.g. "Frontend: Vue.js, React")
      const colonIdx = line.indexOf(':')
      const tokens = (colonIdx > 0 && colonIdx < 35 && /^[A-Za-z\s&\/]+$/.test(line.slice(0, colonIdx).trim()))
        ? line.slice(colonIdx + 1).split(',')
        : line.split(',')
      tokens.forEach(s => {
        const c = s.replace(/^\s*[\-\*•]\s*/, '').replace(/\(.*?\)/g, '').trim()
        if (c.length >= 2 && c.length <= 35 && !stopWords.has(c.toLowerCase())) {
          const key = c.toLowerCase()
          if (!seen.has(key)) { seen.add(key); skills.push(c) }
        }
      })
    })
  }

  // CamelCase, ALL-CAPS abbreviations, versioned names (e.g. Vue3, Node.js)
  const techRe = /\b(?:[A-Z][a-z]+(?:[A-Z][a-z]+)+|[A-Z]{2,6}|[A-Z][a-z]+\.?[jJ][sS]|[A-Z][a-zA-Z]*\d+)\b/g
  const ignore = new Set(['I', 'A', 'BE', 'OR', 'AND', 'THE', 'IN', 'AT', 'TO', 'FOR', 'OF', 'MY', 'IS', 'IT', 'NO', 'ON', 'AS', 'IF', 'WE', 'DO', 'US', 'AN', 'SO', 'AM', 'PM', 'OK', 'ID', 'UI', 'UX'])
  ;(text.match(techRe) || []).forEach(t => {
    if (!ignore.has(t) && t.length > 1) {
      const key = t.toLowerCase()
      if (!seen.has(key)) { seen.add(key); skills.push(t) }
    }
  })

  return skills.slice(0, 40)
}

function extractExperienceBullets(text) {
  const section = extractSection(text, ['experience', 'work experience', 'professional experience', 'work history', 'employment', 'career'])
  const bullets = extractBullets(section || text)
  const QUANT = /\d+%|\$[\d,]+|\d+[xX]|\d+\s*(?:million|billion|k\b|thousand)|\d+\s*(?:team members?|engineers?|people|developers?)/i
  const ACTION = /\b(?:led|managed|built|created|increased|decreased|improved|reduced|achieved|delivered|designed|launched|optimized|implemented|developed|deployed|scaled|streamlined|automated|architected|spearheaded|transformed|mentored|drove|established)\b/i
  return bullets
    .map(b => ({ text: b, score: (QUANT.test(b) ? 3 : 0) + (ACTION.test(b) ? 1 : 0) }))
    .sort((a, b) => b.score - a.score)
    .map(s => s.text)
}

function extractQuantifiedAchievements(text) {
  const QUANT = /\d+%|\$[\d,]+|\d+[xX]|\d+\s*(?:million|billion|k\b|thousand)|\d+\s+(?:team members?|engineers?|people)|(?:reduced?|increased?|improved?|grew?|saved?|generated?|delivered?)\w*\s+(?:by|to|from)?\s*\d/i
  const ACTION = /\b(?:led|managed|built|increased|decreased|improved|reduced|delivered|designed|launched|optimized|scaled|automated|architected|drove|spearheaded)\b/i
  return text
    .split(/[.\n]+/)
    .map(s => cleanBullet(s).trim())
    .filter(s => s.length > 15)
    .map(s => ({ text: s, score: (QUANT.test(s) ? 3 : 0) + (ACTION.test(s) ? 1 : 0) + (s.length > 40 ? 0.5 : 0) }))
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(s => s.text)
}

function extractEducationSummary(text) {
  const section = extractSection(text, ['education', 'academic', 'degrees', 'qualifications', 'academics'])
  if (!section) return null
  const m = section.match(/(?:Bachelor|Master|PhD|Ph\.D|B\.S\.|M\.S\.|B\.A\.|M\.A\.|MBA|B\.E\.|M\.E\.|Associate|B\.Tech|M\.Tech)[^\n,]*/i)
  return m ? m[0].trim() : null
}

function extractSoftSkills(text) {
  const expBlock = extractSection(text, ['experience', 'work experience', 'professional experience']) || text
  const checks = [
    [/\b(?:led|lead|leadership|managed|mentored|coached|guided)\b/i, 'leadership and team development'],
    [/\b(?:collaborated|cross-functional|cross.functional|partnered with|worked closely)\b/i, 'cross-functional collaboration'],
    [/\b(?:presented|communicated|stakeholder|client-facing|executive)\b/i, 'executive communication'],
    [/\b(?:problem.solving|troubleshooting|diagnosed|resolved complex)\b/i, 'complex problem-solving'],
    [/\b(?:proactive|self.starter|independently|took ownership|initiative)\b/i, 'self-directed initiative'],
    [/\b(?:delivered on.time|shipped|met deadline|launched on schedule)\b/i, 'on-time delivery'],
    [/\b(?:strategic|roadmap|planning|prioriti|long.term vision)\b/i, 'strategic planning'],
  ]
  return checks.filter(([re]) => re.test(expBlock)).map(([, label]) => label).slice(0, 3)
}

// Non-company patterns to reject (tech acronyms, methodology nouns, common words)
const NON_COMPANY = /^(?:TDD|BDD|REST|API|SQL|PHP|CSS|HTML|AWS|GCP|CI|CD|MVC|OOP|JWT|MVP|SaaS|SDK|CMS|CRM|ORM|Git|the|this|our|my|a|an)\b|(?:approach|pattern|test|method|framework|stack|setup|process|practice|strategy|principle|technique|workflow)/i

function extractPreviousEmployer(text, excludeCompany) {
  // Prefer the "Company | 2021 – Present" date-anchored format (most reliable)
  const dated = text.match(/([A-Z][A-Za-z0-9\s&.,']{2,35}?)\s*[\|,]\s*(?:20\d{2}|19\d{2}|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/)
  if (dated) {
    const name = dated[1].trim()
    if (!NON_COMPANY.test(name) && name.length > 2) {
      if (!excludeCompany || name.toLowerCase() !== excludeCompany.toLowerCase()) return name
    }
  }
  // Fallback: "at CompanyName," pattern
  const atM = text.match(/\bat\s+([A-Z][A-Za-z0-9\s&.]{2,30}?)\s*[,.\n]/)
  if (atM) {
    const name = atM[1].trim()
    if (!NON_COMPANY.test(name) && name.split(/\s+/).length <= 5) {
      if (!excludeCompany || name.toLowerCase() !== excludeCompany.toLowerCase()) return name
    }
  }
  return null
}

// ── JD extractors ─────────────────────────────

function extractJobTitle(jd) {
  // Only match explicit column-label formats on the SAME line (no \n crossing)
  // Exclude "role" alone since "About the Role:" is a section header, not a label
  const explicit = jd.match(/(?:^|\n)[ \t]*(?:position|job title|title)[ \t]*[:\-][ \t]*([A-Za-z][^\n,]{3,60})/im)
  if (explicit) return explicit[1].trim().replace(/\s+/g, ' ')

  // "We are hiring a Senior Developer" style
  const hiring = jd.match(/we(?:'re| are) (?:hiring|seeking|looking for)(?: a| an)?\s+([A-Za-z][^\n,]{3,60})/i)
  if (hiring) return hiring[1].trim().replace(/\s+/g, ' ')

  // First few lines that look like a job title (short, contains a role keyword, no sentence punctuation)
  const titleWords = /\b(?:engineer|developer|manager|analyst|designer|architect|consultant|specialist|coordinator|director|lead|scientist|researcher|officer|associate|intern|executive|full.stack|front.?end|back.?end|devops|data|product|cloud|mobile|security)\b/i
  const lines = jd.split('\n').map(l => l.trim()).filter(Boolean)
  for (let i = 0; i < Math.min(5, lines.length); i++) {
    const l = lines[i]
    // Reject lines that look like metadata or section headers
    if (/^(?:location|salary|type|about|dear|re:|subject|responsibilities|requirements|you will|we are|our|the role)/i.test(l)) continue
    if (l.length < 80 && titleWords.test(l) && !/[.?!,]$/.test(l) && l.split(/\s+/).length <= 10) return l
  }
  return null
}

// Words that indicate a line is a job title, not a company name
const JOB_TITLE_WORDS = /\b(?:engineer|developer|manager|analyst|designer|architect|specialist|coordinator|director|lead|executive|associate|intern|consultant|researcher|officer|front.?end|back.?end|devops|fullstack)\b/i

function extractCompany(jd) {
  // Strong signals: legal suffixes or explicit context phrases
  const patterns = [
    // "Vita CV is hiring on behalf of..." → capture name BEFORE "is hiring"
    /([A-Z][A-Za-z0-9\s&.]{1,35})\s+is hiring\b/i,
    /(?:about|join)\s+([A-Z][A-Za-z0-9\s&.]{2,35}(?:Inc\.?|LLC|Corp\.?|Ltd\.?|Limited|Technologies|Solutions|Labs?|Studio|Group|Agency|Ventures|Software|Systems|Services|Co\.?))\b/,
    /^([A-Z][A-Za-z0-9\s&.]{2,35}(?:Inc\.?|LLC|Corp\.?|Ltd\.?|Limited|Technologies|Solutions|Labs?|Studio|Group|Agency|Ventures|Software|Systems|Services|Co\.?))\s*$/m,
    /(?:company|employer|organization)\s*[:\-]\s*([A-Z][A-Za-z0-9\s&.]{2,35})/i,
    /(?:at|with|for)\s+([A-Z][A-Za-z0-9\s&.]{2,35}(?:Inc\.?|LLC|Corp\.?|Ltd\.?|Limited|Technologies|Solutions|Labs?|Studio|Group|Agency|Ventures|Software|Systems|Services|Co\.?))/,
  ]
  for (const p of patterns) {
    const m = jd.match(p)
    if (m) return m[1].trim().replace(/\s+/g, ' ')
  }
  // First-line fallback only if it does NOT look like a job title
  const first = jd.split('\n').map(l => l.trim()).filter(Boolean)[0] || ''
  if (first.length < 50 && /^[A-Z]/.test(first) &&
      !JOB_TITLE_WORDS.test(first) &&
      !/(?:we are|looking|seeking|hiring|about|the |this )/i.test(first)) {
    return first
  }
  return null
}

function extractRequirements(jd) {
  const reqSection = extractSection(jd, ['requirements', 'qualifications', "what we're looking for", "what you'll bring", 'must have', 'must-have', 'you have', 'you bring', 'minimum qualifications', 'preferred qualifications', 'about you'])
  const respSection = extractSection(jd, ['responsibilities', "what you'll do", 'role & responsibilities', 'key responsibilities', 'duties', 'you will', 'your role', 'the role', 'day to day', 'in this role'])
  const all = [...extractBullets(reqSection), ...extractBullets(respSection)]
  const seen = new Set()
  return all.filter(r => {
    const key = r.slice(0, 30).toLowerCase()
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

function extractMissionHook(jd) {
  const m = jd.match(/(?:our mission(?: is)?|we(?:'re| are) (?:building|creating|transforming|reimagining|dedicated to|committed to|working to|on a mission to))[^.!?]*[.!?]/i)
  if (!m) return null
  return m[0].trim()
}

function extractTone(jd) {
  const L = jd.toLowerCase()
  if (/fast[- ]?pac|startup|agile|move quickly|ship fast/i.test(L)) return 'fast-paced'
  if (/collaborat|cross[- ]?functional|team[- ]?player|together/i.test(L)) return 'collaborative'
  if (/innovat|cutting[- ]?edge|state[- ]?of[- ]?the[- ]?art|creative|pushing boundaries/i.test(L)) return 'innovative'
  if (/data[- ]?driven|analytical|metrics[- ]?focus|evidence.based/i.test(L)) return 'data-driven'
  if (/ownership|autonomy|self[- ]?starter|independent|you own/i.test(L)) return 'autonomous'
  return null
}

function extractCompanyStage(jd) {
  const L = jd.toLowerCase()
  if (/series [a-c]|seed.stage|early.stage|pre-series|seed round|\bstartup\b|small team|wear many hats|scrappy|we're growing/i.test(L)) return 'startup'
  if (/series [d-e]|growth.stage|scale.?up|hypergrowth|rapid growth|scaling fast/i.test(L)) return 'scaleup'
  if (/fortune 500|enterprise|global company|worldwide|thousands of employees|established leader/i.test(L)) return 'enterprise'
  return null
}

function extractSeniorityLevel(jd) {
  if (/\bstaff\b|\bprincipal\b|\bdistinguished\b|\bvp\b|\bdirector\b|\bhead of\b|\bcto\b/i.test(jd)) return 'staff'
  if (/\bsenior\b|\bsr\.\b|\blead\b|\b[5-9]\+?\s*years\b|\b1[0-9]\+?\s*years\b/i.test(jd)) return 'senior'
  if (/\bjunior\b|\bentry.level\b|\bnew grad\b|\b0-2 years\b|\b1\+?\s*year\b/i.test(jd)) return 'junior'
  return 'mid'
}

function extractDomain(jd) {
  // Order matters: more specific patterns first; frontend/backend checked before generic API
  const map = [
    [/machine learning|deep learning|\bai\b|artificial intelligence|\bnlp\b|\bllm\b|generative ai/i, 'machine learning and AI'],
    // frontend explicitly before backend; match both "frontend" and "front-end"
    [/front.?end|react\b|vue\b|angular\b|next\.?js|svelte|web ui|user.facing|landing page|responsive interface/i, 'frontend development'],
    [/ux\b|ui\b|user research|figma|prototype|interaction design|design system/i, 'UX/UI design'],
    // backend: require a clear backend signal, NOT just "api" alone (too generic)
    [/\bbackend\b|back.?end|microservices|node\.?js|django|fastapi|spring\b|server.side|rest api|graphql api/i, 'backend engineering'],
    [/\baws\b|\bazure\b|\bgcp\b|cloud infrastructure|terraform|kubernetes/i, 'cloud infrastructure'],
    [/devops\b|ci\/cd|deployment pipeline|platform engineer|\bsre\b/i, 'DevOps and platform engineering'],
    [/data engineer|data pipeline|\bspark\b|\bkafka\b|\bairflow\b|\bdbt\b|\betl\b/i, 'data engineering'],
    [/data analyst|business intelligence|tableau|power bi|looker/i, 'data analytics'],
    [/\bsecurity\b|cybersecurity|penetration test|vulnerability|appsec/i, 'cybersecurity'],
    [/\bmobile\b|\bios\b|\bandroid\b|react native|flutter|\bswift\b|\bkotlin\b/i, 'mobile development'],
    [/product manager|product owner|\broadmap\b|go.to.market/i, 'product management'],
    [/\bmarketing\b|\bseo\b|campaign|social media|growth hacking/i, 'digital marketing'],
    [/\bfinance\b|accounting|financial model|fp&a/i, 'finance'],
    [/\bsales\b|account executive|\bcrm\b|salesforce/i, 'sales'],
    [/healthcare|medical|clinical|patient|\bhipaa\b|\behr\b/i, 'healthcare technology'],
    [/legal|compliance|regulation|\bgdpr\b/i, 'legal and compliance'],
  ]
  for (const [re, domain] of map) {
    if (re.test(jd)) return domain
  }
  return null
}

function extractCompanyValues(jd) {
  const checks = [
    [/\bimpact\b/i, 'impact'],
    [/customer[- ](?:centric|first|obsess)/i, 'customer obsession'],
    [/inclusi|diversity|belonging/i, 'inclusion and belonging'],
    [/sustainab|green|environmental/i, 'sustainability'],
    [/\blearn\b|grow|development|mentorship/i, 'continuous learning'],
    [/transparency|open\s+culture|radical honesty/i, 'transparency'],
    [/innovat|experiment|try new things/i, 'innovation'],
    [/quality|excellence|craft|craftsmanship/i, 'quality and craft'],
    [/ownership|accountability|responsible/i, 'ownership'],
  ]
  return checks.filter(([re]) => re.test(jd)).map(([, val]) => val).slice(0, 3)
}

// ── Matching engine ───────────────────────────

const STOP_WORDS = new Set([
  'the', 'and', 'for', 'are', 'was', 'were', 'will', 'with', 'have', 'has', 'had',
  'been', 'that', 'this', 'from', 'they', 'our', 'you', 'your', 'able', 'also',
  'both', 'into', 'over', 'when', 'just', 'more', 'some', 'such', 'than', 'then',
  'them', 'these', 'those', 'very', 'any', 'all', 'can', 'not', 'but', 'its',
  'would', 'could', 'should', 'their', 'which', 'while', 'about', 'each', 'other'
])

// Technical terms get boosted weight in similarity scoring
const TECH_PATTERN = /^(?:[a-z]+js|[a-z]+sql|[a-z]+py|react|vue|angular|node|python|java(?:script)?|typescript|golang|rust|swift|kotlin|docker|kubernetes|terraform|aws|gcp|azure|redis|postgres|mysql|mongo|kafka|spark|airflow|dbt|figma|git|linux|bash|rest|grpc|graphql|ci|cd|api|sdk|orm|ml|ai|nlp|llm|devops|sre|k8s)$/i

function wordTokens(s) {
  return (s.toLowerCase().match(/\b[a-z]{2,}\b/g) || []).filter(w => !STOP_WORDS.has(w))
}

function weightedSimilarity(req, sentence) {
  const ta = wordTokens(req)
  const tb = new Set(wordTokens(sentence))
  if (ta.length === 0 || tb.size === 0) return 0
  let intersection = 0
  let totalWeight = 0
  for (const w of ta) {
    const weight = TECH_PATTERN.test(w) ? 2.5 : 1
    totalWeight += weight
    if (tb.has(w)) intersection += weight
  }
  return intersection / (totalWeight + tb.size - intersection)
}

function findBestMatches(requirements, resumeText) {
  const QUANT = /\d+%|\$[\d,]+|\d+[xX]|\d+\s*(?:million|billion|k\b|thousand)/i
  const sentences = resumeText
    .split(/[.\n]+/)
    .map(s => cleanBullet(s).trim())
    .filter(s => s.length > 20)

  const results = []
  for (const req of requirements) {
    let best = { sentence: null, score: 0 }
    for (const s of sentences) {
      const sc = weightedSimilarity(req, s) * (QUANT.test(s) ? 1.4 : 1)
      if (sc > best.score) best = { sentence: s, score: sc }
    }
    if (best.score > 0.04 && best.sentence) {
      results.push({ req, sentence: best.sentence, score: best.score })
    }
  }
  const usedSentences = new Set()
  return results
    .sort((a, b) => b.score - a.score)
    .filter(m => { if (usedSentences.has(m.sentence)) return false; usedSentences.add(m.sentence); return true })
    .slice(0, 6)
}

function matchSkillsToJD(skills, jd) {
  return skills.filter(s => new RegExp(`\\b${s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(jd))
}

// Derive the most representative requirement to anchor body paragraph
function pickAnchorRequirement(requirements) {
  if (!requirements.length) return null
  const ACTION = /\b(?:build|design|develop|architect|lead|drive|own|deliver|scale|optimize|implement|create)\b/i
  const technical = requirements.filter(r => ACTION.test(r))
  return technical[0] || requirements[0]
}

function extractKeyPhrase(requirement, maxWords = 5) {
  const stops = new Set(['a', 'an', 'the', 'and', 'or', 'to', 'of', 'in', 'for', 'with', 'ability', 'experience', 'strong', 'excellent', 'good', 'knowledge', 'understanding', 'proficiency', 'proven', 'track', 'record', 'at', 'least', 'years', 'working', 'familiarity', 'expertise', 'demonstrated', 'preferred', 'required'])
  const words = requirement.split(/\s+/).filter(w => !stops.has(w.toLowerCase()) && w.length > 2)
  return words.slice(0, maxWords).join(' ') || null
}

// ── Opening paragraph (multiple adaptive templates) ──────────

function buildOpening({ currentTitle, company, jobTitle, skills, missionHook, domain, tone, companyStage, jdSkillMatches }) {
  const topSkills = jdSkillMatches.length >= 2 ? jdSkillMatches.slice(0, 3) : skills.slice(0, 3)
  const roleRef = jobTitle || 'this opportunity'
  const companyRef = company || 'your organization'

  // Template A — mission-led opener
  if (missionHook) {
    const missionCore = missionHook.replace(/^(?:our mission(?: is)? to?|we(?:'re| are)\s+)/i, '').replace(/[.!?]$/, '')
    let p = `The goal of ${decap(missionCore)} resonates strongly with the work I find most meaningful, and it is precisely what drew me to the ${roleRef} at ${companyRef}.`
    if (currentTitle && topSkills.length) {
      p += ` As a ${currentTitle} with hands-on experience in ${joinList(topSkills.slice(0, 2))}, I believe I can contribute to that mission from the first day.`
    } else if (topSkills.length) {
      p += ` My background in ${joinList(topSkills)} is well-aligned with what this role demands, and I am eager to put it to work toward that goal.`
    }
    return p
  }

  // Template B — startup / high-growth
  if (companyStage === 'startup') {
    let p = `The ${roleRef} at ${companyRef} caught my eye immediately — the combination of genuine ownership, a fast-moving team, and problems worth solving is exactly the environment I seek out.`
    if (currentTitle && topSkills.length) {
      p += ` As a ${currentTitle} who has thrived in similar high-velocity settings, I bring depth in ${joinList(topSkills.slice(0, 2))} alongside the breadth and initiative that early-stage teams depend on.`
    } else if (topSkills.length) {
      p += ` I bring solid experience in ${joinList(topSkills)} and the kind of ownership mindset where no problem is "out of scope."`
    }
    return p
  }

  // Template C — enterprise / established company
  if (companyStage === 'enterprise') {
    let p = `I am writing to apply for the ${roleRef} at ${companyRef}.`
    if (currentTitle) {
      p += ` As an experienced ${currentTitle}`
      if (topSkills.length) p += ` with a strong background in ${joinList(topSkills.slice(0, 2))}`
      p += `, I bring the technical depth and collaborative maturity that a role of this scope requires.`
    } else if (topSkills.length) {
      p += ` With a well-rounded background in ${joinList(topSkills)}, I bring both the technical depth and professional approach that ${companyRef} expects.`
    }
    return p
  }

  // Template D — domain-specific hook (anchored on the role, not a claim about the candidate's career)
  if (domain) {
    let p = `The ${roleRef}${companyRef !== 'your organization' ? ' at ' + companyRef : ''} is an opportunity that aligns closely with my background in ${domain}.`
    if (currentTitle && topSkills.length) {
      p += ` As a ${currentTitle} with hands-on experience in ${joinList(topSkills.slice(0, 2))}, I am confident I can deliver on the expectations of this role from day one.`
    } else if (topSkills.length) {
      p += ` My hands-on experience in ${joinList(topSkills)} positions me well to add immediate value to your team.`
    } else if (currentTitle) {
      p += ` As a ${currentTitle}, I bring the technical depth and attention to craft this kind of work demands.`
    }
    return p
  }

  // Template E — tone-adaptive default
  let p = `I am excited to apply for the ${roleRef}${company ? ' at ' + company : ''}.`
  if (currentTitle) {
    p += ` As a ${currentTitle}`
    if (topSkills.length) p += ` with expertise in ${joinList(topSkills)}`
    p += `, I am confident I would make a meaningful contribution from the outset.`
  } else if (topSkills.length) {
    p += ` With a strong command of ${joinList(topSkills)}, I am well-positioned to deliver on the expectations of this role.`
  } else {
    p += ` I bring a blend of technical ability and professional drive that I am confident aligns well with what you are looking for.`
  }
  return p
}

// ── Body paragraphs ───────────────────────────

function buildExperienceParagraph({ matches, experienceBullets, quantifiedAchievements, requirements, resumeText, company }) {
  // Lead with the single strongest achievement
  const allCandidates = [
    ...quantifiedAchievements.slice(0, 3),
    ...(matches.map(m => m.sentence)),
    ...experienceBullets.slice(0, 3)
  ]
  if (!allCandidates.length) return ''

  const lead = allCandidates[0]
  const prevEmployer = extractPreviousEmployer(resumeText, company)
  let p = ''

  if (prevEmployer) {
    p = `In my role at ${prevEmployer}, I ${decap(cap(cleanBullet(lead)))}.`
  } else {
    p = `Throughout my career I have ${decap(cap(cleanBullet(lead)))}.`
  }

  // Add a complementary second example (different from the first)
  const second = allCandidates.find(c => c !== lead && c.length > 15)
  if (second) {
    p += ` More recently, I ${decap(cap(cleanBullet(second)))}.`
  }

  // Anchor to a concrete JD requirement
  const anchor = pickAnchorRequirement(requirements)
  if (anchor) {
    const kp = extractKeyPhrase(anchor)
    if (kp) p += ` These experiences translate directly to your need for someone who can ${decap(kp)}.`
  }

  return p
}

function buildSkillsAlignmentParagraph({ skills, jdSkillMatches, domain, tone, company, companyStage }) {
  const topSkills = [...new Set([...jdSkillMatches.slice(0, 4), ...skills.slice(0, 3)])].slice(0, 5)
  if (!topSkills.length) return ''

  let p = topSkills.length >= 3
    ? `My technical foundation spans ${joinList(topSkills)}`
    : topSkills.length === 2
      ? `My expertise in ${topSkills[0]} and ${topSkills[1]}`
      : `My expertise in ${topSkills[0]}`

  p += domain
    ? ` — a combination that gives me a thorough grounding in the full complexity of ${domain}.`
    : company
      ? ` — a skill set that positions me to deliver immediate, concrete value to ${company}.`
      : ` — the technical breadth this role requires.`

  // Behavioural / cultural fit sentence
  if (companyStage === 'startup') {
    p += ` I am equally at home architecting a solution from scratch and iterating on a live feature with user feedback in hand; the versatility that a growing team needs is something I actively cultivate.`
  } else if (tone === 'collaborative') {
    p += ` I have consistently worked at the intersection of engineering and business, partnering closely with product, design, and operations to ensure technical decisions serve wider company objectives.`
  } else if (tone === 'data-driven') {
    p += ` I approach every problem with a metrics-first mindset: defining clear success criteria before committing to an approach and measuring outcomes rigorously after delivery.`
  } else if (tone === 'innovative') {
    p += ` I stay close to emerging developments in the field and have a track record of introducing new approaches that meaningfully improved my team's quality and velocity.`
  } else if (tone === 'autonomous') {
    p += ` I thrive with high ownership: I identify problems before they are reported, propose solutions before they are requested, and see initiatives through from conception to production.`
  } else if (tone === 'fast-paced') {
    p += ` I work well under pressure, prioritise ruthlessly, and have a track record of shipping high-quality work on tight timelines without accruing unsustainable technical debt.`
  } else {
    p += ` I hold a consistently high bar for code quality and reliability, communicate proactively with stakeholders, and take full ownership of outcomes rather than just outputs.`
  }

  return p
}

function buildValueParagraph({ education, matches, experienceBullets, softSkills, domain, jd, companyValues, yearsExperience }) {
  // Prefer education if found — it adds credibility
  if (education) {
    let p = `My ${education} gave me the analytical rigour`
    if (domain) p += ` to tackle the deeper challenges that come with working in ${domain}`
    p += `, and I continue to invest in staying current through side projects, open-source contributions, and continuous professional development.`
    return p
  }

  // Surface a specific soft skill with a concrete supporting example
  if (softSkills.length > 0) {
    const skill = softSkills[0]
    let p = `Beyond technical execution, I bring strong ${skill}`
    if (softSkills[1]) p += ` and ${softSkills[1]}`
    const example = matches[2] || null
    if (example) {
      p += `. A concrete example: I ${decap(cap(cleanBullet(example.sentence || example)))}.`
    } else {
      p += ` — qualities that consistently allow me to bridge the gap between technical execution and measurable business impact.`
    }
    return p
  }

  // Third matched experience bullet as additional depth
  if (matches.length >= 3) {
    const s2 = cap(cleanBullet(matches[2].sentence))
    return `An additional dimension I would bring to this team: I have ${decap(s2)} — directly applicable to the scope and ambition described in this role.`
  }

  // Years of experience as a trust signal
  if (yearsExperience && yearsExperience > 2) {
    return `With ${yearsExperience > 10 ? 'over a decade' : yearsExperience + '+ years'} of hands-on experience, I have encountered and solved the kinds of challenges that only emerge at scale — and I have developed a clear intuition for anticipating them early.`
  }

  return ''
}

function buildClosing({ company, jobTitle, domain, companyValues, companyStage }) {
  const companyRef = company || 'your team'
  const roleRef = jobTitle || 'this role'
  let p = ''

  if (companyValues.length > 0) {
    p = `What draws me to ${companyRef} beyond the technical scope of this role is your commitment to ${joinList(companyValues.slice(0, 2))} — values that mirror my own approach to work.`
    p += ` I would welcome the opportunity to discuss how my background aligns with what you are looking for in a ${roleRef}.`
  } else if (companyStage === 'startup') {
    p = `I am genuinely energised by the ambition and pace at ${companyRef}, and I am ready to contribute at the speed and depth a growing company requires.`
    p += ` I would love to talk through how I can help the team move faster and build better.`
  } else if (companyStage === 'enterprise') {
    p = `I am excited about the opportunity to bring my experience to an organisation of ${companyRef}'s scale and reputation${domain ? ', particularly within ' + domain : ''}.`
    p += ` I would welcome a conversation about how my background fits the needs of the ${roleRef}.`
  } else {
    p = `I am genuinely excited about the prospect of joining ${companyRef}${domain ? ' and contributing to the work in ' + domain : ''}.`
    p += ` I would welcome the opportunity to discuss how my skills and experience map to the ${roleRef}'s requirements.`
  }

  p += ` Thank you for your time — I look forward to the possibility of connecting.`
  return p
}

// ── Cover letter builder ──────────────────────

function buildCoverLetter({ name, email, phone, city, currentTitle, skills, experienceBullets, education, jobTitle, company, requirements, matches, missionHook, tone, domain, jd, resumeText }) {
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  // Enrich context
  const companyStage = extractCompanyStage(jd)
  const companyValues = extractCompanyValues(jd)
  const softSkills = extractSoftSkills(resumeText)
  const quantifiedAchievements = extractQuantifiedAchievements(resumeText)
  const yearsExperience = extractYearsExperience(resumeText)
  const jdSkillMatches = matchSkillsToJD(skills, jd)

  const parts = []

  // ── Header ──
  if (name) {
    parts.push(name)
    const contact = [email, phone, city].filter(Boolean).join('  |  ')
    if (contact) parts.push(contact)
    parts.push('')
  }
  parts.push(today)
  parts.push('')
  // Only show company in header/salutation if it genuinely looks like a company name
  const safeCompany = company && !JOB_TITLE_WORDS.test(company) ? company : null
  if (safeCompany) {
    parts.push('Hiring Team')
    parts.push(safeCompany)
    parts.push('')
  }
  parts.push(`Dear ${safeCompany ? safeCompany + ' ' : ''}Hiring Manager,`)
  parts.push('')

  // ── Opening ──
  parts.push(buildOpening({ currentTitle, company: safeCompany, jobTitle, skills, missionHook, domain, tone, companyStage, jdSkillMatches }))
  parts.push('')

  // ── Experience body ──
  const p1 = buildExperienceParagraph({ matches, experienceBullets, quantifiedAchievements, requirements, resumeText, company: safeCompany })
  if (p1) { parts.push(p1); parts.push('') }

  // ── Skills and cultural alignment ──
  const p2 = buildSkillsAlignmentParagraph({ skills, jdSkillMatches, domain, tone, company: safeCompany, companyStage })
  if (p2) { parts.push(p2); parts.push('') }

  // ── Depth / value paragraph ──
  const p3 = buildValueParagraph({ education, matches, experienceBullets, softSkills, domain, jd, companyValues, yearsExperience })
  if (p3) { parts.push(p3); parts.push('') }

  // ── Closing ──
  parts.push(buildClosing({ company: safeCompany, jobTitle, domain, companyValues, companyStage }))
  parts.push('')

  // ── Signature ──
  parts.push('Sincerely,')
  parts.push(name || '[Your Name]')
  if (email) parts.push(email)
  if (phone) parts.push(phone)

  return parts.join('\n')
}

// ── Auto-fill: structured resume data → plain text ──

function resumeDataToText(data) {
  if (!data) return ''
  const { profile, exps, eds, skills, skills2, projs } = data
  const lines = []

  if (profile) {
    if (profile.name) lines.push(profile.name)
    if (profile.title) lines.push(profile.title)
    const contact = [profile.email, profile.phone, profile.address].filter(Boolean).join(' | ')
    if (contact) lines.push(contact)
    if (profile.linkedin) lines.push(`LinkedIn: ${profile.linkedin}`)
    if (profile.github) lines.push(`GitHub: ${profile.github}`)
    lines.push('')
    if (profile.summary) { lines.push('SUMMARY'); lines.push(profile.summary); lines.push('') }
  }

  if (exps && exps.length) {
    lines.push('EXPERIENCE')
    exps.forEach(e => {
      const period = [e.start, e.end || 'Present'].filter(Boolean).join(' – ')
      lines.push(`${e.title || ''}${e.company ? ' at ' + e.company : ''}${e.location ? ', ' + e.location : ''}${period ? ' | ' + period : ''}`)
      if (Array.isArray(e.resp)) e.resp.filter(Boolean).forEach(r => lines.push(`• ${r}`))
      lines.push('')
    })
  }

  if (eds && eds.length) {
    lines.push('EDUCATION')
    eds.forEach(e => {
      const deg = [e.degree, e.field && `in ${e.field}`, e.school, e.year].filter(Boolean).join(', ')
      if (deg) lines.push(deg)
    })
    lines.push('')
  }

  if (skills && skills.length) {
    lines.push('SKILLS')
    skills.forEach(sg => {
      // Support both { type, name: [] } and { name: string, items: [] } shapes
      const label = typeof sg.type === 'string' ? sg.type : (typeof sg.name === 'string' ? sg.name : '')
      const arr = Array.isArray(sg.name) ? sg.name : (Array.isArray(sg.items) ? sg.items : [])
      const items = arr.filter(Boolean).join(', ')
      if (label || items) lines.push(`${label ? label + ': ' : ''}${items}`)
    })
    // skills2 flat list
    if (skills2 && Array.isArray(skills2.name) && skills2.name.length) {
      lines.push(skills2.name.filter(Boolean).join(', '))
    }
    lines.push('')
  }

  if (projs && projs.length) {
    lines.push('PROJECTS')
    projs.forEach(p => {
      if (p.name) lines.push(`${p.name}${p.desc ? ': ' + p.desc : ''}`)
      if (Array.isArray(p.points)) p.points.filter(Boolean).forEach(pt => lines.push(`• ${pt}`))
    })
  }

  return lines.join('\n')
}

export default {
  name: 'CoverLetterPage',
  props: {
    maindata: { type: Object, default: null }
  },
  data() {
    return {
      resumeSource: 'custom',
      resumeText: '',
      jobDescription: '',
      coverLetterOutput: '',
      isGenerating: false,
      errorMsg: '',
      extractedInfo: null,
      copied: false,
      useAI: true
    }
  },
  computed: {
    hasResumeData() {
      if (!this.maindata) return false
      const p = this.maindata.profile || {}
      return !!(p.name || p.email || (this.maindata.exps && this.maindata.exps.length) || (this.maindata.skills && this.maindata.skills.length))
    },
    savedSkillCount() {
      if (!this.maindata) return 0
      const grouped = (this.maindata.skills || []).reduce((sum, sg) => {
        const arr = Array.isArray(sg.name) ? sg.name : (Array.isArray(sg.items) ? sg.items : [])
        return sum + arr.filter(Boolean).length
      }, 0)
      const flat = this.maindata.skills2 && Array.isArray(this.maindata.skills2.name)
        ? this.maindata.skills2.name.filter(Boolean).length
        : 0
      return grouped + flat
    },
    effectiveResumeText() {
      if (this.resumeSource === 'saved' && this.hasResumeData) {
        return resumeDataToText(this.maindata)
      }
      return this.resumeText
    },
    wordCount() {
      return this.coverLetterOutput.trim().split(/\s+/).filter(Boolean).length
    },
    generatingLabel() {
      return this.useAI ? 'Writing with AI…' : 'Crafting your letter…'
    },
    puterAvailable() {
      return typeof window !== 'undefined' && typeof window.puter !== 'undefined'
    }
  },
  watch: {
    hasResumeData: {
      immediate: true,
      handler(val) {
        if (val) this.resumeSource = 'saved'
      }
    }
  },
  methods: {
    autoFillResume() {
      this.resumeText = resumeDataToText(this.maindata)
    },

    generate() {
      this.errorMsg = ''
      const resumeForGen = this.effectiveResumeText
      if (!resumeForGen.trim() && !this.jobDescription.trim()) {
        this.errorMsg = 'Please provide your resume and a job description before generating.'
        return
      }
      if (!resumeForGen.trim()) {
        this.errorMsg = this.resumeSource === 'saved'
          ? 'No saved resume data found. Fill in your profile and experience first.'
          : 'Please paste your resume content.'
        return
      }
      if (!this.jobDescription.trim()) {
        this.errorMsg = 'Please paste the job description.'
        return
      }

      if (this.useAI && this.puterAvailable) {
        this._runGenerationAI()
      } else {
        if (this.useAI && !this.puterAvailable) {
          this.errorMsg = 'Puter.js not loaded yet. Falling back to Smart Template mode.'
          this.useAI = false
        }
        this.isGenerating = true
        this.coverLetterOutput = ''
        this.extractedInfo = null
        this.$nextTick(() => {
          setTimeout(() => {
            try {
              this._runGeneration()
            } catch (e) {
              this.errorMsg = 'Something went wrong. Please check your inputs and try again.'
              console.error('[CoverLetter]', e)
            } finally {
              this.isGenerating = false
            }
          }, 80)
        })
      }
    },

    async _runGenerationAI() {
      this.isGenerating = true
      this.coverLetterOutput = ''
      this.extractedInfo = null
      this.errorMsg = ''

      const resume = this.effectiveResumeText
      const jd = this.jobDescription

      // Extract context to make the prompt highly targeted
      const name = extractName(resume)
      const currentTitle = extractCurrentTitle(resume)
      const skills = extractSkills(resume)
      const jobTitle = extractJobTitle(jd)
      const company = extractCompany(jd)
      const requirements = extractRequirements(jd)
      const domain = extractDomain(jd)
      const tone = extractTone(jd)
      const companyStage = extractCompanyStage(jd)
      const jdSkillMatches = matchSkillsToJD(skills, jd)
      const quantifiedAchievements = extractQuantifiedAchievements(resume)

      const safeCompany = company && !JOB_TITLE_WORDS.test(company) ? company : null

      const contextLines = [
        name && `Candidate: ${name}${currentTitle ? ', ' + currentTitle : ''}`,
        jdSkillMatches.length && `Matching skills: ${jdSkillMatches.slice(0, 8).join(', ')}`,
        skills.length && `All skills: ${skills.slice(0, 12).join(', ')}`,
        quantifiedAchievements.length && `Key achievements:\n${quantifiedAchievements.slice(0, 3).map(a => '• ' + a).join('\n')}`,
        requirements.length && `JD requirements:\n${requirements.slice(0, 5).map(r => '• ' + r).join('\n')}`,
        domain && `Domain: ${domain}`,
        tone && `Company tone: ${tone}`,
        companyStage && `Company stage: ${companyStage}`,
      ].filter(Boolean).join('\n')

      const prompt = `You are an expert cover letter writer. Write a professional, tailored cover letter.

CONTEXT (extracted highlights):
${contextLines}

RESUME:
${resume.slice(0, 2500)}

JOB DESCRIPTION:
${jd.slice(0, 2500)}

INSTRUCTIONS:
- Address: Dear ${safeCompany ? safeCompany + ' ' : ''}Hiring Manager,
- Start with today's date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
- 3–4 tight paragraphs, under 400 words total
- Opening: hook tied to the company/role, not "I am writing to apply"
- Body: cite 1–2 specific achievements with numbers if available; mirror the JD's language
- Closing: genuine enthusiasm + clear call to action
- Sign off: Sincerely,\n${name || '[Your Name]'}
- Write ONLY the letter — no commentary, no preamble, no markdown`

      try {
        const response = await window.puter.ai.chat(prompt, {
          stream: true,
          model: 'gpt-4o-mini'
        })

        for await (const part of response) {
          if (part?.text) {
            this.coverLetterOutput += part.text
          }
        }

        // Surface extracted info after generation
        this.extractedInfo = {
          name: name || null,
          company: safeCompany || null,
          jobTitle: jobTitle || null,
          skillCount: skills.length || null,
          matchCount: jdSkillMatches.length || null,
          tone: tone || null,
          stage: companyStage || null,
          seniority: null
        }
      } catch (e) {
        console.error('[CoverLetter AI]', e)
        const msg = e?.message || ''
        if (msg.toLowerCase().includes('auth') || msg.toLowerCase().includes('sign')) {
          this.errorMsg = 'Sign in to Puter to use AI generation — a login window may have appeared. Then click Generate again.'
        } else if (msg.toLowerCase().includes('network') || msg.toLowerCase().includes('fetch')) {
          this.errorMsg = 'Network error reaching Puter AI. Check your connection and try again.'
        } else {
          this.errorMsg = 'AI generation failed. Switching to Smart Template mode.'
          this.useAI = false
          this.coverLetterOutput = ''
          this._runGenerationSync()
        }
      } finally {
        this.isGenerating = false
      }
    },

    _runGenerationSync() {
      this.isGenerating = true
      this.coverLetterOutput = ''
      this.extractedInfo = null
      this.$nextTick(() => {
        setTimeout(() => {
          try { this._runGeneration() } catch (e) {
            this.errorMsg = 'Generation failed. Please check your inputs.'
          } finally { this.isGenerating = false }
        }, 80)
      })
    },

    _runGeneration() {
      const resume = this.effectiveResumeText
      const jd = this.jobDescription

      // Extract from resume
      const name = extractName(resume)
      const email = extractEmail(resume)
      const phone = extractPhone(resume)
      const city = extractCity(resume)
      const currentTitle = extractCurrentTitle(resume)
      const skills = extractSkills(resume)
      const experienceBullets = extractExperienceBullets(resume)
      const education = extractEducationSummary(resume)

      // Extract from JD
      const jobTitle = extractJobTitle(jd)
      const company = extractCompany(jd)
      const requirements = extractRequirements(jd)
      const missionHook = extractMissionHook(jd)
      const tone = extractTone(jd)
      const domain = extractDomain(jd)

      // Match resume to requirements
      const matches = findBestMatches(requirements, resume)

      // Build letter
      this.coverLetterOutput = buildCoverLetter({
        name, email, phone, city, currentTitle,
        skills, experienceBullets, education,
        jobTitle, company, requirements,
        matches, missionHook, tone, domain,
        jd, resumeText: resume
      })

      // Surface what was detected
      const stage = extractCompanyStage(jd)
      const seniority = extractSeniorityLevel(jd)
      this.extractedInfo = {
        name: name || null,
        company: company || null,
        jobTitle: jobTitle || null,
        skillCount: skills.length || null,
        matchCount: matches.length || null,
        tone: tone || null,
        stage: stage || null,
        seniority: seniority !== 'mid' ? seniority : null
      }
    },

    copyToClipboard() {
      if (!this.coverLetterOutput) return
      if (navigator.clipboard) {
        navigator.clipboard.writeText(this.coverLetterOutput).then(() => {
          this.copied = true
          setTimeout(() => { this.copied = false }, 2000)
        })
      } else {
        // Fallback for older browsers
        const ta = document.createElement('textarea')
        ta.value = this.coverLetterOutput
        ta.style.position = 'fixed'
        ta.style.opacity = '0'
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
        this.copied = true
        setTimeout(() => { this.copied = false }, 2000)
      }
    },

    downloadTxt() {
      if (!this.coverLetterOutput) return
      const blob = new Blob([this.coverLetterOutput], { type: 'text/plain;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'cover-letter.txt'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }
}
</script>

<style scoped>
.cover-letter-page textarea.form-input {
  min-height: 200px;
}

/* Output textarea inherits the glass panel bg */
textarea:not(.form-input):focus {
  outline: none;
}
</style>
