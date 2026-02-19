<template>
	<div id="preview" class="preview preview-box template7">
		<!-- Top bar -->
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
		<div class="draggable-element" draggable="true" v-if="data.profile.summary">
			<div class="section-elegant">
				<h4 class="section-title-elegant">PROFESSIONAL SUMMARY</h4>
				<div class="section-content">
					<p class="summary-text">{{ data.profile.summary }}</p>
				</div>
			</div>
		</div>

		<!-- Experience -->
		<div class="draggable-element" draggable="true" v-if="data.exps.length">
			<div class="section-elegant">
				<h4 class="section-title-elegant">PROFESSIONAL EXPERIENCE</h4>
				<div class="section-content">
					<PEXP :exps="data.exps" />
				</div>
			</div>
		</div>

		<!-- Skills -->
		<div class="draggable-element" draggable="true">
			<div class="section-elegant">
				<h4 class="section-title-elegant">CORE COMPETENCIES</h4>
				<div class="section-content">
					<PSKILL1 v-if="data.styles.skills == 1 && data.skills.length" :skills="data.skills" />
					<PSKILL2 v-else-if="data.styles.skills == 2" :skills2="data.skills2" />
				</div>
			</div>
		</div>

		<!-- Education -->
		<div class="draggable-element" draggable="true" v-if="data.eds.length">
			<div class="section-elegant">
				<h4 class="section-title-elegant">EDUCATION</h4>
				<div class="section-content">
					<PEDU :eds="data.eds" />
				</div>
			</div>
		</div>

		<!-- Projects -->
		<div class="draggable-element" draggable="true" v-if="data.projs.length">
			<div class="section-elegant">
				<h4 class="section-title-elegant">KEY PROJECTS</h4>
				<div class="section-content">
					<PProj :projs="data.projs" />
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
				if (current.classList[0] == "draggable-element") {
					if (navigator.userAgent.toLowerCase().includes("firefox")) {
						dragSrcEl_.innerHTML = current.innerHTML
						current.innerHTML = e.dataTransfer.getData("text/html")
					} else {
						let inner = current.innerHTML
						current.innerHTML = e.target.innerHTML
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
	color: #2c3e50;
}

.template7 .top-accent {
	height: 8px;
	background: linear-gradient(90deg, #8e44ad 0%, #9b59b6 50%, #8e44ad 100%);
	margin: -1.5cm -2cm 0 -2cm;
}

@media print {
	.template7 .top-accent {
		-webkit-print-color-adjust: exact;
		print-color-adjust: exact;
		color-adjust: exact;
		background: linear-gradient(90deg, #8e44ad 0%, #9b59b6 50%, #8e44ad 100%) !important;
	}
}

.template7 .header-elegant {
	text-align: center;
	padding: 30px 0;
	margin-bottom: 25px;
}

.template7 .name {
	font-size: 36pt;
	font-weight: 300;
	margin: 0;
	color: #2c3e50;
	letter-spacing: 3px;
	text-transform: uppercase;
}

.template7 .title {
	font-size: 14pt;
	margin: 8px 0 0 0;
	font-weight: 400;
	color: #7f8c8d;
	letter-spacing: 1px;
}

.template7 .divider-elegant {
	width: 80px;
	height: 2px;
	background: #8e44ad;
	margin: 20px auto;
}

@media print {
	.template7 .divider-elegant {
		-webkit-print-color-adjust: exact;
		print-color-adjust: exact;
		color-adjust: exact;
	}
}

.template7 .contact-row {
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	gap: 20px;
	font-size: 9pt;
	margin-top: 10px;
	color: #555;
}

.template7 .contact-item strong {
	color: #8e44ad;
	font-weight: 600;
}

.template7 .section-elegant {
	margin-bottom: 25px;
	page-break-inside: avoid;
}

.template7 .section-title-elegant {
	font-size: 13pt;
	font-weight: 600;
	color: #8e44ad;
	margin: 0 0 12px 0;
	text-transform: uppercase;
	letter-spacing: 1.5px;
	padding-bottom: 8px;
	border-bottom: 2px solid #e8e8e8;
}

@media print {
	.template7 .section-title-elegant {
		-webkit-print-color-adjust: exact;
		print-color-adjust: exact;
		color-adjust: exact;
	}
}

.template7 .section-content {
	padding-left: 10px;
}

.template7 .summary-text {
	text-align: justify;
	line-height: 1.6;
	color: #34495e;
}

.template7 .draggable-element {
	margin-bottom: 18px;
}

.template7 ul {
	margin: 0 !important;
	padding-left: 20px;
}

.template7 li {
	list-style: none !important;
	margin-bottom: 5px;
	position: relative;
	padding-left: 15px;
}

.template7 li:before {
	content: "◆";
	position: absolute;
	left: 0;
	color: #8e44ad;
	font-size: 8pt;
}

@media print {
	.template7 li:before {
		-webkit-print-color-adjust: exact;
		print-color-adjust: exact;
		color-adjust: exact;
	}
}

.template7 h5 {
	color: #2c3e50;
	font-weight: 600;
}

.template7 small {
	color: #7f8c8d !important;
}
</style>
