import { skillsDatabase, actionVerbs, industryKeywords } from '../data/skillsDatabase';

class ATSService {
  constructor() {
    this.skillsDb = skillsDatabase;
    this.actionVerbs = actionVerbs;
    this.industryKeywords = industryKeywords;
  }

  /**
   * Main analysis function - analyzes entire resume
   */
  analyzeResume(resumeData) {
    const text = this.extractText(resumeData);
    
    return {
      score: this.calculateScore(resumeData, text),
      keywords: { resumeKeywords: [], matchedKeywords: [], missingKeywords: [], matchPercentage: 0 },
      format: this.validateFormat(resumeData),
      skills: this.extractSkills(text),
      suggestions: this.generateSuggestions(resumeData, text),
      text: text // For debugging
    };
  }

  /**
   * Extract all text content from resume data
   */
  extractText(resumeData) {
    let text = '';
    
    try {
      // Profile
      if (resumeData.profile) {
        text += (resumeData.profile.name || '') + ' ';
        text += (resumeData.profile.title || '') + ' ';
        text += (resumeData.profile.email || '') + ' ';
        text += (resumeData.profile.phone || '') + ' ';
        text += (resumeData.profile.summary || '') + ' ';
      }
      
      // Experience
      if (resumeData.exps && Array.isArray(resumeData.exps)) {
        resumeData.exps.forEach(exp => {
          text += (exp.title || '') + ' ';
          text += (exp.company || '') + ' ';
          text += (exp.location || '') + ' ';
          if (exp.resp && Array.isArray(exp.resp)) {
            text += exp.resp.join(' ') + ' ';
          }
        });
      }
      
      // Education
      if (resumeData.eds && Array.isArray(resumeData.eds)) {
        resumeData.eds.forEach(ed => {
          text += (ed.degree || '') + ' ';
          text += (ed.major || '') + ' ';
          text += (ed.institute || '') + ' ';
          text += (ed.location || '') + ' ';
        });
      }
      
      // Skills
      if (resumeData.skills && Array.isArray(resumeData.skills)) {
        resumeData.skills.forEach(skill => {
          text += (skill.type || '') + ' ';
          if (skill.name && Array.isArray(skill.name)) {
            text += skill.name.join(' ') + ' ';
          }
        });
      }
      
      // Projects
      if (resumeData.projs && Array.isArray(resumeData.projs)) {
        resumeData.projs.forEach(proj => {
          text += (proj.title || '') + ' ';
          text += (proj.desc || '') + ' ';
          if (proj.resp && Array.isArray(proj.resp)) {
            text += proj.resp.join(' ') + ' ';
          }
          if (proj.tools && Array.isArray(proj.tools)) {
            text += proj.tools.join(' ') + ' ';
          }
        });
      }
    } catch (error) {
      console.error('Error extracting text:', error);
    }
    
    return text.toLowerCase().trim();
  }

  /**
   * Calculate overall ATS score (0-100)
   */
  calculateScore(resumeData, text) {
    const formatScore = this.calculateFormatScore(resumeData);
    const keywordScore = this.calculateKeywordScore(text);
    const contentScore = this.calculateContentScore(resumeData);
    const optimizationScore = this.calculateOptimizationScore(text);
    
    const totalScore = 
      formatScore * 0.25 +
      keywordScore * 0.35 +
      contentScore * 0.25 +
      optimizationScore * 0.15;
    
    return {
      total: Math.round(totalScore),
      breakdown: {
        format: Math.round(formatScore),
        keywords: Math.round(keywordScore),
        content: Math.round(contentScore),
        optimization: Math.round(optimizationScore)
      },
      rating: this.getRating(totalScore)
    };
  }

  /**
   * Calculate format compatibility score (25 points)
   */
  calculateFormatScore(resumeData) {
    let score = 0;
    
    // Check font (5 points)
    const standardFonts = [
      'Arial', 'Calibri', 'Times New Roman', 'Georgia', 
      'Helvetica', 'Verdana', 'Trebuchet MS'
    ];
    if (resumeData.settings && standardFonts.includes(resumeData.settings.font)) {
      score += 5;
    }
    
    // Check sections (10 points)
    const hasBasicSections = 
      resumeData.profile && resumeData.profile.name &&
      resumeData.exps && resumeData.exps.length > 0 &&
      resumeData.eds && resumeData.eds.length > 0 &&
      resumeData.skills && resumeData.skills.length > 0;
    
    if (hasBasicSections) score += 10;
    
    // Check bullet points (5 points)
    const hasBullets = resumeData.exps && resumeData.exps.some(exp => 
      exp.resp && exp.resp.length > 0
    );
    if (hasBullets) score += 5;
    
    // No problematic elements (5 points) - web version is clean
    score += 5;
    
    return score;
  }

