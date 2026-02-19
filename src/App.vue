<template>
	<div id="app" class="container-fluid">
		<div class="row">
			<nav class="navbar navbar-dark navbar-expand-lg bg-dark p-2">
				<div class="container-fluid">
					<a class="navbar-brand" href="#">
						<img src="./assets/logo.svg" alt="" style="width: 150px;" />
					</a>
					<div class="input-group">
						<button v-if="addChk" @click="add()" class="btn btn-primary">Add {{ btnCurr }}</button>
						<button v-if="canChangeStyle" @click="changestyle()" class="btn btn-info">Toggle Style</button>
						<a v-if="current == 'Preview'" class="btn btn-primary" @click.prevent="create">Print/Export to PDF</a>
					</div>
					<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-label="Toggle navigation">
						<span class="navbar-toggler-icon"></span>
					</button>
					<div class="collapse navbar-collapse" id="navbarNav">
						<ul class="navbar-nav me-auto mb-2 mb-lg-0">
							<li class="nav-item" v-for="(item, i) in nav" :key="i">
								<a class="nav-link" :class="{ active: current == item }" @click.prevent="current = item">
									{{ item }}
								</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" @click.prevent="download">Backup</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" @click.prevent="save" id="save-nav">Save</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" data-bs-toggle="modal" data-bs-target="#loadresume">Load</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
		<div class="row mt-4" v-if="current !== 'Preview'">
			<div class="col-lg-6 col-md-12 accordion px-5" :id="current.toLowerCase()">
				<Profile v-if="current == 'Profile'" :profile="profile" />
				<Experience v-else-if="current == 'Experience'" v-for="(exp, i) in exps" :key="i" :exp="exp" @delete-row="delRow(i)" @move-row="moveRow" />
				<Education v-else-if="current == 'Education'" v-for="(e, i) in eds" :key="i" :edu="e" @delete-row="delRow(i)" @move-row="moveRow" />
				<Skills v-else-if="current == 'Skills' && styles.skills == 1" v-for="(sk, i) in skills" :key="i" :skill="sk" @delete-row="delRow(i)" @move-row="moveRow" />
				<Skills2 v-else-if="current == 'Skills' && styles.skills == 2" :skill2="skills2" />
				<Projects v-else-if="current == 'Projects'" v-for="(pr, i) in projs" :key="i" :proj="pr" @delete-row="delRow(i)" @move-row="moveRow" />
				<div class="input-group mt-4">
					<button v-if="addChk" @click="add()" class="btn btn-primary">Add {{ btnCurr }}</button>
					<button v-if="canChangeStyle" @click="changestyle()" class="btn btn-info">Toggle</button>
				</div>
			</div>
			<div class="col-lg-6 col-md-12">
				<PP v-if="current == 'Profile' && styles.profile == 1" :profile="profile" />
				<PP2 v-if="current == 'Profile' && styles.profile == 2" :profile="profile" />
				<EXP v-else-if="current == 'Experience'" :exps="exps" />
				<EDP v-else-if="current == 'Education'" :eds="eds" />
				<SK1P v-else-if="current == 'Skills' && styles.skills == 1" :skills="skills" />
				<SK2P v-else-if="current == 'Skills' && styles.skills == 2" :skills2="skills2" />
				<PJP v-else-if="current == 'Projects'" :projs="projs" />
			</div>
		</div>

		<Preview v-else :maindata="$data" />

		<div class="text-center">
			<p>
				Press Ctrl+S for saving any time<br />
				Download to get backup and load from any device
			</p>
			<p v-if="current != 'Preview'">Displayed previews to check for proofreading and are not final.</p>
			<div class="row" v-if="current == 'Preview'">
				<h5 class="modal-title">Print Instructions</h5>
				<p>To export as PDF: Click "Print/Export to PDF" button, then in the print dialog, select "Save as PDF" as the destination.</p>
				<p>Make sure "Background graphics" is enabled in print settings for best results.</p>
			</div>
		</div>
		<div class="modal" tabindex="-1" aria-hidden="true" id="loadresume">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">Load Resume</div>
					<div class="modal-body">
						<input id="resumefile" type="file" accept=".json" />
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
						<button type="button" class="btn btn-primary" @click.prevent="load" data-bs-dismiss="modal">Load</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Preview from "./components/pages/Preview.vue"
import Profile from "./components/pages/Profile.vue"
import Experience from "./components/pages/Experience.vue"
import Education from "./components/pages/Education.vue"
import Skills from "./components/pages/Skills.vue"
import Skills2 from "./components/pages/Skills2.vue"
import Projects from "./components/pages/Projects.vue"

//Previews
import PP from "./components/previews/profile/First.vue"
import PP2 from "./components/previews/profile/Second.vue"
import EXP from "./components/previews/Experience.vue"
import EDP from "./components/previews/Education.vue"
import SK1P from "./components/previews/Skills.vue"
import SK2P from "./components/previews/Skills2.vue"
import PJP from "./components/previews/Project.vue"

