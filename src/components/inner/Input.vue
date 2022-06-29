<template>
    <div class="row form-floating mb-3">
        <input type="text" class="form-control" :value="val" @input="handle($event)" :placeholder="label"/>
        <label :for="label" class="col-form-label">{{ label }}</label>
    </div>
</template>


<script>
export default {
  name: "Input",
  props: ["label", "val"],
  data() {
    return {
      content: this.val,
    };
  },
  methods: {
    handle(e) {
      this.content = e.target.value;
      this.$emit("input", this.content);
    },
  },
};
</script>