<template>
	<div id="preview" class="preview preview-box template6">
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
		<div class="draggable-element" draggable="true" v-if="data.profile.summary">
			<div class="section-header">
				<span class="section-number">01</span>
				<h4 class="section-title">PROFILE</h4>
			</div>
			<p class="summary-text">{{ data.profile.summary }}</p>
		</div>

		<!-- Experience -->
		<div class="draggable-element" draggable="true" v-if="data.exps.length">
			<div class="section-header">
				<span class="section-number">02</span>
				<h4 class="section-title">EXPERIENCE</h4>
			</div>
			<PEXP :exps="data.exps" />
		</div>

		<!-- Skills -->
		<div class="draggable-element" draggable="true">
			<div class="section-header">
				<span class="section-number">03</span>
				<h4 class="section-title">SKILLS</h4>
			</div>
			<PSKILL1 v-if="data.styles.skills == 1 && data.skills.length" :skills="data.skills" />
			<PSKILL2 v-else-if="data.styles.skills == 2" :skills2="data.skills2" />
		</div>

		<!-- Education -->
		<div class="draggable-element" draggable="true" v-if="data.eds.length">
			<div class="section-header">
				<span class="section-number">04</span>
				<h4 class="section-title">EDUCATION</h4>
			</div>
			<PEDU :eds="data.eds" />
		</div>

		<!-- Projects -->
		<div class="draggable-element" draggable="true" v-if="data.projs.length">
			<div class="section-header">
				<span class="section-number">05</span>
				<h4 class="section-title">PROJECTS</h4>
			</div>
			<PProj :projs="data.projs" />
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
.template6 {
	font-family: inherit;
	color: #2c3e50;
}

.template6 .header-minimal {
	border-left: 4px solid #3498db;
	padding-left: 20px;
	margin-bottom: 30px;
}

@media print {
	.template6 .header-minimal {
		-webkit-print-color-adjust: exact;
		print-color-adjust: exact;
		color-adjust: exact;
	}
}

.template6 .header-content {
	margin-bottom: 15px;
}

.template6 .name {
	font-size: 32pt;
	font-weight: 700;
	margin: 0;
	line-height: 1;
	color: #2c3e50;
	letter-spacing: -0.5px;
}

.template6 .separator {
	height: 2px;
	width: 50px;
	background: #3498db;
	margin: 8px 0;
}

@media print {
	.template6 .separator {
		-webkit-print-color-adjust: exact;
		print-color-adjust: exact;
		color-adjust: exact;
	}
}

.template6 .title {
	font-size: 14pt;
	margin: 0;
	font-weight: 300;
	color: #7f8c8d;
	letter-spacing: 0.5px;
}

.template6 .contact-grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 8px;
	font-size: 9pt;
	margin-top: 15px;
}

.template6 .contact-item {
	display: flex;
	align-items: center;
}

.template6 .label {
	display: inline-block;
	width: 20px;
	height: 20px;
	background: #ecf0f1;
	color: #3498db;
	font-weight: bold;
	font-size: 8pt;
	text-align: center;
	line-height: 20px;
	margin-right: 8px;
	border-radius: 3px;
}

@media print {
	.template6 .label {
		-webkit-print-color-adjust: exact;
		print-color-adjust: exact;
		color-adjust: exact;
	}
}

.template6 .section-header {
	display: flex;
	align-items: center;
	margin: 25px 0 12px 0;
	gap: 12px;
}

.template6 .section-number {
	font-size: 16pt;
	font-weight: bold;
	color: #3498db;
	min-width: 30px;
}

.template6 .section-title {
	font-size: 12pt;
	font-weight: 700;
	margin: 0;
	text-transform: uppercase;
	letter-spacing: 2px;
	color: #2c3e50;
	position: relative;
}

.template6 .section-title::after {
	content: "";
	position: absolute;
	bottom: -4px;
	left: 0;
	right: 0;
	height: 1px;
	background: linear-gradient(90deg, #3498db 0%, transparent 100%);
}

@media print {
	.template6 .section-title::after {
		-webkit-print-color-adjust: exact;
		print-color-adjust: exact;
		color-adjust: exact;
	}
}

.template6 .summary-text {
	text-align: justify;
	line-height: 1.6;
	color: #34495e;
	margin-left: 42px;
}

.template6 .draggable-element {
	margin-bottom: 18px;
}

.template6 ul {
	margin: 0 !important;
	padding-left: 42px;
}

.template6 li {
	list-style: none !important;
	margin-bottom: 5px;
	position: relative;
}

.template6 li:before {
	content: "";
	position: absolute;
	left: -22px;
	top: 9px;
	width: 6px;
	height: 6px;
	background: #3498db;
	border-radius: 50%;
}

@media print {
	.template6 li:before {
		-webkit-print-color-adjust: exact;
		print-color-adjust: exact;
		color-adjust: exact;
	}
}
</style>
