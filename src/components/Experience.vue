<template>
  <div class="accordion" style="text-align: justify">
    <div class="card">
      <div
        class="card-header border-success bg-transparent"
        :id="'heading' + this.$vnode.key"
        data-toggle="collapse"
        :data-target="'#collapse' + this.$vnode.key"
        :aria-expanded="this.$vnode.key > 0 ? false : true"
        :aria-controls="'collapse' + this.$vnode.key"
      >
        <h3>Experience</h3>
      </div>
      <div
        :id="'collapse' + this.$vnode.key"
        :class="[{ collapse: true }, { show: this.$vnode.key == 0 }]"
        :aria-labelledby="'heading' + this.$vnode.key"
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
            <label for="end" class="col-md-6 col-form-label"
              >Responsibilities</label
            >
            <button @click="add" class="col-md-1 btn btn-secondary">+</button>
            <div class="col mt-3" v-for="(res, i) in exp.resp" :key="i">
              <input
                type="text"
                class="form-control"
                v-model="exp.resp[i]"
                placeholder="Responsibility"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  name: "Experience",
  methods: {
    add: function () {
      this.exp.resp.push("");
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