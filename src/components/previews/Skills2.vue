<template>
	<div class="skills2-preview-container" v-if="skills2.name && skills2.name.length">
		<h4 role="heading" class="section-title" v-if="!hideTitle">SKILLS</h4>

		<!-- Style 2: Modern Pills (Tags) -->
		<div class="skills-tags" v-if="styleMode == 2">
			<span class="skill-pill" v-for="(skname, i) in skills2.name.filter(n => n.trim())" :key="i">
				{{ skname }}
			</span>
		</div>

		<!-- Style 5: Minimal Bordered Chips -->
		<div class="skills-chips" v-else-if="styleMode == 5">
			<span class="skill-chip" v-for="(skname, i) in skills2.name.filter(n => n.trim())" :key="i">
				{{ skname }}
			</span>
		</div>

		<!-- Style 6: Simple Inline List -->
		<div class="skills-simple-list" v-else-if="styleMode == 6">
			<span class="simple-item" v-for="(skname, i) in skills2.name.filter(n => n.trim())" :key="i">
				{{ skname }}<span v-if="i < skills2.name.filter(n => n.trim()).length - 1" class="separator">, </span>
			</span>
		</div>
	</div>
</template>

<script>
export default {
	name: "Skills2Preview",
	props: {
		skills2: {
			type: Object,
			default: () => ({ name: [] })
		},
		styleMode: {
			type: Number,
			default: 2
		},
		hideTitle: {
			type: Boolean,
			default: false
		}
	}
}
</script>

<style scoped>
.skills2-preview-container {
	width: 100%;
}

.section-title {
	margin-bottom: 10px;
	padding-bottom: 5px;
	font-size: 12pt;
	font-weight: bold;
	border-bottom: 1px solid #eee;
}

/* Style 2: Pills */
.skills-tags {
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
}

.skill-pill {
	background-color: #34495e;
	color: white;
	padding: 4px 12px;
	border-radius: 50px;
	font-size: 9pt;
	transition: opacity 0.2s;
}

/* Style 5: Chips */
.skills-chips {
	display: flex;
	flex-wrap: wrap;
	gap: 6px;
}

.skill-chip {
	border: 1px solid #34495e;
	color: #34495e;
	padding: 2px 10px;
	border-radius: 4px;
	font-size: 9pt;
	font-weight: 500;
}

/* Style 6: Simple List */
.skills-simple-list {
	font-size: 10pt;
	line-height: 1.6;
}

.separator {
	color: #999;
}

@media print {
	.skill-pill {
		background-color: #34495e !important;
		color: white !important;
		-webkit-print-color-adjust: exact !important;
		print-color-adjust: exact !important;
	}
	.skill-chip {
		border-color: #34495e !important;
		color: #34495e !important;
	}
}
</style>
