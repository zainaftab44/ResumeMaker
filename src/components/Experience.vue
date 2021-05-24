<template>
  <div class="accordion-item" style="text-align: justify">
    <div class="card">
      <AHead :def="'Experience'" :title="title" :did="this.$vnode.key" @del="$emit('delete-row')" />
      <ABody :title="title" :did="this.$vnode.key" :parent="'experiences'">
        <div class="card-body">
          <Input label="Job Title" :val="exp.title" @input="exp.title = $event" />
          <Input label="Company" :val="exp.company" @input="exp.company = $event" />
          <Input label="Location" :val="exp.location" @input="exp.location = $event" />
          <Input label="Start Date" :val="exp.start" @input="exp.start = $event" />
          <Input label="End Date" :val="exp.end" @input="exp.end = $event" />
          <div class="form-group">
            <label for="end" class="col-md-6 col-form-label">Responsibilities</label>
            <button @click="add" class="col-md-1 btn btn-secondary">+</button>
            <DInput :title="'Experience'" :items="exp" :sub="'resp'" />
          </div>
        </div>
      </ABody>
    </div>
  </div>
</template>



<script>

import DInput from './inner/DraggableInput.vue'
import Input from './inner/Input.vue'
import AHead from './inner/AccordionHeader.vue'
import ABody from './inner/AccordionBody.vue'

export default {
  name: "Experience",
  components: { DInput, Input, AHead, ABody },
  props: ["exp"],
  methods: {
    add: function() {
      this.exp.resp.push("");
    }
  },
  computed: {
    title: function() {
      return `${this.exp.title}${this.exp.title && this.exp.company?', ':''}${this.exp.company}`
    }
  },
};
</script>

<style>
h3 {
  padding: 7px 0px 0px 0px;
  width: 100%;
  font-size: initial;
}
</style>