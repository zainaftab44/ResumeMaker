<template>
	<div id="preview" class="preview preview-box template4">
		<!-- Header with bold design -->
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

		<!-- Summary -->
		<div class="draggable-element" draggable="true" v-if="data.profile.summary">
			<h4 class="section-title">PROFESSIONAL SUMMARY</h4>
			<div class="section-divider"></div>
			<p class="summary-text">{{ data.profile.summary }}</p>
		</div>

		<!-- Experience -->
		<div class="draggable-element" draggable="true" v-if="data.exps.length">
			<PEXP :exps="data.exps" />
		</div>

		<!-- Skills -->
		<div class="draggable-element" draggable="true">
			<PSKILL1 v-if="data.styles.skills == 1 && data.skills.length" :skills="data.skills" />
			<PSKILL2 v-else-if="data.styles.skills == 2" :skills2="data.skills2" />
		</div>

		<!-- Education -->
		<div class="draggable-element" draggable="true">
			<PEDU v-if="data.eds.length" :eds="data.eds" />
		</div>

		<!-- Projects -->
		<div class="draggable-element" draggable="true">
			<PProj v-if="data.projs.length" :projs="data.projs" />
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
.template4 {
	font-family: inherit;
}

.template4 .header-section {
	background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
	color: white;
	padding: 30px 25px;
	margin: -1.5cm -2cm 20px -2cm;
	text-align: center;
}

@media print {
	.template4 .header-section {
		-webkit-print-color-adjust: exact;
		print-color-adjust: exact;
		color-adjust: exact;
		background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%) !important;
	}
}

.template4 .name {
	font-size: 36pt;
	font-weight: bold;
	margin: 0 0 8px 0;
	letter-spacing: 1px;
	text-transform: uppercase;
}

.template4 .title {
	font-size: 16pt;
	margin: 0 0 15px 0;
	font-weight: 300;
	letter-spacing: 0.5px;
}

.template4 .contact-bar {
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	gap: 15px;
	font-size: 10pt;
	opacity: 0.95;
}

.template4 .contact-bar span:not(:last-child)::after {
	content: "|";
	margin-left: 15px;
	opacity: 0.6;
}

.template4 .section-title {
	font-size: 14pt;
	font-weight: bold;
	color: #2c3e50;
	margin: 20px 0 8px 0;
	text-transform: uppercase;
	letter-spacing: 1px;
}

.template4 .section-divider {
	height: 3px;
	background: linear-gradient(90deg, #3498db 0%, #2c3e50 100%);
	margin-bottom: 12px;
	border-radius: 2px;
}

@media print {
	.template4 .section-divider {
		-webkit-print-color-adjust: exact;
		print-color-adjust: exact;
		color-adjust: exact;
	}
}

.template4 .summary-text {
	text-align: justify;
	line-height: 1.5;
	color: #333;
}

.template4 .draggable-element {
	margin-bottom: 15px;
}

.template4 ul {
	margin: 0 !important;
	padding-left: 20px;
}

.template4 li {
	list-style: none !important;
	margin-bottom: 4px;
}

.template4 li:before {
	content: "▸ ";
	color: #3498db;
	font-weight: bold;
	margin-right: 8px;
}
</style>
