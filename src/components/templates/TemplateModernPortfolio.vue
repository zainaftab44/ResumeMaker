<template>
	<div id="preview" class="preview preview-box template-modern-portfolio">
		<div class="resume-container">
			<!-- LEFT COLUMN -->
			<div class="panel-left">
				<div class="name-large">{{ data.profile.name }}</div>
				<div class="title-tag">{{ data.profile.title }}</div>

				<div class="contact-info">
					<div v-if="data.profile.address" class="contact-item">
						<i class="fas fa-map-marker-alt"></i> <span>{{ data.profile.address }}</span>
					</div>
					<div v-if="data.profile.phone" class="contact-item">
						<i class="fas fa-phone-alt"></i> <span>{{ data.profile.phone }}</span>
					</div>
					<div v-if="data.profile.email" class="contact-item">
						<i class="fas fa-envelope"></i> <a :href="'mailto:' + data.profile.email">{{ data.profile.email }}</a>
					</div>
					<div v-if="data.profile.linkedin" class="contact-item">
						<i class="fab fa-linkedin"></i> <a :href="data.profile.linkedin" target="_blank">{{ data.profile.linkedin.replace(/https?:\/\/(www\.)?/, '') }}</a>
					</div>
					<div v-if="data.profile.github" class="contact-item">
						<i class="fab fa-github"></i> <a :href="data.profile.github" target="_blank">{{ data.profile.github.replace(/https?:\/\/(www\.)?/, '') }}</a>
					</div>
					<div v-if="data.profile.website" class="contact-item">
						<i class="fas fa-globe"></i> <a :href="data.profile.website" target="_blank">{{ data.profile.website.replace(/https?:\/\/(www\.)?/, '') }}</a>
					</div>
				</div>

				<div class="divider-light"></div>

				<!-- SKILLS -->
				<div class="draggable-element" draggable="true" v-if="data.skills.length || data.skills2.name.length">
					<div class="section-title-left">⚡ core competencies</div>
					<div class="skills-container">
						<template v-if="data.styles.skills % 2 != 0">
							<div v-for="(skill, s) in data.skills" :key="s">
								<span
									class="skill-tag"
									v-for="(name, n) in skill.name.filter((skillName) => skillName && skillName.trim())"
									:key="n"
								>
									{{ name }}
								</span>
							</div>
						</template>
						<template v-else>
							<span
								class="skill-tag"
								v-for="(name, n) in data.skills2.name.filter((skillName) => skillName && skillName.trim())"
								:key="n"
							>
								{{ name }}
							</span>
						</template>
					</div>
				</div>

				<!-- AWARDS -->
				<div class="draggable-element" draggable="true" v-if="data.awds.length" style="margin-top: 2rem;">
					<div class="section-title-left">🏆 Honors & Awards</div>
					<div class="award-item" v-for="(awd, a) in data.awds" :key="a">
						<i class="fas fa-trophy"></i> {{ awd.title }}
						<div v-if="awd.desc" class="item-desc-small">{{ awd.desc }}</div>
					</div>
				</div>
			</div>

			<!-- RIGHT COLUMN -->
			<div class="panel-right">
				<!-- SUMMARY -->
				<div class="draggable-element summary" draggable="true" v-if="data.profile.summary">
					<i class="fas fa-quote-left quote-icon"></i>
					{{ data.profile.summary }}
				</div>

				<!-- EXPERIENCE -->
				<div class="draggable-element section-spacing" draggable="true" v-if="data.exps.length">
					<div class="section-title-right"><i class="fas fa-briefcase mr-2"></i> experience</div>
					<div class="exp-item" v-for="(exp, e) in data.exps" :key="e">
						<div class="exp-header">
							<span class="exp-title">{{ exp.title }}</span>
							<span class="exp-date">{{ exp.start }} – {{ exp.end }}</span>
						</div>
						<div class="exp-company">{{ exp.company }} · {{ exp.location }}</div>
						<ul class="exp-desc">
							<li
								v-for="(res, r) in exp.resp.filter((responsibility) => responsibility && responsibility.trim())"
								:key="r"
							>
								<i class="fas fa-circle"></i> {{ res }}
							</li>
						</ul>
					</div>
				</div>

				<!-- EDUCATION -->
				<div class="draggable-element section-spacing" draggable="true" v-if="data.eds.length">
					<div class="section-title-right"><i class="fas fa-graduation-cap mr-2"></i> education</div>
					<div class="edu-item" v-for="(edu, ed) in data.eds" :key="ed">
						<div class="edu-line">
							<span>{{ edu.degree }} in {{ edu.major }}</span>
							<span class="exp-date">{{ edu.start }} – {{ edu.end }}</span>
						</div>
						<div class="edu-detail">{{ edu.institute }} · {{ edu.location }}</div>
					</div>
				</div>

				<!-- PROJECTS -->
				<div class="draggable-element section-spacing" draggable="true" v-if="data.projs.length">
					<div class="section-title-right"><i class="fas fa-code-branch mr-2"></i> key projects</div>
					<div class="project-item" v-for="(proj, p) in data.projs" :key="p">
						<div class="project-header">
							<span class="project-title">{{ proj.title }}</span>
							<span class="exp-date">{{ proj.start }} – {{ proj.end }}</span>
						</div>
						<div class="project-tools" v-if="proj.tools && proj.tools.length">
							<span
								class="tool-badge"
								v-for="(tool, t) in proj.tools.filter((toolName) => toolName && toolName.trim())"
								:key="t"
							>
								{{ tool }}
							</span>
						</div>
						<div class="project-desc">{{ proj.desc }}</div>
						<a v-if="proj.link" :href="proj.link" target="_blank" class="project-link">{{ proj.link }}</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "TemplateModernPortfolio",
	props: ["data"],
	mounted() {
		(function () {
			var id_ = "preview"
			var rows_ = document.querySelectorAll("#" + id_ + " .draggable-element")
			var dragSrcEl_ = null
			var current = null

			function handleDragStart(e) {
				if (!e.target.classList.contains('draggable-element')) return;
				e.dataTransfer.effectAllowed = "move"
				e.dataTransfer.setData("text/html", e.target.innerHTML)
				e.dataTransfer.dropEffect = "move"
				dragSrcEl_ = e.target
			}

			function handleDragOver(e) {
				if (typeof e.target.closest == "function") current = e.target.closest(".draggable-element")
			}

			function handleDrop(e) {
				if (current && current.classList.contains("draggable-element") && dragSrcEl_) {
					if (navigator.userAgent.toLowerCase().includes("firefox")) {
						dragSrcEl_.innerHTML = current.innerHTML
						current.innerHTML = e.dataTransfer.getData("text/html")
					} else {
						let inner = current.innerHTML
						current.innerHTML = dragSrcEl_.innerHTML
						dragSrcEl_.innerHTML = inner
					}
				}
			}

			[].forEach.call(rows_, function (row) {
				row.addEventListener("dragstart", handleDragStart, false)
				row.addEventListener("dragover", handleDragOver, false)
				row.addEventListener("dragend", handleDrop, false)
			})
		})()
	},
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

