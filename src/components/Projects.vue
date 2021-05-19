<template>
  <div class="accordion" style="text-align: justify">
    <div class="card">
      <div
        class="card-header border-success bg-transparent"
        :id="'headingproj' + this.$vnode.key"
        data-bs-toggle="collapse"
        :data-bs-target="'#collapseproj' + this.$vnode.key"
        :aria-expanded="this.$vnode.key > 0 ? false : true"
        :aria-controls="'collapseproj' + this.$vnode.key"
      >
        <h3>
          {{proj.title?"Project: "+proj.title:"Project"}}
          <button
            class="btn float-end"
            style="color: red; padding: 0px 8px"
            @click="$emit('delete-row')"
          >
            &ndash;
          </button>
        </h3>
      </div>
      <div
        :id="'collapseproj' + this.$vnode.key"
        :class="[{ collapse: true }, { show: this.$vnode.key == 0 }]"
        :aria-labelledby="'headingproj' + this.$vnode.key"
        data-bs-parent="#projects"
      >
        <div class="card-body">
          <div class="form-group">
            <label for="title" class="col-md-3 col-form-label">Title</label>
            <div class="col">
              <input
                type="text"
                class="form-control"
                v-model="proj.title"
                placeholder="Project Title"
              />
            </div>
          </div>
          <div class="form-group">
            <label for="desc" class="col-md-3 col-form-label"> Description </label>
            <div class="col">
              <input
                type="text"
                class="form-control"
                v-model="proj.desc"
                placeholder="Description"
              />
            </div>
          </div>
          <div class="form-group">
            <label for="link" class="col-md-3 col-form-label">Link</label>
            <div class="col">
              <input
                type="url"
                class="form-control"
                v-model="proj.link"
                placeholder="Link"
              />
            </div>
          </div>
          <div class="form-group">
            <label for="start" class="col-md-3 col-form-label">Start</label>
            <div class="col">
              <input
                type="text"
                class="form-control"
                v-model="proj.start"
                placeholder="Jan 2020"
              />
            </div>
          </div>
          <div class="form-group">
            <label for="end" class="col-md-3 col-form-label">End</label>
            <div class="col">
              <input type="text" class="form-control" v-model="proj.end" placeholder="Dec 2020"/>
            </div>
          </div>
          <div class="form-group mb-2 mt-2">
            <label for="end" class="col-md-6 col-form-label"> Tools &amp; Technologies </label>
            <button @click="add('tool')" class="col-md-1 btn btn-secondary">+</button>
          </div>
          <div class="form-group row">
            <div class="col-lg-6 col-md-6 col-sm-12 mt-2 input-group tools" @dragover="over(i,'tool')" v-for="(res, i) in proj.tools" :key="i">
              <span draggable="true" class="btn btn-primary" @dragstart="dragstart(i,'tool')" @dragend="dragend('tool')" >
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
              <input type="text" class="form-control" v-model="proj.tools[i]" placeholder="Tool" />
              <button class="btn btn-outline-danger" type="button" id="button-addon2" title="Delete tool" @click="del(i,'tool')" >&ndash;</button>
            </div>
          </div>
          <div class="form-group mb-2 mt-2">
            <label for="end" class="col-md-6 col-form-label"> Responsibilities </label>
            <button @click="add('resp')" class="col-md-1 btn btn-secondary"> + </button>
          </div>
          <div class="form-group">
            <div class="col mt-3 input-group" @dragover="over(i,'resp')"  v-for="(res, i) in proj.resp" :key="i">
              <span draggable="true" class="btn btn-primary" @dragstart="dragstart(i,'resp')" @dragend="dragend('resp')" >
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
              <input type="text" class="form-control" v-model="proj.resp[i]" placeholder="Responsibility" />
              <button class="btn btn-outline-danger" type="button" id="button-addon2" title="Delete Responsibility" @click="del(i,'resp')">&ndash;</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media screen and (min-width: 1200px) {
  .tools {
    min-width: 20% !important;
    width: 50% !important;
  }
}

</style>

<script>
import Vue from 'vue'
export default {
  name: "Projects",
  data() {
    return {
      sElem: -1,
      eElem: -1,
      type:''
    };
  },
  methods: {
    add: function (type) {
      switch (type) {
        case "resp":
          this.proj.resp.push("");
          break;
        case "tool":
          this.proj.tools.push("");
          break;

        default:
          break;
      }
    },
    del: function(i,type) {
      switch (type) {
        case "resp":
          this.proj.resp.splice(i, 1)
          break;
        case "tool":
          this.proj.tools.splice(i, 1)
          break;

        default:
          break;
      }
    },
    dragstart: function(i,type) {
      this.type=type
      this.sElem = i;
    },
    over: function(i,type) {
      if(type===this.type){
        this.eElem = i;
      }
      // console.log(this.sElem, this.eElem)
      // console.log(this.proj.resp)
    },
    dragend: function(type) {
      if (this.sElem !== -1 && this.eElem !== -1){
        if(this.type == type && this.type === "resp") {
          let sName = this.proj.resp[this.sElem]
          Vue.set(this.proj.resp, this.sElem, this.proj.resp[this.eElem])
          Vue.set(this.proj.resp, this.eElem, sName)
        }
        else if(this.type == type && this.type === "tool") {
          let sName = this.proj.tools[this.sElem]
          Vue.set(this.proj.tools, this.sElem, this.proj.tools[this.eElem])
          Vue.set(this.proj.tools, this.eElem, sName)
        }
      }
      this.sElem = -1;
      this.eElem = -1;
      this.type ="";
    },
  },
  props: ["proj"],
};
</script>
