// LinkedIn Import and Job URL Services

/**
 * LinkedIn Import Service
 * Since we can't use LinkedIn API in client-side app,
 * this provides manual import functionality
 */
class LinkedInImportService {
  /**
   * Parse LinkedIn profile text (manual copy-paste)
   */
  parseLinkedInText(text) {
    const profile = {
      name: '',
      title: '',
      summary: '',
      experience: [],
      education: [],
      skills: []
    };

    try {
      const lines = text.split('\n').map(l => l.trim()).filter(l => l);

      // Try to extract name (usually first line)
      if (lines[0] && lines[0].length < 50) {
        profile.name = lines[0];
      }

      // Try to extract title (usually second line)
      if (lines[1] && lines[1].length < 100) {
        profile.title = lines[1];
      }

      // Extract summary (look for "About" section)
      const aboutIndex = lines.findIndex(l => 
        l.toLowerCase().includes('about') || l.toLowerCase().includes('summary')
      );
      if (aboutIndex !== -1) {
        const summaryLines = [];
        for (let i = aboutIndex + 1; i < lines.length; i++) {
          if (lines[i].toLowerCase().includes('experience') || 
              lines[i].toLowerCase().includes('education')) {
            break;
          }
          summaryLines.push(lines[i]);
        }
        profile.summary = summaryLines.join(' ').substring(0, 500);
      }

      // Extract skills (look for comma-separated or bullet lists)
      const skillsIndex = lines.findIndex(l => l.toLowerCase().includes('skills'));
      if (skillsIndex !== -1) {
        const skillsText = lines.slice(skillsIndex + 1, skillsIndex + 20).join(' ');
        profile.skills = this.extractSkills(skillsText);
      }

    } catch (error) {
      console.error('Error parsing LinkedIn text:', error);
    }

    return profile;
  }

  /**
   * Extract skills from text
   */
  extractSkills(text) {
    // Split by common delimiters
    const skills = text.split(/[,•·\n]/)
      .map(s => s.trim())
      .filter(s => s.length > 1 && s.length < 50);

    return [...new Set(skills)].slice(0, 20);
  }

  /**
   * Import from LinkedIn JSON export (if user has it)
   */
  importFromJSON(jsonData) {
    const profile = {
      name: '',
      title: '',
      summary: '',
      experience: [],
      education: [],
      skills: []
    };

    try {
      if (jsonData.firstName && jsonData.lastName) {
        profile.name = `${jsonData.firstName} ${jsonData.lastName}`;
      }

      if (jsonData.headline) {
        profile.title = jsonData.headline;
      }

      if (jsonData.summary) {
        profile.summary = jsonData.summary;
      }

      if (jsonData.positions) {
        profile.experience = jsonData.positions.map(pos => ({
          title: pos.title || '',
          company: pos.companyName || '',
          location: pos.location || '',
          startDate: pos.startDate || '',
          endDate: pos.endDate || '',
          description: pos.description || ''
        }));
      }

      if (jsonData.education) {
        profile.education = jsonData.education.map(edu => ({
          school: edu.schoolName || '',
          degree: edu.degree || '',
          field: edu.fieldOfStudy || '',
          startYear: edu.startYear || '',
          endYear: edu.endYear || ''
        }));
      }

      if (jsonData.skills) {
        profile.skills = jsonData.skills.map(s => s.name || s).slice(0, 20);
      }

    } catch (error) {
      console.error('Error importing LinkedIn JSON:', error);
    }

    return profile;
  }

  /**
   * Convert to ResumeMaker format
   */
  convertToResumeFormat(linkedInProfile) {
    return {
      profile: {
        name: linkedInProfile.name || '',
        title: linkedInProfile.title || '',
        summary: linkedInProfile.summary || '',
        email: '',
        phone: '',
        linkedin: ''
      },
      exps: linkedInProfile.experience?.map(exp => ({
        title: exp.title || '',
        company: exp.company || '',
        location: exp.location || '',
        start: exp.startDate || '',
        end: exp.endDate || '',
        resp: exp.description ? exp.description.split('\n').filter(l => l.trim()) : []
      })) || [],
      eds: linkedInProfile.education?.map(edu => ({
        degree: edu.degree || '',
        major: edu.field || '',
        institute: edu.school || '',
        start: edu.startYear || '',
        end: edu.endYear || ''
      })) || [],
      skills: linkedInProfile.skills?.length > 0 ? [{
        type: 'LinkedIn Skills',
        name: linkedInProfile.skills
      }] : []
    };
  }