  /**
   * Calculate keyword score (35 points)
   */
  calculateKeywordScore(text) {
    let score = 0;
    
    // Industry keywords (10 points)
    const allIndustryKeywords = Object.values(this.industryKeywords).flat();
    const foundKeywords = allIndustryKeywords.filter(kw => 
      text.includes(kw.toLowerCase())
    );
    score += Math.min(10, foundKeywords.length);
    
    // Skills (10 points)
    const skills = this.extractSkills(text);
    score += Math.min(10, skills.length / 2);
    
    // Action verbs (10 points)
    const foundVerbs = this.actionVerbs.filter(verb => 
      text.includes(verb.toLowerCase())
    );
    score += Math.min(10, foundVerbs.length);
    
    // Keyword variety (5 points)
    const uniqueWords = new Set(text.split(/\s+/).filter(w => w.length > 3));
    if (uniqueWords.size > 100) score += 5;
    else if (uniqueWords.size > 50) score += 3;
    else if (uniqueWords.size > 25) score += 1;
    
    return score;
  }

  /**
   * Calculate content quality score (25 points)
   */
  calculateContentScore(resumeData) {
    let score = 0;
    
    // Work experience (10 points)
    if (resumeData.exps && resumeData.exps.length > 0) {
      score += 5;
      if (resumeData.exps.length >= 2) score += 3;
      if (resumeData.exps.some(e => e.resp && e.resp.length >= 3)) score += 2;
    }
    
    // Education (5 points)
    if (resumeData.eds && resumeData.eds.length > 0) {
      score += 5;
    }
    
    // Skills (5 points)
    if (resumeData.skills && resumeData.skills.length > 0) {
      score += 3;
      if (resumeData.skills.length >= 3) score += 2;
    }
    
    // Summary (5 points)
    if (resumeData.profile && resumeData.profile.summary) {
      score += 3;
      if (resumeData.profile.summary.length >= 100) score += 2;
    }
    
    return score;
  }

  /**
   * Calculate optimization score (15 points)
   */
  calculateOptimizationScore(text) {
    let score = 0;
    
    // No keyword stuffing (5 points)
    const words = text.split(/\s+/);
    const wordCount = {};
    words.forEach(word => {
      if (word.length > 3) {
        wordCount[word] = (wordCount[word] || 0) + 1;
      }
    });
    
    const maxFrequency = Math.max(...Object.values(wordCount), 0);
    if (maxFrequency < 10) score += 5;
    else if (maxFrequency < 15) score += 3;
    
    // Proper length (5 points)
    const wordLength = words.length;
    if (wordLength >= 300 && wordLength <= 800) {
      score += 5;
    } else if (wordLength >= 200 && wordLength <= 1000) {
      score += 3;
    } else if (wordLength >= 100) {
      score += 1;
    }
    
    // Action verbs (5 points)
    const foundVerbs = this.actionVerbs.filter(verb => text.includes(verb));
    score += Math.min(5, foundVerbs.length);
    
    return score;
  }

  /**
   * Extract skills from text
   */
  extractSkills(text) {
    const foundSkills = [];
    const textLower = text.toLowerCase();
    
    this.skillsDb.forEach(skill => {
      if (textLower.includes(skill.toLowerCase())) {
        foundSkills.push(skill);
      }
    });
    
    return [...new Set(foundSkills)]; // Remove duplicates
  }

  /**
   * Analyze keywords against job description
   */
  analyzeKeywords(text, jobDescription = '') {
    const resumeKeywords = this.extractKeywords(text);
    
    if (!jobDescription || jobDescription.trim() === '') {
      return {
        resumeKeywords,
        matchedKeywords: [],
        missingKeywords: [],
        matchPercentage: 0
      };
    }
    
    const jdKeywords = this.extractKeywords(jobDescription.toLowerCase());
    const matched = resumeKeywords.filter(kw => jdKeywords.includes(kw));
    const missing = jdKeywords.filter(kw => !resumeKeywords.includes(kw));
    
    const matchPercentage = jdKeywords.length > 0 
      ? Math.round((matched.length / jdKeywords.length) * 100)
      : 0;
    
    return {
      resumeKeywords,
      matchedKeywords: matched,
      missingKeywords: missing,
      matchPercentage
    };
  }

