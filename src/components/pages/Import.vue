<template>
  <div class="fade-in space-y-6">
    <!-- Export Section -->
    <div class="glass-panel rounded-2xl p-6">
      <h2 class="text-xl font-bold mb-4 flex items-center space-x-2 brand-font">
        <div class="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
          <svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </div>
        <span>Export Resume Data</span>
      </h2>
      <p class="text-sm text-slate-400 mb-4">Download your resume data as a JSON file. You can re-import it later to restore your progress.</p>
      <button @click="exportJSON" class="px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 rounded-lg transition-all text-sm font-medium flex items-center space-x-2">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        <span>Download ResumeForge.json</span>
      </button>
    </div>

    <!-- Import Section -->
    <div class="glass-panel rounded-2xl p-6">
      <h2 class="text-xl font-bold mb-4 flex items-center space-x-2 brand-font">
        <div class="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
          <svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
        </div>
        <span>Import Resume Data</span>
      </h2>
      <p class="text-sm text-slate-400 mb-4">Load a previously exported ResumeForge.json file to restore your resume data.</p>

      <div
        @dragover.prevent="dragOver = true"
        @dragleave.prevent="dragOver = false"
        @drop.prevent="handleDrop"
        :class="[
          'border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer',
          dragOver
            ? 'border-emerald-400 bg-emerald-500/10'
            : 'border-slate-600 hover:border-slate-500'
        ]"
        @click="$refs.fileInput.click()"
      >
        <input ref="fileInput" type="file" accept=".json" class="hidden" @change="handleFileSelect">
        <svg class="w-10 h-10 mx-auto mb-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
        <p class="text-slate-400 text-sm">Drag & drop your <span class="text-emerald-400 font-medium">ResumeForge.json</span> here</p>
        <p class="text-slate-500 text-xs mt-1">or click to browse</p>
      </div>

      <!-- Status Message -->
      <div v-if="statusMessage" :class="['mt-4 px-4 py-3 rounded-lg text-sm', statusClass]">
        {{ statusMessage }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImportExport",
  props: ["resumeData"],
  data() {
    return {
      dragOver: false,
      statusMessage: '',
      statusType: ''
    }
  },
  computed: {
    statusClass() {
      return this.statusType === 'success'
        ? 'bg-emerald-500/20 text-emerald-300'
        : 'bg-red-500/20 text-red-300'
    }
  },
  methods: {
    exportJSON() {
      const data = JSON.stringify(this.resumeData, null, 2)
      const blob = new Blob([data], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'ResumeForge.json'
      a.click()
      URL.revokeObjectURL(url)
    },

    handleDrop(e) {
      this.dragOver = false
      const file = e.dataTransfer.files[0]
      if (file) this.readFile(file)
    },

    handleFileSelect(e) {
      const file = e.target.files[0]
      if (file) this.readFile(file)
      e.target.value = ''
    },

    readFile(file) {
      if (!file.name.endsWith('.json')) {
        this.showStatus('Please select a .json file.', 'error')
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result)
          this.$emit('import', data)
          this.showStatus('Resume data imported successfully!', 'success')
        } catch {
          this.showStatus('Invalid JSON file. Please check the file and try again.', 'error')
        }
      }
      reader.readAsText(file)
    },

    showStatus(message, type) {
      this.statusMessage = message
      this.statusType = type
      setTimeout(() => { this.statusMessage = '' }, 4000)
    }
  }
}
</script>
