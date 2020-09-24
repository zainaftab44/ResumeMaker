<template>
  <div class="preview" style="text-align:justify ">
    <table style="width:100%">
      <tbody>
        <tr>
          <td>
            <h1>{{data.profile.name}}</h1>
          </td>
        </tr>
        <tr>
          <table>
            <tr>
              <td
                style="max-width:100%;-ms-flex-preferred-size: 0;flex-basis: 0;-ms-flex-positive: 1;flex-grow: 1;"
              >
                <small>{{data.profile.address}}</small>
                <br />
                <small>{{data.profile.phone}}</small>
                <br />
                <small>{{data.profile.email}}</small>
              </td>
              <td valign="top">
                <small v-if="data.profile.website">{{data.profile.website}}</small>
                <br v-if="data.profile.website" />
                <small v-if="data.profile.github">{{data.profile.github}}</small>
                <br v-if="data.profile.github" />
                <small v-if="data.profile.linkedin">{{data.profile.linkedin}}</small>
              </td>
            </tr>
          </table>
        </tr>
        <tr>
          <td>
            <h4>SUMMARY</h4>
          </td>
        </tr>
        <tr>
          <td>{{data.profile.summary}}</td>
        </tr>
        <tr>
          <td>
            <h4>PROFESSIONAL EXPERIENCE</h4>
          </td>
        </tr>
        <tr v-for="(exp,ind) in data.exps" :key="ind">
          <td>
            <small>{{exp.start.toUpperCase()}} &ndash; {{exp.end.toUpperCase()}}</small>
            <br />
            <strong>{{exp.title.toUpperCase()}}</strong>
            <br />
            {{exp.company.toUpperCase()}}, {{exp.location.toUpperCase()}}
            <ul v-if="exp.resp.length">
              <li v-for="(res,i) in exp.resp" :key="i">{{res}}</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>
            <h4>SKILLS</h4>
          </td>
        </tr>
        <tr>
          <td>
            <table>
              <tbody>
                <tr v-for="(skill,i) in data.skills" :key="i">
                  <td class="pr-2">
                    <strong>{{skill.type}}</strong>
                  </td>
                  <td>{{skill.name.join(", ")}}</td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td>
            <h4>EDUCATION</h4>
          </td>
        </tr>
        <tr v-for="(ed,i) in data.eds" :key="i">
          <td>
            <small>{{ed.start.toUpperCase()}} - {{ed.end.toUpperCase()}}</small>
            <br />
            <strong>{{ed.institute}}</strong>
            <br />
            {{ed.location}}
            <br />
            {{ed.degree}}, {{ed.major}}
          </td>
        </tr>
      </tbody>
    </table>
    <table>
      <tbody>
        <tr>
          <td>
            <h4>Projects</h4>
          </td>
        </tr>
        <tr v-for="(proj,i) in data.projs" :key="i">
          <td>
            <small>{{proj.start.toUpperCase()}} &ndash; {{proj.end.toUpperCase()}}</small>
            <br />
            <strong>{{proj.title.toUpperCase()}}</strong>
            <br />
            <span v-if="proj.link">
              Live:
              <a :href="proj.link">{{proj.link}}</a>
            </span>
            <ul>
              <li v-for="(res,i) in proj.resp" :key="i">{{res}}</li>
              <li v-if="proj.tools[0].length" ><strong>Technologies:</strong> {{proj.tools.join(", ")}}</li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <table>
      <tbody>
        <tr>
          <td>
            <h4>PUBLICATION</h4>
          </td>
        </tr>
        <tr>
          <td>
            <small>JULY 2020</small>
            <br />
            <strong>
              Automatic NoSQL to Relational Database Transformation with Dynamic
              Schema Mapping
            </strong>
            <br />Hindawi
            <br />Link:
            <a
              href="https://www.hindawi.com/journals/sp/2020/8813350/"
            >https://www.hindawi.com/journals/sp/2020/8813350/</a>
            <ul>
              <li>
                Proposed and evaluated an efficient method to transform a NoSQL
                database into a relational database with automated schema detection.
              </li>
              <li>
                Researched other state of the art tools and found the pros and cons
                of using them for ETL of NoSQL to SQL.
              </li>
              <li>
                Used data distribution and logical partitioning of data for
                parallelizing the system for improved performance.
              </li>
              <li>Tested the system in a cloud environment and produced results.</li>
              <li>Created tool for generating datasets for performing benchmarking</li>
              <li>
                <span>Benchmarked results with state-of-the-art tools.</span>
              </li>
              <li>Technologies: Node.js, ExpressJS, MongoDB, MySQL, PostgreSQL</li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>-->
  </div>
</template>




<script>
export default {
  name: "Preview",
  props: ["data"],
};
</script>


<style>
.preview > * {
  text-align: justify !important;
  line-height: 1.2 !important;
}
.preview > small {
  text-decoration: none !important;
  color: #808080 !important;
}
.preview > .sub-color {
  color: #808080 !important;
}
.preview > h4 {
  margin-top: 1.5em !important;
  margin-bottom: 0.5em !important;
}
.preview > body {
  size: 7in 9.25in !important;
  margin: 27mm 16mm 27mm 16mm !important;
}

li:before {
  content: "\2014\a0\a0";
}
li {
  list-style: none !important;
}
.pr-2 {
  padding-right: 5dp !important;
}
</style>