<template>
	<div id="preview" class="preview preview-box template7" :style="{ fontFamily: 'inherit', color: '#2c3e50' }">
		<!-- Top bar -->
		<div class="top-accent" :style="{
			height: '8px',
			background: 'linear-gradient(90deg, #8e44ad 0%, #9b59b6 50%, #8e44ad 100%)',
			marginTop: 0,
			webkitPrintColorAdjust: 'exact',
			printColorAdjust: 'exact'
		}"></div>
		
		<!-- Header -->
		<div class="header-elegant" :style="{ textAlign: 'center', padding: '30px 0', marginBottom: '25px' }">
			<h1 class="name" :style="{
				fontSize: '36pt',
				fontWeight: '300',
				margin: 0,
				color: '#2c3e50',
				letterSpacing: '3px',
				textTransform: 'uppercase'
			}">{{ data.profile.name }}</h1>
			<h3 class="title" :style="{
				fontSize: '14pt',
				margin: '8px 0 0 0',
				fontWeight: '400',
				color: '#7f8c8d',
				letterSpacing: '1px'
			}">{{ data.profile.title }}</h3>
			
			<div class="divider-elegant" :style="{
				width: '80px',
				height: '2px',
				background: '#8e44ad',
				margin: '20px auto',
				webkitPrintColorAdjust: 'exact',
				printColorAdjust: 'exact'
			}"></div>
			
			<div class="contact-row" :style="{
				display: 'flex',
				justifyContent: 'center',
				flexWrap: 'wrap',
				gap: '20px',
				fontSize: '9pt',
				marginTop: '10px',
				color: '#555'
			}">
				<span v-if="data.profile.email" class="contact-item">
					<strong :style="{ color: '#8e44ad', fontWeight: '600' }">Email:</strong> {{ data.profile.email }}
				</span>
				<span v-if="data.profile.phone" class="contact-item">
					<strong :style="{ color: '#8e44ad', fontWeight: '600' }">Phone:</strong> {{ data.profile.phone }}
				</span>
				<span v-if="data.profile.address" class="contact-item">
					<strong :style="{ color: '#8e44ad', fontWeight: '600' }">Location:</strong> {{ data.profile.address }}
				</span>
			</div>
			<div class="contact-row" v-if="data.profile.linkedin || data.profile.website || data.profile.github" :style="{
				display: 'flex',
				justifyContent: 'center',
				flexWrap: 'wrap',
				gap: '20px',
				fontSize: '9pt',
				marginTop: '10px',
				color: '#555'
			}">
				<span v-if="data.profile.linkedin" class="contact-item">
					<strong :style="{ color: '#8e44ad', fontWeight: '600' }">LinkedIn:</strong> {{ data.profile.linkedin }}
				</span>
				<span v-if="data.profile.website" class="contact-item">
					<strong :style="{ color: '#8e44ad', fontWeight: '600' }">Website:</strong> {{ data.profile.website }}
				</span>
				<span v-if="data.profile.github" class="contact-item">
					<strong :style="{ color: '#8e44ad', fontWeight: '600' }">GitHub:</strong> {{ data.profile.github }}
				</span>
			</div>
		</div>

		<!-- Summary -->
		<div class="draggable-element" draggable="true" v-if="data.profile.summary" :style="{ marginBottom: '25px' }">
			<div class="section-elegant" :style="{ marginBottom: '25px' }">
				<h4 class="section-title-elegant" :style="{
					fontSize: '13pt',
					fontWeight: '600',
					color: '#8e44ad',
					margin: '0 0 12px 0',
					textTransform: 'uppercase',
					letterSpacing: '1.5px',
					paddingBottom: '8px',
					borderBottom: '2px solid #e8e8e8',
					webkitPrintColorAdjust: 'exact',
					printColorAdjust: 'exact'
				}">PROFESSIONAL SUMMARY</h4>
				<div class="section-content" :style="{ paddingLeft: '10px' }">
					<p class="summary-text" :style="{ textAlign: 'justify', lineHeight: '1.6', color: '#34495e' }">{{ data.profile.summary }}</p>
				</div>
			</div>
		</div>

		<!-- Experience -->
		<div class="draggable-element" draggable="true" v-if="data.exps.length" :style="{ marginBottom: '25px' }">
			<div class="section-elegant" :style="{ marginBottom: '25px' }">
				<h4 class="section-title-elegant" :style="{
					fontSize: '13pt',
					fontWeight: '600',
					color: '#8e44ad',
					margin: '0 0 12px 0',
					textTransform: 'uppercase',
					letterSpacing: '1.5px',
					paddingBottom: '8px',
					borderBottom: '2px solid #e8e8e8',
					webkitPrintColorAdjust: 'exact',
					printColorAdjust: 'exact'
				}">PROFESSIONAL EXPERIENCE</h4>
				<div class="section-content" :style="{ paddingLeft: '10px' }">
					<PEXP :exps="data.exps" bullet="◆" bulletColor="#8e44ad" />
				</div>
			</div>
		</div>

		<!-- Skills -->
		<div class="draggable-element" draggable="true" :style="{ marginBottom: '25px' }">
			<div class="section-elegant" :style="{ marginBottom: '25px' }">
				<h4 class="section-title-elegant" :style="{
					fontSize: '13pt',
					fontWeight: '600',
					color: '#8e44ad',
					margin: '0 0 12px 0',
					textTransform: 'uppercase',
					letterSpacing: '1.5px',
					paddingBottom: '8px',
					borderBottom: '2px solid #e8e8e8',
					webkitPrintColorAdjust: 'exact',
					printColorAdjust: 'exact'
				}">CORE COMPETENCIES</h4>
				<div class="section-content" :style="{ paddingLeft: '10px' }">
					<PSKILL1 v-if="data.styles.skills == 1 && data.skills.length" :skills="data.skills" />
					<PSKILL2 v-else-if="data.styles.skills == 2" :skills2="data.skills2" />
				</div>
			</div>
		</div>

		<!-- Education -->
		<div class="draggable-element" draggable="true" v-if="data.eds.length" :style="{ marginBottom: '25px' }">
			<div class="section-elegant" :style="{ marginBottom: '25px' }">
				<h4 class="section-title-elegant" :style="{
					fontSize: '13pt',
					fontWeight: '600',
					color: '#8e44ad',
					margin: '0 0 12px 0',
					textTransform: 'uppercase',
					letterSpacing: '1.5px',
					paddingBottom: '8px',
					borderBottom: '2px solid #e8e8e8',
					webkitPrintColorAdjust: 'exact',
					printColorAdjust: 'exact'
				}">EDUCATION</h4>
				<div class="section-content" :style="{ paddingLeft: '10px' }">
					<PEDU :eds="data.eds" />
				</div>
			</div>
		</div>

		<!-- Projects -->
		<div class="draggable-element" draggable="true" v-if="data.projs.length" :style="{ marginBottom: '25px' }">
			<div class="section-elegant" :style="{ marginBottom: '25px' }">
				<h4 class="section-title-elegant" :style="{
					fontSize: '13pt',
					fontWeight: '600',
					color: '#8e44ad',
					margin: '0 0 12px 0',
					textTransform: 'uppercase',
					letterSpacing: '1.5px',
					paddingBottom: '8px',
					borderBottom: '2px solid #e8e8e8',
					webkitPrintColorAdjust: 'exact',
					printColorAdjust: 'exact'
				}">KEY PROJECTS</h4>
				<div class="section-content" :style="{ paddingLeft: '10px' }">
					<PProj :projs="data.projs" bullet="◆" bulletColor="#8e44ad" />
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
	name: "Template7",
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
