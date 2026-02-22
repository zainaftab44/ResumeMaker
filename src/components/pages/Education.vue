<template>
	<table v-if="eds.length">
		<tbody>
			<tr v-for="(ed, k) in eds" :key="k">
				<td>
					<i style="font-size:10pt">
						{{ date(ed.start, ed.end) }}
					</i>
					<br v-if="ed.end || ed.start" />
					<strong  class="degree headding" v-if="ed.major || ed.degree">
						<span v-if="ed.degree">{{ ed.degree }}</span>
						<br v-if="ed.degree.length + ed.major.length > 50" />
						<span v-if="ed.major">({{ ed.major }})</span>
					</strong>
					<br v-if="ed.institute" />
					{{ ed.institute }}
					<br v-if="ed.location" />
					{{ ed.location }}
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
export default {
	name: "EDP",
	props: ["eds"],
	methods: {
		date: (s, e) => {
			return s.toUpperCase().trim() + (s.trim().length == 0 || e.trim().length == 0 ? "" : " – ") + e.toUpperCase().trim()
		}
	},
}
</script>
