/**
 * Progressive Hint System
 * 
 * Three-level hints:
 * 1. Text hint - General guidance
 * 2. Points hint - Specific dot numbers highlighted
 * 3. Ghost pattern - Visual overlay of the pattern
 */

const HintSystem = {
    // Current hint level (0 = no hints, 1-3 = hint levels)
    currentLevel: 0,

    // Number of failed attempts before auto-hint
    attemptsBeforeHint: 2,

    // Current attempt counter
    attempts: 0,

    // Hint text templates
    textHints: {
        general: [
            'Piensa en la posición de los puntos.',
            'Recuerda el patrón que viste.',
            'Los puntos forman un patrón único.'
        ],
        vowels: {
            'A': 'Solo usa el punto superior izquierdo.',
            'E': 'Parecido a la A, pero añade un punto.',
            'I': 'Usa dos puntos en el medio.',
            'O': 'Similar a la E, con un punto más.',
            'U': 'Como la A, pero con un punto abajo a la derecha.'
        },
        position: {
            top: 'Enfócate en los puntos superiores (1 y 4).',
            middle: 'Los puntos del medio son importantes (2 y 5).',
            bottom: 'No olvides los puntos inferiores (3 y 6).',
            left: 'La columna izquierda tiene puntos activos.',
            right: 'La columna derecha tiene puntos activos.'
        }
    },

    /**
     * Reset hint state for new question
     */
    reset() {
        this.currentLevel = 0;
        this.attempts = 0;
    },

    /**
     * Record a failed attempt
     * @returns {boolean} - True if hint should be shown
     */
    recordFailedAttempt() {
        this.attempts++;

        if (this.attempts >= this.attemptsBeforeHint && this.currentLevel < 3) {
            this.currentLevel++;
            this.attempts = 0;
            return true;
        }

        return false;
    },

    /**
     * Manually request next hint
     * @returns {number} - New hint level
     */
    requestHint() {
        if (this.currentLevel < 3) {
            this.currentLevel++;
        }
        return this.currentLevel;
    },

    /**
     * Get current hint level
     * @returns {number}
     */
    getLevel() {
        return this.currentLevel;
    },

    /**
     * Get text hint for a letter
     * @param {string} letter 
     * @returns {string}
     */
    getTextHint(letter) {
        const upperLetter = letter.toUpperCase();

        // Check for specific vowel hints
        if (this.textHints.vowels[upperLetter]) {
            return this.textHints.vowels[upperLetter];
        }

        // Get pattern to determine position hint
        const pattern = BrailleData.getPattern(upperLetter);
        const activeDots = BrailleData.getActiveDots(pattern);

        // Determine best position hint
        if (activeDots.every(d => d <= 2)) {
            return this.textHints.position.top;
        } else if (activeDots.some(d => d === 3 || d === 6)) {
            return this.textHints.position.bottom;
        } else if (activeDots.every(d => d <= 3)) {
            return this.textHints.position.left;
        } else if (activeDots.every(d => d >= 4)) {
            return this.textHints.position.right;
        }

        // Return random general hint
        const generalHints = this.textHints.general;
        return generalHints[Math.floor(Math.random() * generalHints.length)];
    },

    /**
     * Get dots to highlight for level 2 hint
     * @param {string} letter 
     * @returns {number[]} - Array of dot numbers to highlight
     */
    getDotsHint(letter) {
        const pattern = BrailleData.getPattern(letter.toUpperCase());
        return BrailleData.getActiveDots(pattern);
    },

    /**
     * Get ghost pattern for level 3 hint
     * @param {string} letter 
     * @returns {number[]} - Full pattern array
     */
    getGhostPattern(letter) {
        return BrailleData.getPattern(letter.toUpperCase());
    },

    /**
     * Get hint content based on current level
     * @param {string} letter 
     * @returns {object} - { level, text, dots, pattern }
     */
    getHint(letter) {
        const hint = {
            level: this.currentLevel,
            text: null,
            dots: null,
            pattern: null
        };

        if (this.currentLevel >= 1) {
            hint.text = this.getTextHint(letter);
        }

        if (this.currentLevel >= 2) {
            hint.dots = this.getDotsHint(letter);
        }

        if (this.currentLevel >= 3) {
            hint.pattern = this.getGhostPattern(letter);
        }

        return hint;
    },

    /**
     * Render hint UI
     * @param {string} letter 
     * @param {HTMLElement} container - Container for hint text
     * @param {HTMLElement} cellElement - Braille cell element
     */
    renderHint(letter, container, cellElement) {
        const hint = this.getHint(letter);

        // Show text hint
        if (hint.text && container) {
            container.innerHTML = `
                <span class="hint-icon">💡</span>
                <span class="hint-text">${hint.text}</span>
            `;
            container.classList.remove('hidden');
        }

        // Highlight specific dots
        if (hint.dots && cellElement) {
            hint.dots.forEach(dotNum => {
                const dotEl = cellElement.querySelector(`[data-dot="${dotNum}"]`);
                if (dotEl && !dotEl.classList.contains('active') && !dotEl.classList.contains('correct')) {
                    dotEl.classList.add('hint');
                }
            });
        }

        // Show ghost pattern
        if (hint.pattern && cellElement) {
            hint.pattern.forEach((active, index) => {
                if (active) {
                    const dotEl = cellElement.querySelector(`[data-dot="${index + 1}"]`);
                    if (dotEl && !dotEl.classList.contains('active') && !dotEl.classList.contains('correct')) {
                        dotEl.classList.add('ghost');
                    }
                }
            });
        }
    },

    /**
     * Clear hint UI
     * @param {HTMLElement} container 
     * @param {HTMLElement} cellElement 
     */
    clearHint(container, cellElement) {
        if (container) {
            container.innerHTML = '';
            container.classList.add('hidden');
        }

        if (cellElement) {
            const dots = cellElement.querySelectorAll('.braille-dot');
            dots.forEach(dot => {
                dot.classList.remove('hint', 'ghost');
            });
        }
    }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HintSystem;
}
