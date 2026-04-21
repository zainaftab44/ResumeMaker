<template>
  <div class="space-y-4 fade-in">
    <div
      v-for="(edu, index) in eds"
      :key="index"
      class="glass-panel rounded-2xl overflow-hidden"
      @dragover.prevent
      @drop="drop($event, index)"
    >
      <!-- Accordion Header -->
      <div
        class="flex items-center justify-between p-4 cursor-pointer select-none hover:bg-slate-700/30 transition-colors"
        @click="toggle(index)"
      >
        <div class="flex items-center space-x-3 min-w-0">
          <!-- Drag handle -->
          <div
            class="flex-shrink-0 cursor-grab text-slate-500 hover:text-slate-300 px-1"
            draggable="true"
            @dragstart.stop="dragStart($event, index)"
            @click.stop
            title="Drag to reorder"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 6a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm8 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM8 13.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm8 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM8 21a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm8 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"/>
            </svg>
          </div>
          <svg
            class="w-4 h-4 text-slate-400 transition-transform flex-shrink-0"
            :class="{ 'rotate-90': openIndex === index }"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
          <h3 class="text-base font-semibold brand-font truncate">
            {{ edu.degree || edu.institute ? [edu.degree, edu.major ? `(${edu.major})` : ''].filter(Boolean).join(' ') || edu.institute : `Education ${index + 1}` }}
          </h3>
        </div>
        <button @click.stop="$emit('remove', index)" class="text-red-400 hover:text-red-300 transition-colors flex-shrink-0 ml-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      <!-- Accordion Body -->
      <div v-show="openIndex === index" class="px-6 pb-6 space-y-4 border-t border-slate-700/50">
        <div class="pt-4">
          <label class="block text-sm text-slate-400 mb-2">Degree</label>
          <input v-model="edu.degree" type="text" class="form-input" placeholder="Bachelor of Science">
        </div>

        <div>
          <label class="block text-sm text-slate-400 mb-2">Field of Study</label>
          <input v-model="edu.major" type="text" class="form-input" placeholder="Computer Science">
        </div>

        <div>
          <label class="block text-sm text-slate-400 mb-2">Institution</label>
          <input v-model="edu.institute" type="text" class="form-input" placeholder="University Name">
        </div>

        <div>
          <label class="block text-sm text-slate-400 mb-2">Location</label>
          <input v-model="edu.location" type="text" class="form-input" placeholder="City, State">
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm text-slate-400 mb-2">Start Year</label>
            <input v-model="edu.start" type="text" class="form-input" placeholder="2016">
          </div>
          <div>
            <label class="block text-sm text-slate-400 mb-2">End Year</label>
            <input v-model="edu.end" type="text" class="form-input" placeholder="2020">
          </div>
        </div>
      </div>
    </div>

    <button @click="$emit('add')" class="w-full glass-panel rounded-xl p-4 border-2 border-dashed border-slate-600 hover:border-cyan-500 text-slate-400 hover:text-cyan-400 transition-all flex items-center justify-center space-x-2">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
      <span>Add Education</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "Education",
  props: ["eds"],
  data() {
    return {
      openIndex: 0,
      dragFromIndex: null
    }
  },
  watch: {
    'eds.length'(newLen, oldLen) {
      if (newLen > oldLen) this.openIndex = newLen - 1
    }
  },
  methods: {
    toggle(index) {
      this.openIndex = this.openIndex === index ? -1 : index
    },
    dragStart(e, index) {
      this.dragFromIndex = index
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('text', String(index))
    },
    drop(e, toIndex) {
      e.preventDefault()
      const from = this.dragFromIndex
      if (from === null || from === toIndex) return
      const item = this.eds.splice(from, 1)[0]
      this.eds.splice(toIndex, 0, item)
      this.openIndex = toIndex
      this.dragFromIndex = null
    }
  }
}
</script>