  /**
   * Provide import instructions
   */
  getImportInstructions() {
    return {
      method1: {
        title: 'Copy-Paste Method (Easiest)',
        steps: [
          '1. Open your LinkedIn profile',
          '2. Select all text (Ctrl+A or Cmd+A)',
          '3. Copy (Ctrl+C or Cmd+C)',
          '4. Paste into the import box',
          '5. Click Import'
        ]
      },
      method2: {
        title: 'Download Data Method',
        steps: [
          '1. Go to LinkedIn Settings & Privacy',
          '2. Click "Get a copy of your data"',
          '3. Select "Download larger data archive"',
          '4. Wait for email with download link',
          '5. Upload the JSON file here'
        ]
      },
      method3: {
        title: 'Manual Entry',
        steps: [
          '1. Copy sections one by one',
          '2. Paste each section separately',
          '3. Review and edit as needed'
        ]
      }
    };
  }
}

/**
 * Job URL Keyword Extractor Service
 * Extracts keywords from job postings
 */
class JobURLService {
  /**
   * Extract keywords from job description text
   */
  extractKeywords(jobDescription) {
    const text = jobDescription.toLowerCase();

    // Common stop words to exclude
    const stopWords = new Set([
      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
      'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been',
      'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
      'should', 'could', 'may', 'might', 'must', 'can', 'this', 'that',
      'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they',
      'our', 'your', 'their', 'who', 'what', 'when', 'where', 'why', 'how'
    ]);

    // Extract words
    const words = text.split(/\W+/)
      .filter(word => 
        word.length > 2 && 
        !stopWords.has(word) &&
        isNaN(word)
      );

    // Count frequency
    const wordCount = {};
    words.forEach(word => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });

    // Get top keywords
    const keywords = Object.entries(wordCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 30)
      .map(([word, count]) => ({ word, count }));

