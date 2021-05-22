<template>
  <div class="row">
    <div class="col-md-5" style="text-align: justify">
      <div class="card">
        <div class="card-header border-success bg-transparent" :id="'headingsk2'">
          <h3>
            Skills
            <button @click="add" class="col-md-1 btn btn-success float-end">+</button>
          </h3>
        </div>
        <div aria-labelledby="Skills" data-bs-parent="#skills">
          <div class="card-body">
            <DInput :title="'Skill'" :items="skill2" :sub="'name'" :half="true" />
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <SK2P :skills2="skill2" />
    </div>
  </div>
</template>


<script>
import DInput from './inner/DraggableInput.vue'
import SK2P from './Previews/Skills2.vue'

export default {
  name: "Skills2",
  methods: {
    add: function() {
      this.skill2.name.push("");
    },
  },
  components: {
    SK2P,
    DInput
  },
  props: ["skill2"],
};
</script>
