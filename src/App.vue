<template>
  <div id="app">
    <div class="row">
      <div class="col-lg-12 col-md-4 col-sm-12">
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
          <span class="nav-item pt-2">
            <a href="#" class="nav-link" @click.prevent="create">Generate</a>
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
      <div class="col">
        <div class="container-fluid">
          <div class="row mt-4">
            <div class="col-lg-4 offset-lg-1 col-md-12 col-sm-12">
              <div v-if="current == 'Profile'">
                <Profile :profile="profile" />
              </div>
              <div v-else-if="current == 'Experience'">
                <div class="accordion" id="experiences">
                  <Experience
                    v-for="(exp, i) in exps"
                    :key="i"
                    :exp="exp"
                    @delete-row="deleteThisRow('exp', i)"
                    @del-resp="deleteResp('exp', i, $event)"
                  />
                </div>
                <span class="col mx-auto">
                  <br />
                  <button @click="add('exp')" class="btn btn-primary">Add Experience</button>
                </span>
                <hr />
              </div>
              <div v-else-if="current == 'Education'">
                <div class="accordion" id="educations">
                  <Education
                    v-for="(edu, i) in eds"
                    :key="i"
                    :edu="edu"
                    @delete-row="deleteThisRow('ed', i)"
                  />
                </div>
                <span class="col">
                  <button @click="add('edu')" class="btn btn-primary">Add Education</button>
                  <hr />
                </span>
              </div>
              <div v-else-if="current == 'Skills'">
                <div class="accordion" id="skills">
                  <Skills
                    v-for="(skill, i) in skills"
                    :key="i"
                    :skill="skill"
                    @delete-row="deleteThisRow('ski', i)"
                    @del-joined="deleteJoined('ski', i, $event)"
                  />
                </div>
                <span class="col">
                  <button @click="add('skill')" class="btn btn-primary">Add Skill Set</button>
                  <hr />
                </span>
              </div>
              <div v-else-if="current == 'Projects'">
                <div class="accordion" id="projects">
                  <Projects
                    v-for="(proj, i) in projs"
                    :key="i"
                    :proj="proj"
                    @delete-row="deleteThisRow('proj', i)"
                    @del-joined="deleteJoined('proj', i, $event)"
                    @del-resp="deleteResp('proj', i, $event)"
                  />
                </div>
                <span class="col">
                  <button @click="add('proj')" class="btn btn-primary">Add Project</button>
                  <hr />
                </span>
              </div>
              <!-- <div v-else-if="current == 'Certifications'">
                <div class="accordion" id="certificates">
                  <Certifications
                    v-for="(cert, i) in certs"
                    :key="i"
                    :cert="cert"
                    @delete-row="deleteThisRow('cer', i)"
                  />
                </div>
                <span class="col">
                  <button @click="add('cert')" class="btn btn-primary">Add Certification</button>
                  <hr />
                </span>
              </div>-->
            </div>
            <div
              class="col-lg-6 col-md-12 col-sm-12"
              style="
                text-align: justify;
                border: solid 1px;
                border-padding: 3px;
                min-height: 29.7cm;
              "
            >
              <!-- Data -->
              <!-- <pre>{{$data}}</pre> -->
              <keep-alive>
                <Preview :data="$data" />
              </keep-alive>
            </div>
          </div>
        </div>
      </div>
    </div>
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
import Projects from "./components/Projects.vue";
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
    // Certifications,
  },
  data() {
    return {
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
      // certs: [],
      nav: [
        "Profile",
        "Experience",
        "Education",
        "Skills",
        "Projects",
        // "Certifications",
      ],
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
        case "skill":
          this.skills.push({ type: "", name: [] });
          break;
        case "proj":
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
    deleteThisRow: function(type, i) {
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
    deleteJoined: function(type, i, j) {
      switch (type) {
        case "ski":
          this.skills[i].name.splice(j, 1);
          break;
        case "proj":
          this.projs[i].tools.splice(j, 1);
          break;
      }
    },
    deleteResp: function(type, i, j) {
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