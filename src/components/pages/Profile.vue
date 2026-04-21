<template>
  <div class="glass-panel rounded-2xl p-6 fade-in">
    <h2 class="text-xl font-bold mb-6 flex items-center space-x-2 brand-font">
      <div class="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
        <svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
      <span>Personal Information</span>
    </h2>

    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
        <input v-model="profile.name" type="text" class="form-input" placeholder="John Doe">
      </div>

      <div>
        <label class="block text-sm font-medium text-slate-300 mb-2">Professional Title</label>
        <input v-model="profile.title" type="text" class="form-input" placeholder="Senior Software Engineer">
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-slate-300 mb-2">Email</label>
          <input v-model="profile.email" type="email" class="form-input" placeholder="john@example.com">
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-300 mb-2">Phone</label>
          <input v-model="profile.phone" type="tel" class="form-input" placeholder="+1 (555) 123-4567">
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-slate-300 mb-2">Address</label>
          <input v-model="profile.address" type="text" class="form-input" placeholder="New York, NY">
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-300 mb-2">Website</label>
          <input v-model="profile.website" type="text" class="form-input" placeholder="https://example.com">
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-slate-300 mb-2">Portfolio / GitHub</label>
          <input v-model="profile.github" type="text" class="form-input" placeholder="github.com/username">
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-300 mb-2">LinkedIn</label>
          <input v-model="profile.linkedin" type="text" class="form-input" placeholder="linkedin.com/in/username">
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-slate-300 mb-2">Professional Summary</label>
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
