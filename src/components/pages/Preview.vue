<template>
  <div class="fade-in space-y-6">
    <!-- Template Selection -->
    <div class="glass-panel rounded-2xl p-6">
      <h2 class="text-base font-semibold mb-4 flex items-center space-x-2 brand-font text-slate-200">
        <div class="w-7 h-7 bg-emerald-500/15 rounded-lg flex items-center justify-center">
          <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
        </div>
        <span>Choose Template</span>
      </h2>

      <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <button
          v-for="t in templates"
          :key="t.id"
          @click="selectTemplate(t.id)"
          :class="[
            'relative rounded-xl p-4 text-left transition-all border-2',
            selectedTemplate === t.id
              ? 'border-emerald-400 bg-emerald-500/10'
              : 'border-slate-700 hover:border-slate-500 bg-slate-800/50'
          ]"
        >
          <div class="flex items-center space-x-3 mb-2">
            <div :class="[
              'w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold',
              selectedTemplate === t.id ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-300'
            ]">
              {{ t.id }}
            </div>
            <span class="text-sm font-medium" :class="selectedTemplate === t.id ? 'text-emerald-400' : 'text-slate-300'">
              {{ t.name }}
            </span>
          </div>
          <!-- Mini layout preview -->
          <div class="bg-slate-900/60 rounded-lg p-2 space-y-1">
            <div class="h-1.5 rounded-full w-3/4" :class="selectedTemplate === t.id ? 'bg-emerald-500/40' : 'bg-slate-600'"></div>
            <div class="h-1 rounded-full w-1/2" :class="selectedTemplate === t.id ? 'bg-emerald-500/25' : 'bg-slate-700'"></div>
            <div class="flex gap-1 mt-1" v-if="t.layout === 'two-col'">
              <div class="flex-1 space-y-0.5">
                <div class="h-1 rounded-full" :class="selectedTemplate === t.id ? 'bg-emerald-500/20' : 'bg-slate-700'"></div>
                <div class="h-1 rounded-full w-3/4" :class="selectedTemplate === t.id ? 'bg-emerald-500/20' : 'bg-slate-700'"></div>
              </div>
              <div class="flex-1 space-y-0.5">
                <div class="h-1 rounded-full" :class="selectedTemplate === t.id ? 'bg-emerald-500/20' : 'bg-slate-700'"></div>
                <div class="h-1 rounded-full w-2/3" :class="selectedTemplate === t.id ? 'bg-emerald-500/20' : 'bg-slate-700'"></div>
              </div>
            </div>
            <div v-else class="space-y-0.5">
              <div class="h-1 rounded-full" :class="selectedTemplate === t.id ? 'bg-emerald-500/20' : 'bg-slate-700'"></div>
              <div class="h-1 rounded-full w-5/6" :class="selectedTemplate === t.id ? 'bg-emerald-500/20' : 'bg-slate-700'"></div>
              <div class="h-1 rounded-full w-2/3" :class="selectedTemplate === t.id ? 'bg-emerald-500/20' : 'bg-slate-700'"></div>
            </div>
          </div>
          <!-- Active indicator -->
          <div v-if="selectedTemplate === t.id" class="absolute top-2 right-2">
            <svg class="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
          </div>
        </button>
      </div>
    </div>

    <!-- Style Options -->
    <div class="glass-panel rounded-2xl p-6">
      <h2 class="text-base font-semibold mb-4 flex items-center space-x-2 brand-font text-slate-200">
        <div class="w-7 h-7 bg-purple-500/15 rounded-lg flex items-center justify-center">
          <svg class="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
        </div>
        <span>Style Options</span>
      </h2>

      <div class="space-y-4">
        <!-- Skill Display Style -->
        <div class="pt-2 border-t border-slate-700/50">
          <label class="block text-sm text-slate-400 mb-2">Skill Display Style</label>
          <div class="flex bg-slate-800 rounded-lg p-0.5">
            <button
              @click="$emit('update:skillStyle', 1)"
              :class="[
                'flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-all text-center',
                skillStyle === 1
                  ? 'bg-purple-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              ]"
            >
              Categorized
            </button>
            <button
              @click="$emit('update:skillStyle', 2)"
              :class="[
                'flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-all text-center',
                skillStyle === 2
                  ? 'bg-purple-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              ]"
            >
              Tags
            </button>
          </div>
        </div>

        <!-- Show Summary Toggle -->
        <div class="flex items-center justify-between pt-2 border-t border-slate-700/50">
          <div>
            <label class="text-sm text-slate-300 font-medium">Show Summary</label>
            <p class="text-xs text-slate-500">Display professional summary section in resume</p>
          </div>
          <button
            @click="$emit('update:showSummary', !showSummary)"
            :class="[
              'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
              showSummary ? 'bg-emerald-600' : 'bg-slate-600'
            ]"
          >
            <span
              :class="[
                'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                showSummary ? 'translate-x-6' : 'translate-x-1'
              ]"
            ></span>
          </button>
        </div>
      </div>
    </div>

    <!-- Resume Summary -->
    <div class="glass-panel rounded-2xl p-6">
      <h2 class="text-base font-semibold mb-4 flex items-center space-x-2 brand-font text-slate-200">
        <div class="w-7 h-7 bg-cyan-500/15 rounded-lg flex items-center justify-center">
          <svg class="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>
        <span>Resume Summary</span>
      </h2>

      <div class="grid grid-cols-2 gap-3">
        <div class="bg-slate-800/50 rounded-lg p-3 flex items-center space-x-3">
          <div class="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center text-lg font-bold text-emerald-400">
            {{ data.exps ? data.exps.length : 0 }}
          </div>
          <div>
            <p class="text-sm font-medium text-slate-300">Experience</p>
            <p class="text-xs text-slate-500">entries</p>
          </div>
        </div>

        <div class="bg-slate-800/50 rounded-lg p-3 flex items-center space-x-3">
          <div class="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center text-lg font-bold text-cyan-400">
            {{ data.eds ? data.eds.length : 0 }}
          </div>
          <div>
            <p class="text-sm font-medium text-slate-300">Education</p>
            <p class="text-xs text-slate-500">entries</p>
          </div>
        </div>

        <div class="bg-slate-800/50 rounded-lg p-3 flex items-center space-x-3">
          <div class="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center text-lg font-bold text-purple-400">
            {{ totalSkills }}
          </div>
          <div>
            <p class="text-sm font-medium text-slate-300">Skills</p>
            <p class="text-xs text-slate-500">total</p>
          </div>
        </div>

        <div class="bg-slate-800/50 rounded-lg p-3 flex items-center space-x-3">
          <div class="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center text-lg font-bold text-blue-400">
            {{ data.projs ? data.projs.length : 0 }}
          </div>
          <div>
            <p class="text-sm font-medium text-slate-300">Projects</p>
            <p class="text-xs text-slate-500">entries</p>
          </div>
        </div>
      </div>

      <!-- Completeness check -->
      <div class="mt-4 space-y-2">
        <div class="flex items-center justify-between text-sm">
          <span class="text-slate-400">Profile completeness</span>
          <span :class="completeness >= 80 ? 'text-emerald-400' : completeness >= 50 ? 'text-yellow-400' : 'text-red-400'" class="font-medium">{{ completeness }}%</span>
        </div>
        <div class="w-full bg-slate-700 rounded-full h-2">
          <div
            class="h-2 rounded-full transition-all duration-500"
            :class="completeness >= 80 ? 'bg-emerald-500' : completeness >= 50 ? 'bg-yellow-500' : 'bg-red-500'"
            :style="{ width: completeness + '%' }"
          ></div>
        </div>
        <ul class="mt-3 space-y-1">
          <li v-for="tip in tips" :key="tip" class="flex items-center space-x-2 text-xs">
            <svg class="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M12 3a9 9 0 100 18 9 9 0 000-18z" />
            </svg>
            <span class="text-slate-400">{{ tip }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Preview",
  props: {
    template: { type: String, default: '1' },
    font: { type: String, default: 'Arial' },
    data: { type: Object, default: () => ({}) },
    showSummary: { type: Boolean, default: true },
    skillStyle: { type: Number, default: 1 }
  },
  data() {
    return {
      selectedTemplate: this.template,
      selectedFont: this.font,
      templates: [
        { id: '1', name: 'Classic Professional', layout: 'single' },
        { id: '2', name: 'Modern Minimal', layout: 'single' },
        { id: '3', name: 'Two Column', layout: 'two-col' },
        { id: '4', name: 'Executive Bold', layout: 'single' },
        { id: '5', name: 'Creative Designer', layout: 'single' },
        { id: '6', name: 'Tech Minimalist', layout: 'single' },
        { id: '7', name: 'Corporate Elegant', layout: 'single' },
        { id: '8', name: 'Modern Portfolio', layout: 'two-col' }
      ]
    }
  },
  watch: {
    template(val) { this.selectedTemplate = val },
    font(val) { this.selectedFont = val }
  },
  computed: {
    fonts() {
      return [
        'Arial', 'Arial Narrow', 'Calibri', 'Comic Sans',
        'Consolas', 'Courier New', 'Georgia', 'Helvetica',
        'Lato', 'Monaco', 'Montserrat', 'Open Sans',
        'Roboto', 'Segoe UI', 'Times New Roman',
        'Trebuchet MS', 'Verdana'
      ].sort()
    },
    totalSkills() {
      if (!this.data.skills) return 0
      return this.data.skills.reduce((sum, g) => {
        if (Array.isArray(g.name)) return sum + g.name.filter(s => s && s.trim()).length
        return sum
      }, 0)
    },
    completeness() {
      let filled = 0
      let total = 5
      const p = this.data.profile || {}
      if (p.name) filled++
      if (p.email || p.phone) filled++
      if (p.summary) filled++
      if (this.data.exps && this.data.exps.length) filled++
      if (this.data.eds && this.data.eds.length) filled++
      return Math.round((filled / total) * 100)
    },
    tips() {
      const list = []
      const p = this.data.profile || {}
      if (!p.name) list.push('Add your full name in the Profile tab')
      if (!p.email && !p.phone) list.push('Add contact info (email or phone)')
      if (!p.summary) list.push('Write a professional summary')
      if (!this.data.exps || !this.data.exps.length) list.push('Add at least one work experience')
      if (!this.data.eds || !this.data.eds.length) list.push('Add your education background')
      if (!this.data.skills || !this.data.skills.length) list.push('Add your skills to stand out')
      return list
    }
  },
  methods: {
    selectTemplate(id) {
      this.selectedTemplate = id
      this.$emit('update:template', id)
    }
  }
}
</script>
