<template>
    <div class="row">
        <span style="background-color:#bfbfbf; padding: 10px 15px;margin: 5px;border-radius: 5px; width:max-content" class="skills2" v-for="skname in skills2.name" :key="skname">{{ skname }}</span>
    </div>
</template>

<script>
export default {
    name: "SK2P",
    props: ["skills2"],
}
</script>