import Vue from "vue"

export default {
	name: "App",
	components: {
		Preview,
		Profile,
		Experience,
		Education,
		Skills,
		Projects,
		Skills2,
		PP,
		PP2,
		EXP,
		EDP,
		SK1P,
		SK2P,
		PJP,
	},
	watch: {
		current: function () {
			document.title = this.current + " - Resume Forge"
		},
	},
	data() {
		return {
			authcode: undefined,
			profile: {
				name: "",
				title: "",
				email: "",
				phone: "",
				address: "",
				summary: "",
				website: "",
				github: "",
				linkedin: "",
			},
			exps: [],
			eds: [],
			skills: [],
			projs: [],
			skills2: { name: [] },
			awds: [],
			nav: [
				"Profile",
				"Experience",
				"Education",
				"Skills",
				"Projects",
				"Preview",
			],
			current: "Profile",
			styles: {
				profile: 1,
				skills: 1,
			},
			settings: {
				font: "Arial",
				list_style: "circle",
			},
		}
	},
	methods: {
		add: function () {
			this.getArrayRef().unshift(this.getEmpty())
		},
		changestyle: function () {
			this.styles[this.current.toLowerCase()] = this.styles[this.current.toLowerCase()] == 1 ? 2 : 1
		},
		create: function () {
			// Improved print functionality with reliable style capturing
			const previewElement = window.document.querySelector(".preview-container")
			if (!previewElement) {
				alert("Preview not found. Please try again.")
				return
			}
			// Capture all current document styles and external links
			let stylesExternal = ""
			document.querySelectorAll("link[rel='stylesheet'], style").forEach(tag => {
				stylesExternal += tag.outerHTML
			})

			// Capture all current document head content (styles, links, etc.) excluding scripts
			const headContent = document.head.cloneNode(true)
			headContent.querySelectorAll("script").forEach(s => s.remove())
			const styles = headContent.innerHTML

			const source = `<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<base href="${window.location.origin}${window.location.pathname}">
	<title>Resume - ${this.profile.name || 'Preview'}</title>
	${stylesExternal}
	${styles}
	<style>
		* {
			margin: 0;
			padding: 0;
			box-sizing: border-box;
		}
		
		body {
			font-family: '${this.settings.font}', Arial, sans-serif;
			line-height: 1.6;
			color: #333;	
			background: #fff;
			margin: 0;
			padding: 0;
		}
		
		@page {
			size: A4 portrait;
			margin: 0;
		}
		
		.preview-container {
			width: 21cm;
			height: auto;
			margin: 0 auto;
			background: white;
			overflow: hidden;
		}
			
		/* Force color printing */
		* {
			-webkit-print-color-adjust: exact !important;
			print-color-adjust: exact !important;
			color-adjust: exact !important;
		}

		@media print {
			body { margin: 0; }
			.preview-container { box-shadow: none; }
		}
	</style>
</head>
<body>
	<div class="preview-container">
		${previewElement.innerHTML}
	</div>
	<script>
		window.onload = function() {
			setTimeout(() => {
				window.print();
			}, 1000);
		};
	<\/script>
</body>
</html>`

			const tab = window.open("")
			if (tab) {
				tab.document.write(source)
				tab.document.close()
			} else {
				alert("Please allow popups for this site to enable PDF export")
			}
			
			this.save()
		},
		save: function () {
			document.getElementById("save-nav").innerHTML = "Saving"
			localStorage.setItem("profile", JSON.stringify(this.$data.profile))
			localStorage.setItem("experience", JSON.stringify(this.$data.exps))
			localStorage.setItem("education", JSON.stringify(this.$data.eds))
			localStorage.setItem("skills", JSON.stringify(this.$data.skills))
			localStorage.setItem("projects", JSON.stringify(this.$data.projs))
			localStorage.setItem("styles", JSON.stringify(this.$data.styles))
			localStorage.setItem("skills2", JSON.stringify(this.$data.skills2))
			localStorage.setItem("awds", JSON.stringify(this.$data.awds))
			setTimeout(() => {
				document.getElementById("save-nav").innerHTML = "Saved"
				setTimeout(() => {
					document.getElementById("save-nav").innerHTML = "Save"
				}, 2000)
			}, 500)
		},
		load: function () {
			let e = document.getElementById("resumefile")
			let fr = new FileReader()
			fr.onload = () => {
				let d = JSON.parse(fr.result)
				if (d.profile) this.profile = d.profile
				if (d.exps) this.exps = d.exps
				if (d.eds) this.eds = d.eds
				if (d.skills) this.skills = d.skills
				if (d.projs) this.projs = d.projs
				if (d.styles) this.styles = d.styles
				if (d.skills2) this.skills2 = d.skills2
				if (d.awds) this.awds = d.awds
			}
			fr.readAsText(e.files[0])
		},
		download() {
			this.save()
			var data = JSON.stringify(this.$data)
			data = JSON.parse(data)
			delete data["certs"]
			delete data["current"]
			delete data["nav"]

			let filename = "ResumeForge_CV.json"
			let contentType = "application/json;charset=utf-8;"
			if (window.navigator && window.navigator.msSaveOrOpenBlob) {
				var blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(data)))], { type: contentType })
				navigator.msSaveOrOpenBlob(blob, filename)
			} else {
				var a = document.createElement("a")
				a.download = filename
				a.href = "data:" + contentType + "," + encodeURIComponent(JSON.stringify(data))
				a.target = "_blank"
				document.body.appendChild(a)
				a.click()
				document.body.removeChild(a)
			}
		},
		delRow: function (i) {
			this.getArrayRef().splice(i, 1)
		},
		moveRow: function (i, change) {
			if (i + change >= 0) {
				if (i + change >= this.getArrayRef().length) return
				let exp = this.getArrayRef()[i]
				Vue.set(this.getArrayRef(), i, this.getArrayRef()[i + change])
				Vue.set(this.getArrayRef(), i + change, exp)
			}
		},
		getArrayRef() {
			switch (this.current) {
				case "Experience":
					return this.exps
				case "Education":
					return this.eds
				case "Skills":
					return this.skills
				case "Projects":
					return this.projs
			}
		},
		getEmpty() {
			switch (this.current) {
				case "Experience":
					return { company: "", location: "", title: "", start: "", end: "", resp: [] }
				case "Education":
					return { institute: "", degree: "", major: "", locations: "", start: "", end: "" }
				case "Skills":
					return { type: "", name: [] }
				case "Projects":
					return { title: "", desc: "", link: "", start: "", end: "", tools: [], resp: [] }
			}
		},
	},
	mounted() {
		document.addEventListener("keydown", (e) => {
			if (e.ctrlKey && e.keyCode == 83) {
				e.preventDefault()
				this.save()
			}
		})

		if (typeof Storage !== "undefined") {
			let found = 0
			if (localStorage.getItem("profile")) {
				this.profile = JSON.parse(localStorage.getItem("profile"))
				found = 1
			}
			if (localStorage.getItem("education")) {
				this.eds = JSON.parse(localStorage.getItem("education"))
				found = 1
			}
			if (localStorage.getItem("experience")) {
				this.exps = JSON.parse(localStorage.getItem("experience"))
				found = 1
			}
			if (localStorage.getItem("skills")) {
				this.skills = JSON.parse(localStorage.getItem("skills"))
				found = 1
			}
			if (localStorage.getItem("projects")) {
				this.projs = JSON.parse(localStorage.getItem("projects"))
				found = 1
			}
			if (localStorage.getItem("styles")) {
				this.styles = JSON.parse(localStorage.getItem("styles"))
				found = 1
			}
			if (!localStorage.getItem("styles") && localStorage.getItem("stype")) {
				this.styles.skills = JSON.parse(localStorage.getItem("stype"))
				found = 1
			}
			if (localStorage.getItem("skills2")) {
				this.skills2 = JSON.parse(localStorage.getItem("skills2"))
				found = 1
			}
			if (localStorage.getItem("awds")) {
				this.awds = JSON.parse(localStorage.getItem("awds"))
				found = 1
			}

			if (found == 0) {
				if (localStorage.data) {
					var d = JSON.parse(localStorage.data)
					if (d.profile) this.profile = d.profile
					if (d.exps) this.exps = d.exps
					if (d.eds) this.eds = d.eds
					if (d.skills) this.skills = d.skills
					if (d.projs) this.projs = d.projs
				}
			}
		}
	},
	computed: {
		init: function () {
			return this.current == "Awards" ? "awd" : this.current.toLowerCase().substring(0, 3)
		},
		addChk: function () {
			return !/Preview|Profile|Skills/.test(this.current) || (this.current == "Skills" && this.styles.skills == 1)
		},
		btnCurr: function () {
			return this.current.replace(/s$/, "")
		},
		canChangeStyle: function () {
			return ["Skills", "Profile"].includes(this.current)
		},
	},
}
</script>
<style>
#app {
	font-family: "Segoe UI", Tahoma, Verdana, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: justify;
}

hr {
	margin-top: 0.2em;
	margin-bottom: 0.2rem;
}

.active {
	background: gray;
}

.btn-outline-danger {
	max-width: 20%;
}

.accord-title {
	float: left;
	max-width: 100%;
	width: 75%;
}

.delete-btn {
	height: 1.75rem;
	margin: auto;
	width: min-content !important;
}

.nav-link {
	cursor: pointer;
}

.navbar-nav > li::before {
	content: "" !important;
}
</style>
