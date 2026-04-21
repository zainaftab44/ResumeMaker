// Storage Service - IndexedDB Implementation
// This provides a better solution than localStorage for:
// - Larger storage capacity (no 5-10MB limit)
// - Better performance with indexing
// - Asynchronous operations (non-blocking)
// - Structured data storage
// - Better for complex queries

class StorageService {
  constructor() {
    this.dbName = 'ResumeForgeDB';
    this.version = 1;
    this.db = null;
  }

  /**
   * Initialize IndexedDB
   */
  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Scan History Store
        if (!db.objectStoreNames.contains('scanHistory')) {
          const scanStore = db.createObjectStore('scanHistory', {
            keyPath: 'id',
            autoIncrement: true
          });
          scanStore.createIndex('timestamp', 'timestamp', { unique: false });
          scanStore.createIndex('score', 'score', { unique: false });
        }

        // User Preferences Store
        if (!db.objectStoreNames.contains('preferences')) {
          db.createObjectStore('preferences', { keyPath: 'key' });
        }

        // Resume Versions Store
        if (!db.objectStoreNames.contains('resumeVersions')) {
          const versionStore = db.createObjectStore('resumeVersions', {
            keyPath: 'id',
            autoIncrement: true
          });
          versionStore.createIndex('timestamp', 'timestamp', { unique: false });
          versionStore.createIndex('name', 'name', { unique: false });
        }

        // Job Descriptions Store
        if (!db.objectStoreNames.contains('jobDescriptions')) {
          const jobStore = db.createObjectStore('jobDescriptions', {
            keyPath: 'id',
            autoIncrement: true
          });
          jobStore.createIndex('timestamp', 'timestamp', { unique: false });
          jobStore.createIndex('title', 'title', { unique: false });
        }

