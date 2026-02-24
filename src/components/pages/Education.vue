<template>
	<div class="card mb-3 education-editor-card">
		<AHead :def="'Education'" :title="edu.institute" :did="did" @del="$emit('delete-row')" @move="$emit('move-row', $event)" />
		<ABody :did="did" :title="edu.institute" :parent="'education'">
			<div class="form-container">
				<div class="row">
					<div class="col-md-12">
						<Input label="Institute / University" :val="edu.institute" @input="edu.institute = $event" />
					</div>
				</div>
				<div class="row">
					<div class="col-md-6">
						<Input label="Degree" :val="edu.degree" @input="edu.degree = $event" />
					</div>
					<div class="col-md-6">
						<Input label="Field of Study" :val="edu.major" @input="edu.major = $event" />
					</div>
				</div>
				<div class="row">
					<div class="col-md-4">
						<Input label="Location" :val="edu.location" @input="edu.location = $event" />
					</div>
					<div class="col-md-4">
						<Input label="Start Date" :val="edu.start" @input="edu.start = $event" />
					</div>
					<div class="col-md-4">
						<Input label="End Date" :val="edu.end" @input="edu.end = $event" />
					</div>
				</div>
			</div>
		</ABody>
	</div>
</template>

<script>
import AHead from "../inner/AccordionHeader.vue"
import ABody from "../inner/AccordionBody.vue"
import Input from "../inner/Input.vue"

export default {
	name: "EducationEditor",
	props: ["edu", "did"],
	components: { AHead, ABody, Input },
}
</script>

<style scoped>
.education-editor-card {
	border: 1px solid #e0e0e0;
	border-radius: 8px;
	overflow: hidden;
	box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.form-container {
	padding: 10px;
}
</style>
