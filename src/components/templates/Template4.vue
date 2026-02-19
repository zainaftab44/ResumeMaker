<template>
	<div id="preview" class="preview preview-box template4">
		<!-- Header -->
		<div class="header-section">
			<h1 class="name">{{ data.profile.name }}</h1>
			<h3 class="title">{{ data.profile.title }}</h3>
			<div class="contact-bar">
				<span v-if="data.profile.email">{{ data.profile.email }}</span>
				<span v-if="data.profile.phone">{{ data.profile.phone }}</span>
				<span v-if="data.profile.address">{{ data.profile.address }}</span>
				<span v-if="data.profile.website">{{ data.profile.website }}</span>
			</div>
		</div>

		<div class="content-wrapper">
			<!-- Summary -->
			<div class="draggable-element section-spacing" draggable="true" v-if="data.profile.summary">
				<h4 class="section-title">PROFESSIONAL SUMMARY</h4>
				<div class="section-divider"></div>
				<p class="summary-text">{{ data.profile.summary }}</p>
			</div>

			<!-- Experience -->
			<div class="draggable-element section-spacing" draggable="true" v-if="data.exps.length">
				<h4 class="section-title">EXPERIENCE</h4>
				<div class="section-divider"></div>
				<PEXP :exps="data.exps" bullet="▸" bulletColor="#3498db" />
			</div>

			<!-- Skills -->
			<div class="draggable-element section-spacing" draggable="true">
				<h4 class="section-title">SKILLS</h4>
				<div class="section-divider"></div>
				<PSKILL1 v-if="data.styles.skills == 1 && data.skills.length" :skills="data.skills" />
				<PSKILL2 v-else-if="data.styles.skills == 2" :skills2="data.skills2" />
			</div>

			<!-- Education -->
			<div class="draggable-element section-spacing" draggable="true" v-if="data.eds.length">
				<h4 class="section-title">EDUCATION</h4>
				<div class="section-divider"></div>
				<PEDU :eds="data.eds" />
			</div>

			<!-- Projects -->
			<div class="draggable-element section-spacing" draggable="true" v-if="data.projs.length">
				<h4 class="section-title">PROJECTS</h4>
				<div class="section-divider"></div>
				<PProj :projs="data.projs" bullet="▸" bulletColor="#3498db" />
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
	name: "Template4",
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
.template4 {
	font-family: inherit;
	font-size: 10pt;
	line-height: 1.4;
	color: #333;
	height: auto;
}

.header-section {
	background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
	color: white;
	padding: 20pt 15pt;
	text-align: center;
	height: auto;
}

@media print {
	.header-section {
		-webkit-print-color-adjust: exact !important;
		print-color-adjust: exact !important;
		color-adjust: exact !important;
		background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%) !important;
	}
}

.name {
	font-size: 24pt;
	font-weight: bold;
	margin: 0 0 6pt 0;
	letter-spacing: 1pt;
	text-transform: uppercase;
}

.title {
	font-size: 12pt;
	margin: 0 0 10pt 0;
	font-weight: 300;
	letter-spacing: 0.5pt;
}

.contact-bar {
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	gap: 10pt;
	font-size: 9pt;
}

.contact-bar span:not(:last-child)::after {
	content: "|";
	margin-left: 10pt;
	opacity: 0.6;
}

.content-wrapper {
	max-width: 100%;
	height: auto;
}

/* .section-spacing {
	margin-bottom: 12pt;
	flex-grow: 0;
	flex-shrink: 0;
} */

.section-title {
	font-size: 11pt;
	font-weight: bold;
	color: #2c3e50;
	margin: 0 0 4pt 0;
	text-transform: uppercase;
	letter-spacing: 0.8pt;
}

.section-divider {
	height: 2pt;
	background: linear-gradient(90deg, #3498db 0%, #2c3e50 100%);
	margin-bottom: 8pt;
	border-radius: 1pt;
}

@media print {
	.section-divider {
		-webkit-print-color-adjust: exact !important;
		print-color-adjust: exact !important;
		color-adjust: exact !important;
	}
}

.summary-text {
	text-align: justify;
	line-height: 1.4;
	font-size: 10pt;
	margin: 0;
}

@media print {
	.template4 {
		height: auto;
	}
	
	.content-wrapper {
	max-width: 100%;
		height: auto;
	}
	
	.section-spacing {
		min-height: 0;
	}
}
</style>
