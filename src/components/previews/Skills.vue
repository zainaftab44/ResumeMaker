<template>
	<div class="skills-preview-container" v-if="skills.length">
		<h4 role="heading" class="section-title" v-if="!hideTitle">SKILLS</h4>

		<!-- Style 1: Classic Table (Cleaned up) -->
		<table class="skills-table" v-if="styleMode == 1">
			<tbody>
				<tr v-for="(skill, s) in skills" :key="s">
					<td class="skill-category">
						<strong>{{ skill.type }}</strong>
					</td>
					<td class="skill-values" v-if="skill.name && skill.name.length">
						{{ skill.name.filter(n => n.trim()).join(", ") }}
					</td>
				</tr>
			</tbody>
		</table>

		<!-- Style 3: Modern Grid -->
		<div class="skills-grid" v-else-if="styleMode == 3">
			<div class="skill-group" v-for="(skill, s) in skills" :key="s">
				<h5 class="skill-group-title">{{ skill.type }}</h5>
				<div class="skill-tag-container">
					<span class="skill-tag" v-for="(name, n) in skill.name.filter(i => i.trim())" :key="n">
						{{ name }}
					</span>
				</div>
			</div>
		</div>

		<!-- Style 4: Sidebar Minimal -->
		<div class="skills-sidebar" v-else-if="styleMode == 4">
			<div class="sidebar-item" v-for="(skill, s) in skills" :key="s">
				<div class="sidebar-category">{{ skill.type }}</div>
				<div class="sidebar-names">{{ skill.name.filter(n => n.trim()).join(" • ") }}</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Skills1Preview",
	props: {
		skills: {
			type: Array,
			default: () => []
		},
		styleMode: {
			type: Number,
			default: 1
		},
		hideTitle: {
			type: Boolean,
			default: false
		}
	}
}
</script>

<style scoped>
.skills-preview-container {
	width: 100%;
}

.section-title {
	margin-bottom: 10px;
	padding-bottom: 5px;
	font-size: 12pt;
	font-weight: bold;
	border-bottom: 1px solid #eee;
}

/* Style 1: Table */
.skills-table {
	width: 100%;
	border-collapse: collapse;
}

.skill-category {
	width: 30%;
	vertical-align: top;
	padding: 4px 8px 4px 0;
	font-size: 10pt;
}

.skill-values {
	width: 70%;
	vertical-align: top;
	padding: 4px 0;
	font-size: 10pt;
}

/* Style 3: Grid */
.skills-grid {
	display: grid;
	grid-template-columns: 1fr;
	gap: 15px;
}

.skill-group-title {
	font-size: 10pt;
	font-weight: bold;
	margin-bottom: 5px;
	color: #666;
	text-transform: uppercase;
}

.skill-tag-container {
	display: flex;
	flex-wrap: wrap;
	gap: 6px;
}

.skill-tag {
	background: #f0f0f0;
	padding: 2px 8px;
	border-radius: 4px;
	font-size: 9pt;
	color: #333;
}

/* Style 4: Sidebar */
.skills-sidebar {
	display: flex;
	flex-direction: column;
	gap: 10px;
}

.sidebar-category {
	font-size: 9.5pt;
	font-weight: bold;
	color: inherit;
}

.sidebar-names {
	font-size: 9pt;
	opacity: 0.8;
}

@media print {
	.skill-tag {
		background-color: #f0f0f0 !important;
		-webkit-print-color-adjust: exact !important;
		print-color-adjust: exact !important;
	}
}
</style>