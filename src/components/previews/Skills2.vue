<template>
	<div class="row" style="max-width:100%">
		<h4  role="heading" style="margin-bottom:5px;padding-bottom:5px">SKILLS</h4>
		<ul class="skills" role="list">
			<li class="skill-item" role="listitem" :title="skname" v-for="skname in skills2.name" :key="skname">
				{{ skname }}
			</li>
		</ul>
	</div>
</template>

<style>
.skills {
	flex-wrap: wrap;
	display: flex;
}

.skill-item {
	background-color: lightgray;
	padding: 10px 10px;
	margin: 5px;
	border-radius: 5px;
	width: fit-content;
	font-size: 10pt;
}

.skills li::before {
	content: "";
}
</style>

<script>
export default {
	name: "SK2P",
	props: ["skills2"],
}
</script>
