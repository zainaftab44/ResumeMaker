// Grammar and Spelling Checker Service
// Provides basic grammar, spelling, and style checks for resumes

class GrammarCheckerService {
  constructor() {
    // Common resume-specific issues
    this.commonMisspellings = {
      'recieve': 'receive',
      'acheive': 'achieve',
      'managment': 'management',
      'responsibilites': 'responsibilities',
      'experiance': 'experience',
      'refered': 'referred',
      'occured': 'occurred',
      'sucessful': 'successful',
      'seperate': 'separate',
      'definately': 'definitely',
      'enviroment': 'environment',
      'accomodate': 'accommodate',
      'occassion': 'occasion',
      'recomend': 'recommend',
      'begining': 'beginning',
      'untill': 'until',
      'writting': 'writing'
    };

    // Weak action verbs to avoid
    this.weakVerbs = [
      'did', 'made', 'got', 'had', 'was', 'were', 
      'helped', 'worked', 'did work', 'responsible for'
    ];

    // Strong action verbs to suggest
    this.strongVerbs = [
      'led', 'managed', 'developed', 'created', 'implemented',
      'achieved', 'improved', 'increased', 'reduced', 'streamlined',
      'optimized', 'designed', 'built', 'launched', 'delivered',
      'spearheaded', 'drove', 'executed', 'orchestrated', 'pioneered'
    ];

    // Passive voice indicators
    this.passiveIndicators = [
      'was ', 'were ', 'been ', 'being ',
      'was done', 'were done', 'was created', 'were created',
      'was managed', 'were managed', 'was led', 'were led'
    ];

    // Resume buzzwords to avoid
    this.buzzwords = [
      'team player', 'hard worker', 'detail-oriented',
      'self-starter', 'go-getter', 'think outside the box',
      'synergy', 'leverage', 'paradigm', 'proactive'
    ];
  }

  /**
   * Check entire resume for grammar and style issues
   */
  checkResume(resumeData) {
    const issues = [];

    // Check profile
    if (resumeData.profile) {
      issues.push(...this.checkText(resumeData.profile.summary, 'Summary'));
    }

    // Check experience
    if (resumeData.exps) {
      resumeData.exps.forEach((exp, i) => {
        if (exp.resp) {
          exp.resp.forEach((bullet, j) => {
            issues.push(...this.checkText(bullet, `Experience ${i + 1}, Bullet ${j + 1}`));
          });
        }
      });
    }

    // Check projects
    if (resumeData.projs) {
      resumeData.projs.forEach((proj, i) => {
        if (proj.desc) {
          issues.push(...this.checkText(proj.desc, `Project ${i + 1} Description`));
        }
        if (proj.resp) {
          proj.resp.forEach((bullet, j) => {
            issues.push(...this.checkText(bullet, `Project ${i + 1}, Bullet ${j + 1}`));
          });
        }
      });
    }

    return this.categorizeIssues(issues);
  }

  /**
   * Check individual text for issues
   */
  checkText(text, location) {
    if (!text || typeof text !== 'string') return [];

    const issues = [];
    const lowerText = text.toLowerCase();

    // Check spelling
    issues.push(...this.checkSpelling(text, location));

    // Check grammar
    issues.push(...this.checkGrammar(text, location));

    // Check style
    issues.push(...this.checkStyle(text, location));

    // Check passive voice
    issues.push(...this.checkPassiveVoice(lowerText, location));

    // Check weak verbs
    issues.push(...this.checkWeakVerbs(lowerText, location));

    // Check buzzwords
    issues.push(...this.checkBuzzwords(lowerText, location));

    // Check capitalization
    issues.push(...this.checkCapitalization(text, location));

    // Check punctuation
    issues.push(...this.checkPunctuation(text, location));

    return issues;
  }

  /**
   * Check for spelling errors
   */
  checkSpelling(text, location) {
    const issues = [];
    const words = text.split(/\s+/);

    words.forEach(word => {
      const cleaned = word.toLowerCase().replace(/[^a-z]/g, '');
      if (this.commonMisspellings[cleaned]) {
        issues.push({
          type: 'spelling',
          severity: 'high',
          location,
          issue: `Possible misspelling: "${word}"`,
          suggestion: `Did you mean "${this.commonMisspellings[cleaned]}"?`,
          original: word,
          replacement: this.commonMisspellings[cleaned]
        });
      }
    });

    return issues;
  }

  /**
   * Check basic grammar
   */
  checkGrammar(text, location) {
    const issues = [];

    // Check for double spaces
    if (text.includes('  ')) {
      issues.push({
        type: 'grammar',
        severity: 'low',
        location,
        issue: 'Double spaces found',
        suggestion: 'Use single spaces between words'
      });
    }

    // Check for missing period at end
    if (text.length > 10 && !text.match(/[.!?]$/)) {
      issues.push({
        type: 'grammar',
        severity: 'low',
        location,
        issue: 'Missing punctuation at end',
        suggestion: 'End sentences with proper punctuation'
      });
    }

    // Check for lowercase "i"
    if (text.match(/\bi\b/)) {
      issues.push({
        type: 'grammar',
        severity: 'high',
        location,
        issue: 'Lowercase "i" found',
        suggestion: 'Use uppercase "I" for first person pronoun'
      });
    }

    return issues;
  }

