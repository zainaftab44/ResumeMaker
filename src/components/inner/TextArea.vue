<template>
    <div class="form-group">
        <label for="label" class="col-md-3 col-form-label">{{ label }}</label>
        <div class="col">
            <textarea
                class="form-control"
                :value="val"
                @input="handle($event)"
                :placeholder="'Enter ' + label"
            ></textarea>
        </div>
    </div>
</template>


<script>
export default {
    name: "TArea",
    props: ['label', 'val'],
    data() {
        return {
            content: this.val
        }
    },
    methods: {
        handle(e) {
            this.content = e.target.value
            this.$emit('input', this.content)
        }
    }
}
</script>