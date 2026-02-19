<template>
	<div id="preview" class="preview preview-box template6" :style="{ fontFamily: 'inherit', color: '#2c3e50' }">
		<!-- Header -->
		<div class="header-minimal" :style="{
			borderLeft: '4px solid #3498db',
			paddingLeft: '20px',
			marginBottom: '30px',
			webkitPrintColorAdjust: 'exact',
			printColorAdjust: 'exact'
		}">
			<div class="header-content" :style="{ marginBottom: '15px' }">
				<h1 class="name" :style="{
					fontSize: '32pt',
					fontWeight: '700',
					margin: '0',
					lineHeight: 1,
					color: '#2c3e50',
					letterSpacing: '-0.5px'
				}">{{ data.profile.name }}</h1>
				<div class="separator" :style="{
					height: '2px',
					width: '50px',
					background: '#3498db',
					margin: '8px 0',
					webkitPrintColorAdjust: 'exact',
					printColorAdjust: 'exact'
				}"></div>
				<h3 class="title" :style="{
					fontSize: '14pt',
					margin: '0',
					fontWeight: '300',
					color: '#7f8c8d',
					letterSpacing: '0.5px'
				}">{{ data.profile.title }}</h3>
			</div>
			<div class="contact-grid" :style="{
				display: 'grid',
				gridTemplateColumns: '1fr 1fr',
				gap: '8px',
				fontSize: '9pt',
				marginTop: '15px'
			}">
				<div v-if="data.profile.email" class="contact-item" :style="{ display: 'flex', alignItems: 'center' }">
					<span class="label" :style="{
						display: 'inline-block',
						width: '20px',
						height: '20px',
						background: '#ecf0f1',
						color: '#3498db',
						fontWeight: 'bold',
						fontSize: '8pt',
						textAlign: 'center',
						lineHeight: '20px',
						marginRight: '8px',
						borderRadius: '3px',
						webkitPrintColorAdjust: 'exact',
						printColorAdjust: 'exact'
					}">E</span> {{ data.profile.email }}
				</div>
				<div v-if="data.profile.phone" class="contact-item" :style="{ display: 'flex', alignItems: 'center' }">
					<span class="label" :style="{
						display: 'inline-block',
						width: '20px',
						height: '20px',
						background: '#ecf0f1',
						color: '#3498db',
						fontWeight: 'bold',
						fontSize: '8pt',
						textAlign: 'center',
						lineHeight: '20px',
						marginRight: '8px',
						borderRadius: '3px',
						webkitPrintColorAdjust: 'exact',
						printColorAdjust: 'exact'
					}">P</span> {{ data.profile.phone }}
				</div>
				<div v-if="data.profile.website" class="contact-item" :style="{ display: 'flex', alignItems: 'center' }">
					<span class="label" :style="{
						display: 'inline-block',
						width: '20px',
						height: '20px',
						background: '#ecf0f1',
						color: '#3498db',
						fontWeight: 'bold',
						fontSize: '8pt',
						textAlign: 'center',
						lineHeight: '20px',
						marginRight: '8px',
						borderRadius: '3px',
						webkitPrintColorAdjust: 'exact',
						printColorAdjust: 'exact'
					}">W</span> {{ data.profile.website }}
				</div>
				<div v-if="data.profile.linkedin" class="contact-item" :style="{ display: 'flex', alignItems: 'center' }">
					<span class="label" :style="{
						display: 'inline-block',
						width: '20px',
						height: '20px',
						background: '#ecf0f1',
						color: '#3498db',
						fontWeight: 'bold',
						fontSize: '8pt',
						textAlign: 'center',
						lineHeight: '20px',
						marginRight: '8px',
						borderRadius: '3px',
						webkitPrintColorAdjust: 'exact',
						printColorAdjust: 'exact'
					}">L</span> {{ data.profile.linkedin }}
				</div>
			</div>
		</div>

		<!-- Summary -->
		<div class="draggable-element" draggable="true" v-if="data.profile.summary" :style="{ marginBottom: '25px' }">
			<div class="section-header" :style="{ display: 'flex', alignItems: 'center', margin: '25px 0 12px 0', gap: '12px' }">
				<span class="section-number" :style="{ fontSize: '16pt', fontWeight: 'bold', color: '#3498db', minWidth: '30px' }">01</span>
				<div style="position: relative; flex-grow: 1;">
					<h4 class="section-title" :style="{
						fontSize: '12pt',
						fontWeight: '700',
						margin: '0',
						textTransform: 'uppercase',
						letterSpacing: '2px',
						color: '#2c3e50'
					}">PROFILE</h4>
					<div :style="{
						position: 'absolute',
						bottom: '-4px',
						left: 0,
						right: 0,
						height: '1px',
						background: 'linear-gradient(90deg, #3498db 0%, transparent 100%)',
						webkitPrintColorAdjust: 'exact',
						printColorAdjust: 'exact'
					}"></div>
				</div>
			</div>
			<p class="summary-text" :style="{
				textAlign: 'justify',
				lineHeight: '1.6',
				color: '#34495e',
				marginLeft: '42px'
			}">{{ data.profile.summary }}</p>
		</div>

		<!-- Experience -->
		<div class="draggable-element" draggable="true" v-if="data.exps.length" :style="{ marginBottom: '25px' }">
			<div class="section-header" :style="{ display: 'flex', alignItems: 'center', margin: '25px 0 12px 0', gap: '12px' }">
				<span class="section-number" :style="{ fontSize: '16pt', fontWeight: 'bold', color: '#3498db', minWidth: '30px' }">02</span>
				<div style="position: relative; flex-grow: 1;">
					<h4 class="section-title" :style="{
						fontSize: '12pt',
						fontWeight: '700',
						margin: '0',
						textTransform: 'uppercase',
						letterSpacing: '2px',
						color: '#2c3e50'
					}">EXPERIENCE</h4>
					<div :style="{
						position: 'absolute',
						bottom: '-4px',
						left: 0,
						right: 0,
						height: '1px',
						background: 'linear-gradient(90deg, #3498db 0%, transparent 100%)',
						webkitPrintColorAdjust: 'exact',
						printColorAdjust: 'exact'
					}"></div>
				</div>
			</div>
			<PEXP :exps="data.exps" bullet="•" bulletColor="#3498db" />
		</div>

		<!-- Skills -->
		<div class="draggable-element" draggable="true" :style="{ marginBottom: '25px' }">
			<div class="section-header" :style="{ display: 'flex', alignItems: 'center', margin: '25px 0 12px 0', gap: '12px' }">
				<span class="section-number" :style="{ fontSize: '16pt', fontWeight: 'bold', color: '#3498db', minWidth: '30px' }">03</span>
				<div style="position: relative; flex-grow: 1;">
					<h4 class="section-title" :style="{
						fontSize: '12pt',
						fontWeight: '700',
						margin: '0',
						textTransform: 'uppercase',
						letterSpacing: '2px',
						color: '#2c3e50'
					}">SKILLS</h4>
					<div :style="{
						position: 'absolute',
						bottom: '-4px',
						left: 0,
						right: 0,
						height: '1px',
						background: 'linear-gradient(90deg, #3498db 0%, transparent 100%)',
						webkitPrintColorAdjust: 'exact',
						printColorAdjust: 'exact'
					}"></div>
				</div>
			</div>
			<PSKILL1 v-if="data.styles.skills == 1 && data.skills.length" :skills="data.skills" />
			<PSKILL2 v-else-if="data.styles.skills == 2" :skills2="data.skills2" />
		</div>

		<!-- Education -->
		<div class="draggable-element" draggable="true" v-if="data.eds.length" :style="{ marginBottom: '25px' }">
			<div class="section-header" :style="{ display: 'flex', alignItems: 'center', margin: '25px 0 12px 0', gap: '12px' }">
				<span class="section-number" :style="{ fontSize: '16pt', fontWeight: 'bold', color: '#3498db', minWidth: '30px' }">04</span>
				<div style="position: relative; flex-grow: 1;">
					<h4 class="section-title" :style="{
						fontSize: '12pt',
						fontWeight: '700',
						margin: '0',
						textTransform: 'uppercase',
						letterSpacing: '2px',
						color: '#2c3e50'
					}">EDUCATION</h4>
					<div :style="{
						position: 'absolute',
						bottom: '-4px',
						left: 0,
						right: 0,
						height: '1px',
						background: 'linear-gradient(90deg, #3498db 0%, transparent 100%)',
						webkitPrintColorAdjust: 'exact',
						printColorAdjust: 'exact'
					}"></div>
				</div>
			</div>
			<PEDU :eds="data.eds" />
		</div>

		<!-- Projects -->
		<div class="draggable-element" draggable="true" v-if="data.projs.length" :style="{ marginBottom: '25px' }">
			<div class="section-header" :style="{ display: 'flex', alignItems: 'center', margin: '25px 0 12px 0', gap: '12px' }">
				<span class="section-number" :style="{ fontSize: '16pt', fontWeight: 'bold', color: '#3498db', minWidth: '30px' }">05</span>
				<div style="position: relative; flex-grow: 1;">
					<h4 class="section-title" :style="{
						fontSize: '12pt',
						fontWeight: '700',
						margin: '0',
						textTransform: 'uppercase',
						letterSpacing: '2px',
						color: '#2c3e50'
					}">PROJECTS</h4>
					<div :style="{
						position: 'absolute',
						bottom: '-4px',
						left: 0,
						right: 0,
						height: '1px',
						background: 'linear-gradient(90deg, #3498db 0%, transparent 100%)',
						webkitPrintColorAdjust: 'exact',
						printColorAdjust: 'exact'
					}"></div>
				</div>
			</div>
			<PProj :projs="data.projs" bullet="•" bulletColor="#3498db" />
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
	name: "Template6",
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
