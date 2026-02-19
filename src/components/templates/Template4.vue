<template>
	<div id="preview" class="preview preview-box template4" :style="{ fontFamily: 'inherit' }">
		<!-- Header with bold design -->
		<div class="header-section" :style="{
			background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
			color: 'white',
			padding: '30px 25px',
			margin: '0 0 20px 0',
			textAlign: 'center',
			webkitPrintColorAdjust: 'exact',
			printColorAdjust: 'exact'
		}">
			<h1 class="name" :style="{
				fontSize: '36pt',
				fontWeight: 'bold',
				margin: '0 0 8px 0',
				letterSpacing: '1px',
				textTransform: 'uppercase'
			}">{{ data.profile.name }}</h1>
			<h3 class="title" :style="{
				fontSize: '16pt',
				margin: '0 0 15px 0',
				fontWeight: '300',
				letterSpacing: '0.5px'
			}">{{ data.profile.title }}</h3>
			<div class="contact-bar" :style="{
				display: 'flex',
				justifyContent: 'center',
				flexWrap: 'wrap',
				gap: '15px',
				fontSize: '10pt',
				opacity: '0.95'
			}">
				<span v-if="data.profile.email" :style="{ display: 'flex', alignItems: 'center' }">
					{{ data.profile.email }}
					<span v-if="data.profile.phone || data.profile.address || data.profile.website" :style="{ marginLeft: '15px', opacity: 0.6 }">|</span>
				</span>
				<span v-if="data.profile.phone" :style="{ display: 'flex', alignItems: 'center' }">
					{{ data.profile.phone }}
					<span v-if="data.profile.address || data.profile.website" :style="{ marginLeft: '15px', opacity: 0.6 }">|</span>
				</span>
				<span v-if="data.profile.address" :style="{ display: 'flex', alignItems: 'center' }">
					{{ data.profile.address }}
					<span v-if="data.profile.website" :style="{ marginLeft: '15px', opacity: 0.6 }">|</span>
				</span>
				<span v-if="data.profile.website">{{ data.profile.website }}</span>
			</div>
		</div>

		<!-- Summary -->
		<div class="draggable-element" draggable="true" v-if="data.profile.summary" :style="{ marginBottom: '15px' }">
			<h4 class="section-title" :style="{
				fontSize: '14pt',
				fontWeight: 'bold',
				color: '#2c3e50',
				margin: '20px 0 8px 0',
				textTransform: 'uppercase',
				letterSpacing: '1px'
			}">PROFESSIONAL SUMMARY</h4>
			<div class="section-divider" :style="{
				height: '3px',
				background: 'linear-gradient(90deg, #3498db 0%, #2c3e50 100%)',
				marginBottom: '12px',
				borderRadius: '2px',
				webkitPrintColorAdjust: 'exact',
				printColorAdjust: 'exact'
			}"></div>
			<p class="summary-text" :style="{
				textAlign: 'justify',
				lineHeight: '1.5',
				color: '#333'
			}">{{ data.profile.summary }}</p>
		</div>

		<!-- Experience -->
		<div class="draggable-element" draggable="true" v-if="data.exps.length" :style="{ marginBottom: '15px' }">
			<h4 class="section-title" :style="{
				fontSize: '14pt',
				fontWeight: 'bold',
				color: '#2c3e50',
				margin: '20px 0 8px 0',
				textTransform: 'uppercase',
				letterSpacing: '1px'
			}">EXPERIENCE</h4>
			<div class="section-divider" :style="{
				height: '3px',
				background: 'linear-gradient(90deg, #3498db 0%, #2c3e50 100%)',
				marginBottom: '12px',
				borderRadius: '2px',
				webkitPrintColorAdjust: 'exact',
				printColorAdjust: 'exact'
			}"></div>
			<PEXP :exps="data.exps" bullet="▸" bulletColor="#3498db" />
		</div>

		<!-- Skills -->
		<div class="draggable-element" draggable="true" :style="{ marginBottom: '15px' }">
			<h4 class="section-title" :style="{
				fontSize: '14pt',
				fontWeight: 'bold',
				color: '#2c3e50',
				margin: '20px 0 8px 0',
				textTransform: 'uppercase',
				letterSpacing: '1px'
			}">SKILLS</h4>
			<div class="section-divider" :style="{
				height: '3px',
				background: 'linear-gradient(90deg, #3498db 0%, #2c3e50 100%)',
				marginBottom: '12px',
				borderRadius: '2px',
				webkitPrintColorAdjust: 'exact',
				printColorAdjust: 'exact'
			}"></div>
			<PSKILL1 v-if="data.styles.skills == 1 && data.skills.length" :skills="data.skills" />
			<PSKILL2 v-else-if="data.styles.skills == 2" :skills2="data.skills2" />
		</div>

		<!-- Education -->
		<div class="draggable-element" draggable="true" :style="{ marginBottom: '15px' }">
			<h4 class="section-title" :style="{
				fontSize: '14pt',
				fontWeight: 'bold',
				color: '#2c3e50',
				margin: '20px 0 8px 0',
				textTransform: 'uppercase',
				letterSpacing: '1px'
			}">EDUCATION</h4>
			<div class="section-divider" :style="{
				height: '3px',
				background: 'linear-gradient(90deg, #3498db 0%, #2c3e50 100%)',
				marginBottom: '12px',
				borderRadius: '2px',
				webkitPrintColorAdjust: 'exact',
				printColorAdjust: 'exact'
			}"></div>
			<PEDU v-if="data.eds.length" :eds="data.eds" />
		</div>

		<!-- Projects -->
		<div class="draggable-element" draggable="true" :style="{ marginBottom: '15px' }">
			<h4 class="section-title" :style="{
				fontSize: '14pt',
				fontWeight: 'bold',
				color: '#2c3e50',
				margin: '20px 0 8px 0',
				textTransform: 'uppercase',
				letterSpacing: '1px'
			}">PROJECTS</h4>
			<div class="section-divider" :style="{
				height: '3px',
				background: 'linear-gradient(90deg, #3498db 0%, #2c3e50 100%)',
				marginBottom: '12px',
				borderRadius: '2px',
				webkitPrintColorAdjust: 'exact',
				printColorAdjust: 'exact'
			}"></div>
			<PProj v-if="data.projs.length" :projs="data.projs" bullet="▸" bulletColor="#3498db" />
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
