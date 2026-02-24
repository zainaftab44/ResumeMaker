<template>
	<div class="card mb-3 skill-editor-card">
		<AHead :def="'Skill Category'" :title="skill.type" :did="did" @del="$emit('delete-row')" @move="$emit('move-row', $event)" />
		<ABody :did="did" :title="skill.type" :parent="'skills'">
			<div class="form-container">
				<Input label="Category Title" :val="skill.type" @input="skill.type = $event" />
				<div class="skills-list-section">
					<label class="form-label d-block mb-2">Skills in this Category</label>
					<DInput :title="'Skill'" :items="skill" :sub="'name'" :half="true" />
					<button class="btn btn-sm btn-outline-success mt-2" @click="addSkill">+ Add Skill</button>
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
	name: "SkillsEditor",
	props: ["skill", "did"],
	components: { AHead, ABody, Input, DInput },
	methods: {
		addSkill() {
			this.skill.name.push("")
		}
	}
}
</script>

<style scoped>
.skill-editor-card {
	border: 1px solid #e0e0e0;
	border-radius: 8px;
	overflow: hidden;
	box-shadow: 0 2px 4px rgba(0,0,0,0.05);
	transition: all 0.3s ease;
}

.skill-editor-card:hover {
	box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.form-container {
	padding: 10px;
}

.skills-list-section {
	margin-top: 15px;
	padding: 15px;
	background: #f8f9fa;
	border-radius: 6px;
}

.form-label {
	font-weight: 600;
	color: #495057;
	font-size: 0.9rem;
}
</style>
