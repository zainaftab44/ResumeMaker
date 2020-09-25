<template>
  <div class="accordion" style="text-align: justify">
    <div class="card">
      <div
        class="card-header border-success bg-transparent"
        :id="'headingski' + this.$vnode.key"
        data-toggle="collapse"
        :data-target="'#collapseski' + this.$vnode.key"
        :aria-expanded="this.$vnode.key > 0 ? false : true"
        :aria-controls="'collapseski' + this.$vnode.key"
      >
        <h3>Skill</h3>
      </div>
      <div
        :id="'collapseski' + this.$vnode.key"
        :class="[{ collapse: true }, { show: this.$vnode.key == 0 }]"
        :aria-labelledby="'headingski' + this.$vnode.key"
      >
        <div class="card-body">
          <div class="form-group">
            <label for="skill" class="col-md-3 col-form-label"
              >Skill Type</label
            >
            <div class="col">
              <input
                type="text"
                class="form-control"
                v-model="skill.type"
                placeholder="Skill Type"
              />
            </div>
          </div>
          <div class="form-group">
            <label for="end" class="col-md-6 col-form-label">Skills</label>
            <button @click="add" class="col-md-1 btn btn-secondary">+</button>
            <div class="col mt-3" v-for="(res, i) in skill.name" :key="i">
              <input
                type="text"
                class="form-control"
                v-model="skill.name[i]"
                placeholder="Skill Name"
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
  name: "Skills",
  methods: {
    add: function () {
      this.skill.name.push("");
    },
  },
  props: ["skill"],
};
</script>
