<!-- src/components/inner/AccordionBody.vue -->
<template>
  <div class="accordion-item" :id="'collapse-' + did">
    <div class="accordion-header" :id="'heading-' + did">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" 
              :data-bs-target="'#collapse-' + did" aria-expanded="true" 
              aria-controls="'collapse-' + did">
        <slot name="header"></slot>
      </button>
    </div>
    <div :id="'collapse-' + did" class="accordion-collapse collapse show" 
         aria-labelledby="'heading-' + did" :data-bs-parent="'#' + parent">
      <div class="accordion-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ABody",
  props: ['did', 'title', 'parent']
}
</script>