<template>
  <div style="text-align:left">
    <h3>Skill {{this.$vnode.key+1}}</h3>
    <hr />
    <div class="form-group">
      <label for="skill" class="col-md-3 col-form-label">Skill Type</label>
      <div class="col">
        <input type="text" class="form-control" v-model="skill.type" placeholder="Skill Type" />
      </div>
    </div>
    <div class="form-group">
      <label for="end" class="col-md-6 col-form-label">Skills</label>
      <button @click="add" class="col-md-1 btn btn-secondary">+</button>
      <div class="col mt-3" v-for="(res,i) in skill.name" :key="i">
        <input type="text" class="form-control"  v-model="skill.name[i]" placeholder="Skill Name" />
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
