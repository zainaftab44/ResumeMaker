<template>
    <table v-if="skills.length">
        <tbody>
            <tr>
                <td>
                    <h3 role="heading" style="margin-bottom:5px;padding-bottom:5px">SKILLS</h3>
                </td>
            </tr>
            <tr v-for="(skill, s) in skills" :key="s">
                <td style="border-width: 1px">
                    <strong class="mb-0 px-2">{{ skill.type }}</strong>
                </td>
                <td style="border-width: 1px;" class="px-2" v-if="skill.name.join('').length">{{ skill.name.join(", ") }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: "SK1P",
    props: ["skills"],
}
</script>