.template-modern-portfolio {
	font-family: 'Inter', sans-serif;
	background: #f2f5f9;
	color: #1e293b;
}

.resume-container {
	display: grid;
	grid-template-columns: 320px 1fr;
	min-height: 29.7cm;
	background: white;
	overflow: hidden;
}

/* LEFT PANEL */
.panel-left {
	background: #0f1825;
	color: #e9edf2;
	padding: 2.5rem 1.8rem;
}

.name-large {
	font-size: 2.2rem;
	font-weight: 700;
	line-height: 1.1;
	margin-bottom: 0.5rem;
	color: white;
}

.title-tag {
	font-size: 1rem;
	font-weight: 500;
	background: #1f2b3a;
	display: inline-block;
	padding: 0.4rem 1rem;
	border-radius: 30px;
	margin-bottom: 2rem;
	color: #cfdfff;
}

.contact-info {
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
}

.contact-item {
	display: flex;
	align-items: center;
	gap: 0.8rem;
	font-size: 0.85rem;
}

.contact-item i {
	width: 1.2rem;
	color: #809ab3;
	text-align: center;
}

.contact-item a {
	color: #b2c9f0;
	text-decoration: none;
}

.divider-light {
	height: 1px;
	background: #253040;
	margin: 2rem 0;
}

