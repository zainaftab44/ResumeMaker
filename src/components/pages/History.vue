<template>
  <div class="fade-in space-y-6">
    <!-- Header -->
    <div class="glass-panel rounded-2xl p-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h2 class="text-2xl font-bold brand-font">ATS Scan History</h2>
              <span v-if="history.length" class="text-xs px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full font-semibold">{{ history.length }}</span>
            </div>
            <p class="text-slate-400 text-sm mt-0.5">Your saved ATS scan results</p>
          </div>
        </div>
        <button
          v-if="history.length"
          @click="clearAll"
          class="text-xs px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg transition-all"
        >Clear All</button>
      </div>
    </div>

    <!-- Empty state -->
    <div v-if="!history.length" class="glass-panel rounded-2xl p-12 text-center">
      <div class="w-16 h-16 bg-slate-800/60 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      </div>
      <p class="text-slate-400 font-medium mb-1">No scans saved yet</p>
      <p class="text-slate-500 text-sm">Run your first ATS scan — results are saved here automatically.</p>
    </div>

    <!-- Scan list -->
    <div v-else class="space-y-4">
      <div
        v-for="entry in history"
        :key="entry.id"
        class="glass-panel rounded-2xl p-5 relative"
      >
        <!-- Delete button -->
        <button
          @click="deleteEntry(entry.id)"
          class="absolute top-4 right-4 w-6 h-6 flex items-center justify-center text-slate-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
          title="Delete"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Card top row -->
        <div class="flex items-start gap-4 pr-10">
          <!-- Score circle -->
          <div class="relative flex-shrink-0">
            <svg class="w-16 h-16 transform -rotate-90">
              <circle cx="32" cy="32" r="26" stroke="rgba(30,41,59,0.8)" stroke-width="5" fill="none"></circle>
              <circle
                cx="32" cy="32" r="26"
                :stroke="scoreStroke(entry.score)"
                stroke-width="5"
                fill="none"
                stroke-linecap="round"
                :stroke-dasharray="163.36"
                :stroke-dashoffset="163.36 - (163.36 * entry.score / 100)"
                class="transition-all duration-700"
              ></circle>
            </svg>
            <div class="absolute inset-0 flex items-center justify-center">
              <span :class="['text-lg font-bold brand-font', scoreColor(entry.score)]">{{ entry.score }}</span>
            </div>
          </div>

          <!-- Meta -->
          <div class="flex-1 min-w-0">
            <div class="flex flex-wrap items-center gap-2 mb-1">
              <span class="text-sm font-semibold text-slate-200">{{ entry.profileName }}</span>
              <span v-if="entry.profileTitle" class="text-xs text-slate-500 truncate">{{ entry.profileTitle }}</span>
              <span :class="['text-xs font-semibold px-2 py-0.5 rounded-full', scoreColor(entry.score) === 'text-emerald-400' ? 'bg-emerald-500/15 text-emerald-400' : scoreColor(entry.score) === 'text-yellow-400' ? 'bg-yellow-500/15 text-yellow-400' : 'bg-red-500/15 text-red-400']">
                {{ scoreLabel(entry.score) }}
              </span>
              <!-- Mode badge -->
              <span :class="['text-xs px-2 py-0.5 rounded-full border font-medium', entry.mode === 'ai' ? 'bg-violet-500/15 text-violet-400 border-violet-500/25' : 'bg-slate-700/60 text-slate-400 border-slate-600/50']">
                {{ entry.mode === 'ai' ? 'AI' : 'Rule-based' }}
              </span>
            </div>
            <p class="text-xs text-slate-500 mb-1.5">{{ formatDate(entry.date) }}</p>
            <p v-if="entry.jobDescription" class="text-xs text-slate-500 italic truncate mb-3">
              <svg class="w-3 h-3 inline-block mr-1 text-cyan-500/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              {{ truncateJD(entry.jobDescription, 70) }}
            </p>

            <!-- Mini breakdown bars -->
            <div class="grid grid-cols-4 gap-2 mb-3">
              <div>
                <div class="flex justify-between text-xs mb-0.5">
                  <span class="text-slate-600">Fmt</span>
                  <span class="text-emerald-400 font-medium">{{ (entry.breakdown || {}).format || 0 }}/25</span>
                </div>
                <div class="h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div class="h-full bg-emerald-500 rounded-full" :style="{ width: (((entry.breakdown || {}).format || 0) / 25 * 100) + '%' }"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-xs mb-0.5">
                  <span class="text-slate-600">Kw</span>
                  <span class="text-cyan-400 font-medium">{{ (entry.breakdown || {}).keywords || 0 }}/35</span>
                </div>
                <div class="h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div class="h-full bg-cyan-500 rounded-full" :style="{ width: (((entry.breakdown || {}).keywords || 0) / 35 * 100) + '%' }"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-xs mb-0.5">
                  <span class="text-slate-600">Cnt</span>
                  <span class="text-violet-400 font-medium">{{ (entry.breakdown || {}).content || 0 }}/25</span>
                </div>
                <div class="h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div class="h-full bg-violet-500 rounded-full" :style="{ width: (((entry.breakdown || {}).content || 0) / 25 * 100) + '%' }"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-xs mb-0.5">
                  <span class="text-slate-600">Opt</span>
                  <span class="text-purple-400 font-medium">{{ (entry.breakdown || {}).optimization || 0 }}/15</span>
                </div>
                <div class="h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div class="h-full bg-purple-500 rounded-full" :style="{ width: (((entry.breakdown || {}).optimization || 0) / 15 * 100) + '%' }"></div>
                </div>
              </div>
            </div>

            <!-- Skills chips -->
            <div v-if="entry.skills && entry.skills.length" class="flex flex-wrap gap-1.5 mb-3">
              <span v-for="skill in entry.skills.slice(0, 8)" :key="skill" class="text-xs px-2 py-0.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/15 rounded-full">{{ skill }}</span>
              <span v-if="entry.skills.length > 8" class="text-xs text-slate-500 py-0.5">+{{ entry.skills.length - 8 }} more</span>
            </div>

            <!-- Match badge -->
            <div v-if="entry.matchPercentage !== null && entry.matchPercentage !== undefined" class="mb-3">
              <span :class="['text-xs px-2.5 py-1 rounded-full border font-semibold', entry.matchPercentage >= 70 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : entry.matchPercentage >= 40 ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20']">
                {{ entry.matchPercentage }}% keyword match
              </span>
            </div>

            <!-- Expand toggle -->
            <button
              @click="toggleExpand(entry.id)"
              class="text-xs text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1"
            >
              <svg :class="['w-3 h-3 transition-transform', expandedId === entry.id ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
              {{ expandedId === entry.id ? 'Show less' : 'Show full details' }}
            </button>
          </div>
        </div>

        <!-- Expanded detail -->
        <div v-if="expandedId === entry.id" class="mt-5 pt-5 border-t border-slate-700/50 space-y-5">

          <!-- Keyword analysis -->
          <div v-if="(entry.matchedKeywords && entry.matchedKeywords.length) || (entry.missingKeywords && entry.missingKeywords.length)" class="grid sm:grid-cols-2 gap-4">
            <div v-if="entry.matchedKeywords && entry.matchedKeywords.length">
              <p class="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">Matched Keywords</p>
              <div class="flex flex-wrap gap-1.5">
                <span v-for="kw in entry.matchedKeywords" :key="kw" class="text-xs px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/15 rounded-full">{{ kw }}</span>
              </div>
            </div>
            <div v-if="entry.missingKeywords && entry.missingKeywords.length">
              <p class="text-xs font-semibold text-red-400 uppercase tracking-wider mb-2">Missing Keywords</p>
              <div class="flex flex-wrap gap-1.5">
                <span v-for="kw in entry.missingKeywords" :key="kw" class="text-xs px-2 py-0.5 bg-red-500/10 text-red-400 border border-red-500/15 rounded-full">{{ kw }}</span>
              </div>
            </div>
          </div>

          <!-- Rule-based suggestions -->
          <div v-if="entry.suggestions && entry.suggestions.length">
            <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Improvement Suggestions</p>
            <div class="space-y-2">
              <div
                v-for="sug in entry.suggestions"
                :key="sug.id || sug.title"
                :class="['p-3 rounded-xl border-l-4 text-xs', sug.severity === 'critical' ? 'border-red-500 bg-red-500/5' : sug.severity === 'important' ? 'border-yellow-500 bg-yellow-500/5' : 'border-cyan-500 bg-cyan-500/5']"
              >
                <p class="text-slate-200 font-medium mb-0.5">{{ sug.title }}</p>
                <p class="text-slate-400">{{ sug.description || sug.action }}</p>
              </div>
            </div>
          </div>

          <!-- AI suggestions -->
          <div v-if="entry.aiSuggestions">
            <p class="text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5 text-violet-400">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              AI Analysis
            </p>
            <div class="p-4 bg-violet-500/5 border border-violet-500/15 rounded-xl text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">{{ entry.aiSuggestions }}</div>
          </div>

          <!-- Resume snapshot -->
          <div v-if="entry.resumeSnapshot && hasSnapshotData(entry.resumeSnapshot)">
            <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Resume at Scan Time</p>
            <div class="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4 space-y-3 text-xs">

              <!-- Profile -->
              <div v-if="entry.resumeSnapshot.profile && entry.resumeSnapshot.profile.name">
                <p class="text-slate-500 font-medium mb-1">Profile</p>
                <p class="text-slate-200 font-semibold">{{ entry.resumeSnapshot.profile.name }}</p>
                <p v-if="entry.resumeSnapshot.profile.title" class="text-slate-400">{{ entry.resumeSnapshot.profile.title }}</p>
                <p v-if="entry.resumeSnapshot.profile.email" class="text-slate-500">{{ entry.resumeSnapshot.profile.email }}</p>
              </div>

              <!-- Experience -->
              <div v-if="entry.resumeSnapshot.exps && entry.resumeSnapshot.exps.length">
                <p class="text-slate-500 font-medium mb-1.5">Experience ({{ entry.resumeSnapshot.exps.length }})</p>
                <div class="space-y-1.5">
                  <div v-for="(exp, i) in entry.resumeSnapshot.exps.slice(0, 3)" :key="i" class="flex items-start gap-2">
                    <span class="text-emerald-500/60 flex-shrink-0 mt-0.5">·</span>
                    <span class="text-slate-300">
                      <span class="font-medium">{{ exp.title }}</span>
                      <span v-if="exp.company" class="text-slate-500"> @ {{ exp.company }}</span>
                      <span v-if="exp.start" class="text-slate-600"> · {{ exp.start }}–{{ exp.end || 'Present' }}</span>
                    </span>
                  </div>
                  <p v-if="entry.resumeSnapshot.exps.length > 3" class="text-slate-600 pl-4">+{{ entry.resumeSnapshot.exps.length - 3 }} more</p>
                </div>
              </div>

              <!-- Skills -->
              <div v-if="snapshotSkills(entry.resumeSnapshot).length">
                <p class="text-slate-500 font-medium mb-1.5">Skills</p>
                <div class="flex flex-wrap gap-1">
                  <span v-for="skill in snapshotSkills(entry.resumeSnapshot).slice(0, 16)" :key="skill" class="px-1.5 py-0.5 bg-slate-700/60 text-slate-400 border border-slate-600/40 rounded-md">{{ skill }}</span>
                  <span v-if="snapshotSkills(entry.resumeSnapshot).length > 16" class="text-slate-600 py-0.5">+{{ snapshotSkills(entry.resumeSnapshot).length - 16 }} more</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HistoryPage',
  data() {
    return {
      history: [],
      expandedId: null
    };
  },
  mounted() {
    this.loadHistory();
  },
  activated() {
    this.loadHistory();
  },
  methods: {
    loadHistory() {
      try {
        this.history = JSON.parse(localStorage.getItem('atsHistory') || '[]');
      } catch {
        this.history = [];
      }
    },
    deleteEntry(id) {
      this.history = this.history.filter(e => e.id !== id);
      localStorage.setItem('atsHistory', JSON.stringify(this.history));
      if (this.expandedId === id) this.expandedId = null;
    },
    clearAll() {
      if (!confirm('Clear all ATS scan history? This cannot be undone.')) return;
      this.history = [];
      this.expandedId = null;
      localStorage.removeItem('atsHistory');
    },
    toggleExpand(id) {
      this.expandedId = this.expandedId === id ? null : id;
    },
    formatDate(iso) {
      const d = new Date(iso);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' · ' + d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    },
    scoreColor(s) {
      if (s >= 75) return 'text-emerald-400';
      if (s >= 50) return 'text-yellow-400';
      return 'text-red-400';
    },
    scoreStroke(s) {
      if (s >= 75) return '#10b981';
      if (s >= 50) return '#f59e0b';
      return '#ef4444';
    },
    scoreLabel(s) {
      if (s >= 90) return 'Excellent';
      if (s >= 75) return 'Good';
      if (s >= 60) return 'Fair';
      if (s >= 40) return 'Needs Work';
      return 'Poor';
    },
    truncateJD(text, n) {
      if (!text) return '';
      const first = text.trim().split('\n')[0] || '';
      return first.length > n ? first.slice(0, n) + '…' : first;
    },
    hasSnapshotData(snap) {
      if (!snap) return false;
      return !!(snap.profile && snap.profile.name) || (snap.exps && snap.exps.length) || (snap.skills && snap.skills.length);
    },
    snapshotSkills(snap) {
      if (!snap) return [];
      const out = [];
      const seen = new Set();
      (snap.skills || []).forEach(sg => {
        const arr = Array.isArray(sg.name) ? sg.name : (Array.isArray(sg.items) ? sg.items : []);
        arr.filter(Boolean).forEach(s => { if (!seen.has(s)) { seen.add(s); out.push(s); } });
      });
      if (snap.skills2 && Array.isArray(snap.skills2.name)) {
        snap.skills2.name.filter(Boolean).forEach(s => { if (!seen.has(s)) { seen.add(s); out.push(s); } });
      }
      return out;
    }
  }
};
</script>
