<template>
	<div class="card skill2-editor-card">
		<div class="card-header bg-light d-flex justify-content-between align-items-center py-3">
			<h5 class="mb-0 fw-bold text-primary">Uncategorized Skills List</h5>
			<button @click="add" class="btn btn-primary btn-sm rounded-pill shadow-sm">
				<span class="px-2">+ Add Skill Item</span>
			</button>
		</div>
		<div class="card-body bg-white p-4">
			<div class="info-alert mb-4">
				<p class="mb-0">
					<i class="bi bi-info-circle me-2"></i>
					This style shows all skills as a single list. Use "Toggle Style" to preview different layouts.
				</p>
			</div>
			<DInput :title="'Skill'" :items="skill2" :sub="'name'" :half="true" />
		</div>
	</div>
</template>

<script>
import DInput from "../inner/DraggableInput.vue"

export default {
	name: "Skills2Editor",
	components: { DInput },
	props: ["skill2"],
	methods: {
		add: function () {
			this.skill2.name.push("")
		},
	},
}
</script>

<style scoped>
.skill2-editor-card {
	border: none;
	border-radius: 12px;
	overflow: hidden;
	box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.info-alert {
	background-color: #e7f3ff;
	border-left: 4px solid #007bff;
	padding: 12px 16px;
	border-radius: 4px;
	color: #0c5460;
	font-size: 0.9rem;
}

.card-header {
	border-bottom: 1px solid rgba(0,0,0,0.05);
}
</style>
