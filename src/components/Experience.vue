<template>
  <div class="accordion-item" style="text-align: justify">
    <div class="card">
      <div
        class="card-header border-success bg-transparent" :id="'heading' + this.$vnode.key"
        data-bs-toggle="collapse" :data-bs-target="'#collapse' + this.$vnode.key" 
        :aria-expanded="this.$vnode.key > 0 ? true : false"
         :aria-controls="'collapse' + this.$vnode.key">
        <h3>
          {{exp.title?exp.title+(exp.company?", "+exp.company:""):"Experience"}}
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
        :id="'collapse' + this.$vnode.key"
        :class="[{ collapse: true }, { show: this.$vnode.key == 0 }]"
        :aria-labelledby="'heading' + this.$vnode.key"
        data-bs-parent="#experiences"
      >
        <div class="card-body">
          <div class="form-group">
            <label for="title" class="col-md-3 col-form-label">Title</label>
            <div class="col">
              <input
                type="text"
                class="form-control"
                v-model="exp.title"
                placeholder="Job Title"
              />
            </div>
          </div>
          <div class="form-group">
            <label for="company" class="col-md-3 col-form-label">Company</label>
            <div class="col">
              <input
                type="text"
                class="form-control"
                v-model="exp.company"
                placeholder="Company"
              />
            </div>
          </div>
          <div class="form-group">
            <label for="location" class="col-md-3 col-form-label"
              >Location</label
            >
            <div class="col">
              <input
                type="text"
                class="form-control"
                v-model="exp.location"
                placeholder="Location"
              />
            </div>
          </div>
          <div class="form-group">
            <label for="start" class="col-md-3 col-form-label">Start</label>
            <div class="col">
              <input
                type="text"
                class="form-control"
                v-model="exp.start"
                placeholder="Jan 2020"
              />
            </div>
          </div>
          <div class="form-group">
            <label for="end" class="col-md-3 col-form-label">End</label>
            <div class="col">
              <input
                type="text"
                class="form-control"
                v-model="exp.end"
                placeholder="Dec 2020"
              />
            </div>
          </div>
          <div class="form-group">
            <label for="end" class="col-md-6 col-form-label">Responsibilities</label>
            <button @click="add" class="col-md-1 btn btn-secondary">+</button>
            <div class="col mt-3 input-group" @dragover="over(i)" v-for="(res, i) in exp.resp" :key="i">
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
              <input
                type="text"
                class="form-control"
                v-model="exp.resp[i]"
                placeholder="Responsibility"
              />
              <button
                class="btn btn-outline-danger"
                type="button"
                title="Delete Responsibility"
                @click="$emit('del-resp', i)"
              >
                &ndash;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import Vue from 'vue'
export default {
  name: "Experience",
  data() {
    return {
      sElem: -1,
      eElem: -1,
    };
  },
  methods: {
    add: function () {
      this.exp.resp.push("");
    },
    del: function(i) {
      this.exp.resp.splice(i, 1)
    },
    dragstart: function(i) {
      this.sElem = i;
    },
    over: function(i) {
      this.eElem = i;
      // console.log(this.sElem, this.eElem)
      // console.log(this.exp.resp)
    },
    dragend: function() {
      if (this.sElem !== -1 && this.eElem !== -1) {
        let sName = this.exp.resp[this.sElem]
        Vue.set(this.exp.resp, this.sElem, this.exp.resp[this.eElem])
        Vue.set(this.exp.resp, this.eElem, sName)
      }
      console.log("end")
      this.sElem = -1;
      this.eElem = -1;
    },

  },
  props: ["exp"],
};
</script>

<style>
h3 {
  padding: 7px 0px 0px 0px;
  width: 100%;
  font-size: initial;
}
</style>