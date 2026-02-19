<template>
	<table style="width: 100%;">
		<tbody>
			<tr>
				<td>
					<h4 role="heading" style="margin-bottom:5px;font-size: 12pt;">EXPERIENCE</h4>
				</td>
			</tr>
			<tr v-for="(exp, ind) in exps" :key="ind">
				<td style="font-size:10pt">
					<i style="font-style: italic;">
						{{ date(exp.start, exp.end) }}
					</i>
					<br>
					<strong class="headding" v-if="exp.title.length" :style="{ fontWeight: 'bold' }">
						{{ exp.title.toUpperCase() }}
						<br />
					</strong>
					{{ company(exp.company, exp.location) }}
					<ul style="margin-top:5px; margin-bottom:5px; font-size: 10pt; list-style: none !important; list-style-type: none !important; padding: 0; margin-left: 0;" v-if="exp.resp.join('')">
						<li v-for="(res, i) in exp.resp" :key="i" style="padding-left: 1.4em; text-indent: -1.2em; position: relative; list-style-type: none !important;">
							<span v-if="bullet" :style="{ color: bulletColor || 'inherit', marginRight: '8px', fontWeight: 'bold' }">{{ bullet }}</span>
							{{ res }}
						</li>
					</ul>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
export default {
	name: "EXP",
	props: ["exps", "bullet", "bulletColor"],
	methods: {
		company(name, location) {
			let comp = (name || '').toUpperCase() + ((name || '').trim().length + (location || '').trim().length > 0 ? ", " : "") + (location || '').toUpperCase()
			return comp
		},
		date: (s, e) => {
			s = s || ''
			e = e || ''
			return s.toUpperCase().trim() + (s.trim().length == 0 || e.trim().length == 0 ? "" : " – ") + e.toUpperCase().trim()
		}
	},
}
</script>
