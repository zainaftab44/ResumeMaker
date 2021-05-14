<template>
    <table v-if="projs.length">
        <tbody>
            <tr>
                <td>
                    <h4 style="margin-bottom:5px">Projects</h4>
                </td>
            </tr>
            <tr v-for="(proj, l) in projs" :key="l">
                <td>
                    <small v-if="proj.start">{{ proj.start.toUpperCase() }}</small>
                    <small v-if="proj.start && proj.end">&ndash;</small>
                    <small v-if="proj.end">{{ proj.end.toUpperCase() }}</small>
                    <br />
                    <strong v-if="proj.title">
                        {{ proj.title }}
                        <br />
                    </strong>
                    <span v-if="proj.link">
                        <a :href="proj.link" :title="proj.link">{{ proj.link }}</a>
                    </span>
                    <span v-if="proj.desc">
                        <br v-if="proj.link" />
                        <span :title="proj.desc">{{ proj.desc }}</span>
                    </span>
                    <ul
                        style="margin-top:5px;margin-bottom:5px"
                        v-if="proj.resp.join('').length || proj.tools.join('').length"
                    >
                        <li
                            v-for="(res, m) in proj.resp"
                            :key="m"
                            style="padding-left: 1.4em; text-indent: -1.55em;"
                        >{{ res }}</li>
                        <li
                            v-if="proj.tools.join('')"
                            style="padding-left: 1.4em; text-indent: -1.55em;"
                        >
                            <strong>Technologies:</strong>
                            {{ proj.tools.join(", ") }}
                        </li>
                    </ul>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: "PJP",
    props: ["projs"],
}
</script>