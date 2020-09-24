<template>
  <div id="app">
    <div class="row">
      <div class="col-lg-2">
        <nav id="sidebarMenu" style="height:100%" class="col-md-8 d-md-block bg-dark sidebar nav">
          <span
            :class="[{'nav-item':true} ,{'pt-2':true} ,{active: current === item }]"
            v-for="(item,i) in nav"
            :key="i"
          >
            <a
              class="nav-link"
              href="#"
              :class="[{active: current === item }]"
              @click.prevent="current=item"
            >
              {{item}}
              <span class="sr-only" v-if="current === item">(current)</span>
            </a>
            <hr />
          </span>
        </nav>
      </div>
      <div class="col">
        <div class="row mt-4">
          <div class="col-md-4">
            <div v-if="current == 'Profile'">
              <Profile :profile="profile" />
            </div>
            <div v-else-if="current == 'Experience'">
              <Experience v-for="(exp, i) in exps" :key="i" :exp="exp" />
              <button @click="add('exp')" class="btn btn-primary">Add Experience</button>
              <hr />
            </div>
            <div v-else-if="current == 'Education'">
              <Education v-for="(edu, i) in eds" :key="i" :edu="edu" />
              <button @click="add('edu')" class="btn btn-primary">Add Education</button>
              <hr />
            </div>
            <div v-else-if="current == 'Skills'">
              <Skills v-for="(skill, i) in skills" :key="i" :skill="skill" />
              <button @click="add('skill')" class="btn btn-primary">Add Skill Set</button>
              <hr />
            </div>
            <div v-else-if="current == 'Projects'">
              <Projects v-for="(proj, i) in projs" :key="i" :proj="proj" />
              <button @click="add('proj')" class="btn btn-primary">Add Project</button>
              <hr />
            </div>
            <div v-else-if="current == 'Certifications'">
              <Certifications v-for="(cert, i) in certs" :key="i" :cert="cert" />
              <button @click="add('cert')" class="btn btn-primary">Add Certification</button>
              <hr />
            </div>
          </div>
          <div class="col-md-7" style="text-align: justify">
            <!-- Data -->
            <!-- <pre>{{$data}}</pre> -->
            <Preview :data="$data"/>
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
import Certifications from "./components/Certifications.vue";

export default {
  name: "App",
  components: {
    Preview,
    Profile,
    Experience,
    Education,
    Skills,
    Projects,
    Certifications,
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
      exps: [
        {
          company: "",
          location: "",
          title: "",
          start: "",
          end: "",
          resp: [""],
        },
      ],
      eds: [
        {
          institute: "",
          degree: "",
          major: "",
          locations: "",
          start: "",
          end: "",
        },
      ],
      skills: [{ type: "", name: [""] }],
      projs: [
        {
          title: "",
          desc: "",
          link: "",
          start: "",
          end: "",
          tools: [""],
          resp: [""],
        },
      ],
      certs: [{ institute: "", title: "", link: "", date: "" }],
      nav: [
        "Profile",
        "Experience",
        "Education",
        "Skills",
        "Projects",
        "Certifications",
      ],
      current: "Profile",
    };
  },
  methods: {
    add: function (type) {
      switch (type) {
        case "exp":
          this.exps.push({
            company: "",
            location: "",
            title: "",
            start: "",
            end: "",
            resp: [""],
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
          this.skills.push({ type: "", name: [""] });
          break;
        case "proj":
          this.projs.push({
            title: "",
            desc: "",
            link: "",
            start: "",
            end: "",
            tools: [""],
            resp: [""],
          });
          break;
        case "cert":
          this.certs.push({ institute: "", title: "", link: "", date: "" });
          break;

        default:
          break;
      }
      // console.log(this.$refs);
    },
    create: function () {
    },
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
.nav-item {
  background-color: beige;
}
a:hover {
  background: gray;
  color: antiquewhite;
}
</style>
