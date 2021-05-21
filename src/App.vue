<template>
  <div id="app">
    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <nav
          id="sidebarMenu"
          style="height: 100%"
          class="col-md-12 col-sm-12 bg-dark sidebar nav justify-content-center"
        >
          <span
            :class="[
              { 'nav-item': true },
              { 'pt-2': true },
            ]"
            v-for="(item, i) in nav"
            :key="i"
          >
            <a
              class="nav-link"
              href="#"
              :class="[{ active: current === item }]"
              @click.prevent="current = item"
            >
              {{ item }}
              <span class="visually-hidden" v-if="current === item">(current)</span>
            </a>
            <hr />
          </span>
          <!-- <span class="nav-item pt-2">
            <a href="#" class="nav-link" @click.prevent="preview">Preview</a>
            <hr />
          </span>-->
          <span class="nav-item pt-2" v-if="current == 'Preview'">
            <a
              href="#"
              class="nav-link"
              @click.prevent="create"
              data-toggle="modal"
              data-target="#myModal"
            >Generate</a>
            <hr />
          </span>
          <span class="nav-item pt-2">
            <a href="#" class="nav-link" @click.prevent="download">Download</a>
          </span>
          <span class="nav-item pt-2">
            <a href="#" class="nav-link" @click.prevent="save" id="save-nav">Save</a>
          </span>
          <span class="nav-item pt-2">
            <a
              href="#"
              class="nav-link"
              data-bs-toggle="modal"
              data-bs-target="#loadresume"
              id="load-nav"
            >Load</a>
          </span>
        </nav>
      </div>
      <div class="col" v-if="current != 'Import'">
        <div :class="[{ 'container': current !== 'Preview' }, { 'container-fluid': current == 'Preview' }]" >
          <div class="row mt-4">
            <div :class="[{ 'col-md-12': true }, { 'col-sm-12': true }]">
              <!-- { 'col-lg-4': (current !== 'Preview') }, { 'offset-lg-1': (current !== 'Preview') } -->
              <Profile v-if="current == 'Profile'" :profile="profile" />
              <div v-else-if="current == 'Experience'" class="row accordion" id="experiences">
                <div class="col-md-5">
                  <Experience
                    v-for="(exp, i) in exps"
                    :key="i"
                    :exp="exp"
                    @delete-row="delRow('exp', i)"
                    @del-resp="delRes('exp', i, $e)"
                  />
                </div>
                <div class="col-md-6">
                  <EXP :exps="exps"/>
                </div>
              </div>
              <div v-else-if="current == 'Education'" class="row accordion" id="educations">
                <div class="col-md-5">
                  <Education
                    v-for="(edu, i) in eds"
                    :key="i"
                    :edu="edu"
                    @delete-row="delRow('ed', i)"
                  />
                </div>
                <div class="col-md-6">
                  <EDP :eds="eds"/>
                </div>
              </div>
              <div v-else-if="current == 'Skills' && stype==1" class="row accordion" id="skills">
                <div class="col-md-5">
                  <Skills
                    v-for="(skill, i) in skills"
                    :key="i"
                    :skill="skill"
                    @delete-row="delRow('ski', i)"
                    @del-joined="delJoined('ski', i, $e)"
                  />
                </div>
                <div class="col-md-6">
                  <SK1P :skills="skills"/>
                </div>
              </div>
              <div class="row" v-else-if="current == 'Skills' && stype == 2">
                <Skills2 :skill2="skills2" @del-joined="delJoined('sk2', $e)" />
              </div>
              <div v-else-if="current == 'Projects'" class="row accordion" id="projects">
                <div class="col-md-5">
                  <Projects
                    v-for="(proj, i) in projs"
                    :key="i"
                    :proj="proj"
                    @delete-row="delRow('proj', i)"
                    @del-joined="delJoined('proj', i, $e)"
                    @del-resp="delRes('proj', i, $e)"
                  />
                </div>
                <div class="col-md-6">
                  <PJP :projs="projs"/>
                </div>
              </div>
              <!-- Data -->
              <Preview v-else-if="current == 'Preview'" :data="$data" />

              <!-- <div v-else-if="current == 'Certifications'">
                <div class="accordion" id="certificates">
                  <Certifications
                    v-for="(cert, i) in certs"
                    :key="i"
                    :cert="cert"
                    @delete-row="delRow('cer', i)"
                  />
                </div>
                <span class="col">
                  <button @click="add('cert')" class="btn btn-primary">Add Certification</button>
                  <hr />
                </span>
              </div>-->
              <span>
                <br>
                <button v-if="['Preview','Profile', 'Skills'].indexOf(current)==-1"  @click="add(current.toLowerCase().substring(0, 3))" class="btn btn-primary">Add {{ current[current.length-1]=='s'?current.substring(0,current.length-1):current }}</button>
                <button v-else-if="current== 'Skills' && stype == 1" @click="add(current.toLowerCase().substring(0, 3))" class="btn btn-primary">Add {{ current[current.length-1]=='s'?current.substring(0,current.length-1):current }}</button>
                <button v-if="current== 'Skills'" @click="changeskillstyle()" class="btn btn-primary" :style="[stype == 1?{'margin-left':'10px'}:null]">Change style</button>
              </span>
            </div>
          </div>
          <span>
            Press Ctrl+S for saving any time
            <br />
            Download to get backup and load from any device
            <p v-if="current!=='Preview'" >Previews are displayed for convenience to check for typos or affirmation.</p>
            <div class="row" v-if="current== 'Skills' && stype == 2">
              <h5 class="modal-title">Print Instructions</h5>
              <p>While printing with this skills type please check the print backgrounds checkbox in print modal</p>
              <img style="max-width:400px" src="./assets/printbackground.png" alt="skills printing instructions" />
            </div>
          </span>

        </div>
        
      </div>
    </div>
    <Import :authcode="authcode" v-if="current == 'Import'"/>
    <div
      class="modal"
      tabindex="-1"
      aria-labelledby="loadresumeModal"
      aria-hidden="true"
      id="loadresume"
    >
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
import Import from "./components/Import.vue";

