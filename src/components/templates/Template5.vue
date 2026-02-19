<template>
	<div id="preview" class="preview preview-box template5" :style="{ fontFamily: 'inherit', margin: 0 }">
		<div class="container-fluid" :style="{ padding: 0 }">
			<div class="row" :style="{ margin: 0, minHeight: 'calc(29.7cm - 3cm)' }">
				<!-- Left Sidebar -->
				<div class="col-4 sidebar" :style="{
					background: 'linear-gradient(180deg, #16a085 0%, #1abc9c 100%)',
					color: 'white',
					padding: '40px 25px',
					minHeight: '100%',
					webkitPrintColorAdjust: 'exact',
					printColorAdjust: 'exact'
				}">
					<div class="profile-section" :style="{
						marginBottom: '30px',
						paddingBottom: '20px',
						borderBottom: '2px solid rgba(255,255,255,0.3)'
					}">
						<h1 class="name" :style="{
							fontSize: '26pt',
							fontWeight: 'bold',
							margin: '0 0 10px 0',
							lineHeight: 1.2,
							textTransform: 'uppercase',
							letterSpacing: '1px'
						}">{{ data.profile.name }}</h1>
						<h4 class="title" :style="{
							fontSize: '13pt',
							margin: 0,
							fontWeight: '300',
							opacity: '0.95'
						}">{{ data.profile.title }}</h4>
					</div>

					<div class="contact-section" :style="{ marginBottom: '25px' }">
						<h5 class="sidebar-title" :style="{
							fontSize: '12pt',
							fontWeight: 'bold',
							margin: '25px 0 15px 0',
							letterSpacing: '1px',
							textTransform: 'uppercase',
							borderBottom: '2px solid rgba(255,255,255,0.3)',
							paddingBottom: '8px'
						}">CONTACT</h5>
						<div class="contact-item" v-if="data.profile.email" :style="{ marginBottom: '15px', fontSize: '9pt', lineHeight: 1.4 }">
							<strong :style="{ display: 'block', fontSize: '8pt', textTransform: 'uppercase', letterSpacing: '0.5px', opacity: 0.8, marginBottom: '3px' }">Email</strong>{{ data.profile.email }}
						</div>
						<div class="contact-item" v-if="data.profile.phone" :style="{ marginBottom: '15px', fontSize: '9pt', lineHeight: 1.4 }">
							<strong :style="{ display: 'block', fontSize: '8pt', textTransform: 'uppercase', letterSpacing: '0.5px', opacity: 0.8, marginBottom: '3px' }">Phone</strong>{{ data.profile.phone }}
						</div>
						<div class="contact-item" v-if="data.profile.address" :style="{ marginBottom: '15px', fontSize: '9pt', lineHeight: 1.4 }">
							<strong :style="{ display: 'block', fontSize: '8pt', textTransform: 'uppercase', letterSpacing: '0.5px', opacity: 0.8, marginBottom: '3px' }">Address</strong>{{ data.profile.address }}
						</div>
						<div class="contact-item" v-if="data.profile.website" :style="{ marginBottom: '15px', fontSize: '9pt', lineHeight: 1.4 }">
							<strong :style="{ display: 'block', fontSize: '8pt', textTransform: 'uppercase', letterSpacing: '0.5px', opacity: 0.8, marginBottom: '3px' }">Website</strong>{{ data.profile.website }}
						</div>
						<div class="contact-item" v-if="data.profile.linkedin" :style="{ marginBottom: '15px', fontSize: '9pt', lineHeight: 1.4 }">
							<strong :style="{ display: 'block', fontSize: '8pt', textTransform: 'uppercase', letterSpacing: '0.5px', opacity: 0.8, marginBottom: '3px' }">LinkedIn</strong>{{ data.profile.linkedin }}
						</div>
						<div class="contact-item" v-if="data.profile.github" :style="{ marginBottom: '15px', fontSize: '9pt', lineHeight: 1.4 }">
							<strong :style="{ display: 'block', fontSize: '8pt', textTransform: 'uppercase', letterSpacing: '0.5px', opacity: 0.8, marginBottom: '3px' }">GitHub</strong>{{ data.profile.github }}
						</div>
					</div>

					<!-- Skills in sidebar -->
					<div class="draggable-element" draggable="true" v-if="data.styles.skills == 1 && data.skills.length" :style="{ marginBottom: '15px' }">
						<PSKILL1 :skills="data.skills" />
					</div>
					<div class="draggable-element" draggable="true" v-if="data.styles.skills == 2" :style="{ marginBottom: '15px' }">
						<PSKILL2 :skills2="data.skills2" />
					</div>
				</div>

				<!-- Right Content -->
				<div class="col-8 main-content" :style="{ padding: '40px 30px', background: 'white' }">
					<!-- Summary -->
					<div class="draggable-element" draggable="true" v-if="data.profile.summary" :style="{ marginBottom: '15px' }">
						<h4 class="content-title" :style="{
							fontSize: '14pt',
							fontWeight: 'bold',
							color: '#16a085',
							margin: '20px 0 8px 0',
							textTransform: 'uppercase',
							letterSpacing: '1px'
						}">ABOUT ME</h4>
						<div class="accent-line" :style="{
							height: '3px',
							width: '60px',
							background: '#16a085',
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
						<h4 class="content-title" :style="{
							fontSize: '14pt',
							fontWeight: 'bold',
							color: '#16a085',
							margin: '20px 0 8px 0',
							textTransform: 'uppercase',
							letterSpacing: '1px'
						}">EXPERIENCE</h4>
						<div class="accent-line" :style="{
							height: '3px',
							width: '60px',
							background: '#16a085',
							marginBottom: '12px',
							borderRadius: '2px',
							webkitPrintColorAdjust: 'exact',
							printColorAdjust: 'exact'
						}"></div>
						<PEXP :exps="data.exps" bullet="•" bulletColor="#16a085" />
					</div>

					<!-- Education -->
					<div class="draggable-element" draggable="true" v-if="data.eds.length" :style="{ marginBottom: '15px' }">
						<h4 class="content-title" :style="{
							fontSize: '14pt',
							fontWeight: 'bold',
							color: '#16a085',
							margin: '20px 0 8px 0',
							textTransform: 'uppercase',
							letterSpacing: '1px'
						}">EDUCATION</h4>
						<div class="accent-line" :style="{
							height: '3px',
							width: '60px',
							background: '#16a085',
							marginBottom: '12px',
							borderRadius: '2px',
							webkitPrintColorAdjust: 'exact',
							printColorAdjust: 'exact'
						}"></div>
						<PEDU :eds="data.eds" />
					</div>

					<!-- Projects -->
					<div class="draggable-element" draggable="true" v-if="data.projs.length" :style="{ marginBottom: '15px' }">
						<h4 class="content-title" :style="{
							fontSize: '14pt',
							fontWeight: 'bold',
							color: '#16a085',
							margin: '20px 0 8px 0',
							textTransform: 'uppercase',
							letterSpacing: '1px'
						}">PROJECTS</h4>
						<div class="accent-line" :style="{
							height: '3px',
							width: '60px',
							background: '#16a085',
							marginBottom: '12px',
							borderRadius: '2px',
							webkitPrintColorAdjust: 'exact',
							printColorAdjust: 'exact'
						}"></div>
						<PProj :projs="data.projs" bullet="•" bulletColor="#16a085" />
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
