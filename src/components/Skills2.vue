<template>
  <div class="row">
    <div class="col-md-5 accordion" style="text-align: justify">
      <div class="card">
        <div
          class="card-header border-success bg-transparent"
          :id="'headingsk2'"
        >
          <h3>
            Skills
            <button @click="add" class="col-md-1 btn btn-secondary float-end">+</button>
          </h3>
        </div>
        <div
          :id="'collapsesk2'"
          :class="[{ collapse: true }, { show: true }]"
          :aria-labelledby="'headingsk2'"
          data-bs-parent="#skills"
        >
          <div class="card-body">
            <div class="form-group">
              <!-- <label for="end" class="col-md-6 col-form-label">Skills</label> -->
              <div class="col mt-3 input-group" v-for="(res, i) in skill2.name" :key="i">
                <input
                  type="text"
                  class="form-control"
                  v-model="skill2.name[i]"
                  placeholder="Skill Name"
                />
                <div class="input-group-append">
                  <button class="btn btn-outline-danger" type="button" id="button-addon2" title="Delete skill" @click="$emit('del-joined',i)">&ndash;</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-5">
      <div class="modal-header">
        <h5 class="modal-title">Print Instructions</h5>
      </div>
      <div class="modal-body">
        <p>While printing with this skills type please check the print backgrounds checkbox in print modal</p>
        <img src="../assets/printbackground.png" alt />
      </div>
    </div>

  </div>
</template>



<script>
export default {
  name: "Skills2",
  methods: {
    add: function () {
      this.skill2.name.push("");
    },
  },
  props: ["skill2"],
};
</script>
