<template>
    <div v-if="skills.length">
        <h4 v-if="showHeading" role="heading" style="margin-bottom:6px; font-size:12pt;">SKILLS</h4>
        <div style="display:flex; flex-direction:column; gap:8px;">
            <div v-for="(skill, s) in skills" :key="s">
                <div style="font-weight:700; font-size:10pt; margin-bottom:4px;">{{ skill.type }}</div>
                <div style="display:flex; flex-wrap:wrap; gap:4px;">
                    <span
                        v-for="(name, i) in skill.name.filter(n => n.trim())"
                        :key="i"
                        style="font-size:9pt; padding:2px 8px; background-color:#e8e8e8; border-radius:4px; color:#333;"
                    >{{ name }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SK1P",
    props: { skills: Array, showHeading: { type: Boolean, default: true } },
}
</script>
