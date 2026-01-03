/**
 * Words Activity
 * Build complete words letter by letter
 * 
 * SPECS:
 * - Letter-by-letter construction (left to right)
 * - Each letter = 1 cell
 * - Uppercase and numbers = 2 cells (prefix + base)
 * - Per-letter verification (not wait for complete word)
 */

const WordsActivity = {
    currentWordIndex: 0,
    currentLetterIndex: 0,
    words: [],
    onComplete: null,
    userPattern: [0, 0, 0, 0, 0, 0],
    targetPatterns: [], // Array of patterns for current character (1 or 2)
    currentPatternIndex: 0, // Which pattern we're building (for multi-cell)
    score: 0,
    totalAttempts: 0,
    correctAttempts: 0,

    /**
     * Start words activity
     */
    start(words, onComplete) {
        this.words = words;
        this.currentWordIndex = 0;
        this.currentLetterIndex = 0;
        this.currentPatternIndex = 0;
        this.onComplete = onComplete;
        this.score = 0;
        this.totalAttempts = 0;
        this.correctAttempts = 0;

        this.setupCurrentLetter();
        this.render();
    },

    /**
     * Setup patterns for current letter
     */
    setupCurrentLetter() {
        const word = this.words[this.currentWordIndex];
        const char = word[this.currentLetterIndex];

        // Get patterns (1 for normal, 2 for uppercase/numbers)
        this.targetPatterns = BrailleData.getPatterns(char);
        this.currentPatternIndex = 0;
        this.userPattern = [0, 0, 0, 0, 0, 0];
    },

    /**
     * Render activity
     */
    render() {
        const overlay = document.getElementById('activity-overlay');
        const word = this.words[this.currentWordIndex];
        const currentChar = word[this.currentLetterIndex];
        const progress = ((this.currentWordIndex * 100 + (this.currentLetterIndex / word.length) * 100) / this.words.length);
        const dotOrder = [1, 4, 2, 5, 3, 6];

        // Word display with current letter highlighted
        const wordDisplay = word.split('').map((char, idx) => {
            let classes = 'word-letter';
            if (idx < this.currentLetterIndex) classes += ' completed';
            else if (idx === this.currentLetterIndex) classes += ' current';
            return `<span class="${classes}">${char}</span>`;
        }).join('');

        // Check if we're building a prefix (uppercase or number sign)
        const isMultiCell = this.targetPatterns.length > 1;
        const isPrefix = isMultiCell && this.currentPatternIndex === 0;

        let instruction = 'Construye la letra';
        let charDisplay = currentChar.toUpperCase();

        if (isPrefix) {
            if (/[A-ZÑÁÉÍÓÚÜ]/.test(currentChar)) {
                instruction = 'Primero: signo de mayúscula';
                charDisplay = '⠨ MAY';
            } else if (/[0-9]/.test(currentChar)) {
                instruction = 'Primero: signo numérico';
                charDisplay = '⠼ #';
            }
        }

        overlay.innerHTML = `
            <div class="activity-header">
                <button class="icon-btn" id="activity-close">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </button>
                <div class="activity-progress">
                    <div class="progress-bar">
                        <div class="progress-bar-fill" style="width: ${progress}%;"></div>
                    </div>
                </div>
                <span style="font-size: var(--font-size-sm); color: var(--color-text-secondary); min-width: 60px; text-align: right;">
                    ${this.currentWordIndex + 1}/${this.words.length}
                </span>
            </div>

            <div class="activity-content">
                <p class="activity-instruction">${instruction}</p>
                
                <!-- Word display -->
                <div class="word-display" style="font-size: 24px; letter-spacing: 4px; margin-bottom: var(--space-4);">
                    ${wordDisplay}
                </div>

                <!-- Current character -->
                <div class="activity-letter" style="font-size: 48px;">${charDisplay}</div>
                
                <!-- Multi-cell indicator -->
                ${isMultiCell ? `
                    <div style="display: flex; gap: var(--space-2); justify-content: center; margin-bottom: var(--space-3);">
                        <div class="cell-indicator ${this.currentPatternIndex === 0 ? 'active' : this.currentPatternIndex > 0 ? 'completed' : ''}">
                            ${isPrefix && /[A-ZÑÁÉÍÓÚÜ]/.test(currentChar) ? 'MAY' : '#'}
                        </div>
                        <div class="cell-indicator ${this.currentPatternIndex === 1 ? 'active' : ''}">
                            ${currentChar.toLowerCase()}
                        </div>
                    </div>
                ` : ''}
                
                <div class="activity-cell-container">
                    <div class="braille-cell size-lg interactive" id="words-cell">
                        ${dotOrder.map(dotNum => `
                            <div class="braille-dot ${this.userPattern[dotNum - 1] === 1 ? 'active' : ''}" 
                                 data-dot="${dotNum}"
                                 tabindex="0"
                                 role="button"
                                 aria-label="Punto ${dotNum}">
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>

            <div class="activity-footer">
                <!-- Botón Siguiente -->
                <button class="btn btn-primary btn-block btn-lg hidden" id="next-btn" style="margin-bottom: var(--space-3);">
                    Siguiente
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style="margin-left: 8px;">
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <div id="words-hint" style="text-align: center; min-height: 20px; margin-bottom: var(--space-2);"></div>
                <button class="btn btn-secondary btn-block" id="reset-btn">
                    <span class="material-symbols-outlined" style="font-size: 18px; margin-right: 4px;">refresh</span>
                    Reiniciar letra
                </button>
            </div>
        `;

        overlay.classList.remove('hidden');
        Navigation.hide();

        this.attachEventListeners();
    },

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        // Close button
        document.getElementById('activity-close').addEventListener('click', () => {
            this.close();
        });

        // Dot clicking
        const cell = document.getElementById('words-cell');
        const dots = cell.querySelectorAll('.braille-dot');

        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const dotNum = parseInt(e.target.dataset.dot);
                this.toggleDot(dotNum);
            });
        });

        // Reset button
        document.getElementById('reset-btn').addEventListener('click', () => {
            this.resetCurrentLetter();
        });

        // Next button
        const nextBtn = document.getElementById('next-btn');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.goToNext();
            });
        }
    },

    /**
     * Toggle dot
     */
    toggleDot(dotNum) {
        const dotIndex = dotNum - 1;
        const currentTarget = this.targetPatterns[this.currentPatternIndex];
        const isTarget = currentTarget[dotIndex] === 1;
        const isCurrentlyActive = this.userPattern[dotIndex] === 1;

        // Toggle off
        if (isCurrentlyActive) {
            this.userPattern[dotIndex] = 0;
            this.updateDotVisual(dotNum, 'default');
            Haptics.tap();
            return;
        }

        // Toggle on
        this.totalAttempts++;

        if (isTarget) {
            // CORRECT
            this.userPattern[dotIndex] = 1;
            this.correctAttempts++;
            this.updateDotVisual(dotNum, 'correct');
            Haptics.success();
            AudioFeedback.playTone('success');

            // Check if current pattern is complete
            if (this.isPatternComplete()) {
                this.onPatternComplete();
            }
        } else {
            // INCORRECT
            this.userPattern[dotIndex] = 1;
            this.updateDotVisual(dotNum, 'incorrect');
            Haptics.error();
            AudioFeedback.playTone('error');

            setTimeout(() => {
                const dotEl = document.querySelector(`#words-cell [data-dot="${dotNum}"]`);
                if (dotEl) {
                    dotEl.classList.remove('incorrect');
                    dotEl.classList.add('active');
                }
            }, 500);
        }
    },

    /**
     * Update dot visual
     */
    updateDotVisual(dotNum, state) {
        const dotEl = document.querySelector(`#words-cell [data-dot="${dotNum}"]`);
        if (!dotEl) return;

        dotEl.classList.remove('default', 'active', 'correct', 'incorrect');
        dotEl.classList.add(state);
    },

    /**
     * Check if current pattern is complete
     */
    isPatternComplete() {
        const currentTarget = this.targetPatterns[this.currentPatternIndex];
        for (let i = 0; i < 6; i++) {
            if (currentTarget[i] === 1 && this.userPattern[i] !== 1) {
                return false;
            }
        }
        return true;
    },

    /**
     * Handle pattern completion - show next button
     */
    onPatternComplete() {
        this.score += 5;

        // Check if more patterns for this character (e.g., uppercase sign + letter)
        if (this.currentPatternIndex < this.targetPatterns.length - 1) {
            // Auto-advance to next pattern of same character
            setTimeout(() => {
                this.currentPatternIndex++;
                this.userPattern = [0, 0, 0, 0, 0, 0];
                this.render();
            }, 400);
            return;
        }

        // Show next button
        const nextBtn = document.getElementById('next-btn');
        if (nextBtn) {
            nextBtn.classList.remove('hidden');
        }

        // Show success message
        const wordsHint = document.getElementById('words-hint');
        if (wordsHint) {
            wordsHint.innerHTML = `<span style="color: var(--color-success); font-weight: bold;">✅ ¡Correcto! Toca "Siguiente"</span>`;
        }
    },

    /**
     * Go to next letter/word
     */
    goToNext() {
        Haptics.tap();

        const word = this.words[this.currentWordIndex];

        if (this.currentLetterIndex < word.length - 1) {
            this.currentLetterIndex++;
            this.setupCurrentLetter();
            this.render();
        } else {
            // Word complete, move to next word
            if (this.currentWordIndex < this.words.length - 1) {
                this.currentWordIndex++;
                this.currentLetterIndex = 0;
                this.setupCurrentLetter();
                this.render();

                Haptics.celebration();
                AudioFeedback.speak(`¡Palabra completada!`);
            } else {
                // All words complete
                this.complete();
            }
        }
    },

    /**
     * Reset current letter
     */
    resetCurrentLetter() {
        Haptics.tap();
        this.userPattern = [0, 0, 0, 0, 0, 0];

        const cell = document.getElementById('words-cell');
        if (cell) {
            cell.querySelectorAll('.braille-dot').forEach(dot => {
                dot.classList.remove('active', 'correct', 'incorrect');
            });
        }
    },

    /**
     * Complete activity
     */
    complete() {
        const accuracy = this.totalAttempts > 0
            ? Math.round((this.correctAttempts / this.totalAttempts) * 100)
            : 100;

        const stars = Progression.calculateStars(accuracy);
        const completed = Progression.isLevelComplete(accuracy);

        Haptics.celebration();
        AudioFeedback.playTone('celebration');

        Modal.showGameComplete(this.score, accuracy, {
            stars,
            onRetry: () => {
                Modal.hide();
                this.start(this.words, this.onComplete);
            },
            onContinue: () => {
                Modal.hide();
                if (this.onComplete) {
                    this.onComplete({
                        type: 'words',
                        words: this.words,
                        completed,
                        score: this.score,
                        accuracy,
                        stars
                    });
                }
                this.close();
            }
        });
    },

    /**
     * Close activity
     */
    close() {
        const overlay = document.getElementById('activity-overlay');
        overlay.classList.add('hidden');
        overlay.innerHTML = '';
        Navigation.show();
    }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WordsActivity;
}
