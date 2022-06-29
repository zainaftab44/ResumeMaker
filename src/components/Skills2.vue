<template>
	<div class="accordion">
		<div class="card">
			<div class="card-header border-success bg-transparent" :id="'headingsk2'">
				<h2 class="accordion-header">
					Skills
					<button @click="add" class="col-md-1 btn btn-sm btn-success float-end">+</button>
				</h2>
			</div>
			<div aria-labelledby="Skills" data-bs-parent="#skills">
				<div class="card-body">
					<DInput :title="'Skill'" :items="skill2" :sub="'name'" :half="true" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import DInput from "./inner/DraggableInput.vue"

export default {
	name: "Skills2",
	methods: {
		add: function() {
			this.skill2.name.push("")
		},
	},
	components: { DInput },
	props: ["skill2"],
}
</script>
