<template>
	<div>
		<span class="mb-3 center-align-text">
			Select Template
			<select v-model="template">
				<option value="1">Template 1</option>
				<option value="2">Template 2</option>
			</select>
			<br />
			Select Font
			<select v-model="maindata.settings.font">
				<option v-for="(font, f) in fonts" :key="f" :value="font">{{ font }}</option>
			</select>
			<br />
			You can drag/drop sections in box below to re-arrange them in your desired order
		</span>
		<div v-bind:style="fontClass">
			<Template v-if="template == 1" :data="maindata" />
			<Template2 v-else-if="template == 2" :data="maindata" />
		</div>
	</div>
</template>

<script>
import Template from "./Template.vue"
import Template2 from "./Template2.vue"
export default {
	name: "Preview",
	props: ["maindata"],
	components: {
		Template,
		Template2,
	},
	data() {
		return {
			template: 1,
			font: "Arial",
			fonts: [
				"Arial",
				"Helvetica",
				"Verdana",
				"Trebuchet MS",
				"Gill Sans",
				"Noto Sans",
				"Avantgarde",
				"Optima",
				"Arial Narrow",
				"sans-serif",
				"Times",
				"Didot",
				"Georgia",
				"Palatino",
				"Bookman",
				"New Century Schoolbook",
				"American Typewriter",
				"serif",
				"Comic Sans MS",
				"Apple Chancery",
				"Bradley Hand",
				"Brush Script MT",
				"Snell Roundhand",
				"URW Chancery L",
				"cursive",
			],
		}
	},
	computed: {
		fontClass: function() {
			return { "font-family": `${this.maindata.settings.font} !important` }
		},
	},
}
</script>
