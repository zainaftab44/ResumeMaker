<template>
	<div id="preview" class="preview preview-box template5">
		<div class="container-fluid">
			<div class="row">
				<!-- Left Sidebar -->
				<div class="col-4 sidebar">
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
							<strong>Address</strong><br>{{ data.profile.address }}
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
				<div class="col-8 main-content">
					<!-- Summary -->
					<div class="draggable-element" draggable="true" v-if="data.profile.summary">
						<h4 class="content-title">ABOUT ME</h4>
						<div class="accent-line"></div>
						<p class="summary-text">{{ data.profile.summary }}</p>
					</div>

					<!-- Experience -->
					<div class="draggable-element" draggable="true" v-if="data.exps.length">
						<PEXP :exps="data.exps" />
					</div>

					<!-- Education -->
					<div class="draggable-element" draggable="true" v-if="data.eds.length">
						<PEDU :eds="data.eds" />
					</div>

					<!-- Projects -->
					<div class="draggable-element" draggable="true" v-if="data.projs.length">
						<PProj :projs="data.projs" />
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
.template5 {
	font-family: inherit;
	margin: -1.5cm -2cm;
}

.template5 .row {
	margin: 0;
	min-height: 29.7cm;
}

.template5 .sidebar {
	background: linear-gradient(180deg, #16a085 0%, #1abc9c 100%);
	color: white;
	padding: 40px 25px;
	min-height: 100%;
}

@media print {
	.template5 .sidebar {
		-webkit-print-color-adjust: exact;
		print-color-adjust: exact;
		color-adjust: exact;
		background: linear-gradient(180deg, #16a085 0%, #1abc9c 100%) !important;
	}
}

.template5 .profile-section {
	margin-bottom: 30px;
	padding-bottom: 20px;
	border-bottom: 2px solid rgba(255,255,255,0.3);
}

.template5 .name {
	font-size: 26pt;
	font-weight: bold;
	margin: 0 0 10px 0;
	line-height: 1.2;
	text-transform: uppercase;
	letter-spacing: 1px;
}

.template5 .title {
	font-size: 13pt;
	margin: 0;
	font-weight: 300;
	opacity: 0.95;
}

.template5 .sidebar-title {
	font-size: 12pt;
	font-weight: bold;
	margin: 25px 0 15px 0;
	letter-spacing: 1px;
	text-transform: uppercase;
	border-bottom: 2px solid rgba(255,255,255,0.3);
	padding-bottom: 8px;
}

.template5 .contact-section {
	margin-bottom: 25px;
}

.template5 .contact-item {
	margin-bottom: 15px;
	font-size: 9pt;
	line-height: 1.4;
}

.template5 .contact-item strong {
	display: block;
	font-size: 8pt;
	text-transform: uppercase;
	letter-spacing: 0.5px;
	opacity: 0.8;
	margin-bottom: 3px;
}

.template5 .main-content {
	padding: 40px 30px;
	background: white;
}

.template5 .content-title {
	font-size: 14pt;
	font-weight: bold;
	color: #16a085;
	margin: 20px 0 8px 0;
	text-transform: uppercase;
	letter-spacing: 1px;
}

.template5 .accent-line {
	height: 3px;
	width: 60px;
	background: #16a085;
	margin-bottom: 12px;
	border-radius: 2px;
}

@media print {
	.template5 .accent-line {
		-webkit-print-color-adjust: exact;
		print-color-adjust: exact;
		color-adjust: exact;
	}
}

.template5 .summary-text {
	text-align: justify;
	line-height: 1.5;
	color: #333;
}

.template5 .draggable-element {
	margin-bottom: 15px;
}

.template5 ul {
	margin: 0 !important;
	padding-left: 20px;
}

.template5 li {
	list-style: none !important;
	margin-bottom: 4px;
}

.template5 li:before {
	content: "• ";
	color: #16a085;
	font-weight: bold;
	margin-right: 8px;
}
</style>
