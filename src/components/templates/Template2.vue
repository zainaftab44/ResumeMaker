<template>
	<div id="preview" class="preview preview-box template2">
		<div class="content-wrapper">
			<PProf :profile="data.profile" />
			<div class="draggable-element section-spacing" draggable="true" v-if="data.profile.summary">
				<h4 class="section-title">ABOUT</h4>
				<p class="summary-text">{{ data.profile.summary }}</p>
			</div>
			<div class="draggable-element section-spacing" draggable="true" v-if="data.exps.length">
				<PEXP :exps="data.exps" bullet="—" bulletColor="#666" />
			</div>
			<div class="draggable-element section-spacing" draggable="true">
				<PSKILL1 v-if="data.styles.skills == 1 && data.skills.length" :skills="data.skills" />
				<PSKILL2 v-else-if="data.styles.skills == 2" :skills2="data.skills2" />
			</div>
			<div class="draggable-element section-spacing" draggable="true" v-if="data.eds.length">
				<PEDU :eds="data.eds" />
			</div>
			<div class="draggable-element section-spacing" draggable="true" v-if="data.projs.length">
				<PProj :projs="data.projs" bullet="—" bulletColor="#666" />
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
	name: "Template2",
	props: ["data"],
	components: {
		PProf,
		PEXP,
		PEDU,
		PSKILL1,
		PSKILL2,
		PProj
	},
	mounted() {
		(function () {
			var id_ = 'preview'
			var rows_ = document.querySelectorAll('#' + id_ + ' .draggable-element')
			var dragSrcEl_ = null
			var current = null

			function handleDragStart(e) {
				e.dataTransfer.effectAllowed = 'move'
				e.dataTransfer.setData('text/html', e.target.innerHTML)
				e.dataTransfer.dropEffect = "move"
				dragSrcEl_ = e.target
			}

			function handleDragOver(e) {
				if (typeof e.target.closest == "function")
					current = e.target.closest(".draggable-element")
			}
			
			function handleDrop(e) {
				if (current && current.classList.contains("draggable-element")) {
					if (navigator.userAgent.toLowerCase().includes("firefox")) {
						dragSrcEl_.innerHTML = current.innerHTML
						current.innerHTML = e.dataTransfer.getData('text/html')
					} else {
						let inner = current.innerHTML
						current.innerHTML = dragSrcEl_.innerHTML
						dragSrcEl_.innerHTML = inner
					}
				}
			}

			[].forEach.call(rows_, function (row) {
				row.addEventListener('dragstart', handleDragStart, false)
				row.addEventListener('dragover', handleDragOver, false)
				row.addEventListener('dragend', handleDrop, false)
			})
		})()
	}
}
</script>

<style scoped>
.template2 {
	font-family: inherit;
	font-size: 10pt;
	line-height: 1.4;
	color: #333;
	padding: 1.5cm 2cm;
}

.content-wrapper {
	max-width: 100%;
}

.section-spacing {
	margin-bottom: 12pt;
}

.section-title {
	font-size: 12pt;
	font-weight: 600;
	color: #2c3e50;
	margin: 0 0 6pt 0;
	text-transform: uppercase;
	letter-spacing: 1pt;
}

.summary-text {
	text-align: justify;
	line-height: 1.4;
	font-size: 10pt;
	margin: 0;
	color: #333;
}

@media print {
	.template2 {
		padding: 1.5cm 2cm;
	}
}
</style>
