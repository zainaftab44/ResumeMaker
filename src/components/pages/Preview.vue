<template>
	<div class="preview-page">
		<!-- Modern Control Panel -->
		<div class="control-panel">
			<div class="control-card">
				<div class="control-section">
					<div class="control-group">
						<label class="control-label">
							<svg class="control-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
							</svg>
							Template
						</label>
						<select v-model="template" class="control-select template-select">
							<option value="1">📄 Classic Professional</option>
							<option value="2">✨ Modern Minimal</option>
							<option value="3">📊 Two Column</option>
							<option value="4">💼 Executive Bold</option>
							<option value="5">🎨 Creative Designer</option>
							<option value="6">💻 Tech Minimalist</option>
							<option value="7">🏢 Corporate Elegant</option>
							<option value="8">🟦 Modern Sidebar (Left)</option>
							<option value="9">🌗 Clean Split (Right)</option>
							<option value="10">🎨 Modern Portfolio (Zain Style)</option>
						</select>
					</div>

					<div class="control-row">
						<div class="control-group">
							<label class="control-label">
								<svg class="control-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
								</svg>
								Font Family
							</label>
							<select v-model="maindata.settings.font" class="control-select">
								<optgroup label="Professional">
									<option value="Arial">Arial</option>
									<option value="Calibri">Calibri</option>
									<option value="Helvetica">Helvetica</option>
									<option value="Times New Roman">Times New Roman</option>
									<option value="Georgia">Georgia</option>
								</optgroup>
								<optgroup label="Modern">
									<option value="Segoe UI">Segoe UI</option>
									<option value="Roboto">Roboto</option>
									<option value="Open Sans">Open Sans</option>
									<option value="Lato">Lato</option>
									<option value="Montserrat">Montserrat</option>
								</optgroup>
								<optgroup label="Monospace">
									<option value="Courier New">Courier New</option>
									<option value="Consolas">Consolas</option>
									<option value="Monaco">Monaco</option>
								</optgroup>
							</select>
						</div>

						<div class="control-group">
							<label class="control-label">
								<svg class="control-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
								</svg>
								Font Weight
							</label>
							<select v-model="fontWeight" class="control-select">
								<option value="300">Light (300)</option>
								<option value="400">Normal (400)</option>
								<option value="500">Medium (500)</option>
								<option value="600">Semi-Bold (600)</option>
								<option value="700">Bold (700)</option>
							</select>
						</div>
					</div>
				</div>

				<div class="tips-section">
					<div class="tip-badge">💡 Tip</div>
					<p class="tip-text">Drag and drop sections in the preview below to rearrange them</p>
				</div>
			</div>
		</div>

		<!-- Preview Container -->
		<div class="preview-wrapper">
			<div class="preview-container" v-bind:style="combinedStyles">
				<page size='A4'>
					<Template v-if="template == '1'" :data="maindata" />
					<Template2 v-else-if="template == '2'" :data="maindata" />
					<TemplateTwoColumns v-else-if="template == '3'" :data="maindata" />
					<Template4 v-else-if="template == '4'" :data="maindata" />
					<Template5 v-else-if="template == '5'" :data="maindata" />
					<Template6 v-else-if="template == '6'" :data="maindata" />
					<Template7 v-else-if="template == '7'" :data="maindata" />
					<Template8 v-else-if="template == '8'" :data="maindata" />
					<Template9 v-else-if="template == '9'" :data="maindata" />
					<Template10 v-else-if="template == '10'" :data="maindata" />
				</page>
			</div>
		</div>

		<!-- Footer Info -->
		<div class="preview-footer">
			<div class="footer-item">
				<svg class="footer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
				</svg>
				A4 Page (21cm × 29.7cm)
			</div>
			<div class="footer-item">
				<svg class="footer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
				</svg>
				10pt Body Text
			</div>
			<div class="footer-item">
				<svg class="footer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
				</svg>
				Ready to Print/Export
			</div>
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
import Template8 from "../templates/TemplateSidebarLeft.vue"
import Template9 from "../templates/TemplateSplitRight.vue"
import Template10 from "../templates/TemplateModernPortfolio.vue"

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
		Template7,
		Template8,
		Template9,
		Template10
	},
	data() {
		return {
			template: '1',
			fontWeight: '400',
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
		combinedStyles: function () {
			return {
				"font-family": `${this.maindata.settings.font.toLowerCase()} ${this.fontType}`,
				"font-weight": this.fontWeight
			}
		},
	},
}
</script>