.section-title-left {
	text-transform: uppercase;
	font-size: 0.75rem;
	letter-spacing: 1.5px;
	font-weight: 700;
	color: #9db4d0;
	margin-bottom: 1.2rem;
	border-bottom: 1px solid #253040;
	padding-bottom: 0.5rem;
}

.skill-tag {
	display: inline-block;
	background: #1e2a38;
	color: #d3e0f0;
	padding: 0.35rem 0.9rem;
	border-radius: 30px;
	font-size: 0.8rem;
	font-weight: 500;
	margin: 0.25rem;
	border: 1px solid #314154;
}

.award-item {
	font-size: 0.85rem;
	margin-bottom: 1rem;
	line-height: 1.4;
}

.award-item i {
	color: #809ab3;
	margin-right: 0.5rem;
}

.item-desc-small {
	font-size: 0.75rem;
	color: #809ab3;
	margin-top: 0.2rem;
	margin-left: 1.7rem;
}

/* RIGHT PANEL */
.panel-right {
	padding: 3rem 2.5rem;
	background: white;
}

.summary {
	background: #f8fafd;
	padding: 1.8rem;
	border-radius: 20px;
	margin-bottom: 3rem;
	border: 1px solid #eef2f6;
	font-size: 0.95rem;
	line-height: 1.6;
	color: #334155;
	position: relative;
}

.quote-icon {
	color: #3b82f6;
	opacity: 0.2;
	font-size: 1.2rem;
	margin-right: 0.5rem;
}

.section-title-right {
	font-size: 1.1rem;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 1px;
	color: #334155;
	margin-bottom: 1.5rem;
	border-bottom: 2px solid #f1f5f9;
	padding-bottom: 0.6rem;
}

.exp-item, .edu-item, .project-item {
	margin-bottom: 2.5rem;
}

.exp-header, .edu-line, .project-header {
	display: flex;
	justify-content: space-between;
	align-items: baseline;
	margin-bottom: 0.5rem;
}

.exp-title, .project-title {
	font-weight: 700;
	font-size: 1.15rem;
	color: #0f172a;
}

.exp-company, .edu-detail {
	font-weight: 600;
	color: #3b82f6;
	margin-bottom: 1rem;
}

.exp-date {
	font-size: 0.8rem;
	background: #f1f5f9;
	padding: 0.3rem 1rem;
	border-radius: 30px;
	color: #475569;
	font-weight: 600;
}

.exp-desc {
	list-style: none;
	padding: 0;
	margin-top: 1rem;
}

.exp-desc li {
	font-size: 0.95rem;
	color: #475569;
	margin-bottom: 0.8rem;
	display: flex;
	gap: 0.8rem;
}

.exp-desc li i {
	color: #3b82f6;
	font-size: 0.6rem;
	margin-top: 0.4rem;
}

.project-tools {
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
	margin-bottom: 0.8rem;
}

.tool-badge {
	background: #f1f5f9;
	padding: 0.2rem 0.8rem;
	border-radius: 30px;
	font-size: 0.75rem;
	font-weight: 600;
	color: #1e293b;
	border: 1px solid #e2e8f0;
}

.project-desc {
	font-size: 0.95rem;
	color: #475569;
	line-height: 1.5;
}

.project-link {
	font-size: 0.85rem;
	color: #3b82f6;
	text-decoration: none;
	display: block;
	margin-top: 0.5rem;
}

.mr-2 { margin-right: 0.5rem; }

@media print {
	.panel-left {
		background: #0f1825 !important;
		-webkit-print-color-adjust: exact !important;
		print-color-adjust: exact !important;
	}
	.title-tag, .exp-date, .tool-badge, .skill-tag {
		background: #1f2b3a !important;
		-webkit-print-color-adjust: exact !important;
		print-color-adjust: exact !important;
	}
	.exp-date, .tool-badge {
		background: #f1f5f9 !important;
	}
	.summary {
		background: #f8fafd !important;
	}
}
</style>
