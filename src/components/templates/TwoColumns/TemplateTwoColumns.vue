<template>
	<div id="preview" class="preview preview-box">
		<div class="row" style="text-align:start !important">
			<div style="width:7cm">
				<PProf :profile="data.profile" />
				<div class="draggable-element mt-3" v-if="data.styles.skills == 2" draggable="true">
					<PSKILL2 :skills2="data.skills2" />
				</div>
				<div class="draggable-element mt-3" draggable="true">
					<PEDU v-if="data.eds.length" :eds="data.eds" />
				</div>
			</div>
			<div class="col" style="width:auto; border-left:1px solid">
				<div class="draggable-element" draggable="true" v-if="data.exps.length">
					<PEXP v-if="data.exps.length" :exps="data.exps" />
				</div>
				<div class="draggable-element mt-3" v-if="data.styles.skills == 1 && data.skills.length" draggable="true">
					<PSKILL1 :skills="data.skills" />
					<!-- <PSKILL2 v-else-if="data.styles.skills == 2" :skills2="data.skills2" /> -->
				</div>
				<div class="draggable-element mt-3" draggable="true">
					<PProj v-if="data.projs.length" :projs="data.projs" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
//Previews
import PProf from "../../previews/profile/Third.vue"
import PEXP from "../../previews/Experience.vue"
import PEDU from "../../previews/Education.vue"
import PSKILL1 from "../../previews/Skills.vue"
import PSKILL2 from "../../previews/Skills2.vue"
import PProj from "../../previews/Project.vue"
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

<style>
.preview>.sub-color,
.preview>small {
	color: grey !important
}

ul {
	margin: 0 !important
}

.preview {
	user-select: none;
	-moz-user-select: none;
	-khtml-user-select: none;
	-webkit-user-select: none;
	-o-user-select: none
}

.preview>* {
	text-align: justify !important;
	line-height: 1.2 !important
}

.preview>small {
	text-decoration: none !important
}

.preview>h4 {
	margin-top: 1.5em !important;
	margin-bottom: .5em !important
}

.preview>body {
	size: 7in 9.25in !important;
	margin: 27mm 16mm !important
}

li:before {
	content: "\2014\a0\a0"
}

li {
	list-style: none !important
}

.pr-2 {
	padding-right: 5dp !important
}

</style>
