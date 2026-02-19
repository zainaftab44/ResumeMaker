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
					<div v-if="data.profile.email" class="contact-item">
						<span class="label">E</span> {{ data.profile.email }}
					</div>
					<div v-if="data.profile.phone" class="contact-item">
						<span class="label">P</span> {{ data.profile.phone }}
					</div>
					<div v-if="data.profile.website" class="contact-item">
						<span class="label">W</span> {{ data.profile.website }}
					</div>
					<div v-if="data.profile.linkedin" class="contact-item">
						<span class="label">L</span> {{ data.profile.linkedin }}
					</div>
				</div>
			</div>

			<!-- Summary -->
			<div class="draggable-element section-spacing" draggable="true" v-if="data.profile.summary">
				<div class="section-header">
					<span class="section-number">01</span>
					<h4 class="section-title">PROFILE</h4>
				</div>
				<p class="summary-text">{{ data.profile.summary }}</p>
			</div>

			<!-- Experience -->
			<div class="draggable-element section-spacing" draggable="true" v-if="data.exps.length">
				<div class="section-header">
					<span class="section-number">02</span>
					<h4 class="section-title">EXPERIENCE</h4>
				</div>
				<PEXP :exps="data.exps" bullet="◦" bulletColor="#3498db" />
			</div>

			<!-- Skills -->
			<div class="draggable-element section-spacing" draggable="true">
				<div class="section-header">
					<span class="section-number">03</span>
					<h4 class="section-title">SKILLS</h4>
				</div>
				<PSKILL1 v-if="data.styles.skills == 1 && data.skills.length" :skills="data.skills" />
				<PSKILL2 v-else-if="data.styles.skills == 2" :skills2="data.skills2" />
			</div>

			<!-- Education -->
			<div class="draggable-element section-spacing" draggable="true" v-if="data.eds.length">
				<div class="section-header">
					<span class="section-number">04</span>
					<h4 class="section-title">EDUCATION</h4>
				</div>
				<PEDU :eds="data.eds" />
			</div>

			<!-- Projects -->
			<div class="draggable-element section-spacing" draggable="true" v-if="data.projs.length">
				<div class="section-header">
					<span class="section-number">05</span>
					<h4 class="section-title">PROJECTS</h4>
				</div>
				<PProj :projs="data.projs" bullet="◦" bulletColor="#3498db" />
			</div>
		</div>
	</div>
</template>

<script>
import PProf from "../previews/profile/First.vue"
import PEXP from "../previews/Experience.vue"
import PEDU from "../previews/Education.vue"
import PSKILL1 from "../previews/Skills.vue"
import PSKILL2 from "../previews/Skills2.vue"
import PProj from "../previews/Project.vue"

export default {
	name: "Template6",
	props: ["data"],
	components: {
		PProf,
		PEXP,
		PEDU,
		PSKILL1,
		PSKILL2,
		PProj,
	},
	mounted() {
		(function () {
			var id_ = "preview"
			var rows_ = document.querySelectorAll("#" + id_ + " .draggable-element")
			var dragSrcEl_ = null
			var current = null

			function handleDragStart(e) {
				e.dataTransfer.effectAllowed = "move"
				e.dataTransfer.setData("text/html", e.target.innerHTML)
				e.dataTransfer.dropEffect = "move"
				dragSrcEl_ = e.target
			}

			function handleDragOver(e) {
				if (typeof e.target.closest == "function") current = e.target.closest(".draggable-element")
			}

			function handleDrop(e) {
				if (current && current.classList.contains("draggable-element")) {
					if (navigator.userAgent.toLowerCase().includes("firefox")) {
						dragSrcEl_.innerHTML = current.innerHTML
						current.innerHTML = e.dataTransfer.getData("text/html")
					} else {
						let inner = current.innerHTML
						current.innerHTML = dragSrcEl_.innerHTML
						dragSrcEl_.innerHTML = inner
					}
				}
			}

			[].forEach.call(rows_, function (row) {
				row.addEventListener("dragstart", handleDragStart, false)
				row.addEventListener("dragover", handleDragOver, false)
				row.addEventListener("dragend", handleDrop, false)
			})
		})()
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
