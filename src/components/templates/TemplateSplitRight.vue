<template>
	<div id="preview" class="preview preview-box template-split-right">
		<!-- Full Width Header -->
		<div class="header">
			<h1 class="name">{{ data.profile.name }}</h1>
			<p class="title">{{ data.profile.title }}</p>
			<div class="header-divider"></div>
		</div>

		<div class="content-body">
			<div class="main-column">
				<!-- Summary -->
				<div class="draggable-element section-spacing" draggable="true" v-if="data.profile.summary">
					<h4 class="section-title">PROFESSIONAL SUMMARY</h4>
					<p class="summary">{{ data.profile.summary }}</p>
				</div>

				<!-- Experience -->
				<div class="draggable-element section-spacing" draggable="true" v-if="data.exps.length">
					<h4 class="section-title">EXPERIENCE</h4>
					<PEXP :exps="data.exps" bullet="▪" bulletColor="#2c3e50" />
				</div>

				<!-- Projects -->
				<div class="draggable-element section-spacing" draggable="true" v-if="data.projs.length">
					<h4 class="section-title">PROJECTS</h4>
					<PProj :projs="data.projs" bullet="▪" bulletColor="#2c3e50" />
				</div>
			</div>

			<div class="sidebar-column">
				<!-- Contact Info -->
				<div class="sidebar-section">
					<h4 class="sidebar-title">INFO</h4>
					<div class="contact-info">
						<div v-if="data.profile.email" class="contact-item">{{ data.profile.email }}</div>
						<div v-if="data.profile.phone" class="contact-item">{{ data.profile.phone }}</div>
						<div v-if="data.profile.address" class="contact-item">{{ data.profile.address }}</div>
						<div v-if="data.profile.linkedin" class="contact-item">LinkedIn: {{ data.profile.linkedin }}</div>
						<div v-if="data.profile.github" class="contact-item">GitHub: {{ data.profile.github }}</div>
					</div>
				</div>

				<!-- Skills -->
				<div class="draggable-element sidebar-section" v-if="data.styles.skills == 2" draggable="true">
					<h4 class="sidebar-title">SKILLS</h4>
					<PSKILL2 :skills2="data.skills2" />
				</div>
				<div class="draggable-element sidebar-section" v-if="data.styles.skills == 1 && data.skills.length" draggable="true">
					<h4 class="sidebar-title">SKILLS</h4>
					<PSKILL1 :skills="data.skills" />
				</div>

				<!-- Education -->
				<div class="draggable-element sidebar-section" draggable="true" v-if="data.eds.length">
					<h4 class="sidebar-title">EDUCATION</h4>
					<PEDU :eds="data.eds" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import PProf from "../previews/profile/Second.vue"
import PEXP from "../previews/Experience.vue"
import PEDU from "../previews/Education.vue"
import PSKILL1 from "../previews/Skills.vue"
import PSKILL2 from "../previews/Skills2.vue"
import PProj from "../previews/Project.vue"

export default {
	name: "TemplateSplitRight",
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
				if (!e.target.classList.contains('draggable-element')) return;
				e.dataTransfer.effectAllowed = "move"
				e.dataTransfer.setData("text/html", e.target.innerHTML)
				e.dataTransfer.dropEffect = "move"
				dragSrcEl_ = e.target
			}

			function handleDragOver(e) {
				if (typeof e.target.closest == "function") current = e.target.closest(".draggable-element")
			}

			function handleDrop(e) {
				if (current && current.classList.contains("draggable-element") && dragSrcEl_) {
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
.template-split-right {
	padding: 1.5cm;
	font-family: inherit;
	color: #333;
	background: white;
	min-height: 29.7cm;
}

.header {
	text-align: left;
	margin-bottom: 25pt;
}

.name {
	font-size: 24pt;
	font-weight: 700;
	margin: 0;
	color: #2c3e50;
}

.title {
	font-size: 12pt;
	color: #7f8c8d;
	margin: 5pt 0 0 0;
	text-transform: uppercase;
	letter-spacing: 1pt;
}

.header-divider {
	height: 3pt;
	background: #2c3e50;
	width: 50pt;
	margin-top: 10pt;
}

.content-body {
	display: flex;
	gap: 1.5cm;
}

.main-column {
	flex: 1;
}

.sidebar-column {
	width: 6cm;
	flex-shrink: 0;
}

.section-title {
	font-size: 10pt;
	font-weight: 700;
	color: #2c3e50;
	margin-bottom: 12pt;
	letter-spacing: 0.5pt;
	border-bottom: 1pt solid #eee;
	padding-bottom: 4pt;
}

.sidebar-title {
	font-size: 10pt;
	font-weight: 700;
	color: #7f8c8d;
	margin-bottom: 10pt;
	letter-spacing: 1pt;
}

.sidebar-section {
	margin-bottom: 25pt;
}

.section-spacing {
	margin-bottom: 20pt;
}

.contact-info {
	font-size: 9pt;
	line-height: 1.6;
}

.contact-item {
	margin-bottom: 5pt;
	word-break: break-all;
}

.summary {
	font-size: 10.5pt;
	line-height: 1.5;
	text-align: justify;
}

@media print {
	.header-divider {
		background: #2c3e50 !important;
		-webkit-print-color-adjust: exact !important;
		print-color-adjust: exact !important;
	}
}
</style>
