<template>
	<div id="preview" class="preview preview-box template7">
		<div class="content-wrapper">
		<!-- Top accent bar -->
		<div class="top-accent"></div>
		
			<!-- Header -->
			<div class="header-elegant">
				<h1 class="name">{{ data.profile.name }}</h1>
				<h3 class="title">{{ data.profile.title }}</h3>
				
				<div class="divider-elegant"></div>
				
				<div class="contact-row">
					<span v-if="data.profile.email" class="contact-item">
						<strong>Email:</strong> {{ data.profile.email }}
					</span>
					<span v-if="data.profile.phone" class="contact-item">
						<strong>Phone:</strong> {{ data.profile.phone }}
					</span>
					<span v-if="data.profile.address" class="contact-item">
						<strong>Location:</strong> {{ data.profile.address }}
					</span>
				</div>
				<div class="contact-row" v-if="data.profile.linkedin || data.profile.website || data.profile.github">
					<span v-if="data.profile.linkedin" class="contact-item">
						<strong>LinkedIn:</strong> {{ data.profile.linkedin }}
					</span>
					<span v-if="data.profile.website" class="contact-item">
						<strong>Website:</strong> {{ data.profile.website }}
					</span>
					<span v-if="data.profile.github" class="contact-item">
						<strong>GitHub:</strong> {{ data.profile.github }}
					</span>
				</div>
			</div>

			<!-- Summary -->
			<div class="draggable-element section-spacing" draggable="true" v-if="data.profile.summary">
				<div class="section-elegant">
					<h4 class="section-title-elegant">PROFESSIONAL SUMMARY</h4>
					<div class="section-content">
						<p class="summary-text">{{ data.profile.summary }}</p>
					</div>
				</div>
			</div>

			<!-- Experience -->
			<div class="draggable-element section-spacing" draggable="true" v-if="data.exps.length">
				<div class="section-elegant">
					<h4 class="section-title-elegant">PROFESSIONAL EXPERIENCE</h4>
					<div class="section-content">
						<PEXP :exps="data.exps" bullet="◆" bulletColor="#8e44ad" />
					</div>
				</div>
			</div>

			<!-- Skills -->
			<div class="draggable-element section-spacing" draggable="true">
				<div class="section-elegant">
					<h4 class="section-title-elegant">CORE COMPETENCIES</h4>
					<div class="section-content">
						<PSKILL1 v-if="data.styles.skills == 1 && data.skills.length" :skills="data.skills" />
						<PSKILL2 v-else-if="data.styles.skills == 2" :skills2="data.skills2" />
					</div>
				</div>
			</div>

			<!-- Education -->
			<div class="draggable-element section-spacing" draggable="true" v-if="data.eds.length">
				<div class="section-elegant">
					<h4 class="section-title-elegant">EDUCATION</h4>
					<div class="section-content">
						<PEDU :eds="data.eds" />
					</div>
				</div>
			</div>

			<!-- Projects -->
			<div class="draggable-element section-spacing" draggable="true" v-if="data.projs.length">
				<div class="section-elegant">
					<h4 class="section-title-elegant">KEY PROJECTS</h4>
					<div class="section-content">
						<PProj :projs="data.projs" bullet="◆" bulletColor="#8e44ad" />
					</div>
				</div>
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
	name: "Template7",
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
.template7 {
	font-family: inherit;
	font-size: 10pt;
	line-height: 1.4;
	color: #2c3e50;
}

.top-accent {
	height: 6pt;
	background: linear-gradient(90deg, #8e44ad 0%, #9b59b6 50%, #8e44ad 100%);
}

@media print {
	.top-accent {
		-webkit-print-color-adjust: exact !important;
		print-color-adjust: exact !important;
		color-adjust: exact !important;
		background: linear-gradient(90deg, #8e44ad 0%, #9b59b6 50%, #8e44ad 100%) !important;
	}
}

.content-wrapper {
	max-width: 100%;
}

.header-elegant {
	text-align: center;
	padding: 20pt 0;
	margin-bottom: 15pt;
}

.name {
	font-size: 24pt;
	font-weight: 300;
	margin: 0;
	color: #2c3e50;
	letter-spacing: 2pt;
	text-transform: uppercase;
}

.title {
	font-size: 11pt;
	margin: 5pt 0 0 0;
	font-weight: 400;
	color: #7f8c8d;
	letter-spacing: 0.8pt;
}

.divider-elegant {
	width: 60pt;
	height: 1.5pt;
	background: #8e44ad;
	margin: 12pt auto;
}

@media print {
	.divider-elegant {
		-webkit-print-color-adjust: exact !important;
		print-color-adjust: exact !important;
		color-adjust: exact !important;
	}
}

.contact-row {
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	gap: 12pt;
	font-size: 8pt;
	margin-top: 8pt;
	color: #555;
}

.contact-item strong {
	color: #8e44ad;
	font-weight: 600;
}

.section-spacing {
	margin-bottom: 12pt;
}

.section-elegant {
	margin-bottom: 15pt;
}

.section-title-elegant {
	font-size: 10pt;
	font-weight: 600;
	color: #8e44ad;
	margin: 0 0 8pt 0;
	text-transform: uppercase;
	letter-spacing: 1pt;
	padding-bottom: 4pt;
	border-bottom: 1.5pt solid #e8e8e8;
}

@media print {
	.section-title-elegant {
		-webkit-print-color-adjust: exact !important;
		print-color-adjust: exact !important;
		color-adjust: exact !important;
	}
}

.section-content {
	padding-left: 8pt;
}

.summary-text {
	text-align: justify;
	line-height: 1.4;
	font-size: 10pt;
	color: #34495e;
	margin: 0;
}

@media print {
	.content-wrapper {
		max-width: 100%;
	}
}
</style>
