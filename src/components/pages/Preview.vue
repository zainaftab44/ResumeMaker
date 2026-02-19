<template>
	<div class="row">
		<span class="mb-3 center-align-text">
			<strong>Select Template</strong>
			<select v-model="template" class="form-select" style="display: inline-block; width: auto; margin: 0 10px;">
				<option value="1">Classic Professional</option>
				<option value="2">Modern Minimal</option>
				<option value="3">Two Column</option>
				<option value="4">Executive Bold</option>
				<option value="5">Creative Designer</option>
				<option value="6">Tech Minimalist</option>
				<option value="7">Corporate Elegant</option>
			</select>
			<br />
			<strong>Select Font</strong>
			<select v-model="maindata.settings.font" class="form-select" style="display: inline-block; width: auto; margin: 10px 10px;">
				<option v-for="(font, f) in fonts" :key="f" :value="font">{{ font }}</option>
			</select>
			<br />
			<small>Drag and drop sections below to rearrange them in your desired order</small>
		</span>
		<div class="preview-container" v-bind:style="fontClass">
			<page size='A4'>
				<Template v-if="template == '1'" :data="maindata" />
				<Template2 v-else-if="template == '2'" :data="maindata" />
				<TemplateTwoColumns v-else-if="template == '3'" :data="maindata" />
				<Template4 v-else-if="template == '4'" :data="maindata" />
				<Template5 v-else-if="template == '5'" :data="maindata" />
				<Template6 v-else-if="template == '6'" :data="maindata" />
				<Template7 v-else-if="template == '7'" :data="maindata" />
			</page>
		</div>
	</div>
</template>

<script>
import Template from "../templates/Template.vue"
import Template2 from "../templates/Template2.vue"
import TemplateTwoColumns from "../templates/TwoColumns/TemplateTwoColumns.vue"
import Template4 from "../templates/Template4.vue"
import Template5 from "../templates/Template5.vue"
import Template6 from "../templates/Template6.vue"
import Template7 from "../templates/Template7.vue"

export default {
	name: "Preview",
	props: ["maindata"],
	components: {
		Template,
		Template2,
		TemplateTwoColumns,
		Template4,
		Template5,
		Template6,
		Template7
	},
	data() {
		return {
			template: '1',
			font: "Arial",
			cursive: [
				"Comic Sans",
			],
			sansSerif: [
				"Arial",
				"Calibri",
				"Helvetica",
				"Arial Narrow",
				"Times New Roman",
				"Georgia",
				"Verdana",
				"Trebuchet MS"
			],
			monospace: [
				"Courier New",
				"Consolas",
				"Monaco"
			],
			normal: [
				"Segoe UI",
				"Roboto",
				"Open Sans",
				"Lato",
				"Montserrat"
			]
		}
	},
	computed: {
		fonts: function () {
			return this.cursive
				.concat(this.normal)
				.concat(this.sansSerif)
				.concat(this.monospace)
				.sort()
		},
		fontType: function () {
			let font = this.maindata.settings.font
			return this.normal.includes(font) ? " "
				: (this.cursive.includes(font) ? ", cursive "
					: (this.monospace.includes(font) ? ",monospace" : ",sans-serif "))
		},
		fontClass: function () {
			return { "font-family": `${this.maindata.settings.font.toLowerCase()} ${this.fontType} !important` }
		},
	},
}
</script>

<style>
@page {
	size: A4 portrait;
	margin: 0;
}

page[size='A4'] {
	width: 21cm;
	height: auto;
	max-height: none;
	margin: auto 20px;
	background: white;
	box-shadow: 0 0 10px rgba(0,0,0,0.1);
	display: block;
	overflow: visible;
	position: relative;
}

page[size='A4'][layout='landscape'] {
	width: 29.7cm;
	height: auto;
}

.preview-container {
	width: 100%;
	max-width: 21cm;
	margin: 0 auto;
}

.center-align-text {
	text-align: center;
	display: block;
	margin-bottom: 20px;
}

/* Remove global list bullets */
.preview-container ul {
	list-style: none !important;
	padding-left: 0;
	margin: 0;
}

.preview-container li {
	list-style: none !important;
	list-style-type: none !important;
}

/* Ensure no double bullets from global CSS */
.preview-container li:before {
	content: none !important;
}

/* Prevent sections from expanding */
.preview-container .draggable-element,
.preview-container .section-spacing {
	flex-grow: 0 !important;
	flex-shrink: 0 !important;
}

@media print {
	page[size='A4'] {
		box-shadow: none;
		margin: 0;
		height: auto;
	}
	
	.center-align-text {
		display: none;
	}
	
	/* Ensure bullets don't print double */
	.preview-container li:before {
		content: none !important;
	}
	
	/* Prevent sections from stretching on print */
	.preview-container .draggable-element,
	.preview-container .section-spacing {
		min-height: 0 !important;
	}
}
</style>
