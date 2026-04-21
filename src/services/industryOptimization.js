// Industry-Specific Optimization Service
// Provides tailored ATS optimization based on industry

class IndustryOptimizationService {
  constructor() {
    this.industries = {
      software: {
        name: 'Software Development',
        icon: 'fa-code',
        keywords: [
          'agile', 'scrum', 'software development', 'full stack', 'backend',
          'frontend', 'API', 'microservices', 'cloud', 'DevOps', 'CI/CD',
          'testing', 'debugging', 'code review', 'version control', 'Git',
          'architecture', 'scalability', 'performance', 'optimization'
        ],
        skills: [
          'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'Docker',
          'Kubernetes', 'AWS', 'Git', 'SQL', 'MongoDB', 'TypeScript'
        ],
        actionVerbs: [
          'developed', 'built', 'architected', 'implemented', 'optimized',
          'debugged', 'deployed', 'refactored', 'migrated', 'integrated'
        ],
        metricsToInclude: [
          'performance improvements (%)',
          'number of users',
          'uptime percentage',
          'code coverage',
          'deployment frequency',
          'response time reduction'
        ],
        commonRoles: [
          'Software Engineer', 'Full Stack Developer', 'Backend Developer',
          'Frontend Developer', 'DevOps Engineer', 'Solutions Architect'
        ],
        tips: [
          'Include specific technologies and frameworks',
          'Mention coding languages prominently',
          'Quantify performance improvements',
          'Highlight system design experience',
          'Show collaboration with cross-functional teams'
        ]
      },

      dataScience: {
        name: 'Data Science & Analytics',
        icon: 'fa-chart-line',
        keywords: [
          'data analysis', 'machine learning', 'statistical modeling',
          'predictive analytics', 'data visualization', 'big data',
          'ETL', 'data mining', 'business intelligence', 'reporting',
          'A/B testing', 'SQL', 'data pipeline', 'data warehouse'
        ],
        skills: [
          'Python', 'R', 'SQL', 'Pandas', 'NumPy', 'TensorFlow', 'PyTorch',
          'Tableau', 'Power BI', 'Scikit-learn', 'Jupyter', 'Statistics'
        ],
        actionVerbs: [
          'analyzed', 'modeled', 'predicted', 'visualized', 'mined',
          'processed', 'transformed', 'discovered', 'forecasted', 'validated'
        ],
        metricsToInclude: [
          'accuracy/precision scores',
          'data volume processed',
          'model performance metrics',
          'revenue impact from insights',
          'time saved through automation',
          'business decisions influenced'
        ],
        commonRoles: [
          'Data Scientist', 'Data Analyst', 'Machine Learning Engineer',
          'Business Analyst', 'Data Engineer', 'Analytics Manager'
        ],
        tips: [
          'Emphasize statistical and analytical skills',
          'Include specific ML algorithms used',
          'Show business impact of insights',
          'Mention dataset sizes and complexity',
          'Highlight data storytelling abilities'
        ]
      },

      marketing: {
        name: 'Marketing & Communications',
        icon: 'fa-bullhorn',
        keywords: [
          'digital marketing', 'SEO', 'SEM', 'social media', 'content strategy',
          'campaign management', 'analytics', 'conversion optimization',
          'brand management', 'market research', 'email marketing',
          'paid advertising', 'growth hacking', 'influencer marketing'
        ],
        skills: [
          'Google Analytics', 'Google Ads', 'Facebook Ads', 'SEO', 'SEM',
          'Content Marketing', 'Social Media', 'Email Marketing', 'HubSpot',
          'Salesforce', 'Adobe Creative Suite', 'Canva'
        ],
        actionVerbs: [
          'launched', 'drove', 'increased', 'optimized', 'executed',
          'created', 'managed', 'grew', 'boosted', 'enhanced'
        ],
        metricsToInclude: [
          'conversion rate improvements',
          'ROI percentages',
          'audience growth',
          'engagement rates',
          'revenue generated',
          'cost per acquisition'
        ],
        commonRoles: [
          'Marketing Manager', 'Digital Marketing Specialist', 'Content Manager',
          'Social Media Manager', 'SEO Specialist', 'Brand Manager'
        ],
        tips: [
          'Show ROI and revenue impact',
          'Include campaign results with metrics',
          'Highlight multi-channel expertise',
          'Demonstrate data-driven decision making',
          'Show audience growth and engagement'
        ]
      },

      design: {
        name: 'Design & UX',
        icon: 'fa-palette',
        keywords: [
          'user experience', 'user interface', 'wireframing', 'prototyping',
          'design systems', 'visual design', 'interaction design',
          'usability testing', 'user research', 'design thinking',
          'responsive design', 'accessibility', 'branding'
        ],
        skills: [
          'Figma', 'Sketch', 'Adobe XD', 'Photoshop', 'Illustrator',
          'InVision', 'Principle', 'HTML/CSS', 'User Research', 'Wireframing'
        ],
        actionVerbs: [
          'designed', 'created', 'prototyped', 'conceptualized', 'refined',
          'redesigned', 'collaborated', 'researched', 'tested', 'iterated'
        ],
        metricsToInclude: [
          'user satisfaction scores',
          'conversion rate improvements',
          'usability test results',
          'design iteration count',
          'time to completion reduction',
          'user engagement increase'
        ],
        commonRoles: [
          'UX Designer', 'UI Designer', 'Product Designer', 'Graphic Designer',
          'Interaction Designer', 'Visual Designer'
        ],
        tips: [
          'Include portfolio link',
          'Show user-centered design process',
          'Quantify design impact on metrics',
          'Highlight collaboration with developers',
          'Mention design system contributions'
        ]
      },

      projectManagement: {
        name: 'Project Management',
        icon: 'fa-tasks',
        keywords: [
          'project planning', 'stakeholder management', 'risk management',
          'resource allocation', 'budget management', 'timeline management',
          'agile methodologies', 'team coordination', 'deliverables',
          'scope management', 'change management', 'vendor management'
        ],
        skills: [
          'Jira', 'Microsoft Project', 'Asana', 'Trello', 'Confluence',
          'Agile', 'Scrum', 'Kanban', 'PMP', 'Prince2', 'Six Sigma'
        ],
        actionVerbs: [
          'managed', 'coordinated', 'led', 'planned', 'executed',
          'delivered', 'facilitated', 'aligned', 'tracked', 'mitigated'
        ],
        metricsToInclude: [
          'projects delivered on time/budget',
          'team size managed',
          'budget size',
          'stakeholder satisfaction scores',
          'risk mitigation success rate',
          'efficiency improvements'
        ],
        commonRoles: [
          'Project Manager', 'Program Manager', 'Scrum Master',
          'Product Manager', 'Agile Coach', 'PMO Lead'
        ],
        tips: [
          'Highlight successful project outcomes',
          'Show budget and timeline management',
          'Emphasize stakeholder communication',
          'Include certifications (PMP, CSM, etc.)',
          'Demonstrate problem-solving abilities'
        ]
      },

      sales: {
        name: 'Sales & Business Development',
        icon: 'fa-handshake',
        keywords: [
          'lead generation', 'prospecting', 'closing', 'negotiation',
          'CRM', 'pipeline management', 'sales forecasting', 'quotas',
          'client relationships', 'business development', 'B2B', 'B2C',
          'account management', 'territory management'
        ],
        skills: [
          'Salesforce', 'HubSpot', 'Cold Calling', 'Negotiation', 'Presentation',
          'Pipeline Management', 'Lead Generation', 'Account Management'
        ],
        actionVerbs: [
          'closed', 'sold', 'negotiated', 'exceeded', 'generated',
          'prospected', 'cultivated', 'secured', 'upsold', 'converted'
        ],
        metricsToInclude: [
          'quota attainment percentage',
          'revenue generated',
          'deal sizes',
          'conversion rates',
          'pipeline value',
          'accounts managed'
        ],
        commonRoles: [
          'Sales Representative', 'Account Executive', 'Business Development Manager',
          'Sales Manager', 'Account Manager', 'Inside Sales'
        ],
        tips: [
          'Lead with revenue numbers',
          'Show quota attainment consistently',
          'Include deal sizes and win rates',
          'Highlight relationship building',
          'Demonstrate consultative selling'
        ]
      },

      finance: {
        name: 'Finance & Accounting',
        icon: 'fa-calculator',
        keywords: [
          'financial analysis', 'budgeting', 'forecasting', 'accounting',
          'financial modeling', 'audit', 'tax', 'compliance', 'GAAP',
          'financial reporting', 'cost reduction', 'variance analysis',
          'cash flow management', 'reconciliation'
        ],
        skills: [
          'Excel', 'QuickBooks', 'SAP', 'Financial Modeling', 'GAAP',
          'Budgeting', 'Forecasting', 'SQL', 'Tableau', 'Power BI'
        ],
        actionVerbs: [
          'analyzed', 'forecasted', 'budgeted', 'reconciled', 'audited',
          'optimized', 'reduced', 'managed', 'reported', 'ensured'
        ],
        metricsToInclude: [
          'cost savings achieved',
          'budget size managed',
          'variance reductions',
          'audit completion rate',
          'process efficiency gains',
          'revenue/profit impact'
        ],
        commonRoles: [
          'Financial Analyst', 'Accountant', 'Finance Manager',
          'Controller', 'CFO', 'Auditor'
        ],
        tips: [
          'Emphasize analytical skills',
          'Show cost savings and efficiency',
          'Include certifications (CPA, CFA, etc.)',
          'Highlight compliance and accuracy',
          'Demonstrate business partnership'
        ]
      },

      healthcare: {
        name: 'Healthcare & Medical',
        icon: 'fa-heartbeat',
        keywords: [
          'patient care', 'clinical', 'medical', 'healthcare', 'diagnosis',
          'treatment', 'compliance', 'HIPAA', 'electronic health records',
          'quality improvement', 'patient safety', 'healthcare management'
        ],
        skills: [
          'Patient Care', 'EHR/EMR', 'HIPAA', 'Medical Terminology',
          'Clinical Documentation', 'Quality Improvement', 'Healthcare IT'
        ],
        actionVerbs: [
          'treated', 'diagnosed', 'assessed', 'implemented', 'improved',
          'coordinated', 'educated', 'monitored', 'documented', 'ensured'
        ],
        metricsToInclude: [
          'patient satisfaction scores',
          'quality metrics improvements',
          'compliance rates',
          'patient volume',
          'treatment success rates',
          'cost savings'
        ],
        commonRoles: [
          'Registered Nurse', 'Physician', 'Healthcare Administrator',
          'Medical Assistant', 'Healthcare Analyst', 'Clinical Manager'
        ],
        tips: [
          'Highlight patient outcomes',
          'Show compliance and safety focus',
          'Include certifications and licenses',
          'Demonstrate quality improvement',
          'Emphasize team collaboration'
        ]
      }
    };
  }