  /**
   * Extract keywords from text
   */
  extractKeywords(text) {
    const stopWords = [
      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
      'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been',
      'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
      'should', 'could', 'may', 'might', 'must', 'can', 'this', 'that',
      'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they'
    ];
    
    const words = text.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => 
        word.length > 3 && 
        !stopWords.includes(word) &&
        isNaN(word)
      );
    
    // Count frequency
    const wordCount = {};
    words.forEach(word => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });
    
    // Get top keywords
    return Object.entries(wordCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 30)
      .map(([word]) => word);
  }

  /**
   * Validate format
   */
  validateFormat(resumeData) {
    const standardFonts = [
      'Arial', 'Calibri', 'Times New Roman', 'Georgia', 
      'Helvetica', 'Verdana', 'Trebuchet MS'
    ];
    
    const font = resumeData.settings ? resumeData.settings.font : '';
    const isStandardFont = standardFonts.includes(font);
    
    return {
      usesStandardFonts: isStandardFont,
      fontIssues: isStandardFont ? [] : [`Font "${font}" may not be ATS-friendly`],
      hasClearSections: true,
      missingSections: this.findMissingSections(resumeData),
      hasImages: false,
      hasTables: false,
      hasTextBoxes: false,
      usesBulletPoints: this.hasBulletPoints(resumeData),
      bulletPointCount: this.countBulletPoints(resumeData)
    };
  }

  /**
   * Find missing resume sections
   */
  findMissingSections(resumeData) {
    const missing = [];
    
    if (!resumeData.profile || !resumeData.profile.name) {
      missing.push('Contact Information');
    }
    if (!resumeData.profile || !resumeData.profile.summary) {
      missing.push('Professional Summary');
    }
    if (!resumeData.exps || resumeData.exps.length === 0) {
      missing.push('Work Experience');
    }
    if (!resumeData.eds || resumeData.eds.length === 0) {
      missing.push('Education');
    }
    if ((!resumeData.skills || resumeData.skills.length === 0) && (!resumeData.skills2 || resumeData.skills2.length === 0)) {
      missing.push('Skills');
    }
    
    return missing;
  }

  /**
   * Check if resume has bullet points
   */
  hasBulletPoints(resumeData) {
    if (!resumeData.exps) return false;
    return resumeData.exps.some(exp => exp.resp && exp.resp.length > 0);
  }

  /**
   * Count total bullet points
   */
  countBulletPoints(resumeData) {
    let count = 0;
    
    if (resumeData.exps) {
      resumeData.exps.forEach(exp => {
        if (exp.resp) count += exp.resp.length;
      });
    }
    
    if (resumeData.projs) {
      resumeData.projs.forEach(proj => {
        if (proj.resp) count += proj.resp.length;
      });
    }
    
    return count;
  }

  /**
   * Generate improvement suggestions
   */
  generateSuggestions(resumeData, text) {
    const suggestions = [];
    
    // Critical: Missing sections
    const missingSections = this.findMissingSections(resumeData);
    missingSections.forEach(section => {
      suggestions.push({
        id: `missing-${section.replace(/\s+/g, '-').toLowerCase()}`,
        severity: 'critical',
        category: 'Content',
        title: `Add ${section}`,
        description: `Your resume is missing the ${section} section`,
        impact: 'ATS systems expect this section and may reject resumes without it',
        action: `Navigate to the appropriate tab and add your ${section.toLowerCase()}`
      });
    });
    
    // Important: Font compatibility
    const standardFonts = ['Arial', 'Calibri', 'Times New Roman'];
    const currentFont = resumeData.settings ? resumeData.settings.font : '';
    if (!standardFonts.includes(currentFont)) {
      suggestions.push({
        id: 'font-compatibility',
        severity: 'important',
        category: 'Format',
        title: 'Use ATS-friendly font',
        description: `Font "${currentFont}" may not parse correctly in all ATS systems`,
        impact: 'Some ATS systems struggle with non-standard fonts, potentially missing content',
        action: 'Change to Arial, Calibri, or Times New Roman in the Preview page',
        example: 'Click Preview → Font Family → Select Arial'
      });
    }
    
    // Important: Summary length
    const summaryLength = resumeData.profile && resumeData.profile.summary 
      ? resumeData.profile.summary.length 
      : 0;
    
    if (summaryLength < 50) {
      suggestions.push({
        id: 'summary-length',
        severity: 'important',
        category: 'Content',
        title: 'Expand your professional summary',
        description: summaryLength === 0 
          ? 'Professional summary is missing' 
          : 'Professional summary is too short',
        impact: 'A strong summary helps ATS understand your background and match you to jobs',
        action: 'Write 2-4 sentences (100-200 words) highlighting your experience, skills, and career goals',
        example: 'Results-driven Software Engineer with 5+ years building scalable web applications...'
      });
    }
    
    // Recommended: Bullet points
    const bulletCount = this.countBulletPoints(resumeData);
    if (bulletCount < 5) {
      suggestions.push({
        id: 'add-bullets',
        severity: 'recommended',
        category: 'Content',
        title: 'Add more bullet points',
        description: `You have ${bulletCount} bullet points total. Aim for 10-15 impactful bullets`,
        impact: 'Bullet points improve readability and help ATS extract your achievements',
        action: 'Add 2-4 bullet points per job describing specific achievements with metrics',
        example: 'Increased user engagement by 35% through implementation of new features'
      });
    }
    
    // Recommended: Quantify achievements
    const hasNumbers = /\d+%|\d+\+|\d+x|\$\d+/.test(text);
    if (!hasNumbers) {
      suggestions.push({
        id: 'add-metrics',
        severity: 'recommended',
        category: 'Content',
        title: 'Include quantifiable achievements',
        description: 'Your resume lacks specific numbers and metrics',
        impact: 'ATS systems and recruiters look for measurable results',
        action: 'Add percentages, dollar amounts, or other metrics to your achievements',
        example: 'Reduced deployment time by 60% or Managed team of 8 developers'
      });
    }
    
    // Important: Skills section
    const skillsCount = resumeData.skills ? resumeData.skills.length : 0;
    if (skillsCount < 3) {
      suggestions.push({
        id: 'add-skills',
        severity: 'important',
        category: 'Content',
        title: 'Add more skills',
        description: `You have ${skillsCount} skill categories. Add at least 5 categories`,
        impact: 'Skills section is critical for keyword matching in ATS',
        action: 'Add skill categories like Programming Languages, Tools, Frameworks, Soft Skills',
        example: 'Programming Languages: JavaScript, Python, Java'
      });
    }
    
    // Recommended: Action verbs
    const actionVerbsFound = this.actionVerbs.filter(verb => text.includes(verb));
    if (actionVerbsFound.length < 5) {
      suggestions.push({
        id: 'use-action-verbs',
        severity: 'recommended',
        category: 'Content',
        title: 'Use more action verbs',
        description: `Found ${actionVerbsFound.length} action verbs. Use more to make impact`,
        impact: 'Action verbs make your accomplishments more compelling to ATS and recruiters',
        action: 'Start bullet points with strong verbs like: led, developed, improved, achieved',
        example: 'Led team of 5 developers, Developed new feature, Improved performance by 40%'
      });
    }
    
    // Recommended: Resume length
    const words = text.split(/\s+/).length;
    if (words < 200) {
      suggestions.push({
        id: 'resume-too-short',
        severity: 'recommended',
        category: 'Content',
        title: 'Resume is too short',
        description: `Your resume has approximately ${words} words. Aim for 300-600 words`,
        impact: 'Short resumes may lack detail for ATS keyword matching',
        action: 'Expand your experience descriptions with more detail and achievements'
      });
    } else if (words > 1000) {
      suggestions.push({
        id: 'resume-too-long',
        severity: 'optional',
        category: 'Content',
        title: 'Resume might be too long',
        description: `Your resume has approximately ${words} words. Consider condensing to 600-800 words`,
        impact: 'Very long resumes may not be fully parsed by some ATS systems',
        action: 'Focus on most relevant and recent experiences, remove redundant information'
      });
    }
    
    // Optional: Contact information
    if (!resumeData.profile || !resumeData.profile.email) {
      suggestions.push({
        id: 'add-email',
        severity: 'critical',
        category: 'Contact',
        title: 'Add email address',
        description: 'Your resume is missing an email address',
        impact: 'Recruiters need a way to contact you',
        action: 'Add your professional email address in the Profile section'
      });
    }
    
    if (!resumeData.profile || !resumeData.profile.phone) {
      suggestions.push({
        id: 'add-phone',
        severity: 'recommended',
        category: 'Contact',
        title: 'Add phone number',
        description: 'Consider adding a phone number',
        impact: 'Provides recruiters an alternative way to reach you',
        action: 'Add your phone number in the Profile section'
      });
    }
    
    // Sort by severity
    const severityOrder = { critical: 0, important: 1, recommended: 2, optional: 3 };
    return suggestions.sort((a, b) => 
      severityOrder[a.severity] - severityOrder[b.severity]
    );
  }

  /**
   * Get rating text based on score
   */
  getRating(score) {
    if (score >= 90) return 'Excellent';
    if (score >= 75) return 'Good';
    if (score >= 60) return 'Fair';
    return 'Needs Improvement';
  }
}

export default new ATSService();
