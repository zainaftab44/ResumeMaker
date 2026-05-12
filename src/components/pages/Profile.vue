<template>
  <div class="glass-panel rounded-2xl p-6 fade-in">
    <h2 class="text-base font-semibold mb-5 flex items-center space-x-2 brand-font text-slate-200">
      <div class="w-7 h-7 bg-emerald-500/15 rounded-lg flex items-center justify-center">
        <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
      <span>Personal Information</span>
    </h2>

    <div class="space-y-4">
      <!-- Identity -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide">Full Name</label>
          <input v-model="profile.name" type="text" class="form-input" placeholder="John Doe">
        </div>
        <div>
          <label class="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide">Title</label>
          <input v-model="profile.title" type="text" class="form-input" placeholder="Senior Software Engineer">
        </div>
      </div>

      <!-- Contact -->
      <div class="pt-3 border-t border-slate-700/40">
        <p class="text-xs text-slate-600 uppercase tracking-widest mb-3">Contact</p>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-medium text-slate-400 mb-1.5">Email</label>
            <input v-model="profile.email" type="email" class="form-input" placeholder="john@example.com">
          </div>
          <div>
            <label class="block text-xs font-medium text-slate-400 mb-1.5">Phone</label>
            <input v-model="profile.phone" type="tel" class="form-input" placeholder="+1 (555) 123-4567">
          </div>
          <div>
            <label class="block text-xs font-medium text-slate-400 mb-1.5">Location</label>
            <input v-model="profile.address" type="text" class="form-input" placeholder="New York, NY">
          </div>
          <div>
            <label class="block text-xs font-medium text-slate-400 mb-1.5">Website</label>
            <input v-model="profile.website" type="text" class="form-input" placeholder="https://example.com">
          </div>
        </div>
      </div>

      <!-- Links -->
      <div class="pt-3 border-t border-slate-700/40">
        <p class="text-xs text-slate-600 uppercase tracking-widest mb-3">Links</p>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-medium text-slate-400 mb-1.5">GitHub / Portfolio</label>
            <input v-model="profile.github" type="text" class="form-input" placeholder="github.com/username">
          </div>
          <div>
            <label class="block text-xs font-medium text-slate-400 mb-1.5">LinkedIn</label>
            <input v-model="profile.linkedin" type="text" class="form-input" placeholder="linkedin.com/in/username">
          </div>
        </div>
      </div>

      <!-- Summary -->
      <div class="pt-3 border-t border-slate-700/40">
        <label class="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide">Professional Summary</label>
        <textarea v-model="profile.summary" rows="4" class="form-input resize-none" placeholder="Write a brief summary about yourself..."></textarea>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  props: ["profile"],
}
</script>
