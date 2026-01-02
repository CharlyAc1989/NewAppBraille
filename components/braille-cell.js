/**
 * Braille Cell Component
 * 
 * Reusable component with states:
 * - default: gray outline dots
 * - active: filled blue dots  
 * - correct: green filled (Build mode success)
 * - incorrect: red filled + shake (Build mode error)
 * - ghost: faint outline (Hint pattern)
 * - hint: pulsing blue (Highlighted dots)
 */

const BrailleCell = {
    /**
     * Create a Braille cell element
     * @param {object} options
     * @param {number[]} options.pattern - 6-element array [d1,d2,d3,d4,d5,d6]
     * @param {boolean} options.interactive - Allow dot tapping
     * @param {string} options.size - 'sm', 'md', 'lg'
     * @param {Function} options.onDotTap - Callback when dot is tapped
     * @param {string} options.id - Optional ID for the cell
     * @returns {HTMLElement}
     */
    create(options = {}) {
        const {
            pattern = [0, 0, 0, 0, 0, 0],
            interactive = false,
            size = 'md',
            onDotTap = null,
            id = null
        } = options;

        const cell = document.createElement('div');
        cell.className = `braille-cell ${interactive ? 'interactive' : ''} size-${size}`;
        if (id) cell.id = id;
        cell.setAttribute('role', 'grid');
        cell.setAttribute('aria-label', 'Celda Braille');

        // Create 6 dots in order: 1,4,2,5,3,6 (grid layout)
        const dotOrder = [1, 4, 2, 5, 3, 6];

        dotOrder.forEach(dotNum => {
            const dot = document.createElement('div');
            dot.className = 'braille-dot';
            dot.setAttribute('data-dot', dotNum);
            dot.setAttribute('role', 'button');
            dot.setAttribute('aria-label', `Punto ${dotNum}`);
            dot.setAttribute('aria-pressed', pattern[dotNum - 1] === 1 ? 'true' : 'false');

            // Set initial state from pattern
            if (pattern[dotNum - 1] === 1) {
                dot.classList.add('active');
            }

            // Add interactivity
            if (interactive) {
                dot.addEventListener('click', () => {
                    Haptics.tap();
                    AudioFeedback.tap();

                    if (onDotTap) {
                        onDotTap(dotNum, dot);
                    }
                });

                dot.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        dot.click();
                    }
                });

                dot.setAttribute('tabindex', '0');
            }

            cell.appendChild(dot);
        });

        return cell;
    },

    /**
     * Get current pattern from a cell element
     * @param {HTMLElement} cellElement 
     * @returns {number[]}
     */
    getPattern(cellElement) {
        const pattern = [0, 0, 0, 0, 0, 0];
        const dots = cellElement.querySelectorAll('.braille-dot');

        dots.forEach(dot => {
            const dotNum = parseInt(dot.getAttribute('data-dot'));
            if (dot.classList.contains('active') || dot.classList.contains('correct')) {
                pattern[dotNum - 1] = 1;
            }
        });

        return pattern;
    },

    /**
     * Set pattern on a cell element
     * @param {HTMLElement} cellElement 
     * @param {number[]} pattern 
     */
    setPattern(cellElement, pattern) {
        const dots = cellElement.querySelectorAll('.braille-dot');

        dots.forEach(dot => {
            const dotNum = parseInt(dot.getAttribute('data-dot'));
            const isActive = pattern[dotNum - 1] === 1;

            dot.classList.toggle('active', isActive);
            dot.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });
    },

    /**
     * Reset all dots to default state
     * @param {HTMLElement} cellElement 
     */
    reset(cellElement) {
        const dots = cellElement.querySelectorAll('.braille-dot');
        dots.forEach(dot => {
            dot.classList.remove('active', 'correct', 'incorrect', 'ghost', 'hint');
            dot.setAttribute('aria-pressed', 'false');
        });
    },

    /**
     * Set dot state
     * @param {HTMLElement} cellElement 
     * @param {number} dotNum - 1-6
     * @param {string} state - 'active', 'correct', 'incorrect', 'ghost', 'hint'
     */
    setDotState(cellElement, dotNum, state) {
        const dot = cellElement.querySelector(`[data-dot="${dotNum}"]`);
        if (!dot) return;

        // Remove all state classes
        dot.classList.remove('active', 'correct', 'incorrect', 'ghost', 'hint');

        // Add new state
        if (state) {
            dot.classList.add(state);
        }
    },

    /**
     * Toggle a dot (for Build activity)
     * @param {HTMLElement} dot 
     * @param {number} targetValue - Expected value (0 or 1)
     * @returns {boolean} - True if correct
     */
    toggleDot(dot, targetValue) {
        const isCurrentlyActive = dot.classList.contains('active') || dot.classList.contains('correct');
        const newValue = isCurrentlyActive ? 0 : 1;
        const isCorrect = newValue === targetValue;

        // Clear previous states
        dot.classList.remove('active', 'correct', 'incorrect');

        if (isCorrect) {
            if (newValue === 1) {
                dot.classList.add('correct');
                Haptics.success();
                AudioFeedback.success();
            }
            // If newValue is 0 and target is 0, just leave it default
        } else {
            dot.classList.add('incorrect');
            Haptics.error();
            AudioFeedback.error();

            // Remove incorrect state after animation
            setTimeout(() => {
                dot.classList.remove('incorrect');
            }, 300);
        }

        dot.setAttribute('aria-pressed', newValue === 1 ? 'true' : 'false');

        return isCorrect;
    },

    /**
     * Check if pattern is complete and correct
     * @param {HTMLElement} cellElement 
     * @param {number[]} targetPattern 
     * @returns {boolean}
     */
    isComplete(cellElement, targetPattern) {
        const currentPattern = this.getPattern(cellElement);
        return BrailleData.patternsMatch(currentPattern, targetPattern);
    },

    /**
     * Show ghost pattern (Level 3 hint)
     * @param {HTMLElement} cellElement 
     * @param {number[]} pattern 
     */
    showGhost(cellElement, pattern) {
        const dots = cellElement.querySelectorAll('.braille-dot');

        dots.forEach(dot => {
            const dotNum = parseInt(dot.getAttribute('data-dot'));
            if (pattern[dotNum - 1] === 1 && !dot.classList.contains('correct')) {
                dot.classList.add('ghost');
            }
        });
    },

    /**
     * Highlight specific dots (Level 2 hint)
     * @param {HTMLElement} cellElement 
     * @param {number[]} dotNumbers - Array of dot numbers to highlight
     */
    highlightDots(cellElement, dotNumbers) {
        dotNumbers.forEach(dotNum => {
            const dot = cellElement.querySelector(`[data-dot="${dotNum}"]`);
            if (dot && !dot.classList.contains('correct')) {
                dot.classList.add('hint');
            }
        });
    },

    /**
     * Clear all hints
     * @param {HTMLElement} cellElement 
     */
    clearHints(cellElement) {
        const dots = cellElement.querySelectorAll('.braille-dot');
        dots.forEach(dot => {
            dot.classList.remove('ghost', 'hint');
        });
    }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BrailleCell;
}