  /**
   * Get all industries
   */
  getIndustries() {
    return Object.keys(this.industries).map(key => ({
      id: key,
      name: this.industries[key].name,
      icon: this.industries[key].icon
    }));
  }

  /**
   * Get industry details
   */
  getIndustry(industryId) {
    return this.industries[industryId] || null;
  }

  /**
   * Analyze resume for specific industry
   */
  analyzeForIndustry(resumeData, industryId) {
    const industry = this.industries[industryId];
    if (!industry) {
      return { error: 'Industry not found' };
    }

    const text = this.extractText(resumeData);
    const lowerText = text.toLowerCase();

    // Check keyword coverage
    const keywordsFound = industry.keywords.filter(kw => 
      lowerText.includes(kw.toLowerCase())
    );
    const keywordScore = Math.round((keywordsFound.length / industry.keywords.length) * 100);

    // Check skills coverage
    const skillsFound = industry.skills.filter(skill => 
      lowerText.includes(skill.toLowerCase())
    );
    const skillScore = Math.round((skillsFound.length / industry.skills.length) * 100);

    // Check action verbs
    const verbsFound = industry.actionVerbs.filter(verb => 
      lowerText.includes(verb.toLowerCase())
    );
    const verbScore = Math.round((verbsFound.length / industry.actionVerbs.length) * 100);

    // Generate industry-specific suggestions
    const suggestions = this.generateIndustrySuggestions(
      industry,
      keywordsFound,
      skillsFound,
      verbsFound,
      resumeData
    );

    return {
      industry: industry.name,
      scores: {
        keywords: keywordScore,
        skills: skillScore,
        actionVerbs: verbScore,
        overall: Math.round((keywordScore + skillScore + verbScore) / 3)
      },
      found: {
        keywords: keywordsFound,
        skills: skillsFound,
        actionVerbs: verbsFound
      },
      missing: {
        keywords: industry.keywords.filter(kw => !keywordsFound.includes(kw)).slice(0, 10),
        skills: industry.skills.filter(sk => !skillsFound.includes(sk)).slice(0, 10),
        actionVerbs: industry.actionVerbs.filter(v => !verbsFound.includes(v)).slice(0, 5)
      },
      suggestions,
      tips: industry.tips
    };
  }

