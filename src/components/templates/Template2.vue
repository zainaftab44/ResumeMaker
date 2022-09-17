<template>
  <div id="preview" class="preview preview-box">
    <PProf :profile="data.profile" />
    <div class="draggable-element" draggable="true" style="margin-top:10px">
      <PSKILL1 v-if="data.styles.skills == 1 && data.skills.length" :skills="data.skills" />
      <PSKILL2 v-else-if="data.styles.skills == 2" :skills2="data.skills2" />
    </div>
    <div class="draggable-element" draggable="true" style="margin-top:10px">
      <PEXP v-if="data.exps.length" :exps="data.exps" />
    </div>

    <div class="draggable-element" draggable="true" style="margin-top:10px">
      <PEDU v-if="data.eds.length" :eds="data.eds" />
    </div>
    <div class="draggable-element" draggable="true" style="margin-top:10px">
      <PProj v-if="data.projs.length" :projs="data.projs" />
    </div>
  </div>
</template>
  
  
  
  
<script>
import PProf from "../previews/profile/Second.vue"
import PEXP from "../previews/Experience.vue"
import PEDU from "../previews/Education.vue"
import PSKILL1 from "../previews/Skills.vue"
import PSKILL2 from "../previews/Skills2.vue"
import PProj from "../previews/Project.vue"


export default {
  name: "Template2",
  props: ["data"],
  components: {
    PProf,
    PEXP,
    PEDU,
    PSKILL1,
    PSKILL2,
    PProj
  },
  methods: {
    // available: function (type) {},
  },
  mounted() {

    (function () {
      var id_ = 'preview'
      var rows_ = document.querySelectorAll('#' + id_ + ' .draggable-element')
      var dragSrcEl_ = null
      var current = null

      function handleDragStart(e) {
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text/html', e.target.innerHTML)
        e.dataTransfer.dropEffect = "move"
        dragSrcEl_ = e.target

      }

      function handleDragOver(e) {
        if (typeof e.target.closest == "function")
          current = e.target.closest(".draggable-element")
      }
      function handleDrop(e) {
        if (current.classList[0] == "draggable-element") {
          if (navigator.userAgent.toLowerCase().includes("firefox")) {
            dragSrcEl_.innerHTML = current.innerHTML
            current.innerHTML = e.dataTransfer.getData('text/html')
          } else {
            let inner = current.innerHTML
            current.innerHTML = e.target.innerHTML
            dragSrcEl_.innerHTML = inner
          }
        }
      }

      [].forEach.call(rows_, function (row) {
        row.addEventListener('dragstart', handleDragStart, false)
        row.addEventListener('dragover', handleDragOver, false)
        row.addEventListener('dragend', handleDrop, false)
      })

    })()
  }
}
</script>
  
  
<style>
ul {
  margin: 0 !important;
}

.preview {
  user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -o-user-select: none;
}

.preview>* {
  text-align: justify !important;
  line-height: 1.2 !important;
}

.preview>small {
  text-decoration: none !important;
  color: #808080 !important;
}

.preview>.sub-color {
  color: #808080 !important;
}

.preview>h4 {
  margin-top: 1.5em !important;
  margin-bottom: 0.5em !important;
}

.preview>body {
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