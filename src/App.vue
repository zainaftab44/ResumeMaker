<template>
  <div class="gradient-bg min-h-screen text-white overflow-x-hidden">
    <!-- Header -->
    <header class="hud-header sticky top-0 z-50">
      <!-- scan line animation -->
      <div class="hud-scanline pointer-events-none"></div>
      <!-- bottom glow line -->
      <div class="absolute bottom-0 left-0 right-0 h-px" style="background: linear-gradient(90deg, transparent 0%, rgba(16,185,129,0.5) 20%, rgba(6,182,212,0.7) 50%, rgba(16,185,129,0.5) 80%, transparent 100%);"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between relative">

        <!-- Logo -->
        <div class="flex items-center gap-3">
          <div class="relative">
            <div class="w-8 h-8 flex items-center justify-center rounded-lg hud-logo-box">
              <svg class="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <!-- corner accents -->
            <span class="hud-corner hud-corner-tl"></span>
            <span class="hud-corner hud-corner-tr"></span>
            <span class="hud-corner hud-corner-bl"></span>
            <span class="hud-corner hud-corner-br"></span>
          </div>
          <div class="flex flex-col leading-none">
            <span class="text-base font-bold brand-font tracking-widest text-white uppercase">Resume<span class="hud-brand-accent">Forge</span></span>
            <span class="text-[9px] tracking-[0.25em] font-mono uppercase" style="color: rgba(16,185,129,0.5);">AI · ATS · Builder</span>
          </div>
        </div>

        <!-- Right controls -->
        <div class="flex items-center gap-2">
          <!-- Add section -->
          <button
            @click="addSection"
            class="hidden sm:flex items-center gap-1.5 hud-btn-ghost text-xs font-mono tracking-wider uppercase"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>Add</span>
          </button>

          <!-- Font selector -->
          <select
            v-model="settings.font"
            @change="updateFont(settings.font)"
            class="hidden sm:block hud-select text-xs font-mono"
            title="Change font"
          >
            <option v-for="f in fontOptions" :key="f" :value="f">{{ f }}</option>
          </select>

          <!-- Export PDF — primary CTA -->
          <button @click="exportPDF" class="hud-btn-primary text-xs font-mono tracking-widest uppercase flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export PDF
          </button>
        </div>
      </div>
    </header>

    <!-- Navigation Tabs -->
    <nav class="nav-strip sticky top-14 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <!-- right fade for overflow hint -->
        <div class="absolute right-4 top-0 bottom-0 w-10 pointer-events-none z-10" style="background: linear-gradient(90deg, transparent, rgba(6,9,18,0.95));"></div>

        <div class="flex items-center gap-1 py-2.5 overflow-x-auto hide-scrollbar">
          <template v-for="(tab, idx) in tabs">
            <!-- group spacer -->
            <div v-if="idx > 0 && tabGroups[idx]" :key="'sep-' + idx" class="w-px h-5 flex-shrink-0 mx-1" style="background: rgba(51,65,85,0.5);"></div>

            <button
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="['nav-pill flex-shrink-0', activeTab === tab.id ? 'nav-pill-active' : 'nav-pill-rest']"
            >
              <svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="tab.icon"></svg>
              <span>{{ tab.name }}</span>
              <span v-if="tab.id === 'history' && historyCount > 0" class="nav-count nav-count-green">{{ historyCount > 9 ? '9+' : historyCount }}</span>
              <span v-if="tab.id === 'letters' && lettersCount > 0" class="nav-count nav-count-violet">{{ lettersCount > 9 ? '9+' : lettersCount }}</span>
            </button>
          </template>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div :class="['grid gap-8', ['cover-letter','history','letters'].includes(activeTab) ? 'lg:grid-cols-1' : 'lg:grid-cols-2']">
        <!-- Left Panel - Forms -->
        <div class="space-y-6">
          <!-- Profile Tab -->
          <ProfilePage v-show="activeTab === 'profile'" :profile="profile" />

          <!-- Experience Tab -->
          <ExperiencePage
            v-show="activeTab === 'experience'"
            :exps="exps"
            @add="addExperience"
            @remove="removeExperience"
          />

          <!-- Education Tab -->
          <EducationPage
            v-show="activeTab === 'education'"
            :eds="eds"
            @add="addEducation"
            @remove="removeEducation"
          />

          <!-- Skills Tab -->
          <SkillsPage
            v-show="activeTab === 'skills'"
            :skills="skills"
            :skills2="skills2"
            :skillStyle="styles.skills"
            @add="addSkillGroup"
            @remove="removeSkillGroup"
            @update:skillStyle="styles.skills = $event"
          />

          <!-- Projects Tab -->
          <ProjectsPage
            v-show="activeTab === 'projects'"
            :projs="projs"
            @add="addProject"
            @remove="removeProject"
          />

          <!-- Preview Tab -->
          <PreviewPage
            v-show="activeTab === 'preview'"
            :template="selectedTemplate"
            :font="settings.font"
            :data="maindata"
            :showSummary="showSummary"
            :skillStyle="styles.skills"
            @update:template="selectedTemplate = $event"
            @update:font="updateFont"
            @update:showSummary="showSummary = $event"
            @update:skillStyle="updateSkillStyle"
          />

          <!-- ATS Scanner Tab -->
          <div v-show="activeTab === 'ats'" class="fade-in">
            <ATSScanner :maindata="maindata" />
          </div>

          <!-- Import/Export Tab -->
          <ImportExportPage
            v-show="activeTab === 'import'"
            :resumeData="maindata"
            @import="importData"
          />

          <!-- Cover Letter Tab -->
          <CoverLetterPage
            v-show="activeTab === 'cover-letter'"
            :maindata="maindata"
          />

          <!-- ATS History Tab -->
          <HistoryPage v-if="activeTab === 'history'" />

          <!-- Letter History Tab -->
          <LetterHistoryPage v-if="activeTab === 'letters'" />

          <!-- ATS Sidebar -->
          <div v-if="activeTab === 'preview'" class="glass-panel rounded-2xl p-6">
            <ATSSidebar :resumeData="maindata" @open-scanner="activeTab = 'ats'" />
          </div>
        </div>

        <!-- Right Panel - Live Preview (hidden on cover-letter / history tabs) -->
        <div v-show="!['cover-letter','history','letters'].includes(activeTab)" class="lg:sticky lg:top-32 h-fit">
          <div class="glass-panel rounded-2xl p-5 mb-4">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-sm font-semibold brand-font flex items-center space-x-2 text-slate-300">
                <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>Live Preview</span>
                <span class="flex items-center space-x-1 text-xs text-slate-500 font-normal">
                  <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block"></span>
                  <span>live</span>
                </span>
              </h3>
              <button @click="exportPDF" class="flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 hover:border-emerald-500/50 rounded-lg transition-all text-xs font-medium text-emerald-400">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Export PDF</span>
              </button>
            </div>

            <div class="preview-wrapper">
              <div id="resume-preview" class="bg-white" :style="fontStyle">
                <Template v-if="selectedTemplate === '1'" :data="maindata" @reorder-sections="reorderSections" />
                <Template2 v-else-if="selectedTemplate === '2'" :data="maindata" @reorder-sections="reorderSections" />
                <TemplateTwoColumns v-else-if="selectedTemplate === '3'" :data="maindata" />
                <Template4 v-else-if="selectedTemplate === '4'" :data="maindata" @reorder-sections="reorderSections" />
                <Template5 v-else-if="selectedTemplate === '5'" :data="maindata" />
                <Template6 v-else-if="selectedTemplate === '6'" :data="maindata" @reorder-sections="reorderSections" />
                <Template7 v-else-if="selectedTemplate === '7'" :data="maindata" @reorder-sections="reorderSections" />
                <Template8 v-else-if="selectedTemplate === '8'" :data="maindata" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Ctrl+S saved toast -->
    <transition name="toast">
      <div v-if="savedToast" class="saved-toast">
        <svg class="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <span>Saved</span>
      </div>
    </transition>

    <!-- Footer -->
    <footer class="relative mt-20 overflow-hidden" style="background: linear-gradient(180deg, transparent 0%, rgba(4,8,18,0.95) 8%, #020612 100%);">
      <!-- Grid texture overlay -->
      <div class="absolute inset-0 pointer-events-none" style="background-image: linear-gradient(rgba(16,185,129,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.03) 1px, transparent 1px); background-size: 40px 40px;"></div>
      <!-- Top glow line -->
      <div class="absolute top-0 left-0 right-0 h-px" style="background: linear-gradient(90deg, transparent 0%, rgba(16,185,129,0.4) 20%, rgba(6,182,212,0.6) 50%, rgba(16,185,129,0.4) 80%, transparent 100%);"></div>
      <!-- Ambient glow -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px]" style="box-shadow: 0 0 80px 20px rgba(16,185,129,0.08);"></div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">

        <!-- Top section: brand + tagline centered -->
        <div class="text-center mb-12">
          <div class="inline-flex items-center gap-3 mb-4">
            <div class="relative">
              <div class="w-10 h-10 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg" style="box-shadow: 0 0 20px rgba(16,185,129,0.4);">
                <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <span class="text-2xl font-bold brand-font text-white tracking-tight">Resume<span class="text-transparent bg-clip-text" style="background-image: linear-gradient(90deg, #10b981, #06b6d4);">Forge</span></span>
          </div>
          <p class="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
            AI-powered resume builder with ATS optimization, cover letter generation, and real-time templates. Your data never leaves your browser.
          </p>
          <!-- Status pill -->
          <div class="inline-flex items-center gap-2 mt-4 px-3 py-1.5 rounded-full text-xs" style="background: rgba(16,185,129,0.06); border: 1px solid rgba(16,185,129,0.15);">
            <span class="w-1.5 h-1.5 bg-emerald-400 rounded-full" style="box-shadow: 0 0 6px rgba(16,185,129,0.8);"></span>
            <span class="text-emerald-400 font-medium">All systems operational</span>
            <span class="text-slate-600">·</span>
            <span class="text-slate-500">100% client-side · no data sent</span>
          </div>
        </div>

        <!-- Divider with node dots -->
        <div class="relative flex items-center mb-10">
          <div class="flex-1 h-px" style="background: linear-gradient(90deg, transparent, rgba(51,65,85,0.6));"></div>
          <div class="flex items-center gap-2 px-4">
            <div class="w-1 h-1 rounded-full bg-slate-700"></div>
            <div class="w-1.5 h-1.5 rounded-full bg-emerald-500/40"></div>
            <div class="w-1 h-1 rounded-full bg-slate-700"></div>
          </div>
          <div class="flex-1 h-px" style="background: linear-gradient(90deg, rgba(51,65,85,0.6), transparent);"></div>
        </div>

        <!-- Links grid -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">

          <!-- Features -->
          <div>
            <p class="text-xs font-semibold tracking-widest uppercase mb-4" style="color: rgba(16,185,129,0.6);">Features</p>
            <ul class="space-y-2">
              <li v-for="item in footerFeatures" :key="item.label">
                <button
                  @click="activeTab = item.tab; scrollTop()"
                  class="footer-neu-link w-full text-left text-sm text-slate-400"
                >{{ item.label }}</button>
              </li>
            </ul>
          </div>

          <!-- History -->
          <div>
            <p class="text-xs font-semibold tracking-widest uppercase mb-4" style="color: rgba(6,182,212,0.6);">History</p>
            <ul class="space-y-2">
              <li>
                <button @click="activeTab = 'history'; scrollTop()" class="footer-neu-link w-full text-left text-sm text-slate-400">Scan History</button>
              </li>
              <li>
                <button @click="activeTab = 'letters'; scrollTop()" class="footer-neu-link w-full text-left text-sm text-slate-400">Letter History</button>
              </li>
              <li>
                <button @click="activeTab = 'import'; scrollTop()" class="footer-neu-link w-full text-left text-sm text-slate-400">Import / Export</button>
              </li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <p class="text-xs font-semibold tracking-widest uppercase mb-4" style="color: rgba(139,92,246,0.6);">Contact</p>
            <ul class="space-y-2 text-sm">
              <li class="footer-neu-link flex items-center gap-2 text-slate-400 cursor-default">
                <svg class="w-3.5 h-3.5 flex-shrink-0" style="color: rgba(139,92,246,0.5);" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                Lahore, PK
              </li>
              <li>
                <a href="mailto:zainaftab44@gmail.com" class="footer-neu-link flex items-center gap-2 text-slate-400 break-all">
                  <svg class="w-3.5 h-3.5 flex-shrink-0" style="color: rgba(139,92,246,0.5);" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  zainaftab44@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <!-- Links -->
          <div>
            <p class="text-xs font-semibold tracking-widest uppercase mb-4" style="color: rgba(251,191,36,0.55);">Links</p>
            <ul class="space-y-2 text-sm">
              <li>
                <a href="https://zainaftab.netlify.app" target="_blank" rel="noopener" class="footer-neu-link block text-slate-400">About</a>
              </li>
              <li>
                <a href="https://www.github.com/zainaftab44" target="_blank" rel="noopener" class="footer-neu-link block text-slate-400">GitHub</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/zainaftab" target="_blank" rel="noopener" class="footer-neu-link block text-slate-400">LinkedIn</a>
              </li>
              <li>
                <a href="https://www.skynetlabz.com" target="_blank" rel="noopener" class="footer-neu-link block text-slate-400">Website</a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Bottom bar -->
        <div class="relative pt-6" style="border-top: 1px solid rgba(51,65,85,0.4);">
          <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
            <!-- Left: copyright -->
            <div class="flex items-center gap-3 text-xs text-slate-600">
              <span class="font-mono" style="color: rgba(16,185,129,0.5);">v2.0</span>
              <span class="w-px h-3 bg-slate-700"></span>
              <span>&copy; 2025 Resume Forge &mdash; Zain Aftab</span>
            </div>

            <!-- Center: keyboard hint -->
            <div class="flex items-center gap-2 text-xs text-slate-600">
              <kbd class="px-1.5 py-0.5 rounded text-slate-500 font-mono text-xs" style="background: rgba(30,41,59,0.8); border: 1px solid rgba(51,65,85,0.6);">Ctrl</kbd>
              <span>+</span>
              <kbd class="px-1.5 py-0.5 rounded text-slate-500 font-mono text-xs" style="background: rgba(30,41,59,0.8); border: 1px solid rgba(51,65,85,0.6);">S</kbd>
              <span class="text-slate-700">save</span>
              <span class="w-px h-3 bg-slate-700"></span>
              <kbd class="px-1.5 py-0.5 rounded text-slate-500 font-mono text-xs" style="background: rgba(30,41,59,0.8); border: 1px solid rgba(51,65,85,0.6);">Ctrl</kbd>
              <span>+</span>
              <kbd class="px-1.5 py-0.5 rounded text-slate-500 font-mono text-xs" style="background: rgba(30,41,59,0.8); border: 1px solid rgba(51,65,85,0.6);">P</kbd>
              <span class="text-slate-700">print</span>
            </div>

            <!-- Right: social icons -->
            <div class="flex items-center gap-3">
              <a href="https://www.github.com/zainaftab44" class="w-7 h-7 flex items-center justify-center rounded-lg text-slate-600 hover:text-emerald-400 transition-all" style="border: 1px solid rgba(51,65,85,0.4);" onmouseover="this.style.borderColor='rgba(16,185,129,0.4)';this.style.background='rgba(16,185,129,0.06)'" onmouseout="this.style.borderColor='rgba(51,65,85,0.4)';this.style.background='transparent'">
                <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/zainaftab" class="w-7 h-7 flex items-center justify-center rounded-lg text-slate-600 hover:text-cyan-400 transition-all" style="border: 1px solid rgba(51,65,85,0.4);" onmouseover="this.style.borderColor='rgba(6,182,212,0.4)';this.style.background='rgba(6,182,212,0.06)'" onmouseout="this.style.borderColor='rgba(51,65,85,0.4)';this.style.background='transparent'">
                <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://www.twitter.com/zkingleo2009" class="w-7 h-7 flex items-center justify-center rounded-lg text-slate-600 hover:text-slate-300 transition-all" style="border: 1px solid rgba(51,65,85,0.4);" onmouseover="this.style.borderColor='rgba(100,116,139,0.5)';this.style.background='rgba(100,116,139,0.06)'" onmouseout="this.style.borderColor='rgba(51,65,85,0.4)';this.style.background='transparent'">
                <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  </div>
