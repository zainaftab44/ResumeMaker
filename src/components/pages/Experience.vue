<template>
	<div class="card mb-3 experience-editor-card">
		<AHead :def="'Work Experience'" :title="exp.company" :did="did" @del="$emit('delete-row')" @move="$emit('move-row', $event)" />
		<ABody :did="did" :title="exp.company" :parent="'experience'">
			<div class="form-container">
				<div class="row">
					<div class="col-md-6">
						<Input label="Company Name" :val="exp.company" @input="exp.company = $event" />
					</div>
					<div class="col-md-6">
						<Input label="Location" :val="exp.location" @input="exp.location = $event" />
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<Input label="Job Title" :val="exp.title" @input="exp.title = $event" />
					</div>
				</div>
				<div class="row">
					<div class="col-md-6">
						<Input label="Start Date" :val="exp.start" @input="exp.start = $event" />
					</div>
					<div class="col-md-6">
						<Input label="End Date" :val="exp.end" @input="exp.end = $event" />
					</div>
				</div>
				<div class="responsibilities-section mt-3">
					<label class="form-label d-block mb-2">Responsibilities</label>
					<DInput :title="'Responsibility'" :items="exp" :sub="'resp'" />
					<button class="btn btn-sm btn-outline-success mt-2" @click="addResp">+ Add Responsibility</button>
				</div>
			</div>
		</ABody>
	</div>
</template>

<script>
import AHead from "../inner/AccordionHeader.vue"
import ABody from "../inner/AccordionBody.vue"
import Input from "../inner/Input.vue"
import DInput from "../inner/DraggableInput.vue"

export default {
	name: "ExperienceEditor",
	props: ["exp", "did"],
	components: { AHead, ABody, Input, DInput },
	methods: {
		addResp() {
			this.exp.resp.push("")
		}
	}
}
</script>

<style scoped>
.experience-editor-card {
	border: 1px solid #e0e0e0;
	border-radius: 8px;
	overflow: hidden;
	box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.form-container {
	padding: 10px;
}

.responsibilities-section {
	padding: 15px;
	background: #f8f9fa;
	border-radius: 6px;
}

.form-label {
	font-weight: 600;
	color: #495057;
}
</style>
