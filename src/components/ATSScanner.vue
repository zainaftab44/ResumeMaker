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

    <!-- Job Description Input (Optional) -->
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
        </div>
      </div>

      <!-- Score Breakdown -->
      <div class="breakdown-section">
        <h3>Score Breakdown</h3>
        <div class="breakdown-grid">
          <div class="breakdown-item">
            <div class="breakdown-label">Format</div>
            <div class="breakdown-bar">
              <div 
                class="breakdown-fill" 
                :style="{ width: `${(results.score.breakdown.format / 25) * 100}%` }"
              ></div>
            </div>
            <div class="breakdown-score">{{ results.score.breakdown.format }}/25</div>
          </div>

          <div class="breakdown-item">
            <div class="breakdown-label">Keywords</div>
            <div class="breakdown-bar">
              <div 
                class="breakdown-fill" 
                :style="{ width: `${(results.score.breakdown.keywords / 35) * 100}%` }"
              ></div>
            </div>
            <div class="breakdown-score">{{ results.score.breakdown.keywords }}/35</div>
          </div>

          <div class="breakdown-item">
            <div class="breakdown-label">Content</div>
            <div class="breakdown-bar">
              <div 
                class="breakdown-fill" 
                :style="{ width: `${(results.score.breakdown.content / 25) * 100}%` }"
              ></div>
            </div>
            <div class="breakdown-score">{{ results.score.breakdown.content }}/25</div>
          </div>

          <div class="breakdown-item">
            <div class="breakdown-label">Optimization</div>
            <div class="breakdown-bar">
              <div 
                class="breakdown-fill" 
                :style="{ width: `${(results.score.breakdown.optimization / 15) * 100}%` }"
              ></div>
            </div>
            <div class="breakdown-score">{{ results.score.breakdown.optimization }}/15</div>
          </div>
        </div>
      </div>

      <!-- Keywords (if job description provided) -->
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
              <span 
                v-for="keyword in results.keywords.matchedKeywords.slice(0, 15)" 
                :key="keyword"
                class="keyword-tag matched"
              >
                {{ keyword }}
              </span>
            </div>
            <p v-if="results.keywords.matchedKeywords.length > 15" class="more-keywords">
              +{{ results.keywords.matchedKeywords.length - 15 }} more
            </p>
          </div>

          <div class="keyword-list missing">
            <h4><i class="fas fa-exclamation-circle"></i> Missing Keywords</h4>
            <div class="keyword-tags">
              <span 
                v-for="keyword in results.keywords.missingKeywords.slice(0, 15)" 
                :key="keyword"
                class="keyword-tag missing"
              >
                {{ keyword }}
              </span>
            </div>
            <p v-if="results.keywords.missingKeywords.length > 15" class="more-keywords">
              +{{ results.keywords.missingKeywords.length - 15 }} more
            </p>
          </div>
        </div>
      </div>

      <!-- Skills Found -->
      <div class="skills-section">
        <h3>Detected Skills ({{ results.skills.length }})</h3>
        <p v-if="results.skills.length === 0" class="no-skills">
          No skills detected. Add skills to your Skills section to improve your ATS score.
        </p>
        <div v-else class="skill-tags">
          <span 
            v-for="skill in results.skills.slice(0, 30)" 
            :key="skill"
            class="skill-tag"
          >
            {{ skill }}
          </span>
        </div>
        <p v-if="results.skills.length > 30" class="more-skills">
          +{{ results.skills.length - 30 }} more skills detected
        </p>
      </div>

      <!-- Suggestions -->
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
              <span class="severity-badge" :class="suggestion.severity">
                {{ suggestion.severity }}
              </span>
              <span class="category-badge">{{ suggestion.category }}</span>
            </div>
            <h4>{{ suggestion.title }}</h4>
            <p class="suggestion-description">{{ suggestion.description }}</p>
            <p class="suggestion-impact"><strong>Impact:</strong> {{ suggestion.impact }}</p>
            <p class="suggestion-action"><strong>Action:</strong> {{ suggestion.action }}</p>
            <p v-if="suggestion.example" class="suggestion-example">
              <strong>Example:</strong> {{ suggestion.example }}
            </p>
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
            <span>Uses Bullet Points ({{ results.format.bulletPointCount }})</span>
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
          <li><strong>Save as PDF:</strong> Best format for ATS compatibility</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import atsService from '@/services/atsService';

