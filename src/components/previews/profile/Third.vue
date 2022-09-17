<template>
	<div style="font-size:10pt">
		<h1 style="margin-bottom: 0">{{ profile.name }}</h1>
		<h3>{{ profile.title }}</h3>
		<i class="bi bi-geo"></i> {{ profile.address }} <br>
		<i class="bi bi-telephone"></i> {{ profile.phone }} <br>
		<i class="bi bi-envelope"></i> {{ profile.email }} <br>
		<i class="bi bi-globe2"></i> {{ profile.website }} <br>
		<i class="bi bi-github"></i> {{ profile.github.split("/")[profile.github.split("/").length-1] }} <br>
		<i class="bi bi-linkedin"></i> {{ profile.linkedin.split("/")[profile.linkedin.split("/").length-1] }} <br>
		<hr>
		<div v-if="profile.summary">
			<h4 class="headding">SUMMARY</h4>
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
