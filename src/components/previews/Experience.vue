<template>
	<table>
		<tbody>
			<tr>
				<td>
					<h4 role="heading" style="margin-bottom:5px">EXPERIENCE</h4>
				</td>
			</tr>
			<tr v-for="(exp, ind) in exps" :key="ind">
				<td>
					<i class="h6">
						<small>{{ date(exp.start, exp.end) }}</small>
						<!-- <small v-if="exp.start.length">{{ exp.start.toUpperCase() }}</small>
						<small v-if="exp.end && exp.start">&ndash;</small>
						<small v-if="exp.end">{{ exp.end.toUpperCase() }}</small> -->
					</i>
					<br>
					<strong style="font-size:14pt" v-if="exp.title.length">
						{{ exp.title.toUpperCase() }}
						<br />
					</strong>
					{{ company(exp.company, exp.location) }}
					<ul style="margin-top:5px;margin-bottom:5px" v-if="exp.resp.join('')">
						<li v-for="(res, i) in exp.resp" :key="i" style="padding-left: 1.4em; text-indent: -1.55em;">{{ res }}</li>
					</ul>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
export default {
	name: "EXP",
	props: ["exps"],
	methods: {
		company(name, location) {
			let comp = name.toUpperCase() + (name.trim().length + location.trim().length > 0 ? "," : "") + location.toUpperCase()
			console.log(comp)
			return comp
		},
		date: (s, e) => {
			return s.toUpperCase().trim() +  (s.trim().length == 0 || e.trim().length == 0 ? "" : " – ") + e.toUpperCase().trim()
		}
	},
}
</script>
