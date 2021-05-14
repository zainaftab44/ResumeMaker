<template>
    <table style="width: 100%">
        <tbody>
            <tr>
                <td>
                    <h1>{{ profile.name }}</h1>
                </td>
            </tr>
            <tr>
                <table style="width: 100%">
                    <tr style="width: 100%">
                        <td style="max-width: 60%; flex-basis: 0px; flex-grow: 1">
                            <small v-if="profile.address">
                                {{ profile.address }}
                                <br />
                            </small>
                            <small v-if="profile.phone">
                                {{ profile.phone }}
                                <br />
                            </small>
                            <small v-if="profile.email">
                                {{ profile.email }}
                                <br />
                            </small>
                        </td>
                        <td valign="top" style="width: auto;text-align:end">
                            <small v-if="profile.website">
                                {{ profile.website }}
                                <br />
                            </small>
                            <small v-if="profile.github">
                                {{ profile.github }}
                                <br />
                            </small>
                            <small v-if="profile.linkedin">
                                {{ profile.linkedin }}
                                <br />
                            </small>
                        </td>
                    </tr>
                </table>
            </tr>
            <tr v-if="profile.summary">
                <td>
                    <h4 style="margin-bottom:5px">SUMMARY</h4>
                </td>
            </tr>
            <tr>
                <td>{{ profile.summary }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: "PP",
    props: ["profile"],
}
</script>