//Previews
import EXP from './components/Previews/Experience.vue'
import EDP from './components/Previews/Education.vue'
import SK1P from './components/Previews/Skills.vue'
import PJP from './components/Previews/Project.vue'

// import Certifications from "./components/Certifications.vue";
// import $ from 'jquery';


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
    Import,
    EXP,
    EDP,
    SK1P,
    PJP
    // Certifications,
  },
  data() {
    return {
      authcode:undefined,
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
      // certs: [],
      nav: [
        "Profile",
        "Experience",
        "Education",
        "Skills",
        "Projects",
        "Preview",
        // "Import"
        // "Certifications",
      ],
      stype: 1,
      current: "Profile",
    };
  },
  methods: {
    add: function(type) {
      switch (type) {
        case "exp":
          this.exps.push({
            company: "",
            location: "",
            title: "",
            start: "",
            end: "",
            resp: [],
          });
          break;
        case "edu":
          this.eds.push({
            institute: "",
            degree: "",
            major: "",
            locations: "",
            start: "",
            end: "",
          });
          break;
        case "ski":
          this.skills.push({ type: "", name: [] });
          break;
        // case "skill2":
        //   this.skills2.push({ name: [] });
        //   break;
        case "pro":
          this.projs.push({
            title: "",
            desc: "",
            link: "",
            start: "",
            end: "",
            tools: [],
            resp: [],
          });
          break;
        // case "cert":
        //   this.certs.push({ institute: "", title: "", link: "", date: "" });
        // break;

        default:
          break;
      }
      // console.log(this.$refs);
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

      localStorage.setItem("profile", JSON.stringify(this.$data.profile));
      localStorage.setItem("experience", JSON.stringify(this.$data.exps));
      localStorage.setItem("education", JSON.stringify(this.$data.eds));
      localStorage.setItem("skills", JSON.stringify(this.$data.skills));
      localStorage.setItem("projects", JSON.stringify(this.$data.projs));
      localStorage.setItem("stype", JSON.stringify(this.$data.stype));
      localStorage.setItem("skills2", JSON.stringify(this.$data.skills2));

    },
    load: function() {
      let e = document.getElementById('resumefile')
      let fr = new FileReader();
      fr.onload = () => {
        let d = JSON.parse(fr.result);
        console.log(d);
        if (d.profile) this.profile = d.profile;
        if (d.exps) this.exps = d.exps;
        if (d.eds) this.eds = d.eds;
        if (d.skills) this.skills = d.skills;
        if (d.projs) this.projs = d.projs;
        if (d.stype) this.stype = d.stype;
        if (d.skills2) this.skills2 = d.skills2;
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
    delRow: function(type, i) {
      switch (type) {
        case "exp":
          this.exps.splice(i, 1);
          break;
        case "ed":
          this.eds.splice(i, 1);
          break;
        case "ski":
          this.skills.splice(i, 1);
          break;
        case "proj":
          this.projs.splice(i, 1);
          break;
        case "cer":
          this.certs.splice(i, 1);
          break;

        default:
          break;
      }
    },
    delJoined: function(type, i, j) {
      switch (type) {
        case "ski":
          this.skills[i].name.splice(j, 1);
          break;
        case 'sk2':
          this.skills2.name.splice(j, 1);
          break;
        case "proj":
          this.projs[i].tools.splice(j, 1);
          break;
      }
    },
    delRes: function(type, i, j) {
      switch (type) {
        case "exp":
          this.exps[i].resp.splice(j, 1);
          break;
        case "proj":
          this.projs[i].resp.splice(j, 1);
          break;
      }
    },
  },
  mounted() {
    var ref = window.location.href;

    if(ref.includes('linkedin')){
      this.authcode=window.location.search.split('?code=')[1]
      this.current='Import';
      return;
    }
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.keyCode == 83) {
        e.preventDefault()
        document.getElementById('save-nav').innerHTML = "Saving"
        this.save()
        setTimeout(() => {
          document.getElementById('save-nav').innerHTML = "Saved"
        }, 200)
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
</style>