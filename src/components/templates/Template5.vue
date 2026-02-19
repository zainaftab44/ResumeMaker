<template>
	<div id="preview" class="preview preview-box template5">
		<div class="main-container">
			<!-- Left Sidebar -->
			<div class="sidebar">
				<div class="profile-section">
					<h1 class="name">{{ data.profile.name }}</h1>
					<h4 class="title">{{ data.profile.title }}</h4>
				</div>

				<div class="contact-section">
					<h5 class="sidebar-title">CONTACT</h5>
					<div class="contact-item" v-if="data.profile.email">
						<strong>Email</strong><br>{{ data.profile.email }}
					</div>
					<div class="contact-item" v-if="data.profile.phone">
						<strong>Phone</strong><br>{{ data.profile.phone }}
					</div>
					<div class="contact-item" v-if="data.profile.address">
						<strong>Location</strong><br>{{ data.profile.address }}
					</div>
					<div class="contact-item" v-if="data.profile.website">
						<strong>Website</strong><br>{{ data.profile.website }}
					</div>
					<div class="contact-item" v-if="data.profile.linkedin">
						<strong>LinkedIn</strong><br>{{ data.profile.linkedin }}
					</div>
					<div class="contact-item" v-if="data.profile.github">
						<strong>GitHub</strong><br>{{ data.profile.github }}
					</div>
				</div>

				<!-- Skills in sidebar -->
				<div class="draggable-element" draggable="true" v-if="data.styles.skills == 1 && data.skills.length">
					<PSKILL1 :skills="data.skills" />
				</div>
				<div class="draggable-element" draggable="true" v-if="data.styles.skills == 2">
					<PSKILL2 :skills2="data.skills2" />
				</div>
			</div>

			<!-- Right Content -->
			<div class="main-content">
				<!-- Summary -->
				<div class="draggable-element section-spacing" draggable="true" v-if="data.profile.summary">
					<h4 class="content-title">ABOUT ME</h4>
					<div class="accent-line"></div>
					<p class="summary-text">{{ data.profile.summary }}</p>
				</div>

				<!-- Experience -->
				<div class="draggable-element section-spacing" draggable="true" v-if="data.exps.length">
					<PEXP :exps="data.exps" bullet="•" bulletColor="#16a085" />
				</div>

				<!-- Education -->
				<div class="draggable-element section-spacing" draggable="true" v-if="data.eds.length">
					<PEDU :eds="data.eds" />
				</div>

				<!-- Projects -->
				<div class="draggable-element section-spacing" draggable="true" v-if="data.projs.length">
					<PProj :projs="data.projs" bullet="•" bulletColor="#16a085" />
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
	name: "Template5",
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
.template5 {
	font-family: inherit;
	font-size: 10pt;
	line-height: 1.4;
	color: #333;
	height: auto;
}

.main-container {
	display: flex;
	height: auto;
}

.sidebar {
	width: 7cm;
	background: linear-gradient(180deg, #16a085 0%, #1abc9c 100%);
	color: white;
	padding: 1.5cm 1cm;
	flex-shrink: 0;
	height: auto;
}

@media print {
	.sidebar {
		-webkit-print-color-adjust: exact !important;
		print-color-adjust: exact !important;
		color-adjust: exact !important;
		background: linear-gradient(180deg, #16a085 0%, #1abc9c 100%) !important;
	}
}

.profile-section {
	margin-bottom: 15pt;
	padding-bottom: 12pt;
	border-bottom: 1.5pt solid rgba(255,255,255,0.3);
}

.name {
	font-size: 18pt;
	font-weight: bold;
	margin: 0 0 6pt 0;
	line-height: 1.1;
	text-transform: uppercase;
	letter-spacing: 0.5pt;
}

.title {
	font-size: 10pt;
	margin: 0;
	font-weight: 300;
	opacity: 0.95;
}

.sidebar-title {
	font-size: 10pt;
	font-weight: bold;
	margin: 15pt 0 8pt 0;
	letter-spacing: 0.8pt;
	text-transform: uppercase;
	border-bottom: 1.5pt solid rgba(255,255,255,0.3);
	padding-bottom: 4pt;
}

.contact-section {
	margin-bottom: 15pt;
}

.contact-item {
	margin-bottom: 10pt;
	font-size: 8pt;
	line-height: 1.3;
}

.contact-item strong {
	display: block;
	font-size: 7pt;
	text-transform: uppercase;
	letter-spacing: 0.3pt;
	opacity: 0.8;
	margin-bottom: 2pt;
}

.main-content {
	flex: 1;
	padding: 1.5cm 1.5cm;
	background: white;
	height: auto;
}

.section-spacing {
	margin-bottom: 12pt;
}

.content-title {
	font-size: 11pt;
	font-weight: bold;
	color: #16a085;
	margin: 0 0 4pt 0;
	text-transform: uppercase;
	letter-spacing: 0.8pt;
}

.accent-line {
	height: 2pt;
	width: 40pt;
	background: #16a085;
	margin-bottom: 8pt;
	border-radius: 1pt;
}

@media print {
	.accent-line {
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
	.template5 {
		height: auto;
	}
	
	.main-container {
		height: auto;
	}
	
	.sidebar {
		height: auto;
	}
	
	.main-content {
		height: auto;
	}
	
	.section-spacing {
		min-height: 0;
	}
}
</style>
