<template>
  <div class="row">
    <div class="col-md-5" style="text-align: justify">
      <div class="card">
        <div class="card-header border-success bg-transparent" :id="'headingsk2'">
          <h3>
            Skills
            <button @click="add" class="col-md-1 btn btn-success float-end">+</button>
          </h3>
        </div>
        <div :aria-labelledby="'headingsk2'" data-bs-parent="#skills">
          <div class="card-body">
            <div class="form-group row">
              <!-- <label for="end" class="col-md-6 col-form-label">Skills</label> -->
              <div class="col-md-3 mt-2 input-group" @dragover="over(i)" v-for="(res, i) in skill2.name" :key="i">
                <span draggable="true" class="btn btn-primary" @dragstart="dragstart(i)" @dragend="dragend()" >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-arrows-move"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708l2-2zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10zM.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708l-2-2zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8z"
                    />
                  </svg>
                </span>
                <input type="text" class="form-control" v-model="skill2.name[i]" placeholder="Skill Name" />
                <button class="btn btn-outline-danger" type="button" :title="'Delete skill ' + i" @click="del(i)" >X</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <SK2P :skills2="skill2" />
    </div>
  </div>
</template>

<style scoped>
@media screen and (min-width: 1024px) {
  .input-group {
    min-width: 20%;
    width: 50%;
  }
}
@media screen and (max-width: 1023px) {
  .input-group {
    width: 100%;
  }
}
</style>

<script>
import Vue from 'vue'

import SK2P from './Previews/Skills2.vue'

export default {
  name: "Skills2",
  data() {
    return {
      sElem: -1,
      eElem: -1,
    };
  },
  methods: {
    add: function() {
      this.skill2.name.push("");
    },
    del: function(i) {
      this.skill2.name.splice(i, 1)
    },
    dragstart: function(i) {
      this.sElem = i;
    },
    over: function(i) {
      this.eElem = i;
      // console.log(this.sElem, this.eElem)
      // console.log(this.skill2.name)
    },
    dragend: function() {
      if (this.sElem !== -1 && this.eElem !== -1) {
        let sName = this.skill2.name[this.sElem]
        Vue.set(this.skill2.name, this.sElem, this.skill2.name[this.eElem])
        Vue.set(this.skill2.name, this.eElem, sName)
      }
      console.log("end")
      this.sElem = -1;
      this.eElem = -1;
    },
  },
  components: {
    SK2P,
  },
  props: ["skill2"],
};
</script>
