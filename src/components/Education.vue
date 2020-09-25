<template>
  <div class="accordion" style="text-align: justify">
    <div class="card">
      <div
        class="card-header border-success bg-transparent"
        :id="'headinged' + this.$vnode.key"
        data-toggle="collapse"
        :data-target="'#collapseed' + this.$vnode.key"
        :aria-expanded="this.$vnode.key > 0 ? false : true"
        :aria-controls="'collapseed' + this.$vnode.key"
      >
        <h3>Education</h3>
      </div>
      <div
        :id="'collapseed' + this.$vnode.key"
        :class="[{ collapse: true }, { show: this.$vnode.key == 0 }]"
        :aria-labelledby="'headinged' + this.$vnode.key"
      >
        <div class="card-body">
          <div class="form-group">
            <label for="inst" class="col-md-3 col-form-label">Institue</label>
            <div class="col">
              <input
                type="text"
                class="form-control"
                v-model="edu.institute"
                placeholder="Institute"
              />
            </div>
          </div>
          <div class="form-group">
            <label for="deg" class="col-md-3 col-form-label">Degree</label>
            <div class="col">
              <input
                type="text"
                class="form-control"
                v-model="edu.degree"
                placeholder="Degree"
              />
            </div>
          </div>
          <div class="form-group">
            <label for="maj" class="col-md-3 col-form-label">Major</label>
            <div class="col">
              <input
                type="text"
                class="form-control"
                v-model="edu.major"
                placeholder="Major"
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
                v-model="edu.location"
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
                v-model="edu.start"
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
                v-model="edu.end"
                placeholder="Dec 2020"
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
  name: "Education",
  props: ["edu"],
};
</script>
