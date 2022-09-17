<template>
      <div class="row form-floating mb-3">
          <input type="text" :id="lid" class="form-control" :value="val" @input="handle($event)" :placeholder="label"/>
          <label :for="lid" class="col-form-label">{{ label }}</label>
      </div>
</template>


<script>

export default {
  name: "Input",
  props: ["label", "val"],
  data() {
    return {
      content: this.val,
    }
  },
  methods: {
    handle(e) {
      this.content = e.target.value
      this.$emit("input", this.content)
    },
  },
  computed: {
    lid: function () {
      return this.label.replace(" ", "-").toLowerCase() + (Math.random() * 84372434).toFixed(0)
    }
  }
}
</script>