<template>
	<div id="preview" class="preview preview-box template-sidebar-left">
		<div class="sidebar">
			<PProf :profile="data.profile" />
			
			<div class="sidebar-sections">
				<!-- Contact Info -->
				<div class="sidebar-section">
					<h4 class="sidebar-title">CONTACT</h4>
					<div class="contact-info">
						<div v-if="data.profile.email" class="contact-item">
							<span class="icon">✉</span> {{ data.profile.email }}
						</div>
						<div v-if="data.profile.phone" class="contact-item">
							<span class="icon">📞</span> {{ data.profile.phone }}
						</div>
						<div v-if="data.profile.address" class="contact-item">
							<span class="icon">📍</span> {{ data.profile.address }}
						</div>
						<div v-if="data.profile.linkedin" class="contact-item">
							<span class="icon">in</span> {{ data.profile.linkedin }}
						</div>
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

		<div class="main-content">
			<!-- Header -->
			<div class="header">
				<h1 class="name">{{ data.profile.name }}</h1>
				<p class="title">{{ data.profile.title }}</p>
			</div>

			<!-- Summary -->
			<div class="draggable-element section-spacing" draggable="true" v-if="data.profile.summary">
				<h4 class="section-title">PROFILE</h4>
				<p class="summary">{{ data.profile.summary }}</p>
			</div>

			<!-- Experience -->
			<div class="draggable-element section-spacing" draggable="true" v-if="data.exps.length">
				<h4 class="section-title">EXPERIENCE</h4>
				<PEXP :exps="data.exps" bullet="•" bulletColor="#34495e" />
			</div>

			<!-- Projects -->
			<div class="draggable-element section-spacing" draggable="true" v-if="data.projs.length">
				<h4 class="section-title">PROJECTS</h4>
				<PProj :projs="data.projs" bullet="•" bulletColor="#34495e" />
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
	name: "TemplateSidebarLeft",
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
.template-sidebar-left {
	display: flex;
	min-height: 29.7cm;
	font-family: inherit;
	color: #2c3e50;
	background: white;
}

.sidebar {
	width: 35%;
	background: #34495e;
	color: white;
	padding: 40px 25px;
}

.main-content {
	width: 65%;
	padding: 40px 35px;
}

/* Sidebar Styling */
.sidebar-title {
	font-size: 11pt;
	font-weight: 700;
	letter-spacing: 1.5pt;
	margin-bottom: 12pt;
	padding-bottom: 5pt;
	border-bottom: 1pt solid rgba(255,255,255,0.2);
}

.sidebar-section {
	margin-bottom: 25pt;
}

.contact-info {
	font-size: 9pt;
}

.contact-item {
	margin-bottom: 8pt;
	display: flex;
	align-items: center;
	gap: 10pt;
	opacity: 0.9;
}

.icon {
	color: #3498db;
	width: 15pt;
	font-weight: bold;
}

/* Main Content Styling */
.header {
	margin-bottom: 30pt;
}

.name {
	font-size: 28pt;
	font-weight: 800;
	margin: 0;
	color: #2c3e50;
	text-transform: uppercase;
}

.title {
	font-size: 14pt;
	color: #3498db;
	margin: 5pt 0 0 0;
	font-weight: 600;
}

.section-title {
	font-size: 12pt;
	font-weight: 700;
	color: #2c3e50;
	margin-bottom: 10pt;
	border-bottom: 2pt solid #3498db;
	display: inline-block;
}

.section-spacing {
	margin-bottom: 20pt;
}

.summary {
	font-size: 10pt;
	line-height: 1.6;
	text-align: justify;
}

/* Override preview component colors for sidebar */
.sidebar :deep(.preview-box) {
	color: white !important;
}

.sidebar :deep(h2), .sidebar :deep(h3), .sidebar :deep(h4), .sidebar :deep(p), .sidebar :deep(span) {
	color: white !important;
}

@media print {
	.sidebar {
		background: #34495e !important;
		-webkit-print-color-adjust: exact !important;
		print-color-adjust: exact !important;
	}
	.icon {
		color: #3498db !important;
	}
	.title {
		color: #3498db !important;
	}
	.section-title {
		border-bottom-color: #3498db !important;
	}
}
</style>
