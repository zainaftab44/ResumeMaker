<template>
    <div :id="'col-' + did" :class="[{ 'collapse': true }, { 'show': did === 0 }]" :aria-labelledby="title" :data-bs-parent="'#' + parent">
        <div class="card-body">
            <slot></slot>
        </div>
    </div>
</template>


<script>
export default {
    name: "ABody",
    props: ['did', 'title', 'parent']
}
</script>
