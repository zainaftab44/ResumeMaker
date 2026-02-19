<template>
	<div class="row" style="max-width:100%">
		<h4  role="heading" style="margin-bottom:5px;padding-bottom:5px; font-size: 12pt;">SKILLS</h4>
		<ul class="skills" style="font-size:10pt; flex-wrap: wrap; display: flex; list-style: none !important; list-style-type: none !important; padding: 0; margin-left: 0;" role="list">
			<li class="skill-item" role="listitem" :title="skname" v-for="skname in skills2.name" :key="skname" :style="{
				backgroundColor: 'lightgray',
				padding: '5px 10px',
				margin: '5px',
				borderRadius: '5px',
				width: 'fit-content',
				fontSize: '10pt',
				listStyleType: 'none !important'
			}">
				{{ skname }}
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: "SK2P",
	props: ["skills2"],
}
</script>
