<template>
    <table v-if="skills.length">
        <tbody>
            <tr>
                <td>
                    <h4 style="margin-bottom:5px;padding-bottom:5px">SKILLS</h4>
                </td>
            </tr>
            <tr>
                <td>
                    <table>
                        <tbody>
                            <tr v-for="(skill, j) in skills" :key="j">
                                <td class="pr-2">
                                    <strong>{{ skill.type + ": " }}</strong>
                                </td>
                                <td v-if="skill.name.join('').length">{{ skill.name.join(", ") }}</td>
                            </tr>
                        </tbody>
                    </table>
                </td>
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