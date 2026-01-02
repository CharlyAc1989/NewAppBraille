/**
 * State Management - User progress and settings
 */

const AppState = {
    // Default state
    defaults: {
        user: {
            name: 'Alex',
            streak: 3,
            lastActiveDate: null
        },
        progress: {
            currentChapter: 'consonants',
            currentLesson: 0,
            completedLessons: [],
            totalScore: 0
        },
        settings: {
            highContrast: false,
            invertColors: false,
            brailleSize: 100,
            hapticEnabled: true,
            soundEnabled: true,
            voiceEnabled: false
        },
        stats: {
            totalLessons: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            averageAccuracy: 0,
            timeSpent: 0
        }
    },

    // Current state (loaded from localStorage or defaults)
    state: null,

    /**
     * Initialize state from localStorage or defaults
     */
    init() {
        const saved = localStorage.getItem('braillequest_state');
        if (saved) {
            try {
                this.state = { ...this.defaults, ...JSON.parse(saved) };
            } catch (e) {
                console.error('Error loading state:', e);
                this.state = { ...this.defaults };
            }
        } else {
            this.state = { ...this.defaults };
        }

        // Check and update streak
        this.updateStreak();

        return this.state;
    },

    /**
     * Save state to localStorage
     */
    save() {
        try {
            localStorage.setItem('braillequest_state', JSON.stringify(this.state));
        } catch (e) {
            console.error('Error saving state:', e);
        }
    },

    /**
     * Update streak based on last active date
     */
    updateStreak() {
        const today = new Date().toDateString();
        const lastActive = this.state.user.lastActiveDate;

        if (!lastActive) {
            // First time user
            this.state.user.lastActiveDate = today;
        } else if (lastActive !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);

            if (lastActive === yesterday.toDateString()) {
                // Consecutive day - increment streak
                this.state.user.streak++;
            } else {
                // Streak broken
                this.state.user.streak = 1;
            }

            this.state.user.lastActiveDate = today;
        }

        this.save();
    },

    /**
     * Get user info
     */
    getUser() {
        return this.state.user;
    },

    /**
     * Get streak count
     */
    getStreak() {
        return this.state.user.streak;
    },

    /**
     * Get progress
     */
    getProgress() {
        return this.state.progress;
    },

    /**
     * Get settings
     */
    getSettings() {
        return this.state.settings;
    },

    /**
     * Update a specific setting
     */
    updateSetting(key, value) {
        if (key in this.state.settings) {
            this.state.settings[key] = value;
            this.save();
            this.applySettings();
        }
    },

    /**
     * Apply visual settings to the DOM
     */
    applySettings() {
        const body = document.body;
        const root = document.documentElement;
        const settings = this.state.settings;

        // High contrast
        body.classList.toggle('high-contrast', settings.highContrast);

        // Invert colors
        body.classList.toggle('inverted', settings.invertColors);

        // Braille size
        const sizeMultiplier = settings.brailleSize / 100;
        root.style.setProperty('--braille-dot-size', `${16 * sizeMultiplier}px`);
        root.style.setProperty('--braille-dot-gap', `${8 * sizeMultiplier}px`);
        root.style.setProperty('--braille-cell-padding', `${16 * sizeMultiplier}px`);
    },

    /**
     * Mark lesson as completed
     */
    completeLesson(chapterId, lessonId, score, accuracy) {
        const lessonKey = `${chapterId}:${lessonId}`;

        if (!this.state.progress.completedLessons.includes(lessonKey)) {
            this.state.progress.completedLessons.push(lessonKey);
        }

        // Update stats
        this.state.progress.totalScore += score;
        this.state.stats.totalLessons++;

        // Update accuracy average
        const totalAttempts = this.state.stats.correctAnswers + this.state.stats.wrongAnswers;
        if (totalAttempts > 0) {
            this.state.stats.averageAccuracy =
                Math.round((this.state.stats.correctAnswers / totalAttempts) * 100);
        }

        this.save();
    },

    /**
     * Record an answer
     */
    recordAnswer(correct) {
        if (correct) {
            this.state.stats.correctAnswers++;
        } else {
            this.state.stats.wrongAnswers++;
        }
        this.save();
    },

    /**
     * Get stats
     */
    getStats() {
        return this.state.stats;
    },

    /**
     * Reset to defaults
     */
    reset() {
        this.state = { ...this.defaults };
        this.save();
        this.applySettings();
    }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AppState;
}
