<template>
  <div class="ats-scanner">
    <!-- Header -->
    <div class="scanner-header">
      <h2>
        <i class="fas fa-robot"></i>
        ATS Compatibility Scanner
      </h2>
      <p class="subtitle">
        Check how well your resume performs with Applicant Tracking Systems
      </p>
    </div>

    <!-- Job Description Input -->
    <div class="job-description-section">
      <label for="job-description">
        <i class="fas fa-briefcase"></i>
        Paste Job Description (Optional)
      </label>
      <textarea
        id="job-description"
        v-model="jobDescription"
        placeholder="Paste the job description here to get keyword matching analysis..."
        rows="6"
      ></textarea>
      <button @click="scanResume" class="scan-button" :disabled="scanning">
        <i class="fas fa-search"></i>
        {{ scanning ? 'Scanning...' : (jobDescription ? 'Scan with Job Description' : 'Scan Resume') }}
      </button>
    </div>

    <!-- Results -->
    <div v-if="results" class="results-container">
      <!-- Score Display -->
      <div class="score-section">
        <div class="score-circle" :class="getScoreClass(results.score.total)">
          <div class="score-number">{{ results.score.total }}</div>
          <div class="score-label">ATS Score</div>
        </div>
        <div class="score-rating">
          <h3>{{ results.score.rating }}</h3>
          <p>{{ getScoreMessage(results.score.total) }}</p>
          <div v-if="grammarResults" class="grammar-badge" :class="getGrammarBadgeClass()">
            <i class="fas fa-spell-check"></i>
            Writing: {{ getGrammarLabel() }}
            <span v-if="grammarResults.total > 0"> · {{ grammarResults.total }} issue{{ grammarResults.total !== 1 ? 's' : '' }}</span>
          </div>
        </div>
      </div>

      <!-- Score Breakdown -->
      <div class="breakdown-section">
        <h3>Score Breakdown</h3>
        <div class="breakdown-grid">
          <div class="breakdown-item">
            <div class="breakdown-label">Format</div>
            <div class="breakdown-bar">
              <div class="breakdown-fill" :style="{ width: `${(results.score.breakdown.format / 25) * 100}%` }"></div>
            </div>
            <div class="breakdown-score">{{ results.score.breakdown.format }}/25</div>
          </div>
          <div class="breakdown-item">
            <div class="breakdown-label">Keywords</div>
            <div class="breakdown-bar">
              <div class="breakdown-fill" :style="{ width: `${(results.score.breakdown.keywords / 35) * 100}%` }"></div>
            </div>
            <div class="breakdown-score">{{ results.score.breakdown.keywords }}/35</div>
          </div>
          <div class="breakdown-item">
            <div class="breakdown-label">Content</div>
            <div class="breakdown-bar">
              <div class="breakdown-fill" :style="{ width: `${(results.score.breakdown.content / 25) * 100}%` }"></div>
            </div>
            <div class="breakdown-score">{{ results.score.breakdown.content }}/25</div>
          </div>
          <div class="breakdown-item">
            <div class="breakdown-label">Optimization</div>
            <div class="breakdown-bar">
              <div class="breakdown-fill" :style="{ width: `${(results.score.breakdown.optimization / 15) * 100}%` }"></div>
            </div>
            <div class="breakdown-score">{{ results.score.breakdown.optimization }}/15</div>
          </div>
        </div>
      </div>

      <!-- Keyword Matching (if JD provided) -->
      <div v-if="jobDescription && results.keywords && results.keywords.matchPercentage > 0" class="keywords-section">
        <h3>Keyword Matching</h3>
        <div class="keyword-match">
          <div class="match-percentage" :class="getMatchClass(results.keywords.matchPercentage)">
            {{ results.keywords.matchPercentage }}%
          </div>
          <div class="match-details">
            <p><strong>{{ results.keywords.matchedKeywords.length }}</strong> matched keywords,
               <strong>{{ results.keywords.missingKeywords.length }}</strong> missing from job description</p>
          </div>
        </div>
        <div class="keyword-lists">
          <div class="keyword-list matched">
            <h4><i class="fas fa-check-circle"></i> Matched Keywords</h4>
            <div class="keyword-tags">
              <span v-for="keyword in results.keywords.matchedKeywords.slice(0, 15)" :key="keyword" class="keyword-tag matched">{{ keyword }}</span>
            </div>
            <p v-if="results.keywords.matchedKeywords.length > 15" class="more-keywords">+{{ results.keywords.matchedKeywords.length - 15 }} more</p>
          </div>
          <div class="keyword-list missing">
            <h4><i class="fas fa-exclamation-circle"></i> Missing Keywords</h4>
            <div class="keyword-tags">
              <span v-for="keyword in results.keywords.missingKeywords.slice(0, 15)" :key="keyword" class="keyword-tag missing">{{ keyword }}</span>
            </div>
            <p v-if="results.keywords.missingKeywords.length > 15" class="more-keywords">+{{ results.keywords.missingKeywords.length - 15 }} more</p>
          </div>
        </div>
      </div>

      <!-- Skills Found -->
      <div class="skills-section">
        <h3>Detected Skills ({{ results.skills.length }})</h3>
        <p v-if="results.skills.length === 0" class="no-skills">No skills detected. Add skills to your Skills section to improve your ATS score.</p>
        <div v-else class="skill-tags">
          <span v-for="skill in results.skills.slice(0, 30)" :key="skill" class="skill-tag">{{ skill }}</span>
        </div>
        <p v-if="results.skills.length > 30" class="more-skills">+{{ results.skills.length - 30 }} more skills detected</p>
      </div>

      <!-- Industry Analysis -->
      <div v-if="industryResults" class="industry-section">
        <h3>
          <i class="fas fa-industry"></i>
          Industry Analysis
        </h3>
        <div class="industry-header">
          <div class="industry-select-row">
            <label>Analyze for industry:</label>
            <select v-model="selectedIndustry" @change="runIndustryAnalysis" class="industry-select">
              <option value="">— Auto-detect —</option>
              <option v-for="ind in availableIndustries" :key="ind.id" :value="ind.id">{{ ind.name }}</option>
            </select>
          </div>
          <div class="industry-match-info">
            <span class="industry-name-badge">{{ industryResults.industry }}</span>
            <span class="industry-overall" :class="getIndustryScoreClass(industryResults.scores.overall)">
              {{ industryResults.scores.overall }}% match
            </span>
          </div>
        </div>

        <div class="industry-scores">
          <div class="ind-score-item">
            <span>Keywords</span>
            <div class="breakdown-bar">
              <div class="breakdown-fill ind-fill" :style="{ width: industryResults.scores.keywords + '%' }"></div>
            </div>
            <span>{{ industryResults.scores.keywords }}%</span>
          </div>
          <div class="ind-score-item">
            <span>Skills</span>
            <div class="breakdown-bar">
              <div class="breakdown-fill ind-fill" :style="{ width: industryResults.scores.skills + '%' }"></div>
            </div>
            <span>{{ industryResults.scores.skills }}%</span>
          </div>
          <div class="ind-score-item">
            <span>Action Verbs</span>
            <div class="breakdown-bar">
              <div class="breakdown-fill ind-fill" :style="{ width: industryResults.scores.actionVerbs + '%' }"></div>
            </div>
            <span>{{ industryResults.scores.actionVerbs }}%</span>
          </div>
        </div>

        <div v-if="industryResults.missing.skills.length" class="missing-items">
          <h4>Missing industry skills:</h4>
          <div class="keyword-tags">
            <span v-for="skill in industryResults.missing.skills" :key="skill" class="keyword-tag missing">{{ skill }}</span>
          </div>
        </div>

        <div v-if="industryResults.suggestions.length" class="industry-suggestions">
          <h4>Industry-specific suggestions:</h4>
          <div v-for="sug in industryResults.suggestions" :key="sug.title" class="ind-suggestion" :class="sug.severity">
            <strong>{{ sug.title }}</strong>
            <p>{{ sug.action }}</p>
          </div>
        </div>

        <div v-if="industryResults.tips.length" class="industry-tips">
          <h4>Tips for {{ industryResults.industry }}:</h4>
          <ul>
            <li v-for="tip in industryResults.tips" :key="tip">{{ tip }}</li>
          </ul>
        </div>
      </div>

      <!-- Writing Quality (Grammar Checker) -->
      <div v-if="grammarResults" class="grammar-section">
        <h3>
          <i class="fas fa-spell-check"></i>
          Writing Quality
          <span class="grammar-count" :class="grammarResults.high.length > 0 ? 'has-issues' : 'clean'">
            {{ grammarResults.total === 0 ? 'Clean' : grammarResults.total + ' issue' + (grammarResults.total !== 1 ? 's' : '') }}
          </span>
        </h3>

        <div class="grammar-summary">
          <div class="grammar-stat" :class="{ active: grammarResults.summary.spelling > 0 }">
            <span class="stat-num">{{ grammarResults.summary.spelling }}</span>
            <span class="stat-label">Spelling</span>
          </div>
          <div class="grammar-stat" :class="{ active: grammarResults.summary.grammar > 0 }">
            <span class="stat-num">{{ grammarResults.summary.grammar }}</span>
            <span class="stat-label">Grammar</span>
          </div>
          <div class="grammar-stat" :class="{ active: grammarResults.summary.style > 0 }">
            <span class="stat-num">{{ grammarResults.summary.style }}</span>
            <span class="stat-label">Style</span>
          </div>
        </div>

        <p v-if="grammarResults.total === 0" class="no-grammar-issues">
          <i class="fas fa-trophy"></i>
          No writing issues found. Your resume reads clearly and professionally.
        </p>

        <div v-if="grammarResults.high.length" class="grammar-issues-list">
          <h4>High priority issues:</h4>
          <div v-for="issue in grammarResults.high.slice(0, 8)" :key="issue.location + issue.issue" class="grammar-issue high">
            <div class="issue-meta">
              <span class="issue-type">{{ issue.type }}</span>
              <span class="issue-location">{{ issue.location }}</span>
            </div>
            <p class="issue-text">{{ issue.issue }}</p>
            <p class="issue-suggestion">{{ issue.suggestion }}</p>
            <p v-if="issue.example" class="issue-example">e.g. {{ issue.example }}</p>
          </div>
          <p v-if="grammarResults.high.length > 8" class="more-issues">+{{ grammarResults.high.length - 8 }} more high priority issues</p>
        </div>

        <div v-if="showAllGrammar && grammarResults.medium.length" class="grammar-issues-list">
          <h4>Medium priority issues:</h4>
          <div v-for="issue in grammarResults.medium.slice(0, 6)" :key="issue.location + issue.issue" class="grammar-issue medium">
            <div class="issue-meta">
              <span class="issue-type">{{ issue.type }}</span>
              <span class="issue-location">{{ issue.location }}</span>
            </div>
            <p class="issue-text">{{ issue.issue }}</p>
            <p class="issue-suggestion">{{ issue.suggestion }}</p>
          </div>
        </div>

        <button
          v-if="grammarResults.medium.length + grammarResults.low.length > 0"
          @click="showAllGrammar = !showAllGrammar"
          class="toggle-grammar-btn"
        >
          {{ showAllGrammar ? 'Show less' : `Show ${grammarResults.medium.length + grammarResults.low.length} more issues` }}
        </button>
      </div>

      <!-- ATS Suggestions -->
      <div class="suggestions-section">
        <h3>
          <i class="fas fa-lightbulb"></i>
          Improvement Suggestions ({{ results.suggestions.length }})
        </h3>
        <p v-if="results.suggestions.length === 0" class="no-suggestions">
          <i class="fas fa-trophy"></i>
          Great job! Your resume looks well-optimized for ATS systems.
        </p>
        <div v-else class="suggestions-list">
          <div
            v-for="suggestion in results.suggestions"
            :key="suggestion.id"
            class="suggestion-card"
            :class="suggestion.severity"
          >
            <div class="suggestion-header">
              <span class="severity-badge" :class="suggestion.severity">{{ suggestion.severity }}</span>
              <span class="category-badge">{{ suggestion.category }}</span>
            </div>
            <h4>{{ suggestion.title }}</h4>
            <p class="suggestion-description">{{ suggestion.description }}</p>
            <p class="suggestion-impact"><strong>Impact:</strong> {{ suggestion.impact }}</p>
            <p class="suggestion-action"><strong>Action:</strong> {{ suggestion.action }}</p>
            <p v-if="suggestion.example" class="suggestion-example"><strong>Example:</strong> {{ suggestion.example }}</p>
          </div>
        </div>
      </div>

      <!-- Format Validation -->
      <div class="format-section">
        <h3>Format Validation</h3>
        <div class="format-checks">
          <div class="format-check" :class="{ pass: results.format.usesStandardFonts }">
            <i :class="results.format.usesStandardFonts ? 'fas fa-check-circle' : 'fas fa-times-circle'"></i>
            <span>Standard Font</span>
          </div>
          <div class="format-check" :class="{ pass: results.format.hasClearSections }">
            <i :class="results.format.hasClearSections ? 'fas fa-check-circle' : 'fas fa-times-circle'"></i>
            <span>Clear Sections</span>
          </div>
          <div class="format-check" :class="{ pass: results.format.usesBulletPoints }">
            <i :class="results.format.usesBulletPoints ? 'fas fa-check-circle' : 'fas fa-times-circle'"></i>
            <span>Bullet Points ({{ results.format.bulletPointCount }})</span>
          </div>
          <div class="format-check pass">
            <i class="fas fa-check-circle"></i>
            <span>No Images/Tables</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Help Section -->
    <div class="help-section">
      <h3>What is ATS?</h3>
      <p>
        Applicant Tracking Systems (ATS) are software used by 75% of employers to filter resumes before they reach human recruiters.
        This scanner analyzes your resume for ATS compatibility and provides actionable suggestions for improvement.
      </p>
      <div class="tips">
        <h4>Quick Tips for ATS Success:</h4>
        <ul>
          <li><strong>Use standard fonts:</strong> Arial, Calibri, Times New Roman</li>
          <li><strong>Include keywords:</strong> Match terms from job descriptions</li>
          <li><strong>Use clear headers:</strong> Experience, Education, Skills</li>
          <li><strong>Avoid complex formatting:</strong> No images, tables, or text boxes</li>
          <li><strong>Include metrics:</strong> Quantify your achievements</li>
          <li><strong>Use bullet points:</strong> 2-4 per job position</li>
          <li><strong>Start bullets with action verbs:</strong> Led, Developed, Improved</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import atsService from '@/services/atsService';
