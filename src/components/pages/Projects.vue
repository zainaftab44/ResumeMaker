<template>
	<div class="card mb-3 projects-editor-card">
		<AHead :def="'Project'" :title="proj.title" :did="did" @del="$emit('delete-row')" @move="$emit('move-row', $event)" />
		<ABody :did="did" :title="proj.title" :parent="'projects'">
			<div class="form-container">
				<div class="row">
					<div class="col-md-12">
						<Input label="Project Title" :val="proj.title" @input="proj.title = $event" />
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<Input label="Link / URL" :val="proj.link" @input="proj.link = $event" />
					</div>
				</div>
				<div class="row">
					<div class="col-md-6">
						<Input label="Start Date" :val="proj.start" @input="proj.start = $event" />
					</div>
					<div class="col-md-6">
						<Input label="End Date" :val="proj.end" @input="proj.end = $event" />
					</div>
				</div>
				<div class="row mt-3">
					<div class="col-md-12">
						<TArea label="Description" :val="proj.desc" @input="proj.desc = $event" />
					</div>
				</div>

				<div class="skills-list-section mt-3">
					<label class="form-label d-block mb-2">Technologies Used</label>
					<DInput :title="'Technology'" :items="proj" :sub="'tools'" :half="true" />
					<button class="btn btn-sm btn-outline-success mt-2" @click="addTool">+ Add Tech</button>
				</div>

				<div class="responsibilities-section mt-3">
					<label class="form-label d-block mb-2">Key Contributions</label>
					<DInput :title="'Contribution'" :items="proj" :sub="'resp'" />
					<button class="btn btn-sm btn-outline-success mt-2" @click="addResp">+ Add Contribution</button>
				</div>
			</div>
		</ABody>
	</div>
</template>

<script>
import AHead from "../inner/AccordionHeader.vue"
import ABody from "../inner/AccordionBody.vue"
import Input from "../inner/Input.vue"
import TArea from "../inner/TextArea.vue"
import DInput from "../inner/DraggableInput.vue"

export default {
	name: "ProjectsEditor",
	props: ["proj", "did"],
	components: { AHead, ABody, Input, TArea, DInput },
	methods: {
		addTool() {
			this.proj.tools.push("")
		},
		addResp() {
			this.proj.resp.push("")
		}
	}
}
</script>

<style scoped>
.projects-editor-card {
	border: 1px solid #e0e0e0;
	border-radius: 8px;
	overflow: hidden;
	box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.form-container {
	padding: 10px;
}

.skills-list-section, .responsibilities-section {
	padding: 15px;
	background: #f8f9fa;
	border-radius: 6px;
	margin-bottom: 10px;
}

.form-label {
	font-weight: 600;
	color: #495057;
}
</style>
