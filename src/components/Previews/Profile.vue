<template>
    <span>
        <h1 style="margin-bottom:0">
            {{ profile.name }}
            <small v-if="profile.title">
                | {{profile.title}}
            </small>
        </h1>
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
        <div v-if="profile.summary">
            <h3 style="margin-bottom:5px">SUMMARY</h3>
            {{ profile.summary }}
        </div>
    </span>
</template>

<script>
export default {
    name: "PP",
    props: ["profile"],
}
</script>