import grammarChecker from '@/services/grammarChecker';
import industryOptimization from '@/services/industryOptimization';

export default {
  name: 'ATSScanner',
  props: {
    maindata: { type: Object, required: true }
  },
  data() {
    return {
      jobDescription: '',
      scanning: false,
      results: null,
      grammarResults: null,
      industryResults: null,
      selectedIndustry: '',
      availableIndustries: industryOptimization.getIndustries(),
      showAllGrammar: false
    };
  },
  mounted() {
    this.scanResume();
  },
  watch: {
    maindata: {
      deep: true,
      handler() {
        if (this.scanTimeout) clearTimeout(this.scanTimeout);
        this.scanTimeout = setTimeout(() => { this.scanResume(); }, 1000);
      }
    }
  },
  methods: {
    scanResume() {
      this.scanning = true;
      setTimeout(() => {
        try {
          // ATS analysis
          this.results = atsService.analyzeResume(this.maindata);
          if (this.jobDescription && this.jobDescription.trim()) {
            const text = atsService.extractText(this.maindata);
            this.results.keywords = atsService.analyzeKeywords(text, this.jobDescription.toLowerCase());
          }

          // Grammar check
          this.grammarResults = grammarChecker.checkResume(this.maindata);

          // Industry analysis
          this.runIndustryAnalysis();
        } catch (error) {
          console.error('ATS scan error:', error);
        } finally {
          this.scanning = false;
        }
      }, 500);
    },

    runIndustryAnalysis() {
      try {
        if (this.selectedIndustry) {
          this.industryResults = industryOptimization.analyzeForIndustry(this.maindata, this.selectedIndustry);
        } else {
          const suggestion = industryOptimization.suggestIndustry(this.maindata);
          if (suggestion && suggestion.topMatch && suggestion.topMatch.score > 0) {
            this.industryResults = industryOptimization.analyzeForIndustry(this.maindata, suggestion.topMatch.id);
          } else {
            this.industryResults = null;
          }
        }
      } catch (e) {
        this.industryResults = null;
      }
    },

    getScoreClass(score) {
      if (score >= 90) return 'excellent';
      if (score >= 75) return 'good';
      if (score >= 60) return 'fair';
      return 'poor';
    },
    getScoreMessage(score) {
      if (score >= 90) return 'Your resume is highly optimized for ATS systems!';
      if (score >= 75) return 'Your resume should pass most ATS screenings.';
      if (score >= 60) return 'Your resume needs some improvements for ATS.';
      return 'Your resume may struggle with ATS systems. Follow the suggestions below.';
    },
    getMatchClass(percentage) {
      if (percentage >= 80) return 'excellent';
      if (percentage >= 60) return 'good';
      if (percentage >= 40) return 'fair';
      return 'poor';
    },
    getIndustryScoreClass(score) {
      if (score >= 60) return 'ind-good';
      if (score >= 30) return 'ind-fair';
      return 'ind-poor';
    },
    getGrammarLabel() {
      if (!this.grammarResults) return '';
      const high = this.grammarResults.high.length;
      const total = this.grammarResults.total;
      if (total === 0) return 'Excellent';
      if (high === 0) return 'Good';
      if (high <= 3) return 'Fair';
      return 'Needs Work';
    },
    getGrammarBadgeClass() {
      const label = this.getGrammarLabel();
      if (label === 'Excellent') return 'badge-excellent';
      if (label === 'Good') return 'badge-good';
      if (label === 'Fair') return 'badge-fair';
      return 'badge-poor';
    }
  }
};
</script>

