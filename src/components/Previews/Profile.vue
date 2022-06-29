<template>
    <table style="width: 100%">
        <tr>
            <td colspan="2">
                <h1 style="margin-bottom:0">
                    {{ profile.name }}
                </h1>
            </td>
        </tr>
        <tr>
            <td colspan="2">
                <h5 v-if="profile.title">
                    {{profile.title}}
                </h5>
            </td>
        </tr>
        <tr>
            <td style="max-width: 50%;">
            {{ profile.address }}
            </td>
            <td valign="top" class="text-end">
            {{ profile.website }}
            </td>
        </tr>
        <tr>
            <td style="max-width: 50%;">
            {{ profile.phone }}
            </td>
            <td valign="top" class="text-end">
            {{ profile.github }}
            </td>
        </tr>
        <tr>
            <td style="max-width: 50%;">
            {{ profile.email }}
            </td>
            <td valign="top" class="text-end">
            {{ profile.linkedin }}
            </td>
        </tr>
        <!-- <tr style="width: 100%">
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
        </tr> -->
        <tr>
            <td colspan="2">
                <div v-if="profile.summary">
                    <h3 style="margin-bottom:5px">SUMMARY</h3>
                    {{ profile.summary }}
                </div>
            </td>
        </tr>
    </table>
</template>

<script>
export default {
    name: "PP",
    props: ["profile"],
}
</script>