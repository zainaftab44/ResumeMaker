<template>
	<div id="preview" class="preview preview-box" :style="{
		userSelect: 'none',
		webkitUserSelect: 'none',
		mozUserSelect: 'none',
		msUserSelect: 'none',
		textAlign: 'justify',
		lineHeight: '1.2'
	}">
		<PProf :profile="data.profile" />
		<div class="draggable-element mt-3" draggable="true" :style="{ marginTop: '1rem !important' }">
			<PSKILL1 v-if="data.styles.skills == 1 && data.skills.length" :skills="data.skills" />
			<PSKILL2 v-else-if="data.styles.skills == 2" :skills2="data.skills2" />
		</div>
		<div class="draggable-element" draggable="true" v-if="data.exps.length" :style="{ marginBottom: '15px' }">
			<PEXP v-if="data.exps.length" :exps="data.exps" bullet="»" bulletColor="#808080" />
		</div>
		<div class="draggable-element mt-3" draggable="true" :style="{ marginTop: '1rem !important' }">
			<PEDU v-if="data.eds.length" :eds="data.eds" />
		</div>
		<div class="draggable-element mt-3" draggable="true" :style="{ marginTop: '1rem !important' }">
			<PProj v-if="data.projs.length" :projs="data.projs" bullet="»" bulletColor="#808080" />
		</div>
	</div>
</template>

<script>
//Previews
import PProf from "../previews/profile/First.vue"
import PEXP from "../previews/Experience.vue"
import PEDU from "../previews/Education.vue"
import PSKILL1 from "../previews/Skills.vue"
import PSKILL2 from "../previews/Skills2.vue"
import PProj from "../previews/Project.vue"
// import AWD from './previews/Award.vue'

export default {
	name: "Template",
	props: ["data"],
	components: {
		PProf,
		PEXP,
		PEDU,
		PSKILL1,
		PSKILL2,
		PProj,
		// AWD,
	},
	methods: {},
	mounted() {
		(function() {
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

			[].forEach.call(rows_, function(row) {
				row.addEventListener("dragstart", handleDragStart, false)
				row.addEventListener("dragover", handleDragOver, false)
				row.addEventListener("dragend", handleDrop, false)
			})
		})()
	},
}
</script>

