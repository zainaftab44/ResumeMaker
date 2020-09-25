<template>
  <div class="preview" style="text-align: justify">
    <table style="width: 100%">
      <tbody>
        <tr>
          <td>
            <h1>{{ data.profile.name }}</h1>
          </td>
        </tr>
        <tr>
          <table style="width: 100%">
            <tr>
              <td style="max-width: 100%; flex-basis: 0px; flex-grow: 1">
                <small v-if="data.profile.address">
                  {{ data.profile.address }}<br />
                </small>
                <small v-if="data.profile.phone">
                  {{ data.profile.phone }}<br />
                </small>
                <small v-if="data.profile.email">
                  {{ data.profile.email }}<br />
                </small>
              </td>
              <td valign="top" style="width: 10px">
                <small v-if="data.profile.website">
                  {{ data.profile.website }}<br />
                </small>
                <small v-if="data.profile.github">
                  {{ data.profile.github }}<br />
                </small>
                <small v-if="data.profile.linkedin">
                  {{ data.profile.linkedin }}<br />
                </small>
              </td>
            </tr>
          </table>
        </tr>
        <tr v-if="data.profile.summary">
          <td>
            <br />
            <h4>SUMMARY</h4>
          </td>
        </tr>
        <tr>
          <td>{{ data.profile.summary }}</td>
        </tr>
        <tr v-if="data.exps.length">
          <td>
            <br />
            <h4>PROFESSIONAL EXPERIENCE</h4>
          </td>
        </tr>
        <tr v-for="(exp, ind) in data.exps" :key="ind">
          <td>
            <small v-if="exp.start.length">{{ exp.start.toUpperCase() }}</small>
            <small v-if="exp.end && exp.start"> &ndash; </small>
            <small v-if="exp.end">{{ exp.end.toUpperCase() }}</small>
            <br />

            <strong v-if="exp.title.length">
              {{ exp.title.toUpperCase() }}
              <br />
            </strong>
            <span v-if="exp.company.length">{{
              exp.company.toUpperCase()
            }}</span>
            <span v-if="exp.company.length && exp.location.length">, </span>
            <span v-if="exp.location.length">
              {{ exp.location.toUpperCase() }}
            </span>
            <ul v-if="exp.resp.join('')">
              <li v-for="(res, i) in exp.resp" :key="i">{{ res }}</li>
            </ul>
          </td>
        </tr>
        <tr v-if="data.skills.length">
          <td>
            <br />
            <h4>SKILLS</h4>
          </td>
        </tr>
        <tr>
          <td>
            <table>
              <tbody>
                <tr v-for="(skill, j) in data.skills" :key="j">
                  <td class="pr-2">
                    <strong>{{ skill.type }}</strong>
                  </td>
                  <td v-if="skill.name.join('').length">
                    {{ skill.name.join(", ") }}
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr v-if="data.eds.length">
          <td>
            <br />
            <h4>EDUCATION</h4>
          </td>
        </tr>
        <tr v-for="(ed, k) in data.eds" :key="k">
          <td>
            <small v-if="ed.start">{{ ed.start.toUpperCase() }}</small>
            <small v-if="ed.end && ed.start"> &ndash; </small>
            <small v-if="ed.end">{{ ed.end.toUpperCase() }}</small>
            <br v-if="ed.end || ed.start" />
            <strong v-if="ed.institute">
              {{ ed.institute }}
              <br />
            </strong>
            {{ ed.location }}
            <br v-if="ed.location" />
            <span v-if="ed.degree">{{ ed.degree }}</span>
            <span v-if="ed.degree && ed.major">, </span>
            <span v-if="ed.major">{{ ed.major }}</span>
            <br v-if="ed.major || ed.degree" />
          </td>
        </tr>
      </tbody>
    </table>
    <table v-if="data.projs.length">
      <tbody>
        <tr>
          <td>
            <br />
            <h4>Projects</h4>
          </td>
        </tr>
        <tr v-for="(proj, l) in data.projs" :key="l">
          <td>
            <small v-if="proj.start">{{ proj.start.toUpperCase() }}</small>
            <small v-if="proj.start || proj.end"> &ndash; </small>
            <small v-if="proj.end">{{ proj.end.toUpperCase() }}</small>
            <br />
            <strong v-if="proj.title">
              {{ proj.title.toUpperCase() }}
              <br />
            </strong>
            <span v-if="proj.link">
              Live:
              <a :href="proj.link" :title="proj.link">{{ proj.link }}</a>
            </span>
            <ul v-if="proj.resp.join('').length || proj.tools.join('').length">
              <li v-for="(res, m) in proj.resp" :key="m">{{ res }}</li>
              <li v-if="proj.tools.join('')">
                <strong>Technologies:</strong>
                {{ proj.tools.join(", ") }}
              </li>
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
  methods: {
    // available: function (type) {},
  },
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