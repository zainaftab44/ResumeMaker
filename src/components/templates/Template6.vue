<template>
	<div id="preview" class="preview preview-box template6">
		<div class="content-wrapper">
			<!-- Header -->
			<div class="header-minimal">
				<div class="header-content">
					<h1 class="name">{{ data.profile.name }}</h1>
					<div class="separator"></div>
					<h3 class="title">{{ data.profile.title }}</h3>
				</div>
				<div class="contact-grid">
					<div v-if="data.profile.email" class="contact-item" style="display:flex; align-items:center; gap:4pt;">
						<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3498db" stroke-width="2"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
						{{ data.profile.email }}
					</div>
					<div v-if="data.profile.phone" class="contact-item" style="display:flex; align-items:center; gap:4pt;">
						<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3498db" stroke-width="2"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
						{{ data.profile.phone }}
					</div>
					<div v-if="data.profile.address" class="contact-item" style="display:flex; align-items:center; gap:4pt;">
						<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3498db" stroke-width="2"><path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
						{{ data.profile.address }}
					</div>
					<div v-if="data.profile.website" class="contact-item" style="display:flex; align-items:center; gap:4pt;">
						<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3498db" stroke-width="2"><path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"/></svg>
						{{ data.profile.website }}
					</div>
					<div v-if="data.profile.linkedin" class="contact-item" style="display:flex; align-items:center; gap:4pt;">
						<svg width="12" height="12" viewBox="0 0 24 24" fill="#3498db"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
						{{ data.profile.linkedin }}
					</div>
					<div v-if="data.profile.github" class="contact-item" style="display:flex; align-items:center; gap:4pt;">
						<svg width="12" height="12" viewBox="0 0 24 24" fill="#3498db"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
						{{ data.profile.github }}
					</div>
				</div>
			</div>

			<!-- Summary -->
			<div class="section-spacing" draggable="false" v-if="data.profile.summary">
				<div class="section-header">
					<span class="section-number">01</span>
					<h4 class="section-title">PROFILE</h4>
				</div>
				<p class="summary-text">{{ data.profile.summary }}</p>
			</div>

			<template v-for="(section, idx) in localSectionOrder">
				<div v-if="section === 'exps' && data.exps.length"
				     :key="'exps'"
				     class="draggable-element section-spacing"
				     draggable="true"
				     @dragstart="onSectionDragStart($event, section)"
				     @dragover="onSectionDragOver"
				     @drop="onSectionDrop($event, section)"
				     @dragend="onSectionDragEnd">
					<div class="section-header">
						<span class="section-number">{{ sectionNum(idx) }}</span>
						<h4 class="section-title">EXPERIENCE</h4>
					</div>
					<PEXP :exps="data.exps" bullet="◦" bulletColor="#3498db" :show-heading="false" />
				</div>
				<div v-if="section === 'skills'"
				     :key="'skills'"
				     class="draggable-element section-spacing"
				     draggable="true"
				     @dragstart="onSectionDragStart($event, section)"
				     @dragover="onSectionDragOver"
				     @drop="onSectionDrop($event, section)"
				     @dragend="onSectionDragEnd">
					<div class="section-header">
						<span class="section-number">{{ sectionNum(idx) }}</span>
						<h4 class="section-title">SKILLS</h4>
					</div>
					<PSKILL1 v-if="data.styles.skills == 1 && data.skills.length" :skills="data.skills" :show-heading="false" />
					<PSKILL2 v-else-if="data.styles.skills == 2" :skills2="data.skills2" :show-heading="false" />
				</div>
				<div v-if="section === 'eds' && data.eds.length"
				     :key="'eds'"
				     class="draggable-element section-spacing"
				     draggable="true"
				     @dragstart="onSectionDragStart($event, section)"
				     @dragover="onSectionDragOver"
				     @drop="onSectionDrop($event, section)"
				     @dragend="onSectionDragEnd">
					<div class="section-header">
						<span class="section-number">{{ sectionNum(idx) }}</span>
						<h4 class="section-title">EDUCATION</h4>
					</div>
					<PEDU :eds="data.eds" :show-heading="false" />
				</div>
				<div v-if="section === 'projs' && data.projs.length"
				     :key="'projs'"
				     class="draggable-element section-spacing"
				     draggable="true"
				     @dragstart="onSectionDragStart($event, section)"
				     @dragover="onSectionDragOver"
				     @drop="onSectionDrop($event, section)"
				     @dragend="onSectionDragEnd">
					<div class="section-header">
						<span class="section-number">{{ sectionNum(idx) }}</span>
						<h4 class="section-title">PROJECTS</h4>
					</div>
					<PProj :projs="data.projs" bullet="◦" bulletColor="#3498db" :show-heading="false" />
				</div>
			</template>
		</div>
	</div>
