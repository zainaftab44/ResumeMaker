<template>
  <div class="space-y-4">
    <!-- ATS Score Card -->
    <div class="glass-panel rounded-xl p-6 text-center relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10"></div>
      
      <div class="relative z-10">
        <h3 class="text-sm font-medium text-slate-400 mb-4 flex items-center justify-center space-x-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>ATS Score</span>
        </h3>
        
        <!-- Score Circle -->
        <div class="inline-flex items-center justify-center mb-4">
          <svg class="w-24 h-24 transform -rotate-90">
            <circle cx="48" cy="48" r="40" stroke="#1e293b" stroke-width="6" fill="none"></circle>
            <circle 
              :stroke-dasharray="circumference" 
              :stroke-dashoffset="dashOffset"
              cx="48" cy="48" r="40" 
              stroke="url(#gradient-sidebar)" 
              stroke-width="6" 
              fill="none" 
              stroke-linecap="round" 
              class="transition-all duration-1000"
            ></circle>
            <defs>
              <linearGradient id="gradient-sidebar" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#10b981"></stop>
                <stop offset="100%" stop-color="#06b6d4"></stop>
              </linearGradient>
            </defs>
          </svg>
          <div class="absolute flex items-center justify-center flex-col">
            <span class="text-3xl font-bold brand-font" :class="scoreColor">{{ score }}</span>
            <span class="text-xs text-slate-500 uppercase tracking-wider">/ 100</span>
          </div>
        </div>

        <h4 :class="scoreTextColor" class="text-lg font-semibold mb-1">{{ scoreLabel }}</h4>
        <p class="text-slate-500 text-xs">{{ scoreDescription }}</p>
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-2 gap-3">
      <div class="glass-panel rounded-lg p-4">
        <div class="text-emerald-400 text-2xl font-bold brand-font">{{ skillsCount }}</div>
        <div class="text-slate-400 text-xs mt-1">Skills</div>
      </div>
      
      <div class="glass-panel rounded-lg p-4">
        <div class="text-cyan-400 text-2xl font-bold brand-font">{{ bulletCount }}</div>
        <div class="text-slate-400 text-xs mt-1">Bullets</div>
      </div>
    </div>

    <!-- Score Breakdown -->
    <div class="glass-panel rounded-xl p-4">
      <h4 class="text-sm font-semibold mb-3 text-slate-300">Score Breakdown</h4>
      
      <div class="space-y-3">
        <div>
          <div class="flex justify-between text-xs mb-1">
            <span class="text-slate-400">Format</span>
            <span class="text-emerald-400 font-medium">{{ breakdown.format || 0 }}/25</span>
          </div>
          <div class="h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div 
              class="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-1000" 
              :style="{ width: ((breakdown.format || 0) / 25 * 100) + '%' }"
            ></div>
          </div>
        </div>
        
        <div>
          <div class="flex justify-between text-xs mb-1">
            <span class="text-slate-400">Keywords</span>
            <span class="text-cyan-400 font-medium">{{ breakdown.keywords || 0 }}/35</span>
          </div>
          <div class="h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div 
              class="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 transition-all duration-1000" 
              :style="{ width: ((breakdown.keywords || 0) / 35 * 100) + '%' }"
            ></div>
          </div>
        </div>
        
        <div>
          <div class="flex justify-between text-xs mb-1">
            <span class="text-slate-400">Content</span>
            <span class="text-blue-400 font-medium">{{ breakdown.content || 0 }}/25</span>
          </div>
          <div class="h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div 
              class="h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-1000" 
              :style="{ width: ((breakdown.content || 0) / 25 * 100) + '%' }"
            ></div>
          </div>
        </div>
        
        <div>
          <div class="flex justify-between text-xs mb-1">
            <span class="text-slate-400">Optimize</span>
            <span class="text-purple-400 font-medium">{{ breakdown.optimization || 0 }}/15</span>
          </div>
          <div class="h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div 
              class="h-full bg-gradient-to-r from-purple-500 to-purple-400 transition-all duration-1000" 
              :style="{ width: ((breakdown.optimization || 0) / 15 * 100) + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Top Suggestions -->
    <div v-if="topSuggestions.length > 0" class="glass-panel rounded-xl p-4">
      <h4 class="text-sm font-semibold mb-3 text-slate-300 flex items-center space-x-2">
        <svg class="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        <span>Quick Tips</span>
      </h4>
      
      <ul class="space-y-2">
        <li v-for="(suggestion, index) in topSuggestions" :key="index" class="flex items-start space-x-2 text-xs text-slate-400">
          <span class="text-emerald-400 mt-0.5">•</span>
          <span>{{ suggestion }}</span>
        </li>
      </ul>
    </div>

    <!-- Action Button -->
    <button 
      @click="openFullScanner"
      class="w-full bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-medium py-3 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg text-sm flex items-center justify-center space-x-2"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <span>Full ATS Analysis</span>
    </button>
  </div>
</template>

<script>
import atsService from '@/services/atsService'

export default {
  name: 'ATSSidebar',
  props: {
    resumeData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      score: 0,
      breakdown: {
        format: 0,
        keywords: 0,
        content: 0,
        optimization: 0
      },
      suggestions: [],
      skillsCount: 0,
      bulletCount: 0,
      circumference: 251.2 // 2 * Math.PI * 40
    }
  },
  computed: {
    dashOffset() {
      const progress = this.score / 100
      return this.circumference * (1 - progress)
    },
    scoreColor() {
      if (this.score >= 80) return 'text-emerald-400'
      if (this.score >= 60) return 'text-cyan-400'
      if (this.score >= 40) return 'text-yellow-400'
      return 'text-red-400'
    },
    scoreTextColor() {
      if (this.score >= 80) return 'text-emerald-400'
      if (this.score >= 60) return 'text-cyan-400'
      if (this.score >= 40) return 'text-yellow-400'
      return 'text-red-400'
    },
    scoreLabel() {
      if (this.score >= 90) return 'Excellent!'
      if (this.score >= 80) return 'Very Good'
      if (this.score >= 70) return 'Good'
      if (this.score >= 60) return 'Fair'
      if (this.score >= 40) return 'Needs Work'
      return 'Poor'
    },
    scoreDescription() {
      if (this.score >= 80) return 'Ready to submit'
      if (this.score >= 60) return 'Almost there'
      if (this.score >= 40) return 'Needs improvement'
      return 'Add more content'
    },
    topSuggestions() {
      return this.suggestions.slice(0, 3)
    }
  },
  watch: {
    resumeData: {
      handler() {
        this.analyzeResume()
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    analyzeResume() {
      // Use ATS service to analyze resume
      const results = atsService.analyzeResume(this.resumeData)
      
      this.score = results.score.total
      this.breakdown = results.score.breakdown
      this.suggestions = results.suggestions
      
      // Count skills
      this.skillsCount = results.skills.length
      
      // Count bullet points
      this.bulletCount = results.format.bulletPointCount || 0
    },
    openFullScanner() {
      // Emit event to parent to switch to ATS scanner tab
      this.$emit('open-scanner')
    }
  },
  mounted() {
    this.analyzeResume()
  }
}
</script>

<style scoped>
.brand-font {
  font-family: 'Space Grotesk', sans-serif;
}

.glass-panel {
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
