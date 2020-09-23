<template>
  <div style="text-align:left">
    <h3>Certification {{this.$vnode.key+1}}</h3>
    <hr />
    <div class="form-group">
      <label for="inst" class="col-md-3 col-form-label">Institue</label>
      <div class="col">
        <input type="text" class="form-control" v-model="cert.institute" placeholder="Institute" />
      </div>
    </div>
    <div class="form-group">
      <label for="deg" class="col-md-3 col-form-label">Title</label>
      <div class="col">
        <input type="text" class="form-control" v-model="cert.title" placeholder="Title" />
      </div>
    </div>
    <div class="form-group">
      <label for="link" class="col-md-3 col-form-label">Link</label>
      <div class="col">
        <input type="url" class="form-control" v-model="cert.link" placeholder="Link" />
      </div>
    </div>
    <div class="form-group">
      <label for="date" class="col-md-3 col-form-label">Completion</label>
      <div class="col">
        <input type="text" class="form-control" v-model="cert.date" placeholder="Dec 2020" />
      </div>
    </div>
  </div>
</template>



<script>
export default {
  name: "Certification",
  props: ["cert"],
};
</script>