    return keywords;
  }

  /**
   * Extract requirements from job description
   */
  extractRequirements(jobDescription) {
    const requirements = {
      required: [],
      preferred: [],
      skills: [],
      experience: [],
      education: []
    };

    const lowerText = jobDescription.toLowerCase();

    // Extract required qualifications
    const requiredMatch = lowerText.match(/required?[:\s]+(.*?)(?:preferred|qualifications|responsibilities|$)/is);
    if (requiredMatch) {
      requirements.required = this.extractBulletPoints(requiredMatch[1]);
    }

    // Extract preferred qualifications
    const preferredMatch = lowerText.match(/preferred?[:\s]+(.*?)(?:required|qualifications|responsibilities|$)/is);
    if (preferredMatch) {
      requirements.preferred = this.extractBulletPoints(preferredMatch[1]);
    }

    // Extract skills
    requirements.skills = this.extractSkills(jobDescription);

    // Extract experience requirements
    const experienceMatch = lowerText.match(/(\d+)\+?\s*years?\s+(?:of\s+)?experience/gi);
    if (experienceMatch) {
      requirements.experience = experienceMatch.map(m => m.trim());
    }

    // Extract education requirements
    const educationKeywords = ['bachelor', 'master', 'phd', 'degree', 'bs', 'ba', 'ms', 'ma'];
    educationKeywords.forEach(keyword => {
      if (lowerText.includes(keyword)) {
        requirements.education.push(keyword);
      }
    });

    return requirements;
  }

  /**
   * Extract bullet points from text
   */
  extractBulletPoints(text) {
    return text.split(/\n|•|·|\*/)
      .map(line => line.trim())
      .filter(line => line.length > 10 && line.length < 200)
      .slice(0, 10);
  }

  /**
   * Extract skills from job description
   */
  extractSkills(jobDescription) {
    const commonSkills = [
      // Programming
      'JavaScript', 'Python', 'Java', 'C++', 'C#', 'Ruby', 'PHP', 'Go', 'Rust',
      'TypeScript', 'Swift', 'Kotlin',
      // Frameworks
      'React', 'Angular', 'Vue', 'Node.js', 'Django', 'Flask', 'Spring',
      // Databases
      'SQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Oracle',
      // Cloud
      'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes',
      // Tools
      'Git', 'Jira', 'Jenkins', 'CI/CD',
      // Skills
      'Agile', 'Scrum', 'DevOps', 'Machine Learning', 'Data Analysis'
    ];

    const text = jobDescription.toLowerCase();
    const foundSkills = commonSkills.filter(skill => 
      text.includes(skill.toLowerCase())
    );

    return foundSkills;
  }

  /**
   * Analyze job description
   */
  analyzeJobDescription(jobDescription) {
    return {
      keywords: this.extractKeywords(jobDescription),
      requirements: this.extractRequirements(jobDescription),
      wordCount: jobDescription.split(/\s+/).length,
      hasRemote: jobDescription.toLowerCase().includes('remote'),
      hasSalary: /\$[\d,]+/.test(jobDescription),
      estimatedLevel: this.estimateJobLevel(jobDescription)
    };
  }

  /**
   * Estimate job level from description
   */
  estimateJobLevel(jobDescription) {
    const lowerText = jobDescription.toLowerCase();

    if (lowerText.includes('senior') || lowerText.includes('lead')) {
      return 'Senior';
    } else if (lowerText.includes('junior') || lowerText.includes('entry')) {
      return 'Junior';
    } else if (lowerText.includes('mid-level') || lowerText.includes('intermediate')) {
      return 'Mid-Level';
    } else {
      // Check years of experience
      const yearsMatch = lowerText.match(/(\d+)\+?\s*years/);
      if (yearsMatch) {
        const years = parseInt(yearsMatch[1]);
        if (years >= 5) return 'Senior';
        if (years >= 2) return 'Mid-Level';
        return 'Junior';
      }
      return 'Mid-Level'; // Default
    }
  }

  /**
   * Generate suggestions based on job description
   */
  generateSuggestions(jobDescription, resumeText) {
    const jobKeywords = this.extractKeywords(jobDescription);
    const resumeKeywords = this.extractKeywords(resumeText);

    const resumeKeywordSet = new Set(resumeKeywords.map(k => k.word));
    const missingKeywords = jobKeywords
      .filter(k => !resumeKeywordSet.has(k.word))
      .slice(0, 10);

    const requirements = this.extractRequirements(jobDescription);

    return {
      missingKeywords: missingKeywords.map(k => k.word),
      requiredSkills: requirements.skills,
      experienceNeeded: requirements.experience,
      educationNeeded: requirements.education,
      suggestions: [
        ...missingKeywords.slice(0, 5).map(k => ({
          type: 'keyword',
          message: `Add keyword: "${k.word}" (appears ${k.count} times in job posting)`
        })),
        ...requirements.skills.slice(0, 5).map(skill => ({
          type: 'skill',
          message: `Highlight skill: "${skill}"`
        }))
      ]
    };
  }

  /**
   * Parse job URL (instructions for user)
   */
  getJobURLInstructions() {
    return {
      title: 'How to Import Job Description',
      methods: [
        {
          name: 'Copy-Paste (Recommended)',
          steps: [
            '1. Open the job posting',
            '2. Select and copy all text',
            '3. Paste into the input box',
            '4. Click Analyze'
          ]
        },
        {
          name: 'From LinkedIn',
          steps: [
            '1. Open LinkedIn job posting',
            '2. Click "Show more" to expand',
            '3. Copy entire description',
            '4. Paste here'
          ]
        },
        {
          name: 'From Indeed/Other Sites',
          steps: [
            '1. Open job posting',
            '2. Copy full description',
            '3. Paste here',
            '4. System will extract keywords'
          ]
        }
      ],
      tips: [
        'Copy the entire job description for best results',
        'Include requirements, qualifications, and responsibilities',
        'The more complete the description, the better the analysis'
      ]
    };
  }
}

export const linkedInImportService = new LinkedInImportService();
export const jobURLService = new JobURLService();
