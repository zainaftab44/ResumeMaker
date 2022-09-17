<template>
	<table>
		<tbody>
			<tr>
				<td>
					<h4 role="heading" style="margin-bottom:5px">Projects</h4>
				</td>
			</tr>
			<tr v-for="(proj, l) in projs" :key="l">
				<td>
					<i style="font-size:10pt">
						{{ date(proj.start, proj.end) }}
					</i>
					<br />
					<strong class="headding" v-if="proj.title">
						{{ proj.title }}
						<br />
					</strong>
					<span v-if="proj.link">
						<a :href="proj.link" :title="proj.link">{{ proj.link }}</a>
					</span>
					<span v-if="proj.desc">
						<br v-if="proj.link" />
						<span :title="proj.desc">{{ proj.desc }}</span>
					</span>
					<ul style="margin-top:5px;margin-bottom:5px;font-size:10pt" v-if="proj.resp.join('').length || proj.tools.join('').length">
						<li v-for="(res, m) in proj.resp" :key="m" style="padding-left: 1.4em; text-indent: -1.55em;">{{ res }}</li>
						<li v-if="proj.tools.join('')" style="padding-left: 1.4em; text-indent: -1.55em;">
							<strong>Technologies:</strong>
							{{ proj.tools.join(", ") }}
						</li>
					</ul>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
export default {
	name: "PJP",
	props: ["projs"],
	methods: {
		date: (s, e) => {
			return s.toUpperCase().trim() + (s.trim().length == 0 || e.trim().length == 0 ? "" : " – ") + e.toUpperCase().trim()
		}
	},
}
</script>