<style scoped>
.ats-scanner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
}

.scanner-header {
  text-align: center;
  margin-bottom: 40px;
}

.scanner-header h2 {
  font-size: 32px;
  color: #2c3e50;
  margin-bottom: 10px;
}

.scanner-header h2 i {
  color: #4299e1;
  margin-right: 10px;
}

.subtitle {
  color: #718096;
  font-size: 16px;
  margin: 0;
}

/* Job Description */
.job-description-section {
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  margin-bottom: 30px;
}

.job-description-section label {
  display: block;
  font-weight: 600;
  margin-bottom: 10px;
  color: #2d3748;
  font-size: 16px;
}

.job-description-section label i {
  color: #4299e1;
  margin-right: 8px;
}

.job-description-section textarea {
  width: 100%;
  padding: 12px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-family: inherit;
  font-size: 14px;
  resize: vertical;
  transition: border-color 0.3s;
}

.job-description-section textarea:focus {
  outline: none;
  border-color: #4299e1;
}

.scan-button {
  width: 100%;
  padding: 14px;
  margin-top: 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
}

.scan-button:hover:not(:disabled) { transform: translateY(-2px); }
.scan-button:disabled { opacity: 0.6; cursor: not-allowed; }
.scan-button i { margin-right: 8px; }

/* Results */
.results-container { animation: fadeInATS 0.5s; }