export default {
  name: 'ATSScanner',
  props: {
    maindata: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      jobDescription: '',
      scanning: false,
      results: null
    };
  },
  mounted() {
    // Auto-scan on mount
    this.scanResume();
  },
  watch: {
    maindata: {
      deep: true,
      handler() {
        // Re-scan when resume data changes (debounced)
        if (this.scanTimeout) clearTimeout(this.scanTimeout);
        this.scanTimeout = setTimeout(() => {
          this.scanResume();
        }, 1000);
      }
    }
  },
  methods: {
    scanResume() {
      this.scanning = true;
      
      // Simulate delay for better UX
      setTimeout(() => {
        try {
          this.results = atsService.analyzeResume(this.maindata);
          
          // If job description provided, analyze keywords
          if (this.jobDescription && this.jobDescription.trim()) {
            const text = atsService.extractText(this.maindata);
            this.results.keywords = atsService.analyzeKeywords(
              text, 
              this.jobDescription.toLowerCase()
            );
          }
        } catch (error) {
          console.error('ATS scan error:', error);
          alert('Error scanning resume. Please check the console for details.');
        } finally {
          this.scanning = false;
        }
      }, 500);
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

/* Job Description Section */
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

.scan-button:hover:not(:disabled) {
  transform: translateY(-2px);
}

.scan-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.scan-button i {
  margin-right: 8px;
}

/* Results Container */
.results-container {
  animation: fadeIn 0.5s;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Score Section */
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

.score-circle.excellent {
  border-color: #48bb78;
  background: rgba(72, 187, 120, 0.1);
  color: #48bb78;
}

.score-circle.good {
  border-color: #4299e1;
  background: rgba(66, 153, 225, 0.1);
  color: #4299e1;
}

.score-circle.fair {
  border-color: #ed8936;
  background: rgba(237, 137, 54, 0.1);
  color: #ed8936;
}

.score-circle.poor {
  border-color: #f56565;
  background: rgba(245, 101, 101, 0.1);
  color: #f56565;
}

.score-number {
  font-size: 64px;
  font-weight: bold;
}

.score-label {
  font-size: 16px;
  color: #718096;
  margin-top: 5px;
}

.score-rating h3 {
  font-size: 28px;
  margin: 0 0 10px 0;
  color: #2d3748;
}

.score-rating p {
  font-size: 16px;
  color: #718096;
  margin: 0;
  line-height: 1.5;
}

/* Breakdown Section */
.breakdown-section {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  margin-bottom: 30px;
}

.breakdown-section h3 {
  margin: 0 0 20px 0;
  color: #2d3748;
}

.breakdown-grid {
  display: grid;
  gap: 15px;
}

.breakdown-item {
  display: grid;
  grid-template-columns: 120px 1fr 80px;
  gap: 15px;
  align-items: center;
}

.breakdown-label {
  font-weight: 600;
  color: #2d3748;
}

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

.breakdown-score {
  text-align: right;
  font-weight: 600;
  color: #4299e1;
}

/* Keywords Section */
.keywords-section {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  margin-bottom: 30px;
}

.keywords-section h3 {
  margin: 0 0 20px 0;
  color: #2d3748;
}

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

.match-percentage.excellent {
  background: rgba(72, 187, 120, 0.1);
  color: #48bb78;
}

.match-percentage.good {
  background: rgba(66, 153, 225, 0.1);
  color: #4299e1;
}

.match-percentage.fair {
  background: rgba(237, 137, 54, 0.1);
  color: #ed8936;
}

.match-percentage.poor {
  background: rgba(245, 101, 101, 0.1);
  color: #f56565;
}

.match-details p {
  margin: 0;
  color: #2d3748;
}

.keyword-lists {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.keyword-list h4 {
  margin: 0 0 15px 0;
  color: #2d3748;
  font-size: 16px;
}

.keyword-list h4 i {
  margin-right: 8px;
}

.keyword-list.matched h4 i {
  color: #48bb78;
}

.keyword-list.missing h4 i {
  color: #f56565;
}

.keyword-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.keyword-tag {
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 13px;
  font-weight: 500;
}

.keyword-tag.matched {
  background: rgba(72, 187, 120, 0.1);
  color: #48bb78;
  border: 1px solid #48bb78;
}

.keyword-tag.missing {
  background: rgba(245, 101, 101, 0.1);
  color: #f56565;
  border: 1px solid #f56565;
}

.more-keywords {
  margin-top: 10px;
  font-size: 14px;
  color: #718096;
}

/* Skills Section */
.skills-section {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  margin-bottom: 30px;
}

.skills-section h3 {
  margin: 0 0 15px 0;
  color: #2d3748;
}

.no-skills {
  color: #718096;
  font-style: italic;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-tag {
  padding: 8px 14px;
  background: rgba(66, 153, 225, 0.1);
  color: #4299e1;
  border: 1px solid #4299e1;
  border-radius: 16px;
  font-size: 13px;
  font-weight: 500;
}

.more-skills {
  margin-top: 10px;
  font-size: 14px;
  color: #718096;
}

/* Suggestions Section */
.suggestions-section {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  margin-bottom: 30px;
}

.suggestions-section h3 {
  margin: 0 0 20px 0;
  color: #2d3748;
}

.suggestions-section h3 i {
  color: #ed8936;
  margin-right: 8px;
}

.no-suggestions {
  color: #48bb78;
  font-size: 16px;
  padding: 20px;
  background: rgba(72, 187, 120, 0.1);
  border-radius: 8px;
  text-align: center;
}

.no-suggestions i {
  margin-right: 8px;
  font-size: 20px;
}

.suggestions-list {
  display: grid;
  gap: 15px;
}

.suggestion-card {
  padding: 20px;
  border-left: 4px solid;
  border-radius: 8px;
  background: #f7fafc;
}

.suggestion-card.critical {
  border-left-color: #f56565;
  background: rgba(245, 101, 101, 0.05);
}

.suggestion-card.important {
  border-left-color: #ed8936;
  background: rgba(237, 137, 54, 0.05);
}

.suggestion-card.recommended {
  border-left-color: #4299e1;
  background: rgba(66, 153, 225, 0.05);
}

.suggestion-card.optional {
  border-left-color: #718096;
  background: rgba(113, 128, 150, 0.05);
}

.suggestion-header {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.severity-badge,
.category-badge {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
}

.severity-badge.critical {
  background: #f56565;
  color: white;
}

.severity-badge.important {
  background: #ed8936;
  color: white;
}

.severity-badge.recommended {
  background: #4299e1;
  color: white;
}

.severity-badge.optional {
  background: #718096;
  color: white;
}

.category-badge {
  background: #e2e8f0;
  color: #2d3748;
}

.suggestion-card h4 {
  margin: 0 0 10px 0;
  color: #2d3748;
  font-size: 16px;
}

.suggestion-description,
.suggestion-impact,
.suggestion-action,
.suggestion-example {
  margin: 8px 0;
  font-size: 14px;
  color: #4a5568;
  line-height: 1.5;
}

/* Format Section */
.format-section {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  margin-bottom: 30px;
}

.format-section h3 {
  margin: 0 0 20px 0;
  color: #2d3748;
}

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

.format-check i {
  font-size: 24px;
}

.format-check.pass i {
  color: #48bb78;
}

.format-check:not(.pass) i {
  color: #f56565;
}

.format-check span {
  font-weight: 500;
  color: #2d3748;
}

/* Help Section */
.help-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  border-radius: 12px;
  margin-top: 30px;
}

.help-section h3 {
  margin: 0 0 15px 0;
  font-size: 24px;
}

.help-section p {
  line-height: 1.6;
  margin-bottom: 20px;
}

.tips h4 {
  margin: 0 0 10px 0;
}

.tips ul {
  margin: 0;
  padding-left: 20px;
  list-style-type: disc;
}

.tips li {
  margin: 8px 0;
  line-height: 1.5;
}

.tips li strong {
  font-weight: 600;
}

/* Responsive */
@media (max-width: 768px) {
  .ats-scanner {
    padding: 20px 15px;
  }

  .scanner-header h2 {
    font-size: 24px;
  }

  .score-section {
    flex-direction: column;
    text-align: center;
    padding: 30px 20px;
  }

  .score-circle {
    width: 150px;
    height: 150px;
  }

  .score-number {
    font-size: 48px;
  }

  .keyword-lists {
    grid-template-columns: 1fr;
  }

  .breakdown-item {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .breakdown-score {
    text-align: left;
  }

  .format-checks {
    grid-template-columns: 1fr;
  }
}
</style>
