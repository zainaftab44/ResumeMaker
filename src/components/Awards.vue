<template>
  <div style="text-align:left">
    <h3>Honors &amp; Awards {{this.$vnode.key+1}}</h3>
    <hr />
    <div class="form-group">
      <label for="inst" class="col-md-3 col-form-label">Title</label>
      <div class="col">
        <input type="text" class="form-control" v-model="awd.title" placeholder="Title" />
      </div>
    </div>
    <div class="form-group">
      <label for="deg" class="col-md-3 col-form-label">Awarded By</label>
      <div class="col">
        <input type="text" class="form-control" v-model="awd.degree" placeholder="Awarder" />
      </div>
    </div>
    <div class="form-group">
      <label for="date" class="col-md-3 col-form-label">Date</label>
      <div class="col">
        <input type="text" class="form-control" v-model="awd.date" placeholder="Jan 2020" />
      </div>
    </div>
    <div class="form-group">
      <label for="end" class="col-md-3 col-form-label">Summary</label>
      <div class="col">
        <input type="text" class="form-control" v-model="awd.summary" placeholder="Summary" />
      </div>
    </div>
  </div>
</template>



<script>
export default {
  name: "Awards",
  props: ["awd"],
};
</script>
