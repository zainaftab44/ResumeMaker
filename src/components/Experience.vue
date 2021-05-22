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
            <!-- <div class="col mt-3 input-group" @dragover="over(i)" v-for="(res, i) in exp.resp" :key="i">
              <span draggable="true" class="btn btn-primary" @dragstart="dragstart(i)" @dragend="dragend()" >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-arrows-move"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708l2-2zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10zM.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708l-2-2zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8z"
                    />
                  </svg>
              </span>
              <input
                type="text"
                class="form-control"
                v-model="exp.resp[i]"
                placeholder="Responsibility"
              />
              <button
                class="btn btn-outline-danger"
                type="button"
                title="Delete Responsibility"
                @click="$emit('del-resp', i)"
              >
                &ndash;
              </button>
            </div>-->
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
      return this.exp.title ? this.exp.title + (this.exp.company ? ", " + this.exp.company : "") : ""
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