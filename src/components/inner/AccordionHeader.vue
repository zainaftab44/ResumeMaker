<template>
    <div
        class="card-header row"
        :id="'skill-' + did"
        data-bs-toggle="collapse"
        :data-bs-target="'#col-' + did"
        :aria-controls="'col' + did"
    >
        <h3 class="col-md-9">{{ title ? title : def }}</h3>
        <input class="btn btn-outline-danger col-md-2 delete-btn" value="Delete" @click="$emit('del')" />
    </div>
</template>




<script>
export default {
    name: 'AHead',
    props: ['def', 'title', 'did']
}
</script>