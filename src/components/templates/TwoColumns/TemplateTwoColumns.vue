<template>
	<div id="preview" class="preview preview-box template-two-columns">
		<div class="two-column-container">
			<div class="left-column">
				<PProf :profile="data.profile" />
				<div class="draggable-element section-spacing" v-if="data.styles.skills == 2" draggable="true">
					<PSKILL2 :skills2="data.skills2" />
				</div>
				<div class="draggable-element section-spacing" draggable="true" v-if="data.eds.length">
					<PEDU :eds="data.eds" />
				</div>
			</div>
			<div class="right-column">
				<div class="draggable-element section-spacing" draggable="true" v-if="data.exps.length">
					<PEXP :exps="data.exps" bullet="▪" bulletColor="#555" />
				</div>
				<div class="draggable-element section-spacing" v-if="data.styles.skills == 1 && data.skills.length" draggable="true">
					<PSKILL1 :skills="data.skills" />
				</div>
				<div class="draggable-element section-spacing" draggable="true" v-if="data.projs.length">
					<PProj :projs="data.projs" bullet="▪" bulletColor="#555" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import PProf from "../../previews/profile/Third.vue"
import PEXP from "../../previews/Experience.vue"
import PEDU from "../../previews/Education.vue"
import PSKILL1 from "../../previews/Skills.vue"
import PSKILL2 from "../../previews/Skills2.vue"
import PProj from "../../previews/Project.vue"

export default {
	name: "TemplateTwoColumns",
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
.template-two-columns {
	font-family: inherit;
	font-size: 10pt;
	line-height: 1.4;
	color: #333;
	padding: 1.5cm 2cm;
}

.two-column-container {
	display: flex;
	gap: 1cm;
}

.left-column {
	width: 7cm;
	flex-shrink: 0;
}

.right-column {
	flex: 1;
	border-left: 1pt solid #ddd;
	padding-left: 1cm;
}

.section-spacing {
	margin-bottom: 12pt;
}

@media print {
	.template-two-columns {
		padding: 1.5cm 2cm;
	}
}
</style>
