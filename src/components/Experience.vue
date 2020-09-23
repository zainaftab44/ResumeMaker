<template>
  <div style="text-align:left">
    <h3>Experience {{this.$vnode.key+1}}</h3>
    <hr />
    <div class="form-group">
      <label for="title" class="col-md-3 col-form-label">Title</label>
      <div class="col">
        <input type="text" class="form-control" v-model="exp.title" placeholder="Job Title" />
      </div>
    </div>
    <div class="form-group">
      <label for="company" class="col-md-3 col-form-label">Company</label>
      <div class="col">
        <input type="text" class="form-control" v-model="exp.company" placeholder="Company" />
      </div>
    </div>
    <div class="form-group">
      <label for="location" class="col-md-3 col-form-label">Location</label>
      <div class="col">
        <input type="text" class="form-control" v-model="exp.location" placeholder="Location" />
      </div>
    </div>
    <div class="form-group">
      <label for="start" class="col-md-3 col-form-label">Start</label>
      <div class="col">
        <input type="text" class="form-control" v-model="exp.start" placeholder="Jan 2020" />
      </div>
    </div>
    <div class="form-group">
      <label for="end" class="col-md-3 col-form-label">End</label>
      <div class="col">
        <input type="text" class="form-control" v-model="exp.end" placeholder="Dec 2020" />
      </div>
    </div>
    <div class="form-group">
      <label for="end" class="col-md-6 col-form-label">Responsibilities</label>
      <button @click="add" class="col-md-1 btn btn-secondary">+</button>
      <div class="col mt-3" v-for="(res,i) in exp.resp" :key="i">
        <input type="text" class="form-control"  v-model="exp.resp[i]" placeholder="Responsibility" />
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
