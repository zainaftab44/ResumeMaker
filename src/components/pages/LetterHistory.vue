<template>
  <div class="fade-in space-y-6">
    <div class="glass-panel rounded-2xl p-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h2 class="text-2xl font-bold brand-font">Cover Letter History</h2>
              <span v-if="history.length" class="text-xs px-2 py-0.5 bg-violet-500/20 text-violet-400 border border-violet-500/30 rounded-full font-semibold">{{ history.length }}</span>
            </div>
            <p class="text-slate-400 text-sm mt-0.5">Your generated cover letters</p>
          </div>
        </div>
        <button
          v-if="history.length"
          @click="clearAll"
          class="text-xs px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg transition-all"
        >Clear All</button>
      </div>
    </div>

    <div v-if="!history.length" class="glass-panel rounded-2xl p-12 text-center">
      <div class="w-16 h-16 bg-slate-800/60 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
      <p class="text-slate-400 font-medium mb-1">No cover letters saved yet</p>
      <p class="text-slate-500 text-sm">Generate a cover letter to see it here</p>
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="entry in history"
        :key="entry.id"
        class="glass-panel rounded-2xl p-5"
      >
        <div class="flex items-start justify-between gap-3 mb-3">
          <div class="flex items-start gap-3 min-w-0 flex-1">
            <span :class="['text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 mt-0.5', entry.mode === 'ai' ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30' : 'bg-slate-600/40 text-slate-400 border border-slate-600/50']">
              {{ entry.mode === 'ai' ? 'AI' : 'Template' }}
            </span>
            <div class="min-w-0">
              <div class="flex flex-wrap items-center gap-1.5 mb-0.5">
                <span class="text-sm font-semibold text-slate-200">{{ entry.company || 'General' }}</span>
                <span v-if="entry.jobTitle" class="text-xs text-slate-500">·</span>
                <span v-if="entry.jobTitle" class="text-xs text-slate-400 truncate max-w-48">{{ entry.jobTitle }}</span>
              </div>
              <p class="text-xs text-slate-500">{{ entry.profileName }} · {{ formatDate(entry.date) }}</p>
            </div>
          </div>
          <div class="flex items-center gap-2 flex-shrink-0">
            <span class="text-xs px-2 py-0.5 bg-slate-800/60 text-slate-500 border border-slate-700/40 rounded-full">{{ entry.wordCount }} words</span>
            <button
              @click="copyLetter(entry)"
              :class="['text-xs px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1', copiedId === entry.id ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700/60 hover:bg-slate-600/60 text-slate-400']"
              title="Copy"
            >
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="copiedId === entry.id" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              {{ copiedId === entry.id ? 'Copied!' : 'Copy' }}
            </button>
            <button
              @click="downloadLetter(entry)"
              class="text-xs px-2.5 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/20 rounded-lg transition-all flex items-center gap-1"
              title="Download"
            >
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              .txt
            </button>
            <button
              @click="deleteEntry(entry.id)"
              class="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
              title="Delete"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

        <p class="text-xs text-slate-500 italic leading-relaxed mb-3 pl-px">{{ truncate(entry.letter, 120) }}</p>

        <button
          @click="toggleExpand(entry.id)"
          class="text-xs text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1"
        >
          <svg :class="['w-3 h-3 transition-transform', expandedId === entry.id ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
          {{ expandedId === entry.id ? 'Hide letter' : 'Show full letter' }}
        </button>

        <div v-if="expandedId === entry.id" class="mt-3 pt-3 border-t border-slate-700/50">
          <textarea
            :value="entry.letter"
            readonly
            rows="20"
            class="w-full bg-slate-900/40 border border-slate-700/50 rounded-xl p-4 text-slate-300 text-sm leading-[1.8] resize-none focus:outline-none"
            style="font-family: 'Georgia', serif;"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LetterHistoryPage',
  data() {
    return {
      history: [],
      expandedId: null,
      copiedId: null
    };
  },
  mounted() {
    this.loadHistory();
  },
  methods: {
    loadHistory() {
      this.history = JSON.parse(localStorage.getItem('coverLetterHistory') || '[]');
    },
    deleteEntry(id) {
      this.history = this.history.filter(e => e.id !== id);
      localStorage.setItem('coverLetterHistory', JSON.stringify(this.history));
      if (this.expandedId === id) this.expandedId = null;
    },
    clearAll() {
      if (!confirm('Clear all cover letter history? This cannot be undone.')) return;
      this.history = [];
      this.expandedId = null;
      localStorage.removeItem('coverLetterHistory');
    },
    toggleExpand(id) {
      this.expandedId = this.expandedId === id ? null : id;
    },
    copyLetter(entry) {
      const text = entry.letter || '';
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
          this.copiedId = entry.id;
          setTimeout(() => { this.copiedId = null; }, 2000);
        });
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        this.copiedId = entry.id;
        setTimeout(() => { this.copiedId = null; }, 2000);
      }
    },
    downloadLetter(entry) {
      const blob = new Blob([entry.letter || ''], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const company = entry.company ? entry.company.replace(/\s+/g, '-').toLowerCase() : 'general';
      a.download = 'cover-letter-' + company + '.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
    formatDate(iso) {
      const d = new Date(iso);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' · ' + d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    },
    truncate(text, n) {
      if (!text) return '';
      const clean = text.trim().replace(/\n+/g, ' ');
      return clean.length > n ? clean.slice(0, n) + '…' : clean;
    }
  }
};
</script>
