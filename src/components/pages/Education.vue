<template>
  <div class="accordion" >
    <div class="card">
      <AHead :def="'Education'" :title="title" :did="this.$vnode.key" @del="$emit('delete-row')" @move="passToParent"  />
      <ABody :title="title" :did="this.$vnode.key" :parent="'education'">
        <div class="card-body">
          <Input label="Institute" :val="edu.institute" @input="edu.institute = $event" />
          <Input label="Degree" :val="edu.degree" @input="edu.degree = $event" />
          <Input label="Major" :val="edu.major" @input="edu.major = $event" />
          <Input label="Location" :val="edu.location" @input="edu.location = $event" />
          <Input label="Start Date" :val="edu.start" @input="edu.start = $event" />
          <Input label="End Date" :val="edu.end" @input="edu.end = $event" />
        </div>
      </ABody>
    </div>
  </div>
</template>



<script>
import Input from '../inner/Input.vue'
import AHead from '../inner/AccordionHeader.vue'
import ABody from '../inner/AccordionBody.vue'

export default {
  name: "Education",
  components: { Input, AHead, ABody },
  props: ["edu"],
  methods: {
    passToParent: function(value){
      this.$emit('move-row',this.$vnode.key,value)
    }
  },
  computed: {
    title: function() {
      return this.edu.degree.concat(this.edu.major) == "" ? "" : `${this.edu.degree} (${this.edu.major})`
    }
  }
}
</script>
