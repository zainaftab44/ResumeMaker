<template>
	<div id="app">
		<div class="row">
			<nav class="navbar navbar-dark navbar-expand-lg bg-dark p-2">
				<div class="container-fluid">
					<a class="navbar-brand" href="#">
						<img src="./assets/logo.svg" alt="" style="width: 150px;" />
					</a>
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
							<li class="nav-item" v-if="current == 'Preview'">
								<a class="nav-link" @click.prevent="create">Generate</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" @click.prevent="download">Backup</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" @click.prevent="save" id="save-nav">Save</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" data-bs-toggle="modal" data-bs-target="#loadresume">Load</a>
								<!-- @click.prevent="trigger" -->
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
		<div class="container-fluid">
			<div class="row mt-4">
				<div class="col-lg-6 col-md-12 accordion px-5" :id="current.toLowerCase()">
					<Profile v-if="current == 'Profile'" :profile="profile" />
					<Experience v-else-if="current == 'Experience'" v-for="(exp, i) in exps" :key="i" :exp="exp" @delete-row="delRow(i)" @move-row="moveRow" />
					<Education v-else-if="current == 'Education'" v-for="(e, i) in eds" :key="i" :edu="e" @delete-row="delRow(i)" @move-row="moveRow" />
					<Skills v-else-if="current == 'Skills' && styles.skills == 1" v-for="(sk, i) in skills" :key="i" :skill="sk" @delete-row="delRow(i)" @move-row="moveRow" />
					<Skills2 v-else-if="current == 'Skills' && styles.skills == 2" :skill2="skills2" />
					<Projects v-else-if="current == 'Projects'" v-for="(pr, i) in projs" :key="i" :proj="pr" @delete-row="delRow(i)" @move-row="moveRow" />
					<!-- <Award v-else-if="current == 'Awards'" v-for="(awd, i) in awds" :key="i" :awd="awd" @delete-row="delRow(i)" @move-row="moveRow" /> -->
					<!-- <Certifications v-for="(c, i) in certs" :key="i" :cert="c" @delrow="delRow(i)"/> -->
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
					<!-- <AWD v-else-if="current == 'Awards'" :awds="awds" /> -->
				</div>
			</div>

			<Preview v-if="current == 'Preview'" :maindata="$data" />
		</div>

		<span class="text-center">
			<p>
				Press Ctrl+S for saving any time<br />
				Download to get backup and load from any device
			</p>
			<p v-if="current != 'Preview'">Displayed previews to check for proofreading and are not final.</p>
			<div class="row" v-if="current == 'Skills' && styles.skills == 2">
				<h5 class="modal-title">Print Instructions</h5>
				<p>While printing with this skills type please check the print backgrounds checkbox in print modal</p>
				<img style="max-width:400px" src="./assets/printbackground.png" alt="printing instructions" />
			</div>
		</span>
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
// import Award from "./components/Award.vue";
// import Certifications from "./components/Certifications.vue";
// import Import from "./components/Import.vue";

//Previews
import PP from "./components/previews/profile/First.vue"
import PP2 from "./components/previews/profile/Second.vue"
import EXP from "./components/previews/Experience.vue"
import EDP from "./components/previews/Education.vue"
import SK1P from "./components/previews/Skills.vue"
import SK2P from "./components/previews/Skills2.vue"
import PJP from "./components/previews/Project.vue"
// import AWD from './components/previews/Award.vue'

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
		// Award,
		Skills2,
		PP,
		PP2,
		EXP,
		EDP,
		SK1P,
		SK2P,
		PJP,
		// AWD,
		// Certifications,
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
			},
			exps: [],
			eds: [],
			skills: [],
			projs: [],
			skills2: { name: [] },
			awds: [],
			// certs: [],
			nav: [
				"Profile",
				"Experience",
				"Education",
				"Skills",
				"Projects",
				// "Certifications",
				// "Awards",
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
			// <html><head><link rel='stylesheet' href='./assets/bootstrap.min.css' media='print'/>
			var source =`<html> ${window.document.head.outerHTML.substring(0,window.document.head.outerHTML.length-"</head>".length)}
				<style>body {font-family: '${this.settings.font}';} @page {size: A4 portrait;} page[size='A4'] {  width: 21cm;  height: 29.7cm; } page[size='A4'][layout='landscape'] {  width: 29.7cm; height: 21cm;  } page{background:#fff;display:block;margin:0 auto;margin-bottom:.5cm; } .preview>*{text-align:justify!important;line-height:1.2!important}.preview>small{text-decoration:none!important;color:grey!important}.preview>.sub-color{color:grey!important}.preview>h4{margin-top:1.5em!important;margin-bottom:.5em!important}.preview>body{size:7in 9.25in!important;margin:27mm 16mm 27mm 16mm!important}li:before{content:'\\2014\\a0\\a0'}li{list-style:none!important}.pr-2{padding-right:5dp!important}</style></head><body><div class='preview'>` +
				// "<page size='A4'>" +
				window.document.getElementsByClassName("preview")[0].innerHTML +
				// "</page>" +
				"</div><script>window.print();<" +
				"/script></body></html>"
			var tab = window.open("/")
			tab.document.write(source)
			// localStorage.data = JSON.stringify(this.$data)
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
			document.getElementById("save-nav").innerHTML = "Saved"
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
				// your code to consume the json
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
					return this.emptyexperience
				case "Education":
					return this.emptyeducation
				case "Skills":
					return this.emptyskill
				case "Projects":
					return this.emptyproject
			}
		},
	},
	mounted() {
		var ref = window.location.href

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
		emptyskill() {
			return { type: "", name: [] }
		},
		emptyexperience() {
			return { company: "", location: "", title: "", start: "", end: "", resp: [] }
		},
		emptyproject() {
			return { title: "", desc: "", link: "", start: "", end: "", tools: [], resp: [] }
		},
		emptyeducation() {
			return { institute: "", degree: "", major: "", locations: "", start: "", end: "" }
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

/* .nav-link {
    color: aliceblue;
  } */
/* a:hover {
  background: gray;
  color: antiquewhite;
} */
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

.navbar-nav>li::before {
	content: "" !important;
}

li:before {
	content: "\2014\a0\a0";
}
</style>
