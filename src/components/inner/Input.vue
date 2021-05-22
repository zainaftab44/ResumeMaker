<template>
    <div class="form-group">
        <label :for="label" class="col-form-label">{{ label }}</label>
        <div class="col">
            <input
                type="text"
                class="form-control"
                :value="val"
                @input="handle($event)"
                :placeholder="'Enter ' + label.toLowerCase()"
            />
        </div>
    </div>
</template>


<script>
export default {
    name: "Input",
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