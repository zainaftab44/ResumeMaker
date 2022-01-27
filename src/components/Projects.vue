<template>
  <div class="accordion" style="text-align: justify">
    <div class="card">
      <AHead :def="'Project'" :title="title" :did="this.$vnode.key" @del="$emit('delete-row')"  @move="passToParent" />
      <ABody :title="title" :did="this.$vnode.key" :parent="'projects'">
        <div class="card-body">
          <Input label="Project Title" :val="proj.title" @input="proj.title = $event" />
          <TArea label="Description" :val="proj.desc" @input="proj.desc = $event" />
          <Input label="Link" :val="proj.link" @input="proj.link = $event" />
          <Input label="Start Date" :val="proj.start" @input="proj.start = $event" />
          <Input label="End Date" :val="proj.end" @input="proj.end = $event" />
          <div class="form-group my-2">
            <label for="end" class="col-md-6 col-form-label">Tools &amp; Technologies</label>
            <button @click="add('tool')" class="col-md-1 btn btn-secondary">+</button>
          </div>
          <DInput :title="'Tools'" :items="proj" :sub="'tools'" :half="true" />
          <div class="form-group my-2">
            <label for="end" class="col-md-6 col-form-label">Responsibilities</label>
            <button @click="add('resp')" class="col-md-1 btn btn-secondary">+</button>
          </div>
          <DInput :title="'Responsibility'" :items="proj" :sub="'resp'" />
        </div>
      </ABody>
    </div>
  </div>
</template>

<script>
import TArea from './inner/TextArea.vue'
import DInput from './inner/DraggableInput.vue'
import Input from './inner/Input.vue'
import AHead from './inner/AccordionHeader.vue'
import ABody from './inner/AccordionBody.vue'

export default {
  name: "Projects",
  components: { DInput, Input, AHead, ABody, TArea },
  props: ["proj"],
  methods: {
    add: function(type) {
      switch (type) {
        case "resp":
          this.proj.resp.push("");
          break;
        case "tool":
          this.proj.tools.push("");
          break;

        default:
          break;
      }
    },
    passToParent: function(value){
      this.$emit('move-row',this.$vnode.key,value)
    },
  },
  computed: {
    title: function() {
      return this.proj.title ? this.proj.title : ""
    }
  }
};
</script>
