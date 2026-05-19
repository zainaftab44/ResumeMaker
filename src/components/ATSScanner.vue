<template>
  <div class="fade-in space-y-6">
    <div class="glass-panel rounded-2xl p-6">
      <div class="flex items-center space-x-3 mb-2">
        <div class="w-8 h-8 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div>
          <h2 class="text-2xl font-bold brand-font">ATS Compatibility Scanner</h2>
          <p class="text-slate-400 text-sm mt-0.5">Check how well your resume performs with Applicant Tracking Systems</p>
        </div>
      </div>
    </div>

    <div class="glass-panel rounded-2xl p-6 space-y-4">
      <div class="flex items-center justify-between">
        <label class="text-sm font-semibold text-slate-300 flex items-center space-x-2">
          <svg class="w-4 h-4 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span>Job Description (Optional)</span>
        </label>
        <div class="flex items-center space-x-3">
          <div class="flex items-center bg-slate-800/60 rounded-lg p-0.5 border border-slate-700/50">
            <button
              @click="useAI = false"
              :class="[
                'text-xs px-3 py-1.5 rounded-md transition-all',
                !useAI ? 'bg-slate-600/50 text-slate-200 border border-slate-500/40' : 'text-slate-500 hover:text-slate-300'
              ]"
            >Rule-based</button>
            <button
              @click="useAI = true"
              :class="[
                'text-xs px-3 py-1.5 rounded-md transition-all flex items-center space-x-1',
                useAI ? 'bg-violet-600/30 text-violet-400 border border-violet-500/40' : 'text-slate-500 hover:text-slate-300'
              ]"
            >
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <span>AI Analysis</span>
            </button>
          </div>
        </div>
      </div>

      <textarea
        v-model="jobDescription"
        rows="5"
        class="form-input w-full resize-none"
        placeholder="Paste the job description here to get keyword matching analysis..."
      ></textarea>

      <button
        @click="scanResume"
        :disabled="scanning || isAIAnalyzing"
        :class="[
          'w-full py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed',
          useAI
            ? 'bg-gradient-to-r from-violet-600 to-emerald-600 hover:from-violet-500 hover:to-emerald-500 shadow-lg shadow-violet-900/20'
            : 'bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 shadow-lg shadow-emerald-900/20'
        ]"
      >
        <svg v-if="!scanning && !isAIAnalyzing" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <svg v-else class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <span>{{ scanning ? 'Scanning...' : (isAIAnalyzing ? 'AI Analyzing...' : (jobDescription ? 'Scan with Job Description' : 'Scan Resume')) }}</span>
      </button>
    </div>

    <div v-if="results">
      <div class="glass-panel rounded-2xl p-6 mb-6">
        <div class="flex flex-col sm:flex-row items-center gap-6">
          <div class="relative flex-shrink-0">
            <svg class="w-32 h-32 transform -rotate-90">
              <circle cx="64" cy="64" r="54" stroke="rgba(30,41,59,0.8)" stroke-width="8" fill="none"></circle>
              <circle
                cx="64" cy="64" r="54"
                :stroke="results.score.total >= 75 ? 'url(#ats-grad-green)' : results.score.total >= 50 ? 'url(#ats-grad-yellow)' : 'url(#ats-grad-red)'"
                stroke-width="8"
                fill="none"
                stroke-linecap="round"
                :stroke-dasharray="339.29"
                :stroke-dashoffset="339.29 - (339.29 * results.score.total / 100)"
                class="transition-all duration-1000"
              ></circle>
              <defs>
                <linearGradient id="ats-grad-green" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#10b981"></stop>
                  <stop offset="100%" stop-color="#06b6d4"></stop>
                </linearGradient>
                <linearGradient id="ats-grad-yellow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#f59e0b"></stop>
                  <stop offset="100%" stop-color="#f97316"></stop>
                </linearGradient>
                <linearGradient id="ats-grad-red" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#ef4444"></stop>
                  <stop offset="100%" stop-color="#f97316"></stop>
                </linearGradient>
              </defs>
            </svg>
            <div class="absolute inset-0 flex flex-col items-center justify-center">
              <span :class="['text-4xl font-bold brand-font', results.score.total >= 75 ? 'text-emerald-400' : results.score.total >= 50 ? 'text-yellow-400' : 'text-red-400']">{{ results.score.total }}</span>
              <span class="text-xs text-slate-500 uppercase tracking-wider">/ 100</span>
            </div>
          </div>
          <div class="flex-1 min-w-0">
            <h3 :class="['text-2xl font-bold brand-font mb-1', results.score.total >= 75 ? 'text-emerald-400' : results.score.total >= 50 ? 'text-yellow-400' : 'text-red-400']">{{ results.score.rating }}</h3>
            <p class="text-slate-400 text-sm mb-3 leading-relaxed">{{ getScoreMessage(results.score.total) }}</p>
            <div v-if="grammarResults" :class="['inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold', getGrammarBadgeClass()]">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Writing: {{ getGrammarLabel() }}
              <span v-if="grammarResults.total > 0">· {{ grammarResults.total }} issue{{ grammarResults.total !== 1 ? 's' : '' }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="glass-panel rounded-2xl p-6 mb-6">
        <h3 class="text-base font-semibold text-slate-200 mb-4">Score Breakdown</h3>
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <span class="text-xs text-slate-400 w-24 flex-shrink-0">Format</span>
            <div class="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full transition-all duration-1000" :style="{ width: ((results.score.breakdown.format / 25) * 100) + '%' }"></div>
            </div>
            <span class="text-xs text-emerald-400 font-semibold w-10 text-right">{{ results.score.breakdown.format }}/25</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-xs text-slate-400 w-24 flex-shrink-0">Keywords</span>
            <div class="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full transition-all duration-1000" :style="{ width: ((results.score.breakdown.keywords / 35) * 100) + '%' }"></div>
            </div>
            <span class="text-xs text-cyan-400 font-semibold w-10 text-right">{{ results.score.breakdown.keywords }}/35</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-xs text-slate-400 w-24 flex-shrink-0">Content</span>
            <div class="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full transition-all duration-1000" :style="{ width: ((results.score.breakdown.content / 25) * 100) + '%' }"></div>
            </div>
            <span class="text-xs text-violet-400 font-semibold w-10 text-right">{{ results.score.breakdown.content }}/25</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-xs text-slate-400 w-24 flex-shrink-0">Optimization</span>
            <div class="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000" :style="{ width: ((results.score.breakdown.optimization / 15) * 100) + '%' }"></div>
            </div>
            <span class="text-xs text-purple-400 font-semibold w-10 text-right">{{ results.score.breakdown.optimization }}/15</span>
          </div>
        </div>
      </div>

      <div v-if="jobDescription && results.keywords && results.keywords.matchPercentage > 0" class="glass-panel rounded-2xl p-6 mb-6">
        <h3 class="text-base font-semibold text-slate-200 mb-4">Keyword Matching</h3>
        <div class="flex items-center gap-4 mb-4 p-4 bg-slate-800/40 rounded-xl">
          <span :class="['text-4xl font-bold brand-font', getMatchClass(results.keywords.matchPercentage)]">{{ results.keywords.matchPercentage }}%</span>
          <p class="text-sm text-slate-400">
            <span class="text-emerald-400 font-semibold">{{ results.keywords.matchedKeywords.length }}</span> matched,
            <span class="text-red-400 font-semibold">{{ results.keywords.missingKeywords.length }}</span> missing from job description
          </p>
        </div>
        <div class="grid sm:grid-cols-2 gap-4">
          <div>
            <h4 class="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Matched
            </h4>
            <div class="flex flex-wrap gap-1.5">
              <span v-for="kw in results.keywords.matchedKeywords.slice(0, 15)" :key="kw" class="text-xs px-2 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">{{ kw }}</span>
              <span v-if="results.keywords.matchedKeywords.length > 15" class="text-xs text-slate-500 py-1">+{{ results.keywords.matchedKeywords.length - 15 }} more</span>
            </div>
          </div>
          <div>
            <h4 class="text-xs font-semibold text-red-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Missing
            </h4>
            <div class="flex flex-wrap gap-1.5">
              <span v-for="kw in results.keywords.missingKeywords.slice(0, 15)" :key="kw" class="text-xs px-2 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded-full">{{ kw }}</span>
              <span v-if="results.keywords.missingKeywords.length > 15" class="text-xs text-slate-500 py-1">+{{ results.keywords.missingKeywords.length - 15 }} more</span>
            </div>
          </div>
        </div>
      </div>

      <div class="glass-panel rounded-2xl p-6 mb-6">
        <h3 class="text-base font-semibold text-slate-200 mb-3">Detected Skills ({{ results.skills.length }})</h3>
        <p v-if="results.skills.length === 0" class="text-slate-500 text-sm italic">No skills detected. Add skills to your Skills section to improve your ATS score.</p>
        <div v-else class="flex flex-wrap gap-2">
          <span v-for="skill in results.skills.slice(0, 30)" :key="skill" class="text-xs px-2.5 py-1.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full">{{ skill }}</span>
          <span v-if="results.skills.length > 30" class="text-xs text-slate-500 py-1.5">+{{ results.skills.length - 30 }} more</span>
        </div>
      </div>

      <div v-if="industryResults" class="glass-panel rounded-2xl p-6 mb-6">
        <h3 class="text-base font-semibold text-slate-200 mb-4 flex items-center gap-2">
          <svg class="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          Industry Analysis
        </h3>
        <div class="flex flex-wrap items-center gap-3 mb-4">
          <div class="flex items-center gap-2 text-sm text-slate-400">
            <label>Analyze for:</label>
            <select v-model="selectedIndustry" @change="runIndustryAnalysis" class="form-input py-1 px-2 text-xs">
              <option value="">— Auto-detect —</option>
              <option v-for="ind in availableIndustries" :key="ind.id" :value="ind.id">{{ ind.name }}</option>
            </select>
          </div>
          <span class="text-xs px-2.5 py-1 bg-violet-500/20 text-violet-400 border border-violet-500/30 rounded-full font-semibold">{{ industryResults.industry }}</span>
          <span :class="['text-sm font-bold', getIndustryScoreClass(industryResults.scores.overall)]">{{ industryResults.scores.overall }}% match</span>
        </div>
        <div class="space-y-2 mb-4">
          <div class="flex items-center gap-3">
            <span class="text-xs text-slate-400 w-24">Keywords</span>
            <div class="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full" :style="{ width: industryResults.scores.keywords + '%' }"></div>
            </div>
            <span class="text-xs text-emerald-400 w-10 text-right">{{ industryResults.scores.keywords }}%</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-xs text-slate-400 w-24">Skills</span>
            <div class="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full" :style="{ width: industryResults.scores.skills + '%' }"></div>
            </div>
            <span class="text-xs text-cyan-400 w-10 text-right">{{ industryResults.scores.skills }}%</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-xs text-slate-400 w-24">Action Verbs</span>
            <div class="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-violet-500 to-violet-400 rounded-full" :style="{ width: industryResults.scores.actionVerbs + '%' }"></div>
            </div>
            <span class="text-xs text-violet-400 w-10 text-right">{{ industryResults.scores.actionVerbs }}%</span>
          </div>
        </div>
        <div v-if="industryResults.missing.skills.length" class="mb-4">
          <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Missing industry skills:</p>
          <div class="flex flex-wrap gap-1.5">
            <span v-for="skill in industryResults.missing.skills" :key="skill" class="text-xs px-2 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded-full">{{ skill }}</span>
          </div>
        </div>
        <div v-if="industryResults.suggestions.length" class="space-y-2 mb-4">
          <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Industry suggestions:</p>
          <div v-for="sug in industryResults.suggestions" :key="sug.title" :class="['p-3 rounded-xl border-l-4 text-sm', sug.severity === 'high' ? 'border-red-500 bg-red-500/5' : 'border-yellow-500 bg-yellow-500/5']">
            <strong class="text-slate-200 block mb-1">{{ sug.title }}</strong>
            <p class="text-slate-400 text-xs">{{ sug.action }}</p>
          </div>
        </div>
        <div v-if="industryResults.tips.length">
          <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Tips for {{ industryResults.industry }}:</p>
          <ul class="space-y-1">
            <li v-for="tip in industryResults.tips" :key="tip" class="text-xs text-slate-400 flex items-start gap-1.5">
              <span class="text-emerald-400 flex-shrink-0 mt-0.5">·</span>
              {{ tip }}
            </li>
          </ul>
        </div>
      </div>

      <div v-if="grammarResults" class="glass-panel rounded-2xl p-6 mb-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-base font-semibold text-slate-200 flex items-center gap-2">
            <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Writing Quality
          </h3>
          <span :class="['text-xs font-semibold px-2.5 py-1 rounded-full', grammarResults.total === 0 ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400']">
            {{ grammarResults.total === 0 ? 'Clean' : grammarResults.total + ' issue' + (grammarResults.total !== 1 ? 's' : '') }}
          </span>
        </div>
        <div class="grid grid-cols-3 gap-3 mb-4">
          <div :class="['rounded-xl p-3 text-center border', grammarResults.summary.spelling > 0 ? 'border-red-500/30 bg-red-500/5' : 'border-slate-700/50 bg-slate-800/30']">
            <span :class="['block text-2xl font-bold', grammarResults.summary.spelling > 0 ? 'text-red-400' : 'text-slate-400']">{{ grammarResults.summary.spelling }}</span>
            <span class="text-xs text-slate-500 uppercase tracking-wider mt-1 block">Spelling</span>
          </div>
          <div :class="['rounded-xl p-3 text-center border', grammarResults.summary.grammar > 0 ? 'border-yellow-500/30 bg-yellow-500/5' : 'border-slate-700/50 bg-slate-800/30']">
            <span :class="['block text-2xl font-bold', grammarResults.summary.grammar > 0 ? 'text-yellow-400' : 'text-slate-400']">{{ grammarResults.summary.grammar }}</span>
            <span class="text-xs text-slate-500 uppercase tracking-wider mt-1 block">Grammar</span>
          </div>
          <div :class="['rounded-xl p-3 text-center border', grammarResults.summary.style > 0 ? 'border-cyan-500/30 bg-cyan-500/5' : 'border-slate-700/50 bg-slate-800/30']">
            <span :class="['block text-2xl font-bold', grammarResults.summary.style > 0 ? 'text-cyan-400' : 'text-slate-400']">{{ grammarResults.summary.style }}</span>
            <span class="text-xs text-slate-500 uppercase tracking-wider mt-1 block">Style</span>
          </div>
        </div>
        <div v-if="grammarResults.total === 0" class="flex items-center gap-2 text-emerald-400 text-sm bg-emerald-500/10 rounded-xl p-3">
          <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          No writing issues found. Your resume reads clearly and professionally.
        </div>
        <div v-if="grammarResults.high.length" class="space-y-2 mb-3">
          <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">High priority:</p>
          <div v-for="issue in grammarResults.high.slice(0, 8)" :key="issue.location + issue.issue" class="p-3 border-l-4 border-red-500 bg-red-500/5 rounded-r-xl text-xs">
            <div class="flex gap-2 mb-1">
              <span class="px-1.5 py-0.5 bg-slate-700 text-slate-400 rounded text-xs uppercase tracking-wide">{{ issue.type }}</span>
              <span class="text-slate-500">{{ issue.location }}</span>
            </div>
            <p class="text-slate-200 font-medium mb-0.5">{{ issue.issue }}</p>
            <p class="text-slate-400">{{ issue.suggestion }}</p>
            <p v-if="issue.example" class="text-cyan-400 italic mt-0.5">e.g. {{ issue.example }}</p>
          </div>
          <p v-if="grammarResults.high.length > 8" class="text-xs text-slate-500">+{{ grammarResults.high.length - 8 }} more high priority issues</p>
        </div>
        <div v-if="showAllGrammar && grammarResults.medium.length" class="space-y-2 mb-3">
          <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Medium priority:</p>
          <div v-for="issue in grammarResults.medium.slice(0, 6)" :key="issue.location + issue.issue" class="p-3 border-l-4 border-yellow-500 bg-yellow-500/5 rounded-r-xl text-xs">
            <div class="flex gap-2 mb-1">
              <span class="px-1.5 py-0.5 bg-slate-700 text-slate-400 rounded text-xs uppercase tracking-wide">{{ issue.type }}</span>
              <span class="text-slate-500">{{ issue.location }}</span>
            </div>
            <p class="text-slate-200 font-medium mb-0.5">{{ issue.issue }}</p>
            <p class="text-slate-400">{{ issue.suggestion }}</p>
          </div>
        </div>
        <button
          v-if="grammarResults.medium.length + grammarResults.low.length > 0"
          @click="showAllGrammar = !showAllGrammar"
          class="text-xs text-cyan-400 hover:text-cyan-300 transition-colors border border-slate-700/50 hover:border-slate-600 rounded-lg px-3 py-1.5"
        >
          {{ showAllGrammar ? 'Show less' : 'Show ' + (grammarResults.medium.length + grammarResults.low.length) + ' more issues' }}
        </button>
      </div>

      <div class="glass-panel rounded-2xl p-6 mb-6">
        <h3 class="text-base font-semibold text-slate-200 mb-4 flex items-center gap-2">
          <svg class="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          Improvement Suggestions ({{ results.suggestions.length }})
        </h3>
        <div v-if="results.suggestions.length === 0" class="flex items-center gap-2 text-emerald-400 text-sm bg-emerald-500/10 rounded-xl p-4">
          <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Great job! Your resume looks well-optimized for ATS systems.
        </div>
        <div v-else class="space-y-3">
          <div
            v-for="suggestion in results.suggestions"
            :key="suggestion.id"
            :class="[
              'p-4 rounded-xl border-l-4',
              suggestion.severity === 'critical' ? 'border-red-500 bg-red-500/5' :
              suggestion.severity === 'important' ? 'border-yellow-500 bg-yellow-500/5' :
              suggestion.severity === 'recommended' ? 'border-cyan-500 bg-cyan-500/5' :
              'border-slate-600 bg-slate-800/30'
            ]"
          >
            <div class="flex gap-2 mb-2">
              <span :class="[
                'text-xs px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide',
                suggestion.severity === 'critical' ? 'bg-red-500 text-white' :
                suggestion.severity === 'important' ? 'bg-yellow-500 text-black' :
                suggestion.severity === 'recommended' ? 'bg-cyan-500 text-black' :
                'bg-slate-600 text-white'
              ]">{{ suggestion.severity }}</span>
              <span class="text-xs px-2 py-0.5 bg-slate-700/60 text-slate-400 rounded-full">{{ suggestion.category }}</span>
            </div>
            <h4 class="text-sm font-semibold text-slate-200 mb-2">{{ suggestion.title }}</h4>
            <p class="text-xs text-slate-400 mb-1 leading-relaxed">{{ suggestion.description }}</p>
            <p class="text-xs text-slate-400"><span class="text-slate-300 font-medium">Impact:</span> {{ suggestion.impact }}</p>
            <p class="text-xs text-slate-400"><span class="text-slate-300 font-medium">Action:</span> {{ suggestion.action }}</p>
            <p v-if="suggestion.example" class="text-xs text-cyan-400 italic mt-1"><span class="text-slate-300 font-medium not-italic">Example:</span> {{ suggestion.example }}</p>
          </div>
        </div>
      </div>

      <div class="glass-panel rounded-2xl p-6 mb-6">
        <h3 class="text-base font-semibold text-slate-200 mb-4">Format Validation</h3>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div :class="['flex items-center gap-2 p-3 rounded-xl border', results.format.usesStandardFonts ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-red-500/20 bg-red-500/5']">
            <svg :class="['w-4 h-4 flex-shrink-0', results.format.usesStandardFonts ? 'text-emerald-400' : 'text-red-400']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="results.format.usesStandardFonts" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span class="text-xs text-slate-300">Standard Font</span>
          </div>
          <div :class="['flex items-center gap-2 p-3 rounded-xl border', results.format.hasClearSections ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-red-500/20 bg-red-500/5']">
            <svg :class="['w-4 h-4 flex-shrink-0', results.format.hasClearSections ? 'text-emerald-400' : 'text-red-400']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="results.format.hasClearSections" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span class="text-xs text-slate-300">Clear Sections</span>
          </div>
          <div :class="['flex items-center gap-2 p-3 rounded-xl border', results.format.usesBulletPoints ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-red-500/20 bg-red-500/5']">
            <svg :class="['w-4 h-4 flex-shrink-0', results.format.usesBulletPoints ? 'text-emerald-400' : 'text-red-400']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="results.format.usesBulletPoints" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span class="text-xs text-slate-300">Bullets ({{ results.format.bulletPointCount }})</span>
          </div>
          <div class="flex items-center gap-2 p-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
            <svg class="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span class="text-xs text-slate-300">No Images/Tables</span>
          </div>
        </div>
      </div>

      <div v-if="isAIAnalyzing || aiSuggestions" class="glass-panel rounded-2xl p-6 mb-6" style="border-color: rgba(139,92,246,0.2);">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-7 h-7 bg-violet-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg :class="['w-4 h-4 text-violet-400', isAIAnalyzing ? 'animate-pulse' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h3 class="text-base font-semibold text-violet-300">AI-Powered Analysis</h3>
            <p class="text-xs text-slate-500">{{ isAIAnalyzing ? 'Generating personalized suggestions...' : 'Personalized improvement suggestions' }}</p>
          </div>
          <span v-if="isAIAnalyzing" class="ml-auto flex items-center gap-1.5 text-xs text-violet-400">
            <svg class="w-3 h-3 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Streaming
          </span>
        </div>
        <div v-if="!aiSuggestions && isAIAnalyzing" class="flex items-center justify-center py-6">
          <div class="flex space-x-1">
            <span class="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style="animation-delay: 0s"></span>
            <span class="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style="animation-delay: 0.15s"></span>
            <span class="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style="animation-delay: 0.3s"></span>
          </div>
        </div>
        <div v-if="aiSuggestions" class="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">{{ aiSuggestions }}<span v-if="isAIAnalyzing" class="inline-block w-0.5 h-4 bg-violet-400 animate-pulse ml-0.5 align-middle"></span></div>
      </div>
    </div>

    <div class="glass-panel rounded-2xl p-6">
      <h3 class="text-base font-semibold text-slate-200 mb-3">What is ATS?</h3>
      <p class="text-sm text-slate-400 leading-relaxed mb-4">
        Applicant Tracking Systems (ATS) are software used by 75% of employers to filter resumes before they reach human recruiters.
        This scanner analyzes your resume for ATS compatibility and provides actionable suggestions for improvement.
      </p>
      <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Quick Tips</p>
      <ul class="space-y-1.5 text-xs text-slate-400">
        <li class="flex items-start gap-2"><span class="text-emerald-400 flex-shrink-0">·</span><span><span class="text-slate-300">Standard fonts:</span> Arial, Calibri, Times New Roman</span></li>
        <li class="flex items-start gap-2"><span class="text-emerald-400 flex-shrink-0">·</span><span><span class="text-slate-300">Include keywords:</span> Match terms from job descriptions</span></li>
        <li class="flex items-start gap-2"><span class="text-emerald-400 flex-shrink-0">·</span><span><span class="text-slate-300">Clear headers:</span> Experience, Education, Skills</span></li>
        <li class="flex items-start gap-2"><span class="text-emerald-400 flex-shrink-0">·</span><span><span class="text-slate-300">Avoid:</span> Images, tables, or text boxes</span></li>
        <li class="flex items-start gap-2"><span class="text-emerald-400 flex-shrink-0">·</span><span><span class="text-slate-300">Include metrics:</span> Quantify achievements</span></li>
        <li class="flex items-start gap-2"><span class="text-emerald-400 flex-shrink-0">·</span><span><span class="text-slate-300">Bullet points:</span> 2–4 per position, start with action verbs</span></li>
      </ul>
    </div>

    <transition name="toast">
      <div v-if="savedToast" class="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 bg-emerald-500/15 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm font-medium backdrop-blur-md pointer-events-none">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        Saved to history
      </div>
    </transition>
  </div>
