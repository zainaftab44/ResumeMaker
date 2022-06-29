<template>
	<div class="row form-floating mb-3">
		<textarea :id="label" class="form-control" :value="val" @input="handle($event)" @keydown="auto_grow($event.target)" @load="auto_grow($event.target)" :placeholder="label">
		</textarea>
		<label :for="label">{{ label }}</label>
	</div>
</template>

<script>
export default {
	name: "TArea",
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
		auto_grow(element) {
			element.style.height = "5px"
			element.style.height = element.scrollHeight + "px"
		},
	},
}
</script>
