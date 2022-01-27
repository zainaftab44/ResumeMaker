<template>
   <div class ="card-header row" > 
    <input type="button" class="btn btn-outline-primary col-sm-1 p-1" value="↑" @click="$emit('move',-1)" />
    <input type="button" class="btn btn-outline-primary col-sm-1 p-1" value="↓" @click="$emit('move',1)" /> 
    <h3 class="col-sm-8" style="white-space: nowrap;overflow: hidden; text-overflow: ellipsis;display:inline;vertical-align:middle" :id="`${def.toLowerCase()}-${did}`" data-bs-toggle="collapse" :data-bs-target="`#col-${did}`" :aria-controls="`col${did}`">
        {{ title ? title : def }}
    </h3>
    <input class="btn btn-outline-danger col-sm-1 delete-btn p-1" type="button" value="Delete" @click="$emit('del')" />
    </div>
</template>




<script>
export default {
    name: 'AHead',
    props: ['def', 'title', 'did']
}
</script>