</template>

<script>
import PEXP from "../previews/Experience.vue"
import PEDU from "../previews/Education.vue"
import PSKILL1 from "../previews/Skills.vue"
import PSKILL2 from "../previews/Skills2.vue"
import PProj from "../previews/Project.vue"
import dragMixin from "./dragMixin.js"

export default {
	name: "Template6",
	mixins: [dragMixin],
	props: ["data"],
	components: {
		PEXP,
		PEDU,
		PSKILL1,
		PSKILL2,
		PProj,
	},
}
</script>

<style scoped>
.template6 {
	font-family: inherit;
	font-size: 10pt;
	line-height: 1.4;
	color: #2c3e50;
	padding: 1.5cm 2cm;
}

.content-wrapper {
	max-width: 100%;
}

.header-minimal {
	border-left: 3pt solid #3498db;
	padding-left: 12pt;
	margin-bottom: 18pt;
}

@media print {
	.header-minimal {
		-webkit-print-color-adjust: exact !important;
		print-color-adjust: exact !important;
		color-adjust: exact !important;
	}
}

.header-content {
	margin-bottom: 10pt;
}

.name {
	font-size: 22pt;
	font-weight: 700;
	margin: 0;
	line-height: 1;
	color: #2c3e50;
	letter-spacing: -0.3pt;
}

.separator {
	height: 1.5pt;
	width: 35pt;
	background: #3498db;
	margin: 5pt 0;
}

@media print {
	.separator {
		-webkit-print-color-adjust: exact !important;
		print-color-adjust: exact !important;
		color-adjust: exact !important;
	}
}

.title {
	font-size: 11pt;
	margin: 0;
	font-weight: 300;
	color: #7f8c8d;
	letter-spacing: 0.3pt;
}

.contact-grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 6pt;
	font-size: 8pt;
	margin-top: 10pt;
}

.contact-item {
	display: flex;
	align-items: center;
}

.label {
	display: inline-block;
	width: 14pt;
	height: 14pt;
	background: #ecf0f1;
	color: #3498db;
	font-weight: bold;
	font-size: 7pt;
	text-align: center;
	line-height: 14pt;
	margin-right: 6pt;
	border-radius: 2pt;
	flex-shrink: 0;
}

@media print {
	.label {
		-webkit-print-color-adjust: exact !important;
		print-color-adjust: exact !important;
		color-adjust: exact !important;
	}
}

.section-spacing {
	margin-bottom: 12pt;
}

.section-header {
	display: flex;
	align-items: center;
	margin: 0 0 8pt 0;
	gap: 8pt;
}

.section-number {
	font-size: 13pt;
	font-weight: bold;
	color: #3498db;
	min-width: 20pt;
}

.section-title {
	font-size: 10pt;
	font-weight: 700;
	margin: 0;
	text-transform: uppercase;
	letter-spacing: 1.2pt;
	color: #2c3e50;
	position: relative;
	flex: 1;
	border-bottom: 0.5pt solid #ddd;
	padding-bottom: 3pt;
}

.summary-text {
	text-align: justify;
	line-height: 1.4;
	font-size: 10pt;
	color: #34495e;
	margin: 0 0 0 28pt;
}

@media print {
	.template6 {
		padding: 1.5cm 2cm;
	}
}
</style>
