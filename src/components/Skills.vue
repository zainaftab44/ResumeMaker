<template>
  <div class="accordion">
    <div class="card">
      <AHead :def="'Skill'" :title="skill.type" :did="this.$vnode.key" @del="$emit('delete-row')" />
      <ABody :title="skill.type" :did="this.$vnode.key" :parent="'skills'">
        <Input label="Skill Type" :val="skill.type" @input="skill.type = $event" />
        <div class="form-group">
          <label for="end" class="col-md-6 col-form-label">Skills</label>
          <button @click="add" class="col-md-1 btn btn-secondary">+</button>
          <DInput :title="'Skill'" :items="skill" :sub="'name'" :half="true" />
        </div>
      </ABody>
    </div>
  </div>
</template>

<style scoped>
.btn + .float-end {
  color: red;
  padding: 0px 8px;
}
</style>

<script>
import DInput from './inner/DraggableInput.vue'
import Input from './inner/Input.vue'
import AHead from './inner/AccordionHeader.vue'
import ABody from './inner/AccordionBody.vue'

export default {
  name: "Skills",
  components: { DInput, Input, AHead, ABody },
  methods: {
    add: function() {
      this.skill.name.push("");
    },
  },
  props: ["skill"],
};
</script>