</template>

<script>
import ProfilePage from './components/pages/Profile.vue'
import ExperiencePage from './components/pages/Experience.vue'
import EducationPage from './components/pages/Education.vue'
import SkillsPage from './components/pages/Skills.vue'
import ProjectsPage from './components/pages/Projects.vue'
import PreviewPage from './components/pages/Preview.vue'
import Template from './components/templates/Template.vue'
import Template2 from './components/templates/Template2.vue'
import Template4 from './components/templates/Template4.vue'
import Template5 from './components/templates/Template5.vue'
import Template6 from './components/templates/Template6.vue'
import Template7 from './components/templates/Template7.vue'
import Template8 from './components/templates/Template8.vue'
import TemplateTwoColumns from './components/templates/TwoColumns/TemplateTwoColumns.vue'
import ImportExportPage from './components/pages/Import.vue'
import ATSScanner from './components/ATSScanner.vue'
import ATSSidebar from './components/ATSSidebar.vue'
import CoverLetterPage from './components/pages/CoverLetter.vue'
import HistoryPage from './components/pages/History.vue'
import LetterHistoryPage from './components/pages/LetterHistory.vue'

export default {
  name: 'App',
  components: {
    ProfilePage,
    ExperiencePage,
    EducationPage,
    SkillsPage,
    ProjectsPage,
    PreviewPage,
    Template,
    Template2,
    Template4,
    Template5,
    Template6,
    Template7,
    Template8,
    TemplateTwoColumns,
    ImportExportPage,
    ATSScanner,
    ATSSidebar,
    CoverLetterPage,
    HistoryPage,
    LetterHistoryPage
  },
  data() {
    return {
      activeTab: 'profile',
      selectedTemplate: '1',

      tabs: [
        { id: 'profile', name: 'Profile', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />' },
        { id: 'experience', name: 'Experience', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />' },
        { id: 'education', name: 'Education', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />' },
        { id: 'skills', name: 'Skills', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />' },
        { id: 'projects', name: 'Projects', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />' },
        { id: 'preview', name: 'Preview', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />' },
        { id: 'ats', name: 'ATS', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />' },
        { id: 'cover-letter', name: 'Cover Letter', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />' },
        { id: 'import', name: 'Import', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />' },
        { id: 'history', name: 'History', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />' },
        { id: 'letters', name: 'Letters', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />' }
      ],

      profile: {
        name: '',
        title: '',
        email: '',
        phone: '',
        address: '',
        website: '',
        github: '',
        linkedin: '',
        summary: ''
      },

      exps: [],
      eds: [],
      skills: [],
      skills2: { name: [] },
      projs: [],
      awds: [],
      showSummary: true,
      styles: { skills: 1 },
      settings: { font: 'Arial' },
      sectionOrder: ['exps', 'skills', 'eds', 'projs'],
      savedToast: false,
      footerFeatures: [
        { label: 'Cover Letter Writer', tab: 'cover-letter' },
        { label: 'ATS Scanner', tab: 'ats' },
        { label: 'Resume Preview', tab: 'preview' },
        { label: 'Skills Editor', tab: 'skills' },
        { label: 'Experience', tab: 'experience' }
      ]
    }
  },

  computed: {
    tabGroups() {
      // Returns true at indices where a separator should appear before the tab
      // Groups: [profile,experience,education,skills,projects,preview] | [ats,cover-letter,import] | [history,letters]
      const separatorBefore = { 'ats': true, 'history': true }
      return this.tabs.map(t => !!separatorBefore[t.id])
    },
    historyCount() {
      try { return JSON.parse(localStorage.getItem('atsHistory') || '[]').length } catch { return 0 }
    },
    lettersCount() {
      try { return JSON.parse(localStorage.getItem('coverLetterHistory') || '[]').length } catch { return 0 }
    },
    fontOptions() {
      return [
        'Arial', 'Arial Narrow', 'Calibri', 'Consolas', 'Courier New',
        'Georgia', 'Helvetica', 'Lato', 'Montserrat', 'Open Sans',
        'Roboto', 'Segoe UI', 'Times New Roman', 'Verdana'
      ].sort()
    },
    maindata() {
      const profileForPreview = Object.assign({}, this.profile)
      if (!this.showSummary) {
        profileForPreview.summary = ''
      }
      return {
        profile: profileForPreview,
        exps: this.exps,
        eds: this.eds,
        skills: this.skills,
        skills2: this.skills2,
        projs: this.projs,
        awds: this.awds,
        styles: this.styles,
        settings: this.settings,
        sectionOrder: this.sectionOrder
      }
    },
    fontStyle() {
      return { 'font-family': this.settings.font }
    }
  },

  watch: {
    maindata: {
      deep: true,
      handler() {
        this.$nextTick(() => { this.updatePreviewScale() })
      }
    }
  },

  methods: {
    addExperience() {
      this.exps.push({
        title: '',
        company: '',
        location: '',
        start: '',
        end: '',
        resp: ['']
      })
    },

    removeExperience(index) {
      this.exps.splice(index, 1)
    },

    addEducation() {
      this.eds.push({
        degree: '',
        major: '',
        institute: '',
        location: '',
        start: '',
        end: ''
      })
    },

    removeEducation(index) {
      this.eds.splice(index, 1)
    },

    addSkillGroup() {
      this.skills.push({
        type: '',
        name: ['']
      })
    },

    removeSkillGroup(index) {
      this.skills.splice(index, 1)
    },

    addProject() {
      this.projs.push({
        title: '',
        desc: '',
        link: '',
        start: '',
        end: '',
        tools: [''],
        resp: ['']
      })
    },

    removeProject(index) {
      this.projs.splice(index, 1)
    },

    getResumeData() {
      return {
        profile: this.profile,
        exps: this.exps,
        eds: this.eds,
        skills: this.skills,
        projs: this.projs
      }
    },

    exportPDF() {
      const preview = document.getElementById('resume-preview')
      if (!preview) return

      const printWindow = window.open('', '_blank')
      printWindow.document.write(`<!DOCTYPE html>
<html>
<head>
  <title>Resume - ${this.profile.name || 'ResumeForge'}</title>
  <style>
    @page { size: A4 portrait; margin: 0.5cm; }
    * { margin: 0; padding: 0; box-sizing: border-box; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; color-adjust: exact !important; }
    body { font-family: '${this.settings.font}', Arial, sans-serif; background: white; }
    #print-content { width: 21cm; margin: 0 auto; background: white; }
  </style>
</head>
<body>
  <div id="print-content">${preview.innerHTML}</div>
  <script>window.onload = function() { window.print(); window.onafterprint = function() { window.close(); }; }<\/script>
</body>
</html>`)
      printWindow.document.close()
    },

    reorderSections(newOrder) {
      this.sectionOrder = newOrder
    },

    toggleStyle() {
      const current = parseInt(this.selectedTemplate)
      this.selectedTemplate = String(current >= 8 ? 1 : current + 1)
    },

    updateFont(font) {
      this.$set(this.settings, 'font', font)
    },

    updateSkillStyle(style) {
      this.$set(this.styles, 'skills', style)
    },

    importData(data) {
      if (data.profile) Object.assign(this.profile, data.profile)
      if (data.exps) this.exps = data.exps
      if (data.eds) this.eds = data.eds
      if (data.skills) this.skills = data.skills
      if (data.skills2) this.skills2 = data.skills2
      if (data.projs) this.projs = data.projs
      if (data.awds) this.awds = data.awds
      if (data.styles) Object.assign(this.styles, data.styles)
      if (data.settings) Object.assign(this.settings, data.settings)
      if (data.selectedTemplate) this.selectedTemplate = data.selectedTemplate
    },

    updatePreviewScale() {
      const wrapper = document.querySelector('.preview-wrapper')
      const preview = document.getElementById('resume-preview')
      if (wrapper && preview) {
        const containerWidth = wrapper.clientWidth
        const a4Width = 793.7 // 21cm in px at 96dpi
        const scale = containerWidth / a4Width
        wrapper.style.setProperty('--preview-scale', scale)
        // Set wrapper height to match scaled content
        const contentHeight = preview.scrollHeight
        wrapper.style.height = (contentHeight * scale) + 'px'
      }
    },

    saveData() {
      localStorage.setItem('resumeData', JSON.stringify({
        profile: this.profile,
        exps: this.exps,
        eds: this.eds,
        skills: this.skills,
        skills2: this.skills2,
        projs: this.projs,
        awds: this.awds,
        styles: this.styles,
        settings: this.settings,
        selectedTemplate: this.selectedTemplate,
        sectionOrder: this.sectionOrder
      }))
    },

    showSavedToast() {
      this.savedToast = true
      setTimeout(() => { this.savedToast = false }, 2000)
    },

    onKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        this.saveData()
        this.showSavedToast()
      }
    },

    scrollTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },

    addSection() {
      const actions = {
        experience: () => this.addExperience(),
        education: () => this.addEducation(),
        skills: () => this.addSkillGroup(),
        projects: () => this.addProject()
      }

      if (actions[this.activeTab]) {
        actions[this.activeTab]()
      }
    }
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.updatePreviewScale)
    window.removeEventListener('keydown', this.onKeyDown)
    if (this._previewResizeObserver) this._previewResizeObserver.disconnect()
  },

  mounted() {
    const saved = localStorage.getItem('resumeData')
    if (saved) {
      const data = JSON.parse(saved)
      if (data.profile) Object.assign(this.profile, data.profile)
      if (data.exps) this.exps = data.exps
      if (data.eds) this.eds = data.eds
      if (data.skills) this.skills = data.skills
      if (data.skills2) this.skills2 = data.skills2
      if (data.projs) this.projs = data.projs
      if (data.awds) this.awds = data.awds
      if (data.styles) Object.assign(this.styles, data.styles)
      if (data.settings) Object.assign(this.settings, data.settings)
      if (data.selectedTemplate) this.selectedTemplate = data.selectedTemplate
      if (data.sectionOrder) this.sectionOrder = data.sectionOrder
    }

    // Scale preview to fit container
    this.$nextTick(() => {
      this.updatePreviewScale()
      // Re-run once child templates have finished rendering
      setTimeout(() => { this.updatePreviewScale() }, 150)
    })
    window.addEventListener('resize', this.updatePreviewScale)

    // Recalculate whenever the resume content grows/shrinks
    const preview = document.getElementById('resume-preview')
    if (preview && window.ResizeObserver) {
      this._previewResizeObserver = new ResizeObserver(() => { this.updatePreviewScale() })
      this._previewResizeObserver.observe(preview)
    }
    window.addEventListener('keydown', this.onKeyDown)

    // Auto-save every 5 seconds
    setInterval(() => { this.saveData() }, 5000)
  }
}
</script>

<style>
* {
  font-family: 'Inter', sans-serif;
}

h1, h2, h3, .brand-font {
  font-family: 'Space Grotesk', sans-serif;
}

.gradient-bg {
  background: linear-gradient(145deg, #080e1a 0%, #0f172a 50%, #111827 100%);
  min-height: 100vh;
}

.glass-panel {
  background: rgba(22, 32, 50, 0.75);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.07);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255,255,255,0.04);
}

.form-input {
  width: 100%;
  background: rgba(10, 17, 32, 0.6);
  border: 1px solid rgba(51, 65, 85, 0.8);
  border-radius: 0.5rem;
  padding: 0.625rem 0.875rem;
  color: #e2e8f0;
  font-size: 0.875rem;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.form-input:focus {
  outline: none;
  border-color: rgba(16, 185, 129, 0.7);
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.12);
}

.form-input::placeholder {
  color: rgb(71, 85, 105);
}

select.form-input {
  appearance: auto;
}

.fade-in {
  animation: fadeIn 0.25s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.tab-scroll-container {
  position: relative;
}

/* Scaled preview wrapper */
.preview-wrapper {
  width: 100%;
  overflow: hidden;
  border-radius: 0.625rem;
  box-shadow:
    0 0 0 1px rgba(255,255,255,0.06),
    0 20px 60px -12px rgba(0, 0, 0, 0.5);
  background: white;
  position: relative;
}

#resume-preview {
  width: 21cm;
  transform-origin: top left;
  transform: scale(var(--preview-scale, 0.5));
}

/* Ctrl+S saved toast */
.saved-toast {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.35);
  border-radius: 0.625rem;
  color: #6ee7b7;
  font-size: 0.8125rem;
  font-weight: 500;
  backdrop-filter: blur(12px);
  pointer-events: none;
}

.toast-enter-active, .toast-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.toast-enter, .toast-leave-to {
  opacity: 0;
  transform: translateY(0.375rem);
}

/* ── HUD Header ─────────────────────────────── */
.hud-header {
  position: relative;
  background: rgba(2, 6, 18, 0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(16, 185, 129, 0.12);
}

.hud-scanline {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(16, 185, 129, 0.012) 2px,
    rgba(16, 185, 129, 0.012) 4px
  );
  pointer-events: none;
}

/* Animated corner accent on the logo box */
.hud-logo-box {
  background: rgba(16, 185, 129, 0.06);
  border: 1px solid rgba(16, 185, 129, 0.25);
  box-shadow: 0 0 12px rgba(16, 185, 129, 0.1), inset 0 0 8px rgba(16, 185, 129, 0.05);
}

.hud-corner {
  position: absolute;
  width: 5px;
  height: 5px;
  border-color: rgba(16, 185, 129, 0.7);
  border-style: solid;
}
.hud-corner-tl { top: -2px; left: -2px; border-width: 1.5px 0 0 1.5px; }
.hud-corner-tr { top: -2px; right: -2px; border-width: 1.5px 1.5px 0 0; }
.hud-corner-bl { bottom: -2px; left: -2px; border-width: 0 0 1.5px 1.5px; }
.hud-corner-br { bottom: -2px; right: -2px; border-width: 0 1.5px 1.5px 0; }

.hud-brand-accent {
  background: linear-gradient(90deg, #10b981, #06b6d4);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Ghost button */
.hud-btn-ghost {
  padding: 0.375rem 0.75rem;
  color: rgba(100, 116, 139, 0.9);
  border: 1px solid rgba(51, 65, 85, 0.6);
  border-radius: 0.375rem;
  transition: all 0.15s ease;
  background: transparent;
}
.hud-btn-ghost:hover {
  color: #10b981;
  border-color: rgba(16, 185, 129, 0.4);
  background: rgba(16, 185, 129, 0.06);
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.1);
}

/* Font select */
.hud-select {
  padding: 0.375rem 0.625rem;
  color: rgba(100, 116, 139, 0.9);
  background: rgba(10, 17, 32, 0.7);
  border: 1px solid rgba(51, 65, 85, 0.6);
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.15s ease;
  appearance: auto;
}
.hud-select:hover, .hud-select:focus {
  outline: none;
  color: #e2e8f0;
  border-color: rgba(16, 185, 129, 0.4);
  background: rgba(16, 185, 129, 0.05);
}

/* Primary CTA button */
.hud-btn-primary {
  padding: 0.4rem 1rem;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%);
  border: 1px solid rgba(16, 185, 129, 0.4);
  border-radius: 0.375rem;
  color: #6ee7b7;
  transition: all 0.15s ease;
  position: relative;
  overflow: hidden;
}
.hud-btn-primary::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(6, 182, 212, 0.2));
  opacity: 0;
  transition: opacity 0.15s ease;
}
.hud-btn-primary:hover::before { opacity: 1; }
.hud-btn-primary:hover {
  border-color: rgba(16, 185, 129, 0.7);
  color: #a7f3d0;
  box-shadow: 0 0 16px rgba(16, 185, 129, 0.2), inset 0 0 8px rgba(16, 185, 129, 0.05);
}

/* ── Nav Strip / Pill Chips ──────────────────── */
.nav-strip {
  background: rgba(4, 8, 20, 0.9);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(30, 42, 64, 0.8);
}

.nav-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.8rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 500;
  white-space: nowrap;
  transition: all 0.15s ease;
  border: none;
  cursor: pointer;
}

.nav-pill-rest {
  color: rgba(100, 116, 139, 0.75);
  background: transparent;
}
.nav-pill-rest:hover {
  color: rgba(203, 213, 225, 0.9);
  background: rgba(30, 42, 64, 0.6);
  box-shadow: 2px 2px 6px rgba(0,0,0,0.35), -1px -1px 3px rgba(255,255,255,0.025);
}

.nav-pill-active {
  color: #6ee7b7;
  background: linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(6,182,212,0.12) 100%);
  border: 1px solid rgba(16,185,129,0.3);
  box-shadow: 0 0 10px rgba(16,185,129,0.12), inset 0 1px 0 rgba(255,255,255,0.05);
}

.nav-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1rem;
  height: 1rem;
  padding: 0 0.25rem;
  font-size: 9px;
  font-weight: 700;
  border-radius: 9999px;
  line-height: 1;
}
.nav-count-green {
  background: rgba(16,185,129,0.15);
  color: #10b981;
  border: 1px solid rgba(16,185,129,0.3);
}
.nav-count-violet {
  background: rgba(139,92,246,0.15);
  color: #a78bfa;
  border: 1px solid rgba(139,92,246,0.3);
}

