<template>
  <span style="text-align: center">
    <h1 style="margin-bottom: 0">
      {{ profile.name }}
      <small v-if="profile.title"> | {{ profile.title }} </small>
    </h1>
    <table style="width: 100%;" class="text-center">
      <tr style="width: 100%">
        <td style="max-width: 20%; flex-basis: 0px; flex-grow: 1" v-if="profile.phone">
            {{ profile.phone }}
        </td>
        <td v-if="profile.email">
            {{ profile.email }}
        </td>
      </tr>
      <tr v-if="profile.address">
        <td>
            {{ profile.address }}
        </td>
      </tr>
      <tr>
        <td valign="top" style="width: auto; text-align: end">
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
      <h3 style="margin-bottom: 5px">SUMMARY</h3>
      {{ profile.summary }}
    </div>
  </span>
</template>

<script>
export default {
  name: "PP",
  props: ["profile"],
};
</script>