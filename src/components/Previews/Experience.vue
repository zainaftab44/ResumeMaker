<template>
    <table>
        <tbody>
            <tr>
                <td>
                    <h4 style="margin-bottom:5px">EXPERIENCE</h4>
                </td>
            </tr>
            <tr v-for="(exp, ind) in exps" :key="ind">
                <td>
                    <small v-if="exp.start.length">{{ exp.start.toUpperCase() }}</small>
                    <small v-if="exp.end && exp.start">&ndash;</small>
                    <small v-if="exp.end">{{ exp.end.toUpperCase() }}</small>
                    <br />

                    <strong v-if="exp.title.length">
                        {{ exp.title.toUpperCase() }}
                        <br />
                    </strong>
                    <span v-if="exp.company.length">{{ exp.company.toUpperCase() }}</span>
                    <span v-if="exp.company.length && exp.location.length">,</span>
                    <span v-if="exp.location.length">{{ exp.location.toUpperCase() }}</span>
                    <ul style="margin-top:5px;margin-bottom:5px" v-if="exp.resp.join('')">
                        <li
                            v-for="(res, i) in exp.resp"
                            :key="i"
                            style="padding-left: 1.4em; text-indent: -1.55em;"
                        >{{ res }}</li>
                    </ul>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: "EXP",
    props: ["exps"],
}
</script>