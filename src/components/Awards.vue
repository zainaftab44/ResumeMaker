<template>
  <div class="accordion" style="text-align: justify">
    <div class="card">
      <AHead :def="'Award'" :title="title" :did="this.$vnode.key" @del="$emit('delete-row')" />
      <ABody :title="title" :did="this.$vnode.key" :parent="'awards'">
        <div class="card-body">
          <Input label="Title" :val="awd.title" @input="awd.title = $event" />
          <Input label="Date" :val="awd.date" @input="awd.date = $event" />
          <Input label="Organization" :val="awd.organization" @input="awd.organization = $event" />
        </div>
      </ABody>
    </div>
  </div>
</template>



<script>
import Input from './inner/Input.vue'
import AHead from './inner/AccordionHeader.vue'
import ABody from './inner/AccordionBody.vue'

export default {
  name: "Awards",
  components: { Input, AHead, ABody },
  props: ["awd"],
  computed: {
    title: function() {
      return this.awd.title
    }
  }
};
</script>

<script>
export default {
};
</script>
