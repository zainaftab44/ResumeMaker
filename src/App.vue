<template>
  <div id="app">
    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <nav id="sidebarMenu" class="col nav bg-dark justify-content-center py-2">
          <span class="nav-item" v-for="(item, i) in nav" :key="i">
            <a class="nav-link" :class="{ active: current == item }" @click.prevent="current = item">
              {{ item }}
              <span class="visually-hidden" v-if="current === item">(current)</span>
            </a>
          </span>
          <span class="nav-item" v-if="current == 'Preview'">
            <a class="nav-link" @click.prevent="create">Generate</a>
          </span>
          <span class="nav-item">
            <a class="nav-link" @click.prevent="download">Download</a>
          </span>
          <span class="nav-item">
            <a class="nav-link" @click.prevent="save" id="save-nav">Save</a>
          </span>
          <span class="nav-item">
            <a
              class="nav-link"
              data-bs-toggle="modal"
              data-bs-target="#loadresume"
              @click.prevent="trigger"
            >Load</a>
          </span>
        </nav>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row mt-4">
        <div class="col-md-5 accordion px-5" :id="current.toLowerCase()">
          <Profile v-if="current == 'Profile'" :profile="profile" />
          <Experience v-else-if="current == 'Experience'" v-for="(ex, i) in exps" :key="i" :exp="ex" @delete-row="delRow(i)" @move-row="moveRow" />
          <Education  v-else-if="current == 'Education'"  v-for="(e, i) in eds" :key="i" :edu="e" @delete-row="delRow(i)" @move-row="moveRow" />
          <Skills v-else-if="current == 'Skills' && stype == 1" v-for="(sk, i) in skills" :key="i" :skill="sk" @delete-row="delRow(i)" @move-row="moveRow" />
          <Skills2 v-else-if="current == 'Skills' && stype == 2" :skill2="skills2"/>
          <Projects v-else-if="current == 'Projects'" v-for="(pr, i) in projs" :key="i" :proj="pr" @delete-row="delRow(i)" @move-row="moveRow" />
          <Award v-else-if="current == 'Awards'" v-for="(awd, i) in awds" :key="i" :awd="awd" @delete-row="delRow(i)" @move-row="moveRow" />
          <!-- <Certifications v-for="(c, i) in certs" :key="i" :cert="c" @delrow="delRow(i)"/> -->
        </div>
        <div class="col-md-6">
          <PP v-if="current == 'Profile'" :profile="profile" />
          <EXP v-else-if="current == 'Experience'" :exps="exps" />
          <EDP  v-else-if="current == 'Education'"  :eds="eds" />
          <SK1P v-else-if="current == 'Skills' && stype == 1" :skills="skills" />
          <SK2P v-else-if="current == 'Skills' && stype == 2" :skills2="skills2" />
          <PJP v-else-if="current == 'Projects'" :projs="projs" />
          <AWD v-else-if="current == 'Awards'" :awds="awds" />
        </div>
      </div>

      <Preview v-if="current == 'Preview'" :data="$data" />

      <span class="ms-3">
        <br />
        <button v-if="isSkill" @click="changeskillstyle()" class="btn btn-primary ms-2">Toggle</button>
      </span>
    </div>
        <button style="position:fixed; bottom: 50px;right:50px" v-if="addChk" @click="add()" class="btn btn-primary">Add {{ btnCurr }}</button>

    <span style="text-align:center">
      <p>Press Ctrl+S for saving any time</p>
      <p>Download to get backup and load from any device</p>
      <p v-if="current != 'Preview'">Displayed previews to check for proofreading and are not final.</p>
      <div class="row" v-if="current == 'Skills' && stype == 2">
        <h5 class="modal-title">Print Instructions</h5>
        <p>While printing with this skills type please check the print backgrounds checkbox in print modal</p>
        <img style="max-width:400px" src="./assets/printbackground.png" alt="printing instructions" />
      </div>
    </span>
    <!-- <Import :authcode="authcode" v-if="current == 'Import'" /> -->
    <div class="modal" tabindex="-1" aria-hidden="true" id="loadresume">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">Load Resume</div>
          <div class="modal-body">
            <input id="resumefile" type="file" accept=".json" />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button
              type="button"
              class="btn btn-primary"
              @click.prevent="load"
              data-bs-dismiss="modal"
            >Load</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Preview from "./components/Preview.vue";
import Profile from "./components/Profile.vue";
import Experience from "./components/Experience.vue";
import Education from "./components/Education.vue";
import Skills from "./components/Skills.vue";
import Skills2 from "./components/Skills2.vue";
import Projects from "./components/Projects.vue";
import Award from "./components/Award.vue";
// import Certifications from "./components/Certifications.vue";
// import Import from "./components/Import.vue";

