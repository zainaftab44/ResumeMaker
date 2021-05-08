<template>
  <div id="preview" class="preview" style="width:70%; margin: 0 auto;text-align: justify; border: solid 1px;border-padding: 3px;min-height: 29.7cm;">
    <table style="width: 100%">
      <tbody>
        <tr>
          <td>
            <h1>{{ data.profile.name }}</h1>
          </td>
        </tr>
        <tr>
          <table style="width: 100%">
            <tr style="width: 100%">
              <td style="max-width: 60%; flex-basis: 0px; flex-grow: 1">
                <small v-if="data.profile.address">
                  {{ data.profile.address }}
                  <br />
                </small>
                <small v-if="data.profile.phone">
                  {{ data.profile.phone }}
                  <br />
                </small>
                <small v-if="data.profile.email">
                  {{ data.profile.email }}
                  <br />
                </small>
              </td>
              <td valign="top" style="width: auto;text-align:end">
                <small v-if="data.profile.website">
                  {{ data.profile.website }}
                  <br />
                </small>
                <small v-if="data.profile.github">
                  {{ data.profile.github }}
                  <br />
                </small>
                <small v-if="data.profile.linkedin">
                  {{ data.profile.linkedin }}
                  <br />
                </small>
              </td>
            </tr>
          </table>
        </tr>
        <tr v-if="data.profile.summary">
          <td>
            <h4 style="margin-bottom:5px">SUMMARY</h4>
          </td>
        </tr>
        <tr>
          <td>{{ data.profile.summary }}</td>
        </tr>
      </tbody>
    </table>
    <div class="draggable-element" draggable="true"  style="margin-top:10px">
      <table v-if="data.exps.length">
        <tbody>
          <tr>
            <td>
              <h4 style="margin-bottom:5px">PROFESSIONAL EXPERIENCE</h4>
            </td>
          </tr>
          <tr v-for="(exp, ind) in data.exps" :key="ind">
            <td>
              <small v-if="exp.start.length">{{ exp.start.toUpperCase() }}</small>
              <small v-if="exp.end && exp.start">&ndash;</small>
              <small v-if="exp.end">{{ exp.end.toUpperCase() }}</small>
              <br />

              <strong v-if="exp.title.length">
                {{ exp.title.toUpperCase() }}
                <br />
              </strong>
              <span v-if="exp.company.length">{{ exp.company.toUpperCase() }}</span>
              <span v-if="exp.company.length && exp.location.length">,</span>
              <span v-if="exp.location.length">{{ exp.location.toUpperCase() }}</span>
              <ul style="margin-top:5px;margin-bottom:5px" v-if="exp.resp.join('')">
                <li v-for="(res, i) in exp.resp" :key="i" style="padding-left: 1.4em; text-indent: -1.55em;">{{ res }}</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="draggable-element" draggable="true" style="margin-top:10px">
      <table v-if="data.skills.length">
        <tbody>
          <tr>
            <td>
              <h4 style="margin-bottom:5px">SKILLS</h4>
            </td>
          </tr>
          <tr>
            <td>
              <table>
                <tbody>
                  <tr v-for="(skill, j) in data.skills" :key="j">
                    <td class="pr-2">
                      <strong>{{ skill.type + ": " }}</strong>
                    </td>
                    <td v-if="skill.name.join('').length">{{ skill.name.join(", ") }}</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="draggable-element" draggable="true" style="margin-top:10px">
      <table v-if="data.eds.length">
        <tbody>
          <tr>
            <td>
              <h4 style="margin-bottom:5px">EDUCATION</h4>
            </td>
          </tr>
          <tr v-for="(ed, k) in data.eds" :key="k">
            <td>
              <br />
              <small v-if="ed.start">{{ ed.start.toUpperCase() }}</small>
              <small v-if="ed.end && ed.start">&ndash;</small>
              <small v-if="ed.end">{{ ed.end.toUpperCase() }}</small>
              <br v-if="ed.end || ed.start" />
              <strong v-if="ed.institute">
                {{ ed.institute }}
              </strong>
              <br />
              {{ ed.location }}
              <br v-if="ed.location" />
              <span class="degree" v-if="ed.major || ed.degree">
                <span v-if="ed.degree">{{ ed.degree }}</span>
                <span v-if="ed.degree.length + ed.major.length > 50">
                  <br />
                </span>
                <span v-if="ed.major">({{ ed.major }})</span>
              </span>
              <br />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="draggable-element" draggable="true" style="margin-top:10px">
      <table v-if="data.projs.length">
        <tbody>
          <tr>
            <td>
              <h4 style="margin-bottom:5px">Projects</h4>
            </td>
          </tr>
          <tr v-for="(proj, l) in data.projs" :key="l">
            <td>
              <small v-if="proj.start">{{ proj.start.toUpperCase() }}</small>
              <small v-if="proj.start && proj.end">&ndash;</small>
              <small v-if="proj.end">{{ proj.end.toUpperCase() }}</small>
              <br />
              <strong v-if="proj.title">
                {{ proj.title }}
                <br />
              </strong>
              <span v-if="proj.link">
                <a :href="proj.link" :title="proj.link">{{ proj.link }}</a>
              </span>
              <span v-if="proj.desc">
                <br v-if="proj.link" />
                <span :title="proj.desc">{{ proj.desc }}</span>
              </span>
              <ul style="margin-top:5px;margin-bottom:5px" v-if="proj.resp.join('').length || proj.tools.join('').length">
                <li v-for="(res, m) in proj.resp" :key="m" style="padding-left: 1.4em; text-indent: -1.55em;">{{ res }}</li>
                <li v-if="proj.tools.join('')" style="padding-left: 1.4em; text-indent: -1.55em;">
                  <strong>Technologies:</strong>
                  {{ proj.tools.join(", ") }}
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>




<script>

export default {
  name: "Template",
  props: ["data"],
  methods: {
    // available: function (type) {},
  },
  mounted() {
    (function() {
      var id_ = 'preview';
      var rows_ = document.querySelectorAll('#' + id_ + '> .draggable-element');
      var dragSrcEl_ = null;
      var current = null;

      function handleDragStart(e) {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', e.target.innerHTML);
        e.dataTransfer.dropEffect = "move";
        dragSrcEl_ = e.target;

      }

      function handleDragOver(e) {
        if (typeof e.target.closest == "function")
          current = e.target.closest(".draggable-element");
      }
      function handleDrop(e) {
        if (current.classList[0] == "draggable-element") {
          dragSrcEl_.innerHTML = current.innerHTML;
          current.innerHTML = e.dataTransfer.getData('text/html')
        }
      }

      [].forEach.call(rows_, function(row) {
        row.addEventListener('dragstart', handleDragStart, false);
        row.addEventListener('dragover', handleDragOver, false);
        row.addEventListener('dragend', handleDrop, false);
      });

    })()
  }
};
</script>


<style>
.preview {
  user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -o-user-select: none;
}

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