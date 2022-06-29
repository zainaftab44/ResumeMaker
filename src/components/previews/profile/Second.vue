<template>
	<div>
		<table style="width: 90%; margin: 0 auto">
			<tr style="text-align: center">
				<td colspan="2">
					<h1 style="margin-bottom: 0">
						{{ profile.name }}
					</h1>
				</td>
			</tr>
			<tr style="text-align: center">
				<td colspan="2">
					<h5>
						{{ profile.title }}
					</h5>
				</td>
			</tr>
			<tr>
				<td style="max-width: 50%">
					{{ profile.address }}
				</td>
				<td valign="top" style="text-align: end">
					{{ profile.website }}
				</td>
			</tr>
			<tr>
				<td style="max-width: 50%">
					{{ profile.phone }}
				</td>
				<td valign="top" style="text-align: end">
					{{ profile.github }}
				</td>
			</tr>
			<tr>
				<td style="max-width: 50%">
					{{ profile.email }}
				</td>
				<td valign="top" style="text-align: end">
					{{ profile.linkedin }}
				</td>
			</tr>
			<tr style="text-align: center">
				<td colspan="2">
					<div v-if="profile.summary">
						<h3 style="margin-bottom: 5px">SUMMARY</h3>
						{{ profile.summary }}
					</div>
		<hr />

				</td>
			</tr>
		</table>
	</div>
</template>

<script>
export default {
	name: "PP",
	props: ["profile"],
}
</script>
