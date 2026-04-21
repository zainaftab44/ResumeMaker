<template>
  <div class="gradient-bg min-h-screen text-white overflow-x-hidden">
    <!-- Header -->
    <header class="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="relative">
            <div class="w-8 h-8 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div class="absolute inset-0 bg-emerald-500 rounded-lg pulse-ring"></div>
          </div>
          <span class="text-xl font-bold brand-font tracking-tight">Resume Forge</span>
        </div>

        <div class="flex items-center space-x-4">
          <button @click="addSection" class="hidden sm:flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-all text-sm font-medium">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>Add</span>
          </button>

          <button @click="toggleStyle" class="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-all text-sm font-medium">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
          </button>

          <button @click="exportPDF" class="px-4 py-2 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 rounded-lg transition-all text-sm font-medium">
            Export PDF
          </button>
        </div>
      </div>
    </header>

    <!-- Navigation Tabs -->
    <nav class="border-b border-slate-700/50 bg-slate-900/30 backdrop-blur-sm sticky top-16 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex space-x-1 overflow-x-auto hide-scrollbar">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-all whitespace-nowrap border-b-2',
              activeTab === tab.id
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-600'
            ]"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="tab.icon"></svg>
            <span>{{ tab.name }}</span>
          </button>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid lg:grid-cols-2 gap-8">
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
          <!-- ATS Sidebar -->
          <div v-if="activeTab === 'preview'" class="glass-panel rounded-2xl p-6">
            <ATSSidebar :resumeData="maindata" @open-scanner="activeTab = 'ats'" />
          </div>
        </div>

        <!-- Right Panel - Live Preview -->
        <div class="lg:sticky lg:top-32 h-fit">
          <div class="glass-panel rounded-2xl p-6 mb-4">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold brand-font flex items-center space-x-2">
                <div class="w-6 h-6 bg-emerald-500/20 rounded flex items-center justify-center">
                  <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <span>Live Preview</span>
              </h3>
              <span class="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-lg animate-pulse">Auto-updating</span>
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
    <footer class="border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-sm mt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid md:grid-cols-3 gap-8 mb-8">
          <!-- Brand -->
          <div>
            <div class="flex items-center space-x-3 mb-4">
              <div class="w-8 h-8 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span class="text-lg font-bold brand-font text-white">Resume Forge</span>
            </div>
            <p class="text-slate-400 text-sm leading-relaxed">
              Build professional, ATS-friendly resumes with ease. Choose from multiple templates and export to PDF.
            </p>
          </div>

          <!-- Contact -->
          <div>
            <h5 class="text-white font-semibold brand-font mb-4">Contact</h5>
            <ul class="space-y-2 text-sm text-slate-400">
              <li class="flex items-center space-x-2">
                <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Lahore, Pakistan</span>
              </li>
              <li class="flex items-center space-x-2">
                <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:zainaftab44@gmail.com" class="hover:text-emerald-400 transition-colors">zainaftab44@gmail.com</a>
              </li>
            </ul>
          </div>

          <!-- Links -->
          <div>
            <h5 class="text-white font-semibold brand-font mb-4">Links</h5>
            <ul class="space-y-2 text-sm">
              <li><a href="https://zainaftab.netlify.app" class="text-slate-400 hover:text-emerald-400 transition-colors">About</a></li>
              <li><a href="https://www.github.com/zainaftab44" class="text-slate-400 hover:text-emerald-400 transition-colors">GitHub</a></li>
              <li><a href="https://www.linkedin.com/in/zainaftab" class="text-slate-400 hover:text-emerald-400 transition-colors">LinkedIn</a></li>
              <li><a href="https://www.skynetlabz.com" class="text-slate-400 hover:text-emerald-400 transition-colors">Website</a></li>
            </ul>
          </div>
        </div>

        <!-- Bottom bar -->
        <div class="border-t border-slate-700/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p class="text-slate-500 text-sm">
            &copy; 2024 Resume Forge &ndash; By Zain Aftab. All Rights Reserved.
          </p>
          <div class="flex items-center space-x-4">
            <a href="https://www.github.com/zainaftab44" class="text-slate-500 hover:text-emerald-400 transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/zainaftab" class="text-slate-500 hover:text-emerald-400 transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="https://www.twitter.com/zkingleo2009" class="text-slate-500 hover:text-emerald-400 transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
            </a>
          </div>
        </div>

        <!-- Pro tip -->
        <p class="text-slate-500 text-xs text-center mt-6">
          <span class="text-emerald-500 font-medium">Pro Tip:</span> Use Ctrl+S to save your progress - Press Ctrl+P to print
        </p>
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
    ATSSidebar
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
        { id: 'ats', name: 'ATS Scanner', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />' },
        { id: 'import', name: 'Import / Export', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />' }
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
      savedToast: false
    }
  },

  computed: {
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
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  min-height: 100vh;
}

.glass-panel {
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.form-input {
  width: 100%;
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid rgb(51, 65, 85);
  border-radius: 0.5rem;
  padding: 0.625rem 1rem;
  color: white;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: rgb(16, 185, 129);
  box-shadow: 0 0 0 1px rgb(16, 185, 129);
}

.form-input::placeholder {
  color: rgb(100, 116, 139);
}

select.form-input {
  appearance: auto;
}

.pulse-ring {
  animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
}

@keyframes pulse-ring {
  0% {
    transform: scale(0.8);
    opacity: 0.8;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

.fade-in {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
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

/* Scaled preview wrapper */
.preview-wrapper {
  width: 100%;
  overflow: hidden;
  border-radius: 0.75rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
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
  padding: 0.6rem 1.1rem;
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(16, 185, 129, 0.4);
  border-radius: 0.75rem;
  color: #6ee7b7;
  font-size: 0.875rem;
  font-weight: 500;
  backdrop-filter: blur(8px);
  pointer-events: none;
}

.toast-enter-active, .toast-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.toast-enter, .toast-leave-to {
  opacity: 0;
  transform: translateY(0.5rem);
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