  /**
   * Extract text from resume
   */
  extractText(resumeData) {
    let text = '';
    
    if (resumeData.profile) {
      text += (resumeData.profile.name || '') + ' ';
      text += (resumeData.profile.title || '') + ' ';
      text += (resumeData.profile.summary || '') + ' ';
    }
    
    if (resumeData.exps) {
      resumeData.exps.forEach(exp => {
        text += (exp.title || '') + ' ';
        text += (exp.company || '') + ' ';
        if (exp.resp) text += exp.resp.join(' ') + ' ';
      });
    }
    
    if (resumeData.skills) {
      resumeData.skills.forEach(skill => {
        text += (skill.type || '') + ' ';
        if (skill.name) text += skill.name.join(' ') + ' ';
      });
    }

    if (resumeData.projs) {
      resumeData.projs.forEach(proj => {
        text += (proj.title || '') + ' ';
        text += (proj.desc || '') + ' ';
        if (proj.tools) text += proj.tools.join(' ') + ' ';
      });
    }
    
    return text;
  }

  /**
   * Generate industry-specific suggestions
   */
  generateIndustrySuggestions(industry, keywordsFound, skillsFound, verbsFound, resumeData) {
    const suggestions = [];

    // Keyword suggestions
    if (keywordsFound.length < industry.keywords.length * 0.3) {
      suggestions.push({
        type: 'keywords',
        severity: 'high',
        title: `Add ${industry.name} keywords`,
        description: `Only ${keywordsFound.length} of ${industry.keywords.length} key industry terms found`,
        action: `Include terms like: ${industry.keywords.slice(0, 5).join(', ')}`,
        impact: 'Keywords are crucial for ATS matching in your industry'
      });
    }

    // Skills suggestions
    if (skillsFound.length < industry.skills.length * 0.4) {
      suggestions.push({
        type: 'skills',
        severity: 'high',
        title: `Add ${industry.name} skills`,
        description: `Only ${skillsFound.length} of ${industry.skills.length} important skills found`,
        action: `Add skills like: ${industry.skills.slice(0, 5).join(', ')}`,
        impact: 'Skills directly match job requirements in your field'
      });
    }

    // Action verb suggestions
    if (verbsFound.length < industry.actionVerbs.length * 0.3) {
      suggestions.push({
        type: 'verbs',
        severity: 'medium',
        title: `Use ${industry.name}-specific action verbs`,
        description: `Limited use of industry-appropriate action verbs`,
        action: `Start bullets with: ${industry.actionVerbs.slice(0, 5).join(', ')}`,
        impact: 'Industry-specific verbs show relevant experience'
      });
    }

    // Metrics suggestion
    const hasMetrics = this.extractText(resumeData).match(/\d+%|\d+\+|\d+x|\$\d+/);
    if (!hasMetrics) {
      suggestions.push({
        type: 'metrics',
        severity: 'high',
        title: 'Add quantifiable metrics',
        description: `${industry.name} resumes should include measurable results`,
        action: `Include: ${industry.metricsToInclude.slice(0, 3).join(', ')}`,
        impact: 'Metrics prove your impact and effectiveness'
      });
    }

    return suggestions;
  }

  /**
   * Get industry match score for resume
   */
  getIndustryMatchScore(resumeData, industryId) {
    const analysis = this.analyzeForIndustry(resumeData, industryId);
    return analysis.scores ? analysis.scores.overall : 0;
  }

  /**
   * Suggest best industry for resume
   */
  suggestIndustry(resumeData) {
    const scores = {};
    
    Object.keys(this.industries).forEach(id => {
      scores[id] = this.getIndustryMatchScore(resumeData, id);
    });

    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    
    return {
      topMatch: {
        id: sorted[0][0],
        name: this.industries[sorted[0][0]].name,
        score: sorted[0][1]
      },
      allScores: sorted.map(([id, score]) => ({
        id,
        name: this.industries[id].name,
        score
      }))
    };
  }
}

export default new IndustryOptimizationService();
