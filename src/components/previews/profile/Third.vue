<template>
	<div>
		<h1 style="margin-bottom: 0">
			{{ profile.name }}
		</h1>
		<h5>
			{{ profile.title }}
		</h5>
		<hr>
		{{ profile.address }} <br>
		{{ profile.phone }} <br>
		{{ profile.email }} <br>
		{{ profile.website }} <br>
		{{ profile.github }} <br>
		{{ profile.linkedin }} <br>
		<hr>
		<div v-if="profile.summary">
			<h3 style="margin-bottom: 5px">SUMMARY</h3>
			{{ profile.summary }}
		</div>
		<hr>
	</div>
</template>

<script>
export default {
	name: "PP",
	props: ["profile"],
}
</script>