//Previews
import PP from "./components/Previews/Profile.vue"
import EXP from './components/Previews/Experience.vue'
import EDP from './components/Previews/Education.vue'
import SK1P from './components/Previews/Skills.vue'
import SK2P from './components/Previews/Skills2.vue'
import PJP from './components/Previews/Project.vue'
import AWD from './components/Previews/Award.vue'

import Vue from 'vue'


export default {
  name: "App",
  components: {
    Preview,
    Profile,
    Experience,
    Education,
    Skills,
    Projects,
    Award,
    Skills2,
    PP,
    EXP,
    EDP,
    SK1P,
    SK2P,
    PJP,
    AWD,
       // Certifications,
  },
  watch: {
    current: function() {
      document.title = this.current + ' - Resume Forge';
    }
  },
  data() {
    return {
      authcode: undefined,
      profile: {
        name: "",
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
      awds :[],
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
      stype: 1,
      current: "Profile",
    };
  },
  methods: {
    add: function() {
      switch (this.current) {
        case "Experience":
          this.exps.unshift({company: "", location: "", title: "", start: "", end: "", resp: []});
          break;
        case "Education":
          this.eds.unshift({institute: "", degree: "", major: "", locations: "", start: "", end: ""});
          break;
        case "Skills":
          this.skills.unshift({ type: "", name: [] });
          break;
        case "Projects":
          this.projs.unshift({ title: "", desc: "", link: "", start: "", end: "", tools: [],resp: [],});
          break;
        // case "cert":
        //   this.certs.push({ institute: "", title: "", link: "", date: "" });
        // break;
        case 'Awards':
          this.awds.unshift({title:"", date:"", organization:""})
          break;
        default:
          break;
      }
    },
    changeskillstyle: function() {
      this.stype = this.stype == 1 ? 2 : 1;
    },
    create: function() {
      var source =
        "<html><head><link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'><style>body {font-family: 'Roboto';} @page {size: A4 portrait;} page[size='A4'] {  width: 21cm;  height: 29.7cm; } page[size='A4'][layout='landscape'] {  width: 29.7cm; height: 21cm;  } page{background:#fff;display:block;margin:0 auto;margin-bottom:.5cm; } .preview>*{text-align:justify!important;line-height:1.2!important}.preview>small{text-decoration:none!important;color:grey!important}.preview>.sub-color{color:grey!important}.preview>h4{margin-top:1.5em!important;margin-bottom:.5em!important}.preview>body{size:7in 9.25in!important;margin:27mm 16mm 27mm 16mm!important}li:before{content:'\\2014\\a0\\a0'}li{list-style:none!important}.pr-2{padding-right:5dp!important}</style></head><body><div class='preview'>" +
        "<page size='A4'>" +
        window.document.getElementsByClassName("preview")[0].innerHTML +
        "</page>" +
        "</div><script>window.print();<" +
        "/script></body></html>";
      var tab = window.open("/");
      tab.document.write(source);
      localStorage.data = JSON.stringify(this.$data);
    },
    save: function() {
      document.getElementById('save-nav').innerHTML = "Saving"
      localStorage.setItem("profile", JSON.stringify(this.$data.profile));
      localStorage.setItem("experience", JSON.stringify(this.$data.exps));
      localStorage.setItem("education", JSON.stringify(this.$data.eds));
      localStorage.setItem("skills", JSON.stringify(this.$data.skills));
      localStorage.setItem("projects", JSON.stringify(this.$data.projs));
      localStorage.setItem("stype", JSON.stringify(this.$data.stype));
      localStorage.setItem("skills2", JSON.stringify(this.$data.skills2));
      localStorage.setItem("awds", JSON.stringify(this.$data.awds));
      setTimeout(() => {
        document.getElementById('save-nav').innerHTML = "Saved"
      }, 200)
    },
    load: function() {
      let e = document.getElementById('resumefile')
      let fr = new FileReader();
      fr.onload = () => {
        let d = JSON.parse(fr.result);
        if (d.profile) this.profile = d.profile;
        if (d.exps) this.exps = d.exps;
        if (d.eds) this.eds = d.eds;
        if (d.skills) this.skills = d.skills;
        if (d.projs) this.projs = d.projs;
        if (d.stype) this.stype = d.stype;
        if (d.skills2) this.skills2 = d.skills2;
        if (d.awds) this.awds = d.awds;
        // your code to consume the json                    
      }
      fr.readAsText(e.files[0]);
    },
    download() {
      var data = JSON.stringify(this.$data);
      data = JSON.parse(data)
      delete data["certs"];
      delete data["current"];
      delete data["nav"];

      let filename = "resumeforge_cv.json";
      let contentType = "application/json;charset=utf-8;";
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        var blob = new Blob(
          [decodeURIComponent(encodeURI(JSON.stringify(data)))],
          { type: contentType }
        );
        navigator.msSaveOrOpenBlob(blob, filename);
      } else {
        var a = document.createElement("a");
        a.download = filename;
        a.href =
          "data:" +
          contentType +
          "," +
          encodeURIComponent(JSON.stringify(data));
        a.target = "_blank";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }

    },
    delRow: function(i) {
      switch (this.current) {
        case "Experience":
          this.exps.splice(i, 1);
          break;
        case "Education":
          this.eds.splice(i, 1);
          break;
        case "Skills":
          this.skills.splice(i, 1);
          break;
        case "Projects":
          this.projs.splice(i, 1);
          break;
        case "Certificates":
          this.certs.splice(i, 1);
          break;

        default:
          break;
      }
    },
    moveRow: function(i,change) {
      console.log("in move row method app.vue",i,change)
      switch (this.current) {
        case "Experience":
          if(i+change>=this.exps.length || i+change<0)
            break;
          let exp = this.exps[i]
          Vue.set(this.exps, i, this.exps[i+change])
          Vue.set(this.exps, i+change, exp)
          break;
        case "Education":
          if(i+change>=this.eds.length || i+change<0)
            break;
          let ed = this.eds[i]
          Vue.set(this.eds, i, this.eds[i+change])
          Vue.set(this.eds, i+change,ed)
          break;
        case "Skills":
          if(i+change>=this.skills.length || i+change<0)
            break;
          let skill = this.skills[i]
          Vue.set(this.skills, i, this.skills[i+change])
          Vue.set(this.skills, i+change, skill)
          break;
        case "Projects":
          if(i+change>=this.projs.length || i+change<0)
            break;
          let proj = this.projs[i]
          Vue.set(this.projs, i, this.projs[i+change])
          Vue.set(this.projs, i+change, proj)
          break;
        case "Certificates":
          if(i+change>=this.certs.length || i+change<0)
            break;
          let cert = this.certs[i]
          Vue.set(this.certs, i, this.certs[i+change])
          Vue.set(this.certs, i+change, cert)
          break;

        default:
          break;
      }
    },
  },
  mounted() {
    var ref = window.location.href;

    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.keyCode == 83) {
        e.preventDefault()
        this.save()
      }
    })

    if (typeof Storage !== "undefined") {
      let found = 0;
      if (localStorage.getItem('profile')) {
        this.profile = JSON.parse(localStorage.getItem('profile'));
        found = 1;
      }
      if (localStorage.getItem('education')) {
        this.eds = JSON.parse(localStorage.getItem('education'));
        found = 1;
      }
      if (localStorage.getItem('experience')) {
        this.exps = JSON.parse(localStorage.getItem('experience'));
        found = 1;
      }
      if (localStorage.getItem('skills')) {
        this.skills = JSON.parse(localStorage.getItem('skills'));
        found = 1;
      }
      if (localStorage.getItem('projects')) {
        this.projs = JSON.parse(localStorage.getItem('projects'));
        found = 1;
      }
      if (localStorage.getItem('stype')) {
        this.stype = JSON.parse(localStorage.getItem('stype'));
        found = 1;
      }
      if (localStorage.getItem('skills2')) {
        this.skills2 = JSON.parse(localStorage.getItem('skills2'));
        found = 1;
      }
      if (localStorage.getItem('awds')) {
        this.awds = JSON.parse(localStorage.getItem('awds'));
        found = 1;
      }

      if (found == 0) {
        if (localStorage.data) {
          var d = JSON.parse(localStorage.data);
          if (d.profile) this.profile = d.profile;
          if (d.exps) this.exps = d.exps;
          if (d.eds) this.eds = d.eds;
          if (d.skills) this.skills = d.skills;
          if (d.projs) this.projs = d.projs;
        }
      }
    }
  },
  computed: {
    init: function() { return this.current=='Awards'?'awd':this.current.toLowerCase().substring(0, 3)  },
    addChk: function() { return ['Preview', 'Profile', 'Skills'].indexOf(this.current) == -1 || (this.current == 'Skills' && this.stype == 1) },
    btnCurr: function() { return this.current.replace(/s$/, '') },
    isSkill: function() { return this.current == 'Skills' },
  }
};

</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: justify;
}
.nav-link {
  color: aliceblue;
}
a:hover {
  background: gray;
  color: antiquewhite;
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
.row {
  margin-right: 0;
  margin-left: 0;
}
.delete-btn {
  height: 1.75rem;
  margin: auto;
  width: min-content !important;
}
.nav-link {
  cursor: pointer;
}


@media print {
  * {
     font-family: "Courier New";
     font-size: 6pt;
  }
  /* You can add additional styles here which you need */
}
</style>