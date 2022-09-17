<template>
	<table style="width: 100%;text-align: left;" >
		<tr>
			<td colspan="2">
				<h1 style="margin-bottom:0">
					{{ profile.name }}
				</h1>
			</td>
		</tr>
		<tr>
			<td colspan="2">
				<h5 v-if="profile.title">
					{{ profile.title }}
				</h5>
			</td>
		</tr>
		<tr>
			<td style="max-width: 50%;">
				{{ profile.address }}
			</td>
			<td valign="top" class="text-end">
				{{ profile.website }}
			</td>
		</tr>
		<tr>
			<td style="max-width: 50%;">
				{{ profile.phone }}
			</td>
			<td valign="top" class="text-end">
				{{ profile.github }}
			</td>
		</tr>
		<tr>
			<td style="max-width: 50%;">
				{{ profile.email }}
			</td>
			<td valign="top" class="text-end">
				{{ profile.linkedin }}
			</td>
		</tr>
		<tr>
			<td colspan="2">
				<div v-if="profile.summary" class="text-align:left">
					<h3 style="margin-bottom:5px; font-size: 12pt;">SUMMARY</h3>
					{{ profile.summary }}
				</div>
			</td>
		</tr>
	</table>
</template>

<script>
export default {
	name: "PP",
	props: ["profile"],
}
</script>
