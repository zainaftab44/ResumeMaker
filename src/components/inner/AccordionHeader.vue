<template>
   <div class ="card-header " :id="`${def.toLowerCase()}-${did}`">
        <div class="row"> 
            <div class="col-lg-2 col-md-2 col-sm-2">
                <div class="btn-group">
                    <input type="button" class="btn-outline-primary" value="↑" @click="$emit('move',-1)" />
                    <input type="button" class="btn-outline-primary" value="↓" @click="$emit('move',1)" />
                </div> 
            </div> 
            <h3 class="col-lg-8 col-md-8 col-sm-8 accordion-header" data-bs-toggle="collapse" :data-bs-target="`#col-${did}`" :aria-controls="`col${did}`">
                {{ title ? title : def }}
            </h3>
            <input class="btn btn-outline-danger col-sm-1 delete-btn p-1" type="button" value="Delete" @click="$emit('del')" />
        </div> 
    </div>
</template>


<script>
export default {
    name: 'AHead',
    props: ['def', 'title', 'did']
}
</script>