  /**
   * Check writing style
   */
  checkStyle(text, location) {
    const issues = [];

    // Check for first person (resumes should be third person implied)
    if (text.match(/\b(I|my|me|mine)\b/i)) {
      issues.push({
        type: 'style',
        severity: 'medium',
        location,
        issue: 'First person pronoun used',
        suggestion: 'Resumes should avoid "I", "my", "me" - use action verbs directly',
        example: 'Instead of "I managed a team", use "Managed team of 5"'
      });
    }

    // Check for articles in bullets
    if (text.match(/^(The|A|An)\s/)) {
      issues.push({
        type: 'style',
        severity: 'low',
        location,
        issue: 'Bullet starts with article',
        suggestion: 'Resume bullets should start with action verbs, not articles',
        example: 'Instead of "The project was...", use "Led project to..."'
      });
    }

    // Check sentence length (bullets should be concise)
    const wordCount = text.split(/\s+/).length;
    if (wordCount > 30) {
      issues.push({
        type: 'style',
        severity: 'medium',
        location,
        issue: `Long sentence (${wordCount} words)`,
        suggestion: 'Keep bullets concise (15-25 words). Split into multiple bullets if needed.'
      });
    }

    return issues;
  }

  /**
   * Check for passive voice
   */
  checkPassiveVoice(text, location) {
    const issues = [];

    this.passiveIndicators.forEach(indicator => {
      if (text.includes(indicator)) {
        issues.push({
          type: 'style',
          severity: 'medium',
          location,
          issue: 'Passive voice detected',
          suggestion: 'Use active voice for stronger impact',
          example: 'Instead of "was managed by me", use "Managed"'
        });
      }
    });

    return issues;
  }

  /**
   * Check for weak action verbs
   */
  checkWeakVerbs(text, location) {
    const issues = [];
    const firstWord = text.split(/\s+/)[0]?.toLowerCase();

    if (this.weakVerbs.includes(firstWord)) {
      issues.push({
        type: 'style',
        severity: 'high',
        location,
        issue: `Weak action verb: "${firstWord}"`,
        suggestion: `Use stronger verbs like: ${this.getRandomStrongVerbs(3).join(', ')}`,
        example: `"${this.getRandomStrongVerbs(1)[0]} ${text.split(/\s+/).slice(1).join(' ')}"`
      });
    }

    return issues;
  }

  /**
   * Check for buzzwords
   */
  checkBuzzwords(text, location) {
    const issues = [];

    this.buzzwords.forEach(buzzword => {
      if (text.includes(buzzword)) {
        issues.push({
          type: 'style',
          severity: 'medium',
          location,
          issue: `Buzzword detected: "${buzzword}"`,
          suggestion: 'Use specific, measurable accomplishments instead of generic phrases',
          example: 'Instead of "team player", use "Collaborated with cross-functional team of 8"'
        });
      }
    });

    return issues;
  }

  /**
   * Check capitalization
   */
  checkCapitalization(text, location) {
    const issues = [];

    // Check if first letter is lowercase (bullets should start capitalized)
    if (text.length > 0 && text[0] === text[0].toLowerCase()) {
      issues.push({
        type: 'grammar',
        severity: 'medium',
        location,
        issue: 'Bullet starts with lowercase letter',
        suggestion: 'Start bullets with capital letters'
      });
    }

    return issues;
  }

  /**
   * Check punctuation
   */
  checkPunctuation(text, location) {
    const issues = [];

    // Check for comma splices (very basic check)
    const commaCount = (text.match(/,/g) || []).length;
    if (commaCount > 3) {
      issues.push({
        type: 'grammar',
        severity: 'low',
        location,
        issue: 'Many commas detected',
        suggestion: 'Consider breaking into multiple sentences or using semicolons'
      });
    }

    return issues;
  }

  /**
   * Categorize issues by severity
   */
  categorizeIssues(issues) {
    const high = issues.filter(i => i.severity === 'high');
    const medium = issues.filter(i => i.severity === 'medium');
    const low = issues.filter(i => i.severity === 'low');

    return {
      all: issues,
      high,
      medium,
      low,
      total: issues.length,
      summary: {
        spelling: issues.filter(i => i.type === 'spelling').length,
        grammar: issues.filter(i => i.type === 'grammar').length,
        style: issues.filter(i => i.type === 'style').length
      }
    };
  }

  /**
   * Get random strong verbs
   */
  getRandomStrongVerbs(count) {
    const shuffled = [...this.strongVerbs].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  /**
   * Get suggestions for improving text
   */
  getSuggestions(text) {
    const suggestions = [];

    // Check if starts with action verb
    const firstWord = text.split(/\s+/)[0]?.toLowerCase();
    if (!this.strongVerbs.includes(firstWord)) {
      suggestions.push({
        type: 'improvement',
        message: 'Start with a strong action verb',
        examples: this.getRandomStrongVerbs(5)
      });
    }

    // Check for metrics
    if (!text.match(/\d+/)) {
      suggestions.push({
        type: 'improvement',
        message: 'Add quantifiable metrics',
        examples: ['40%', '5 team members', '$2M', '10,000 users']
      });
    }

    return suggestions;
  }

  /**
   * Quick check - returns simple pass/fail
   */
  quickCheck(text) {
    const issues = this.checkText(text, 'Quick Check');
    return {
      passed: issues.filter(i => i.severity === 'high').length === 0,
      issueCount: issues.length,
      highPriorityCount: issues.filter(i => i.severity === 'high').length
    };
  }

  /**
   * Auto-fix simple issues
   */
  autoFix(text) {
    let fixed = text;

    // Fix common misspellings
    Object.keys(this.commonMisspellings).forEach(wrong => {
      const right = this.commonMisspellings[wrong];
      const regex = new RegExp(`\\b${wrong}\\b`, 'gi');
      fixed = fixed.replace(regex, right);
    });

    // Fix double spaces
    fixed = fixed.replace(/\s\s+/g, ' ');

    // Fix lowercase i
    fixed = fixed.replace(/\bi\b/g, 'I');

    // Capitalize first letter
    if (fixed.length > 0) {
      fixed = fixed[0].toUpperCase() + fixed.slice(1);
    }

    return fixed;
  }
}

export default new GrammarCheckerService();
