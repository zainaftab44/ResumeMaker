<template>
	<table v-if="eds.length">
		<tbody>
			<tr>
				<td>
					<h4 style="margin-bottom:5px">EDUCATION</h4>
				</td>
			</tr>
			<tr v-for="(ed, k) in eds" :key="k">
				<td>
					<br />
					<small v-if="ed.start">{{ ed.start.toUpperCase() }}</small>
					<small v-if="ed.end && ed.start">&ndash;</small>
					<small v-if="ed.end">{{ ed.end.toUpperCase() }}</small>
					<br v-if="ed.end || ed.start" />
					<strong v-if="ed.institute">
						{{ ed.institute }}
					</strong>
					<br />
					{{ ed.location }}
					<br v-if="ed.location" />
					<span class="degree" v-if="ed.major || ed.degree">
						<span v-if="ed.degree">{{ ed.degree }}</span>
						<span v-if="ed.degree.length + ed.major.length > 50">
							<br />
						</span>
						<span v-if="ed.major">({{ ed.major }})</span>
					</span>
					<br />
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
export default {
	name: "EDP",
	props: ["eds"],
}
</script>