</template>

<script>
import atsService from '@/services/atsService';
import grammarChecker from '@/services/grammarChecker';
import industryOptimization from '@/services/industryOptimization';

export default {
  name: 'ATSScanner',
  props: {
    maindata: { type: Object, required: true }
  },
  data() {
    return {
      jobDescription: '',
      scanning: false,
      results: null,
      grammarResults: null,
      industryResults: null,
      selectedIndustry: '',
      availableIndustries: industryOptimization.getIndustries(),
      showAllGrammar: false,
      useAI: true,
      aiSuggestions: '',
      isAIAnalyzing: false,
      savedToast: false,
      currentScanId: null
    };
  },
  mounted() {
    this.scanResume();
  },
  watch: {
    maindata: {
      deep: true,
      handler() {
        if (this.scanTimeout) clearTimeout(this.scanTimeout);
        this.scanTimeout = setTimeout(() => { this.scanResume(); }, 1000);
      }
    }
  },
  methods: {
    scanResume() {
      this.currentScanId = Date.now().toString(); this.aiSuggestions = '';
      this.scanning = true;
      this.aiSuggestions = '';
      setTimeout(() => {
        try {
          this.results = atsService.analyzeResume(this.maindata);
          if (this.jobDescription && this.jobDescription.trim()) {
            const text = atsService.extractText(this.maindata);
            this.results.keywords = atsService.analyzeKeywords(text, this.jobDescription.toLowerCase());
          }
          this.grammarResults = grammarChecker.checkResume(this.maindata);
          this.runIndustryAnalysis();
        } catch (error) {
          console.error('ATS scan error:', error);
        } finally {
          this.scanning = false;
          this._saveToHistory();
          if (this.useAI && typeof window !== 'undefined' && window.puter) {
            this._runAIAnalysis();
          }
        }
      }, 500);
    },

    runIndustryAnalysis() {
      try {
        if (this.selectedIndustry) {
          this.industryResults = industryOptimization.analyzeForIndustry(this.maindata, this.selectedIndustry);
        } else {
          const suggestion = industryOptimization.suggestIndustry(this.maindata);
          if (suggestion && suggestion.topMatch && suggestion.topMatch.score > 0) {
            this.industryResults = industryOptimization.analyzeForIndustry(this.maindata, suggestion.topMatch.id);
          } else {
            this.industryResults = null;
          }
        }
      } catch (e) {
        this.industryResults = null;
      }
    },

    async _runAIAnalysis() {
      if (!this.results) return;
      this.isAIAnalyzing = true;
      this.aiSuggestions = '';
      try {
        const resumeText = atsService.extractText ? atsService.extractText(this.maindata) : '';
        const name = this.maindata && this.maindata.profile ? (this.maindata.profile.name || 'Candidate') : 'Candidate';
        const jd = this.jobDescription || '';
        const score = this.results.score.total;
        const rating = this.results.score.rating;
        const breakdown = this.results.score.breakdown;
        const skills = this.results.skills || [];
        const matchPct = this.results.keywords ? this.results.keywords.matchPercentage : 0;
        const matched = this.results.keywords ? (this.results.keywords.matchedKeywords || []) : [];
        const missing = this.results.keywords ? (this.results.keywords.missingKeywords || []) : [];

        const prompt = `You are an expert ATS resume optimization consultant. Analyze this resume and provide specific, prioritized improvement suggestions.

RESUME (candidate: ${name}):
${resumeText.slice(0, 2500)}

JOB DESCRIPTION:
${jd || 'No job description provided — give general ATS optimization advice.'}

CURRENT SCAN RESULTS:
- ATS Score: ${score}/100 (${rating})
- Format: ${breakdown.format}/25 | Keywords: ${breakdown.keywords}/35 | Content: ${breakdown.content}/25 | Optimization: ${breakdown.optimization}/15
- Skills detected: ${skills.slice(0, 15).join(', ')}
${jd ? `- JD keyword match: ${matchPct}% (${matched.slice(0,8).join(', ')})` : ''}
${jd ? `- Missing keywords: ${missing.slice(0,10).join(', ')}` : ''}

Provide 5 specific, actionable suggestions to improve this resume's ATS score. Be direct and concrete.
Format each as:
**[Short Title]** (severity: critical/important/recommended)
Problem: [specific issue in 1 sentence]
Fix: [exactly what to do]
Impact: +[X–Y] score points

Then add:
**Overall Assessment:** [2–3 sentence honest assessment]

Write only the suggestions — no preamble.`;

        const response = await window.puter.ai.chat(prompt, { stream: true, model: 'gpt-4o-mini' });
        for await (const part of response) {
          if (part && part.text) {
            this.aiSuggestions += part.text;
          }
        }
        this._saveToHistory(true);
      } catch (e) {
        console.error('[ATSScanner AI]', e);
      } finally {
        this.isAIAnalyzing = false;
      }
    },

    _saveToHistory(isAIPatch = false) {
      if (!this.results) return;
      const extractedJobTitle = this.jobDescription ? this.jobDescription.trim().split('\n')[0].slice(0, 80) : '';
      const history = JSON.parse(localStorage.getItem('atsHistory') || '[]');
      const existingIdx = history.findIndex(e => e.id === this.currentScanId);

      if (isAIPatch && existingIdx !== -1) {
        history[existingIdx].aiSuggestions = this.aiSuggestions || '';
        localStorage.setItem('atsHistory', JSON.stringify(history));
        return;
      }

      if (existingIdx !== -1) return; // already saved this scan

      const md = this.maindata || {};
      const entry = {
        id: this.currentScanId,
        date: new Date().toISOString(),
        profileName: md.profile ? (md.profile.name || 'Unnamed') : 'Unnamed',
        profileTitle: md.profile ? (md.profile.title || '') : '',
        score: this.results.score.total,
        rating: this.results.score.rating || '',
        breakdown: this.results.score.breakdown,
        jobDescription: this.jobDescription || '',
        jobTitle: extractedJobTitle,
        skills: (this.results.skills || []).slice(0, 20),
        suggestions: (this.results.suggestions || []).slice(0, 5),
        aiSuggestions: '',
        mode: this.useAI ? 'ai' : 'rule',
        matchPercentage: this.results.keywords ? (this.results.keywords.matchPercentage || null) : null,
        matchedKeywords: this.results.keywords ? (this.results.keywords.matchedKeywords || []) : [],
        missingKeywords: this.results.keywords ? (this.results.keywords.missingKeywords || []) : [],
        resumeSnapshot: {
          profile: md.profile ? Object.assign({}, md.profile) : {},
          exps: md.exps ? JSON.parse(JSON.stringify(md.exps)) : [],
          eds: md.eds ? JSON.parse(JSON.stringify(md.eds)) : [],
          skills: md.skills ? JSON.parse(JSON.stringify(md.skills)) : [],
          skills2: md.skills2 ? JSON.parse(JSON.stringify(md.skills2)) : { name: [] },
          projs: md.projs ? JSON.parse(JSON.stringify(md.projs)) : []
        }
      };
      history.unshift(entry);
      localStorage.setItem('atsHistory', JSON.stringify(history.slice(0, 50)));
      this.savedToast = true;
      setTimeout(() => { this.savedToast = false; }, 2000);
    },

    getScoreClass(score) {
      if (score >= 90) return 'excellent';
      if (score >= 75) return 'good';
      if (score >= 60) return 'fair';
      return 'poor';
    },
    getScoreMessage(score) {
      if (score >= 90) return 'Your resume is highly optimized for ATS systems!';
      if (score >= 75) return 'Your resume should pass most ATS screenings.';
      if (score >= 60) return 'Your resume needs some improvements for ATS.';
      return 'Your resume may struggle with ATS systems. Follow the suggestions below.';
    },
    getMatchClass(percentage) {
      if (percentage >= 80) return 'text-emerald-400';
      if (percentage >= 60) return 'text-cyan-400';
      if (percentage >= 40) return 'text-yellow-400';
      return 'text-red-400';
    },
    getIndustryScoreClass(score) {
      if (score >= 60) return 'text-emerald-400';
      if (score >= 30) return 'text-yellow-400';
      return 'text-red-400';
    },
    getGrammarLabel() {
      if (!this.grammarResults) return '';
      const high = this.grammarResults.high.length;
      const total = this.grammarResults.total;
      if (total === 0) return 'Excellent';
      if (high === 0) return 'Good';
      if (high <= 3) return 'Fair';
      return 'Needs Work';
    },
    getGrammarBadgeClass() {
      const label = this.getGrammarLabel();
      if (label === 'Excellent') return 'bg-emerald-500/15 text-emerald-400';
      if (label === 'Good') return 'bg-cyan-500/15 text-cyan-400';
      if (label === 'Fair') return 'bg-yellow-500/15 text-yellow-400';
      return 'bg-red-500/15 text-red-400';
    }
  }
};
</script>