@keyframes fadeInATS {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Score */
.score-section {
  display: flex;
  align-items: center;
  gap: 40px;
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  margin-bottom: 30px;
}

.score-circle {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 8px solid;
  flex-shrink: 0;
}

.score-circle.excellent { border-color: #48bb78; background: rgba(72,187,120,0.1); color: #48bb78; }
.score-circle.good      { border-color: #4299e1; background: rgba(66,153,225,0.1); color: #4299e1; }
.score-circle.fair      { border-color: #ed8936; background: rgba(237,137,54,0.1); color: #ed8936; }
.score-circle.poor      { border-color: #f56565; background: rgba(245,101,101,0.1); color: #f56565; }

.score-number { font-size: 64px; font-weight: bold; }
.score-label  { font-size: 16px; color: #718096; margin-top: 5px; }

.score-rating h3 { font-size: 28px; margin: 0 0 10px 0; color: #2d3748; }
.score-rating p  { font-size: 16px; color: #718096; margin: 0 0 12px 0; line-height: 1.5; }

.grammar-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
}
.badge-excellent { background: rgba(72,187,120,0.15); color: #38a169; }
.badge-good      { background: rgba(66,153,225,0.15); color: #2b6cb0; }
.badge-fair      { background: rgba(237,137,54,0.15); color: #c05621; }
.badge-poor      { background: rgba(245,101,101,0.15); color: #c53030; }

/* Breakdown */
.breakdown-section, .keywords-section, .skills-section,
.suggestions-section, .format-section, .industry-section, .grammar-section {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  margin-bottom: 30px;
}

.breakdown-section h3, .keywords-section h3, .skills-section h3,
.suggestions-section h3, .format-section h3, .industry-section h3, .grammar-section h3 {
  margin: 0 0 20px 0;
  color: #2d3748;
  display: flex;
  align-items: center;
  gap: 8px;
}

.breakdown-grid { display: grid; gap: 15px; }

.breakdown-item {
  display: grid;
  grid-template-columns: 120px 1fr 80px;
  gap: 15px;
  align-items: center;
}

.breakdown-label { font-weight: 600; color: #2d3748; }

.breakdown-bar {
  height: 12px;
  background: #e2e8f0;
  border-radius: 6px;
  overflow: hidden;
}

.breakdown-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  border-radius: 6px;
  transition: width 0.8s ease;
}

.breakdown-score { text-align: right; font-weight: 600; color: #4299e1; }

/* Keywords */
.keyword-match {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
  padding: 20px;
  background: #f7fafc;
  border-radius: 8px;
}

.match-percentage {
  font-size: 48px;
  font-weight: bold;
  padding: 20px;
  border-radius: 8px;
}
.match-percentage.excellent { background: rgba(72,187,120,0.1); color: #48bb78; }
.match-percentage.good      { background: rgba(66,153,225,0.1); color: #4299e1; }
.match-percentage.fair      { background: rgba(237,137,54,0.1); color: #ed8936; }
.match-percentage.poor      { background: rgba(245,101,101,0.1); color: #f56565; }

.match-details p { margin: 0; color: #2d3748; }

.keyword-lists { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.keyword-list h4 { margin: 0 0 15px 0; color: #2d3748; font-size: 16px; }
.keyword-list h4 i { margin-right: 8px; }
.keyword-list.matched h4 i { color: #48bb78; }
.keyword-list.missing  h4 i { color: #f56565; }

.keyword-tags { display: flex; flex-wrap: wrap; gap: 8px; }

.keyword-tag {
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 13px;
  font-weight: 500;
}
.keyword-tag.matched { background: rgba(72,187,120,0.1); color: #48bb78; border: 1px solid #48bb78; }
.keyword-tag.missing  { background: rgba(245,101,101,0.1); color: #f56565; border: 1px solid #f56565; }

.more-keywords { margin-top: 10px; font-size: 14px; color: #718096; }

/* Skills */
.no-skills { color: #718096; font-style: italic; }
.skill-tags { display: flex; flex-wrap: wrap; gap: 8px; }
.skill-tag {
  padding: 8px 14px;
  background: rgba(66,153,225,0.1);
  color: #4299e1;
  border: 1px solid #4299e1;
  border-radius: 16px;
  font-size: 13px;
  font-weight: 500;
}
.more-skills { margin-top: 10px; font-size: 14px; color: #718096; }

/* Industry Analysis */
.industry-section h3 i { color: #667eea; }

.industry-header { margin-bottom: 20px; }

.industry-select-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  font-size: 14px;
  color: #4a5568;
}

.industry-select {
  padding: 6px 10px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  color: #2d3748;
  cursor: pointer;
}

.industry-match-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.industry-name-badge {
  background: #ebf4ff;
  color: #2b6cb0;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
}

.industry-overall {
  font-size: 18px;
  font-weight: 700;
}
.ind-good { color: #38a169; }
.ind-fair { color: #d69e2e; }
.ind-poor { color: #e53e3e; }

.industry-scores { display: grid; gap: 10px; margin-bottom: 20px; }

.ind-score-item {
  display: grid;
  grid-template-columns: 100px 1fr 50px;
  gap: 12px;
  align-items: center;
  font-size: 14px;
  color: #4a5568;
}

.breakdown-fill.ind-fill {
  background: linear-gradient(90deg, #48bb78 0%, #38a169 100%);
}

.missing-items { margin-bottom: 20px; }
.missing-items h4 { margin: 0 0 10px 0; font-size: 14px; color: #4a5568; }

.industry-suggestions { margin-bottom: 20px; }
.industry-suggestions h4 { margin: 0 0 10px 0; font-size: 14px; color: #4a5568; }

.ind-suggestion {
  padding: 12px 16px;
  border-left: 3px solid;
  border-radius: 4px;
  margin-bottom: 8px;
  font-size: 14px;
}
.ind-suggestion.high   { border-color: #f56565; background: rgba(245,101,101,0.05); }
.ind-suggestion.medium { border-color: #ed8936; background: rgba(237,137,54,0.05); }
.ind-suggestion strong { color: #2d3748; display: block; margin-bottom: 4px; }
.ind-suggestion p      { margin: 0; color: #718096; }

.industry-tips h4 { margin: 0 0 8px 0; font-size: 14px; color: #4a5568; }
.industry-tips ul { margin: 0; padding-left: 20px; list-style-type: disc; }
.industry-tips li { font-size: 14px; color: #718096; margin: 4px 0; }

/* Grammar Section */
.grammar-section h3 i { color: #48bb78; }

.grammar-count {
  font-size: 14px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 12px;
  margin-left: 8px;
}
.grammar-count.clean      { background: rgba(72,187,120,0.15); color: #38a169; }
.grammar-count.has-issues { background: rgba(245,101,101,0.15); color: #c53030; }

.grammar-summary {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.grammar-stat {
  flex: 1;
  text-align: center;
  padding: 16px;
  background: #f7fafc;
  border-radius: 8px;
  border: 2px solid transparent;
}

.grammar-stat.active { border-color: #f56565; background: rgba(245,101,101,0.05); }

.stat-num {
  display: block;
  font-size: 28px;
  font-weight: 700;
  color: #2d3748;
}

.stat-label {
  display: block;
  font-size: 12px;
  color: #718096;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 4px;
}

.no-grammar-issues {
  color: #48bb78;
  font-size: 16px;
  padding: 20px;
  background: rgba(72,187,120,0.1);
  border-radius: 8px;
  text-align: center;
}
.no-grammar-issues i { margin-right: 8px; }

.grammar-issues-list { margin-bottom: 16px; }
.grammar-issues-list h4 { margin: 0 0 10px 0; font-size: 14px; color: #4a5568; }

.grammar-issue {
  padding: 12px 16px;
  border-left: 3px solid;
  border-radius: 4px;
  margin-bottom: 8px;
  font-size: 13px;
}
.grammar-issue.high   { border-color: #f56565; background: rgba(245,101,101,0.05); }
.grammar-issue.medium { border-color: #ed8936; background: rgba(237,137,54,0.05); }
.grammar-issue.low    { border-color: #718096; background: rgba(113,128,150,0.05); }

.issue-meta {
  display: flex;
  gap: 8px;
  margin-bottom: 4px;
}

.issue-type {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: #e2e8f0;
  padding: 2px 8px;
  border-radius: 4px;
  color: #4a5568;
}

.issue-location {
  font-size: 11px;
  color: #718096;
  padding: 2px 0;
}

.issue-text       { margin: 0 0 4px 0; color: #2d3748; font-weight: 500; }
.issue-suggestion { margin: 0 0 4px 0; color: #718096; }
.issue-example    { margin: 0; color: #4299e1; font-style: italic; }

.more-issues { font-size: 13px; color: #718096; margin-top: 8px; }

.toggle-grammar-btn {
  background: none;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 13px;
  color: #4299e1;
  cursor: pointer;
  transition: background 0.2s;
}
.toggle-grammar-btn:hover { background: #ebf8ff; }

/* Suggestions */
.suggestions-section h3 i { color: #ed8936; margin-right: 8px; }

.no-suggestions {
  color: #48bb78;
  font-size: 16px;
  padding: 20px;
  background: rgba(72,187,120,0.1);
  border-radius: 8px;
  text-align: center;
}
.no-suggestions i { margin-right: 8px; font-size: 20px; }

.suggestions-list { display: grid; gap: 15px; }

.suggestion-card {
  padding: 20px;
  border-left: 4px solid;
  border-radius: 8px;
  background: #f7fafc;
}
.suggestion-card.critical    { border-left-color: #f56565; background: rgba(245,101,101,0.05); }
.suggestion-card.important   { border-left-color: #ed8936; background: rgba(237,137,54,0.05); }
.suggestion-card.recommended { border-left-color: #4299e1; background: rgba(66,153,225,0.05); }
.suggestion-card.optional    { border-left-color: #718096; background: rgba(113,128,150,0.05); }

.suggestion-header { display: flex; gap: 10px; margin-bottom: 10px; }

.severity-badge, .category-badge {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
}
.severity-badge.critical    { background: #f56565; color: white; }
.severity-badge.important   { background: #ed8936; color: white; }
.severity-badge.recommended { background: #4299e1; color: white; }
.severity-badge.optional    { background: #718096; color: white; }

.category-badge { background: #e2e8f0; color: #2d3748; }

.suggestion-card h4 { margin: 0 0 10px 0; color: #2d3748; font-size: 16px; }

.suggestion-description, .suggestion-impact, .suggestion-action, .suggestion-example {
  margin: 8px 0;
  font-size: 14px;
  color: #4a5568;
  line-height: 1.5;
}

/* Format */
.format-checks {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.format-check {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px;
  border-radius: 8px;
  background: #f7fafc;
}
.format-check i { font-size: 24px; }
.format-check.pass i { color: #48bb78; }
.format-check:not(.pass) i { color: #f56565; }
.format-check span { font-weight: 500; color: #2d3748; }

/* Help */
.help-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  border-radius: 12px;
  margin-top: 30px;
}
.help-section h3 { margin: 0 0 15px 0; font-size: 24px; }
.help-section p   { line-height: 1.6; margin-bottom: 20px; }
.tips h4          { margin: 0 0 10px 0; }
.tips ul          { margin: 0; padding-left: 20px; list-style-type: disc; }
.tips li          { margin: 8px 0; line-height: 1.5; }
.tips li strong   { font-weight: 600; }

/* Responsive */
@media (max-width: 768px) {
  .ats-scanner { padding: 20px 15px; }
  .scanner-header h2 { font-size: 24px; }
  .score-section { flex-direction: column; text-align: center; padding: 30px 20px; }
  .score-circle { width: 150px; height: 150px; }
  .score-number { font-size: 48px; }
  .keyword-lists { grid-template-columns: 1fr; }
  .breakdown-item { grid-template-columns: 1fr; gap: 8px; }
  .breakdown-score { text-align: left; }
  .format-checks { grid-template-columns: 1fr; }
  .grammar-summary { flex-direction: column; }
  .ind-score-item { grid-template-columns: 1fr; gap: 4px; }
}
</style>
