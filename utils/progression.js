/**
 * Progression System
 * 
 * - Level completion: ≥80% accuracy
 * - Star calculation (1-3 stars)
 * - Spaced repetition tracking
 * - Auto mini-quiz every 5 levels
 */

const Progression = {
    // Level completion threshold
    COMPLETION_THRESHOLD: 80,

    // Star thresholds
    STAR_THRESHOLDS: {
        ONE: 60,    // 60-79%
        TWO: 80,    // 80-94%
        THREE: 95   // 95-100%
    },

    // Spaced repetition intervals (in levels)
    REPETITION_INTERVALS: {
        WEAK: 3,    // >30% error rate
        MEDIUM: 5,  // 10-30% error rate
        STRONG: 8   // <10% error rate
    },

    // Mini-quiz frequency
    MINI_QUIZ_INTERVAL: 5,

    /**
     * Calculate stars based on accuracy
     * @param {number} accuracy - 0-100
     * @returns {number} - 0, 1, 2, or 3 stars
     */
    calculateStars(accuracy) {
        if (accuracy >= this.STAR_THRESHOLDS.THREE) return 3;
        if (accuracy >= this.STAR_THRESHOLDS.TWO) return 2;
        if (accuracy >= this.STAR_THRESHOLDS.ONE) return 1;
        return 0;
    },

    /**
     * Check if level is completed
     * @param {number} accuracy 
     * @returns {boolean}
     */
    isLevelComplete(accuracy) {
        return accuracy >= this.COMPLETION_THRESHOLD;
    },

    /**
     * Get mastery level for a letter
     * @param {number} errorRate - 0-100
     * @returns {string} - 'weak', 'medium', or 'strong'
     */
    getMasteryLevel(errorRate) {
        if (errorRate > 30) return 'weak';
        if (errorRate >= 10) return 'medium';
        return 'strong';
    },

    /**
     * Get repetition interval for a letter
     * @param {string} masteryLevel 
     * @returns {number} - Number of levels between repetitions
     */
    getRepetitionInterval(masteryLevel) {
        switch (masteryLevel) {
            case 'weak': return this.REPETITION_INTERVALS.WEAK;
            case 'medium': return this.REPETITION_INTERVALS.MEDIUM;
            case 'strong': return this.REPETITION_INTERVALS.STRONG;
            default: return this.REPETITION_INTERVALS.MEDIUM;
        }
    },

    /**
     * Check if mini-quiz should be triggered
     * @param {number} currentLevel 
     * @returns {boolean}
     */
    shouldTriggerMiniQuiz(currentLevel) {
        return currentLevel > 0 && currentLevel % this.MINI_QUIZ_INTERVAL === 0;
    },

    /**
     * Get letters that need review based on spaced repetition
     * @param {object} letterStats - { letter: { errors, attempts, lastReview } }
     * @param {number} currentLevel 
     * @returns {string[]}
     */
    getLettersForReview(letterStats, currentLevel) {
        const lettersToReview = [];

        for (const [letter, stats] of Object.entries(letterStats)) {
            if (stats.attempts === 0) continue;

            const errorRate = (stats.errors / stats.attempts) * 100;
            const masteryLevel = this.getMasteryLevel(errorRate);
            const interval = this.getRepetitionInterval(masteryLevel);

            const levelsSinceReview = currentLevel - (stats.lastReview || 0);

            if (levelsSinceReview >= interval) {
                lettersToReview.push({
                    letter,
                    errorRate,
                    masteryLevel,
                    priority: masteryLevel === 'weak' ? 1 : masteryLevel === 'medium' ? 2 : 3
                });
            }
        }

        // Sort by priority (weak first)
        lettersToReview.sort((a, b) => a.priority - b.priority);

        return lettersToReview.map(item => item.letter);
    },

    /**
     * Get weak letters for mini-quiz
     * @param {object} letterStats 
     * @param {number} maxCount 
     * @returns {string[]}
     */
    getWeakLetters(letterStats, maxCount = 5) {
        const weakLetters = [];

        for (const [letter, stats] of Object.entries(letterStats)) {
            if (stats.attempts === 0) continue;

            const errorRate = (stats.errors / stats.attempts) * 100;
            if (errorRate > 30) {
                weakLetters.push({ letter, errorRate });
            }
        }

        // Sort by error rate (highest first)
        weakLetters.sort((a, b) => b.errorRate - a.errorRate);

        return weakLetters.slice(0, maxCount).map(item => item.letter);
    },

    /**
     * Generate progress report
     * @param {object} userProgress 
     * @returns {object}
     */
    generateReport(userProgress) {
        const letterStats = userProgress.letterStats || {};
        let totalAttempts = 0;
        let totalErrors = 0;
        let strongCount = 0;
        let mediumCount = 0;
        let weakCount = 0;

        for (const stats of Object.values(letterStats)) {
            totalAttempts += stats.attempts || 0;
            totalErrors += stats.errors || 0;

            if (stats.attempts > 0) {
                const errorRate = (stats.errors / stats.attempts) * 100;
                const mastery = this.getMasteryLevel(errorRate);

                if (mastery === 'strong') strongCount++;
                else if (mastery === 'medium') mediumCount++;
                else weakCount++;
            }
        }

        const overallAccuracy = totalAttempts > 0
            ? Math.round((1 - totalErrors / totalAttempts) * 100)
            : 100;

        return {
            overallAccuracy,
            totalAttempts,
            totalErrors,
            letterMastery: {
                strong: strongCount,
                medium: mediumCount,
                weak: weakCount
            },
            stars: this.calculateStars(overallAccuracy)
        };
    },

    /**
     * Render star display
     * @param {number} stars 
     * @param {number} maxStars 
     * @returns {string} HTML
     */
    renderStars(stars, maxStars = 3) {
        let html = '<div class="stars-display">';
        for (let i = 0; i < maxStars; i++) {
            const filled = i < stars;
            html += `<span class="star ${filled ? 'filled' : 'empty'}">★</span>`;
        }
        html += '</div>';
        return html;
    },

    /**
     * Get mastery color
     * @param {string} masteryLevel 
     * @returns {string}
     */
    getMasteryColor(masteryLevel) {
        switch (masteryLevel) {
            case 'weak': return '#ef4444';    // Red
            case 'medium': return '#f59e0b';  // Yellow/Orange
            case 'strong': return '#22c55e';  // Green
            default: return '#6b7280';        // Gray
        }
    }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Progression;
}
