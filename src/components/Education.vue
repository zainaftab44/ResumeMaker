<template>
  <div class="accordion" style="text-align: justify">
    <div class="card">
      <AHead :def="'Education'" :title="title" :did="this.$vnode.key" @del="$emit('delete-row')" />
      <ABody :title="title" :did="this.$vnode.key" :parent="'educations'">
        <div class="card-body">
          <Input label="Institute" :val="edu.institute" @input="edu.institute = $event" />
          <Input label="Degree" :val="edu.degree" @input="edu.degree = $event" />
          <Input label="Major" :val="edu.major" @input="edu.major = $event" />
          <Input label="Location" :val="edu.location" @input="edu.location = $event" />
          <Input label="Start Date" :val="edu.start" @input="edu.start = $event" />
          <Input label="Completion Date" :val="edu.end" @input="edu.end = $event" />
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
  name: "Education",
  components: { Input, AHead, ABody },
  props: ["edu"],
  computed: {
    title: function() {
      return this.edu.degree.concat(this.edu.major) == "" ? "" : `${this.edu.degree} (${this.edu.major})`
    }
  }
};
</script>