<style scoped>
.preview-page {
	width: 100%;
	min-height: 100vh;
	background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
	padding: 20px;
}

/* Control Panel */
.control-panel {
	max-width: 1400px;
	margin: 0 auto 30px;
}

.control-card {
	background: white;
	border-radius: 16px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07);
	padding: 24px;
	border: 1px solid rgba(0, 0, 0, 0.05);
}

.control-section {
	margin-bottom: 20px;
}

.control-group {
	margin-bottom: 16px;
}

.control-group:last-child {
	margin-bottom: 0;
}

.control-label {
	display: flex;
	align-items: center;
	font-size: 14px;
	font-weight: 600;
	color: #2d3748;
	margin-bottom: 8px;
	gap: 8px;
}

.control-icon {
	width: 18px;
	height: 18px;
	color: #4299e1;
}

.control-select {
	width: 100%;
	padding: 10px 14px;
	font-size: 15px;
	border: 2px solid #e2e8f0;
	border-radius: 8px;
	background: white;
	color: #2d3748;
	cursor: pointer;
	transition: all 0.2s;
	font-weight: 500;
}

.control-select:hover {
	border-color: #4299e1;
}

.control-select:focus {
	outline: none;
	border-color: #4299e1;
	box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
}

.template-select {
	font-size: 16px;
	padding: 12px 14px;
}

.control-row {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 16px;
}

@media (max-width: 768px) {
	.control-row {
		grid-template-columns: 1fr;
	}
}

/* Tips Section */
.tips-section {
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	border-radius: 10px;
	padding: 16px 20px;
	display: flex;
	align-items: center;
	gap: 12px;
}

.tip-badge {
	background: rgba(255, 255, 255, 0.25);
	color: white;
	padding: 4px 12px;
	border-radius: 20px;
	font-size: 13px;
	font-weight: 600;
	white-space: nowrap;
	backdrop-filter: blur(10px);
}

.tip-text {
	color: white;
	margin: 0;
	font-size: 14px;
	line-height: 1.5;
}

/* Preview Wrapper */
.preview-wrapper {
	max-width: 21cm;
	margin: 0 auto;
}

.preview-container {
	width: 100%;
	max-width: 21cm;
	margin: 0 auto;
}

/* Preview Footer */
.preview-footer {
	max-width: 1400px;
	margin: 30px auto 0;
	display: flex;
	justify-content: center;
	gap: 30px;
	flex-wrap: wrap;
}

.footer-item {
	display: flex;
	align-items: center;
	gap: 8px;
	color: #4a5568;
	font-size: 14px;
	font-weight: 500;
	background: white;
	padding: 10px 16px;
	border-radius: 8px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.footer-icon {
	width: 18px;
	height: 18px;
	color: #4299e1;
}

@media (max-width: 768px) {
	.preview-footer {
		flex-direction: column;
		align-items: center;
	}
}
</style>

<style>
/* Global styles for preview */
@page {
	size: A4 portrait;
	margin: 0;
}

page[size='A4'] {
	width: 21cm;
	height: auto;
	max-height: none;
	margin: 0 auto 20px;
	background: white;
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
	display: block;
	overflow: visible;
	position: relative;
	border-radius: 4px;
}

page[size='A4'][layout='landscape'] {
	width: 29.7cm;
	height: auto;
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
	.preview-page {
		background: white;
		padding: 0;
	}

	.control-panel,
	.preview-footer {
		display: none !important;
	}

	page[size='A4'] {
		box-shadow: none;
		margin: 0;
		height: auto;
		border-radius: 0;
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
