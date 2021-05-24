
<template>
    <div class="col-md-6">
        <h4 style="margin-bottom:5px">Honors and Awards</h4>
        <table v-if="awds.length" style="width:100%">
            <tbody>
                <tr v-for="awd in awds" :key="awd">
                    <td>
                        <small style="width:auto">{{ awd.date }}</small>
                    </td>
                    <td>
                        <br />
                        {{ awd.title }}
                        <br />
                        {{ awd.organization }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: "AWD",
    props: ["awds"],
}
</script>