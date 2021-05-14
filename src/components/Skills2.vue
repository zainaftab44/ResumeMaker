<template>
  <div class="row">
    <div class="col-md-5" style="text-align: justify">
      <div class="card">
        <div class="card-header border-success bg-transparent" :id="'headingsk2'" >
          <h3>
            Skills
            <button @click="add" class="col-md-1 btn btn-success float-end">+</button>
          </h3>
        </div>
        <div :aria-labelledby="'headingsk2'" data-bs-parent="#skills" >
          <div class="card-body">
            <div class="form-group row">
              <!-- <label for="end" class="col-md-6 col-form-label">Skills</label> -->
              <div class="col-md-3 mt-2 input-group" v-for="(res, i) in skill2.name" :key="i">
                <input
                  type="text"
                  class="form-control"
                  v-model="skill2.name[i]"
                  placeholder="Skill Name"
                />
                <button class="btn btn-outline-danger" type="button" title="Delete skill" @click="$emit('del-joined',i)">X</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <SK2P :skills2="skill2"/>
    </div>

  </div>
</template>

<style scoped>
  @media screen and (min-width:1024px) {
    .input-group{
      min-width: 20%;
      width:50%;
    }
  }
  @media screen and (max-width:1023px) {
    .input-group{
      width:100%;
    }
  }
</style>

<script>
import SK2P from './Previews/Skills2.vue'

export default {
  name: "Skills2",
  methods: {
    add: function () {
      this.skill2.name.push("");
    },
  },
  components:{
    SK2P,
  },
  props: ["skill2"],
};
</script>
