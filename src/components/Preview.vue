<template>
    <div>
        <span style="margin-left:auto; margin-right:auto;display:block;width: max-content;text-align:center;" class="mb-3">
            Select Template
            <select v-model="template">
                <option value="1">Template 1</option>
                <option value="2">Template 2</option>
            </select>
            <br>
            You can drag/drop sections in box below to re-arrange them in your desired order
        </span>
        <div>
            <Template v-if="template == 1" :data="data" />
            <Template2 v-else-if="template == 2" :data="data" />
        </div>
    </div>
</template>

<script>


import Template from "./Template.vue";
import Template2 from "./Template2.vue";
export default {
    name: 'Preview',
    props: ['data'],
    components: {
        Template,
        Template2
    },
    data() {
        return {
            template: 1
        }
    }
}
</script>