        // Main Resume Data Store
        if (!db.objectStoreNames.contains('resumeData')) {
          const resumeStore = db.createObjectStore('resumeData', { keyPath: 'id' });
          resumeStore.createIndex('timestamp', 'timestamp', { unique: false });
        }
      };
    });
  }

  /**
   * Save ATS scan to history
   */
  async saveScanHistory(scanData) {
    await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['scanHistory'], 'readwrite');
      const store = transaction.objectStore('scanHistory');

      const data = {
        timestamp: new Date().toISOString(),
        score: scanData.score.total,
        breakdown: scanData.score.breakdown,
        suggestions: scanData.suggestions.length,
        skillsDetected: scanData.skills.length,
        bulletPoints: scanData.format.bulletPointCount,
        resumeSnapshot: {
          profileName: scanData.resumeSnapshot?.profile?.name || '',
          experienceCount: scanData.resumeSnapshot?.exps?.length || 0,
          educationCount: scanData.resumeSnapshot?.eds?.length || 0,
          skillsCount: scanData.resumeSnapshot?.skills?.length || 0
        }
      };

      const request = store.add(data);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Get scan history
   */
  async getScanHistory(limit = 50) {
    await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['scanHistory'], 'readonly');
      const store = transaction.objectStore('scanHistory');
      const index = store.index('timestamp');

      const request = index.openCursor(null, 'prev'); // Descending order
      const results = [];
      let count = 0;

      request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor && count < limit) {
          results.push(cursor.value);
          count++;
          cursor.continue();
        } else {
          resolve(results);
        }
      };

      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Get score improvements over time
   */
  async getScoreHistory() {
    const history = await this.getScanHistory();
    return history.map(item => ({
      date: new Date(item.timestamp).toLocaleDateString(),
      score: item.score,
      timestamp: item.timestamp
    }));
  }

  /**
   * Clear scan history
   */
  async clearScanHistory() {
    await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['scanHistory'], 'readwrite');
      const store = transaction.objectStore('scanHistory');
      const request = store.clear();
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Save user preference
   */
  async savePreference(key, value) {
    await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['preferences'], 'readwrite');
      const store = transaction.objectStore('preferences');
      const request = store.put({ key, value, updated: new Date().toISOString() });
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Get user preference
   */
  async getPreference(key, defaultValue = null) {
    await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['preferences'], 'readonly');
      const store = transaction.objectStore('preferences');
      const request = store.get(key);
      request.onsuccess = () => {
        resolve(request.result ? request.result.value : defaultValue);
      };
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Save resume version
   */
  async saveResumeVersion(resumeData, versionName) {
    await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['resumeVersions'], 'readwrite');
      const store = transaction.objectStore('resumeVersions');

      const data = {
        timestamp: new Date().toISOString(),
        name: versionName || `Version ${new Date().toLocaleString()}`,
        resumeData: resumeData
      };

      const request = store.add(data);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Get resume versions
   */
  async getResumeVersions() {
    await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['resumeVersions'], 'readonly');
      const store = transaction.objectStore('resumeVersions');
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Save job description
   */
  async saveJobDescription(title, description, url = '') {
    await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['jobDescriptions'], 'readwrite');
      const store = transaction.objectStore('jobDescriptions');

      const data = {
        timestamp: new Date().toISOString(),
        title,
        description,
        url
      };

      const request = store.add(data);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Get saved job descriptions
   */
  async getJobDescriptions() {
    await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['jobDescriptions'], 'readonly');
      const store = transaction.objectStore(['jobDescriptions']);
      const index = store.index('timestamp');
      const request = index.getAll();
      request.onsuccess = () => resolve(request.result.reverse());
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Save main resume data
   */
  async saveResumeData(resumeData) {
    await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['resumeData'], 'readwrite');
      const store = transaction.objectStore('resumeData');

      const data = {
        id: 'main',
        timestamp: new Date().toISOString(),
        ...resumeData
      };

      const request = store.put(data);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Load main resume data
   */
  async loadResumeData() {
    await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['resumeData'], 'readonly');
      const store = transaction.objectStore('resumeData');
      const request = store.get('main');
      request.onsuccess = () => {
        if (request.result) {
          const { id, timestamp, ...data } = request.result;
          resolve(data);
        } else {
          resolve(null);
        }
      };
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Ensure database is initialized
   */
  async ensureDB() {
    if (!this.db) {
      await this.init();
    }
  }

  /**
   * Get database stats
   */
  async getStats() {
    await this.ensureDB();
    const scanHistory = await this.getScanHistory();
    const versions = await this.getResumeVersions();
    const jobs = await this.getJobDescriptions();

    return {
      totalScans: scanHistory.length,
      totalVersions: versions.length,
      savedJobs: jobs.length,
      firstScan: scanHistory.length > 0 ? scanHistory[scanHistory.length - 1].timestamp : null,
      lastScan: scanHistory.length > 0 ? scanHistory[0].timestamp : null,
      highestScore: scanHistory.length > 0 ? Math.max(...scanHistory.map(s => s.score)) : 0,
      averageScore: scanHistory.length > 0
        ? Math.round(scanHistory.reduce((sum, s) => sum + s.score, 0) / scanHistory.length)
        : 0
    };
  }

  /**
   * Export all data (for backup)
   */
  async exportData() {
    await this.ensureDB();
    const scanHistory = await this.getScanHistory();
    const versions = await this.getResumeVersions();
    const jobs = await this.getJobDescriptions();

    return {
      exportDate: new Date().toISOString(),
      scanHistory,
      resumeVersions: versions,
      jobDescriptions: jobs
    };
  }

  /**
   * Import data (from backup)
   */
  async importData(data) {
    await this.ensureDB();

    // Import scan history
    if (data.scanHistory) {
      const transaction = this.db.transaction(['scanHistory'], 'readwrite');
      const store = transaction.objectStore('scanHistory');
      for (const item of data.scanHistory) {
        delete item.id; // Remove ID to auto-generate new one
        store.add(item);
      }
    }

    // Import resume versions
    if (data.resumeVersions) {
      const transaction = this.db.transaction(['resumeVersions'], 'readwrite');
      const store = transaction.objectStore('resumeVersions');
      for (const item of data.resumeVersions) {
        delete item.id;
        store.add(item);
      }
    }

    // Import job descriptions
    if (data.jobDescriptions) {
      const transaction = this.db.transaction(['jobDescriptions'], 'readwrite');
      const store = transaction.objectStore('jobDescriptions');
      for (const item of data.jobDescriptions) {
        delete item.id;
        store.add(item);
      }
    }
  }
}

// Create singleton instance
const storageService = new StorageService();

export default storageService;
