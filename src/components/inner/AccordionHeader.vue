<template>
   <div class ="card-header " id="`${def.toLowerCase()}-${did}`">
        <div class="row"> 
            <div class="col-sm-2">
                <div class="input-group">
                    <input type="button" class="btn btn-outline-default" value="↑" @click="$emit('move',-1)" />
                    <input type="button" class="btn btn-outline-default" value="↓" @click="$emit('move',1)" />
                </div> 
            </div> 
            <h3 class="col-sm-8 accordion-header" data-bs-toggle="collapse" :data-bs-target="`#col-${did}`" :aria-controls="`col${did}`">
                {{ title ? title : def }}
            </h3>
            <input class="btn btn-outline-danger col-sm-1 delete-btn p-1" type="button" value="Delete" @click="$emit('del')" />
        </div> 
    </div>
</template>

    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Accordion Item #1
      </button>
    </h2>




<script>
export default {
    name: 'AHead',
    props: ['def', 'title', 'did']
}
</script>