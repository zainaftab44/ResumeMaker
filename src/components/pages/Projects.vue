<template>
  <div class="space-y-4 fade-in">
    <div
      v-for="(proj, index) in projs"
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
            {{ proj.title || `Project ${index + 1}` }}
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
          <label class="block text-sm text-slate-400 mb-2">Project Name</label>
          <input v-model="proj.title" type="text" class="form-input" placeholder="E-commerce Platform">
        </div>

        <div>
          <label class="block text-sm text-slate-400 mb-2">Description</label>
          <textarea v-model="proj.desc" rows="2" class="form-input resize-none" placeholder="Brief project description"></textarea>
        </div>

        <div>
          <label class="block text-sm text-slate-400 mb-2">Link</label>
          <input v-model="proj.link" type="text" class="form-input" placeholder="https://project-url.com">
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm text-slate-400 mb-2">Start Date</label>
            <input v-model="proj.start" type="text" class="form-input" placeholder="Jan 2023">
          </div>
          <div>
            <label class="block text-sm text-slate-400 mb-2">End Date</label>
            <input v-model="proj.end" type="text" class="form-input" placeholder="Present">
          </div>
        </div>

        <div>
          <label class="block text-sm text-slate-400 mb-2">Tools & Technologies</label>
          <div v-for="(tool, tIndex) in proj.tools" :key="'tool-' + tIndex" class="flex items-center space-x-2 mb-2">
            <input v-model="proj.tools[tIndex]" type="text" class="flex-1 form-input" placeholder="Technology name">
            <button v-if="proj.tools.length > 1" @click="proj.tools.splice(tIndex, 1)" class="text-red-400 hover:text-red-300">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <button @click="proj.tools.push('')" class="text-sm text-blue-400 hover:text-blue-300 mt-2">+ Add Technology</button>
        </div>

        <div>
          <label class="block text-sm text-slate-400 mb-2">Responsibilities</label>
          <div v-for="(res, rIndex) in proj.resp" :key="'resp-' + rIndex" class="flex items-start space-x-2 mb-2">
            <div class="w-2 h-2 bg-blue-400 rounded-full mt-3 flex-shrink-0"></div>
            <input v-model="proj.resp[rIndex]" type="text" class="flex-1 form-input" placeholder="Key responsibility or achievement">
            <button v-if="proj.resp.length > 1" @click="proj.resp.splice(rIndex, 1)" class="text-red-400 hover:text-red-300 mt-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <button @click="proj.resp.push('')" class="text-sm text-blue-400 hover:text-blue-300 mt-2">+ Add Responsibility</button>
        </div>
      </div>
    </div>

    <button @click="$emit('add')" class="w-full glass-panel rounded-xl p-4 border-2 border-dashed border-slate-600 hover:border-blue-500 text-slate-400 hover:text-blue-400 transition-all flex items-center justify-center space-x-2">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
      <span>Add Project</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "Projects",
  props: ["projs"],
  data() {
    return {
      openIndex: 0,
      dragFromIndex: null
    }
  },
  watch: {
    'projs.length'(newLen, oldLen) {
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
      const item = this.projs.splice(from, 1)[0]
      this.projs.splice(toIndex, 0, item)
      this.openIndex = toIndex
      this.dragFromIndex = null
    }
  }
}
</script>
