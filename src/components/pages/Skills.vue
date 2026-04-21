<template>
  <div class="space-y-4 fade-in">
    <!-- Skill Style Toggle -->
    <div class="glass-panel rounded-2xl p-4">
      <div class="flex items-center justify-between">
        <h3 class="text-sm font-medium text-slate-300">Skill Display Style</h3>
        <div class="flex bg-slate-800 rounded-lg p-0.5">
          <button
            @click="$emit('update:skillStyle', 1)"
            :class="[
              'px-3 py-1.5 text-xs font-medium rounded-md transition-all',
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
              'px-3 py-1.5 text-xs font-medium rounded-md transition-all',
              skillStyle === 2
                ? 'bg-purple-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            ]"
          >
            Tags
          </button>
        </div>
      </div>
    </div>

    <!-- Style 1: Categorized Skills -->
    <template v-if="skillStyle === 1">
      <div v-for="(skillGroup, index) in skills" :key="index" class="glass-panel rounded-2xl overflow-hidden">
        <!-- Accordion Header -->
        <div
          class="flex items-center justify-between p-4 cursor-pointer select-none hover:bg-slate-700/30 transition-colors"
          @click="toggle(index)"
        >
          <div class="flex items-center space-x-3 min-w-0">
            <svg
              class="w-4 h-4 text-slate-400 transition-transform flex-shrink-0"
              :class="{ 'rotate-90': openIndex === index }"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            <h3 class="text-base font-semibold brand-font truncate">
              {{ skillGroup.type || `Skill Group ${index + 1}` }}
            </h3>
            <span v-if="skillGroup.name.filter(s => s.trim()).length" class="text-xs text-slate-500">
              ({{ skillGroup.name.filter(s => s.trim()).length }} skills)
            </span>
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
            <label class="block text-sm text-slate-400 mb-2">Category Name</label>
            <input v-model="skillGroup.type" type="text" class="form-input" placeholder="e.g., Programming Languages">
          </div>

          <div>
            <label class="block text-sm text-slate-400 mb-2">Skills</label>
            <div v-for="(skill, sIndex) in skillGroup.name" :key="sIndex" class="flex items-center space-x-2 mb-2">
              <input v-model="skillGroup.name[sIndex]" type="text" class="flex-1 form-input" placeholder="Skill name">
              <button v-if="skillGroup.name.length > 1" @click="skillGroup.name.splice(sIndex, 1)" class="text-red-400 hover:text-red-300">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <button @click="skillGroup.name.push('')" class="text-sm text-purple-400 hover:text-purple-300 mt-2">+ Add Skill</button>
          </div>

          <div class="flex flex-wrap gap-2">
            <template v-for="(skill, sIndex) in skillGroup.name">
              <span v-if="skill.trim()" :key="'tag-' + sIndex" class="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-lg text-sm">
                {{ skill }}
              </span>
            </template>
          </div>
        </div>
      </div>

      <button @click="$emit('add')" class="w-full glass-panel rounded-xl p-4 border-2 border-dashed border-slate-600 hover:border-purple-500 text-slate-400 hover:text-purple-400 transition-all flex items-center justify-center space-x-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        <span>Add Skill Group</span>
      </button>
    </template>

    <!-- Style 2: Flat Tags -->
    <template v-else>
      <div class="glass-panel rounded-2xl p-6">
        <h3 class="text-lg font-semibold brand-font mb-4">Skills</h3>

        <div class="space-y-3">
          <div v-for="(skill, sIndex) in skills2.name" :key="sIndex" class="flex items-center space-x-2">
            <input v-model="skills2.name[sIndex]" type="text" class="flex-1 form-input" placeholder="Skill name">
            <button v-if="skills2.name.length > 1" @click="skills2.name.splice(sIndex, 1)" class="text-red-400 hover:text-red-300">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <button @click="skills2.name.push('')" class="text-sm text-purple-400 hover:text-purple-300">+ Add Skill</button>
        </div>

        <div class="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-700/50">
          <template v-for="(skill, sIndex) in skills2.name">
            <span v-if="skill.trim()" :key="'tag2-' + sIndex" class="px-3 py-1.5 bg-purple-500/20 text-purple-300 rounded-lg text-sm">
              {{ skill }}
            </span>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "Skills",
  props: ["skills", "skills2", "skillStyle"],
  data() {
    return { openIndex: 0 }
  },
  watch: {
    'skills.length'(newLen, oldLen) {
      if (newLen > oldLen) this.openIndex = newLen - 1
    }
  },
  methods: {
    toggle(index) {
      this.openIndex = this.openIndex === index ? -1 : index
    }
  }
}
</script>
