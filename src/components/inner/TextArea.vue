<template>
	<div class="row form-floating mb-3">
		<textarea :id="lid" class="form-control"  :value="val" @input="handle($event)" @focus="grow()" :placeholder="label"></textarea>
		<label :for="lid">{{ label }}</label>
	</div>
</template>

<style scoped>
textarea {
	white-space: pre-wrap;
	resize: none;
	overflow: hidden;
}
</style>
<script>
export default {
	name: "TArea",
	props: ["label", "val"],
	data() {
		return {
			content: this.val,
			lid: this.label.replace(" ", "-").toLowerCase() + (Math.random() * 84372434).toFixed(0)
		}
	},
	methods: {
		handle(e) {
			this.content = e.target.value
			this.$emit("input", this.content)
			this.grow()
		},
		grow(){
			let element = document.getElementById(this.lid)
			element.style.height = "5px"
			element.style.height = element.scrollHeight + "px"
			console.log(element.id, element.style)
		}
	},
}
</script>