/* ── Footer reset ────────────────────────────── */
footer ul, footer ol {
  padding: 0;
  margin: 0;
  list-style: none;
}
footer li::before {
  content: '';
  display: none;
}

/* ── Footer Neumorphic Links ─────────────────── */
.footer-neu-link {
  display: block;
  padding: 0.3rem 0.7rem;
  border-radius: 0.5rem;
  font-size: 0.8125rem;
  background: rgba(10, 17, 34, 0.5);
  box-shadow: 2px 2px 6px rgba(0,0,0,0.4), -1px -1px 3px rgba(255,255,255,0.025);
  transition: all 0.15s ease;
  color: rgba(148, 163, 184, 0.8);
  cursor: pointer;
  border: none;
  text-decoration: none;
}
.footer-neu-link:hover {
  color: #e2e8f0;
  background: rgba(16, 26, 46, 0.7);
  box-shadow: inset 2px 2px 5px rgba(0,0,0,0.5), inset -1px -1px 3px rgba(255,255,255,0.02);
}

/* ── HUD Nav (legacy) ────────────────────────── */
.hud-nav {
  position: relative;
  background: rgba(2, 6, 18, 0.88);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.hud-tab {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.65rem 0.875rem;
  white-space: nowrap;
  transition: all 0.15s ease;
  background: transparent;
  border: none;
}

.hud-tab-inactive {
  color: rgba(100, 116, 139, 0.7);
}
.hud-tab-inactive:hover {
  color: rgba(226, 232, 240, 0.9);
  background: rgba(16, 185, 129, 0.04);
}

.hud-tab-active {
  color: #6ee7b7;
  background: rgba(16, 185, 129, 0.06);
}

/* animated bottom indicator */
.hud-tab-bar {
  position: absolute;
  bottom: 0;
  left: 8px;
  right: 8px;
  height: 2px;
  background: linear-gradient(90deg, #10b981, #06b6d4);
  border-radius: 2px 2px 0 0;
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.6);
}

.hud-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.1rem;
  height: 1.1rem;
  font-size: 9px;
  font-weight: 700;
  border-radius: 9999px;
  line-height: 1;
}
.hud-badge-green {
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.3);
}
.hud-badge-violet {
  background: rgba(139, 92, 246, 0.15);
  color: #a78bfa;
  border: 1px solid rgba(139, 92, 246, 0.3);
}

#resume-preview ul,
#resume-preview ol {
  list-style: none !important;
  list-style-type: none !important;
  padding-left: 0;
  margin-left: 0;
}

#resume-preview li {
  list-style: none !important;
  list-style-type: none !important;
}

#resume-preview li::before,
#resume-preview li::marker {
  content: none !important;
  display: none !important;
}
</style>
