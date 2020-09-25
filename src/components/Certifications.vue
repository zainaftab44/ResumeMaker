<template>
  <div class="accordion" style="text-align: justify">
    <div class="card">
      <div
        class="card-header border-success bg-transparent"
        :id="'headingcer' + this.$vnode.key"
        data-toggle="collapse"
        :data-target="'#collapsecer' + this.$vnode.key"
        :aria-expanded="this.$vnode.key > 0 ? false : true"
        :aria-controls="'collapsecer' + this.$vnode.key"
      >
        <h3>Certification <button class="btn float-right" style="color:red; padding: 0px 8px;" @click="$emit('delete-row')">&ndash;</button></h3>
      </div>
      <div
        :id="'collapsecer' + this.$vnode.key"
        :class="[{ collapse: true }, { show: this.$vnode.key == 0 }]"
        :aria-labelledby="'headingcer' + this.$vnode.key"
      >
        <div class="card-body">
          <div class="form-group">
            <label for="inst" class="col-md-3 col-form-label">Institue</label>
            <div class="col">
              <input
                type="text"
                class="form-control"
                v-model="cert.institute"
                placeholder="Institute"
              />
            </div>
          </div>
          <div class="form-group">
            <label for="deg" class="col-md-3 col-form-label">Title</label>
            <div class="col">
              <input
                type="text"
                class="form-control"
                v-model="cert.title"
                placeholder="Title"
              />
            </div>
          </div>
          <div class="form-group">
            <label for="link" class="col-md-3 col-form-label">Link</label>
            <div class="col">
              <input
                type="url"
                class="form-control"
                v-model="cert.link"
                placeholder="Link"
              />
            </div>
          </div>
          <div class="form-group">
            <label for="date" class="col-md-3 col-form-label">Completion</label>
            <div class="col">
              <input
                type="text"
                class="form-control"
                v-model="cert.date"
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
  name: "Certification",
  props: ["cert"],
};
</script>
