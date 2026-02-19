<template>
	<table style="width: 100%;">
		<tbody>
			<tr>
				<td>
					<h4 role="heading" style="margin-bottom:5px; font-size: 12pt;">PROJECTS</h4>
				</td>
			</tr>
			<tr v-for="(proj, l) in projs" :key="l">
				<td style="font-size:10pt">
					<i style="font-size:10pt; font-style: italic;">
						{{ date(proj.start, proj.end) }}
					</i>
					<br />
					<strong class="headding" v-if="proj.title" :style="{ fontWeight: 'bold' }">
						{{ proj.title }}
						<br />
					</strong>
					<span v-if="proj.link">
						<a :href="proj.link" :style="{ color: '#3498db', textDecoration: 'none' }">{{ proj.link }}</a>
					</span>
					<span v-if="proj.desc">
						<br v-if="proj.link" />
						<span :style="{ display: 'block', marginTop: '5px' }">{{ proj.desc }}</span>
					</span>
					<ul style="margin-top:5px; margin-bottom:5px; font-size: 10pt; list-style: none !important; list-style-type: none !important; padding: 0; margin-left: 0;" v-if="(proj.resp && proj.resp.join('').length) || (proj.tools && proj.tools.join('').length)">
						<li v-for="(res, m) in proj.resp" :key="m" style="padding-left: 1.4em; text-indent: -1.2em; position: relative; list-style-type: none !important;">
							<span v-if="bullet" :style="{ color: bulletColor || 'inherit', marginRight: '8px', fontWeight: 'bold' }">{{ bullet }}</span>
							{{ res }}
						</li>
						<li v-if="proj.tools && proj.tools.join('')" style="padding-left: 1.4em; text-indent: -1.2em; position: relative; list-style-type: none !important;">
							<span v-if="bullet" :style="{ color: bulletColor || 'inherit', marginRight: '8px', fontWeight: 'bold' }">{{ bullet }}</span>
							<strong :style="{ fontWeight: 'bold' }">Technologies:</strong>
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
	props: ["projs", "bullet", "bulletColor"],
	methods: {
		date: (s, e) => {
			s = s || ''
			e = e || ''
			return s.toUpperCase().trim() + (s.trim().length == 0 || e.trim().length == 0 ? "" : " – ") + e.toUpperCase().trim()
		}
	},
}
</script>
