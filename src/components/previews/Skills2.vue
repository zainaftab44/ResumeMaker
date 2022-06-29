<template>
	<div class="row" style="max-width:100%">
		<h4 style="margin-bottom:5px;padding-bottom:5px">SKILLS</h4>
		<div style="flex-wrap: wrap;display: flex;">
			<span style="background-color: lightgray; padding: 10px 15px;margin: 5px;border-radius: 5px;width: max-content;" v-for="skname in skills2.name" :key="skname">
				{{ skname }}
			</span>
		</div>
	</div>
</template>

<script>
export default {
	name: "SK2P",
	props: ["skills2"],
}
</script>
