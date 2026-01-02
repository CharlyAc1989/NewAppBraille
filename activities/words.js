/**
 * Words Activity
 * Practice building words letter by letter
 */

const WordsActivity = {
    currentWordIndex: 0,
    currentLetterIndex: 0,
    words: [],
    onComplete: null,
    score: 0,
    correctCount: 0,
    totalAttempts: 0,

    /**
     * Start words activity
     * @param {string[]} words - Words to practice
     * @param {Function} onComplete - Callback when activity ends
     */
    start(words, onComplete) {
        this.words = words;
        this.currentWordIndex = 0;
        this.currentLetterIndex = 0;
        this.onComplete = onComplete;
        this.score = 0;
        this.correctCount = 0;
        this.totalAttempts = 0;

        HintSystem.reset();
        this.render();
    },

    /**
     * Render current word/letter
     */
    render() {
        const overlay = document.getElementById('activity-overlay');
        const word = this.words[this.currentWordIndex];
        const letter = word[this.currentLetterIndex].toUpperCase();
        const targetPattern = BrailleData.getPattern(letter);

        const totalLetters = this.words.reduce((sum, w) => sum + w.length, 0);
        const completedLetters = this.words.slice(0, this.currentWordIndex).reduce((sum, w) => sum + w.length, 0) + this.currentLetterIndex;
        const progress = ((completedLetters + 1) / totalLetters) * 100;

        const dotOrder = [1, 4, 2, 5, 3, 6];

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
                <span style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">
                    Palabra ${this.currentWordIndex + 1}/${this.words.length}
                </span>
            </div>

            <div class="activity-content">
                <p class="activity-instruction">Construye la palabra</p>
                
                <!-- Word Display -->
                <div style="display: flex; justify-content: center; gap: var(--space-2); margin-bottom: var(--space-4);">
                    ${word.split('').map((char, idx) => `
                        <span style="
                            font-size: var(--font-size-2xl);
                            font-weight: var(--font-weight-bold);
                            padding: var(--space-2) var(--space-3);
                            border-radius: var(--radius-md);
                            background: ${idx < this.currentLetterIndex ? 'var(--color-success)' : idx === this.currentLetterIndex ? 'var(--color-primary)' : 'var(--color-surface-secondary)'};
                            color: ${idx <= this.currentLetterIndex ? 'white' : 'var(--color-text-primary)'};
                        ">${char.toUpperCase()}</span>
                    `).join('')}
                </div>
                
                <p style="color: var(--color-text-secondary); margin-bottom: var(--space-4);">
                    Construye: <strong>${letter}</strong>
                </p>
                
                <div class="activity-cell-container">
                    <div class="braille-cell size-lg interactive" id="words-cell">
                        ${dotOrder.map(dotNum => `
                            <div class="braille-dot" 
                                 data-dot="${dotNum}"
                                 tabindex="0"
                                 role="button"
                                 aria-label="Punto ${dotNum}"
                                 aria-pressed="false">
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="hint-container hidden" id="hint-container"></div>
            </div>

            <div class="activity-footer">
                <div style="display: flex; gap: var(--space-3);">
                    <button class="btn btn-secondary" id="words-hint" style="flex: 1;">
                        💡 Pista
                    </button>
                    <button class="btn btn-secondary" id="words-reset" style="flex: 1;">
                        🔄 Reiniciar
                    </button>
                </div>
            </div>
        `;

        overlay.classList.remove('hidden');
        Navigation.hide();

        // Store target pattern for checking
        this.targetPattern = targetPattern;
        this.userPattern = [0, 0, 0, 0, 0, 0];

        this.attachEventListeners();

        // Speak the word and letter
        AudioFeedback.speak(`Palabra ${word}, letra ${letter}`);
    },

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        // Close button
        document.getElementById('activity-close').addEventListener('click', () => {
            this.close();
        });

        // Dot taps
        const cell = document.getElementById('words-cell');
        const dots = cell.querySelectorAll('.braille-dot');

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                this.handleDotTap(dot);
            });

            dot.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.handleDotTap(dot);
                }
            });
        });

        // Hint button
        document.getElementById('words-hint').addEventListener('click', () => {
            this.showHint();
        });

        // Reset button
        document.getElementById('words-reset').addEventListener('click', () => {
            this.resetCell();
        });
    },

    /**
     * Handle dot tap with immediate feedback
     * @param {HTMLElement} dot 
     */
    handleDotTap(dot) {
        const dotNum = parseInt(dot.getAttribute('data-dot'));
        const dotIndex = dotNum - 1;
        const targetValue = this.targetPattern[dotIndex];

        const isCurrentlyActive = dot.classList.contains('correct');

        this.totalAttempts++;
        dot.classList.remove('incorrect');

        if (!isCurrentlyActive) {
            if (targetValue === 1) {
                dot.classList.add('correct');
                this.userPattern[dotIndex] = 1;
                this.correctCount++;

                Haptics.success();
                AudioFeedback.success();

                this.checkLetterComplete();
            } else {
                dot.classList.add('incorrect');

                Haptics.error();
                AudioFeedback.error();

                setTimeout(() => {
                    dot.classList.remove('incorrect');
                }, 300);

                AppState.recordAnswer(false);
                if (HintSystem.recordFailedAttempt()) {
                    this.showHint();
                }
            }
        } else {
            Haptics.tap();
        }
    },

    /**
     * Check if current letter is complete
     */
    checkLetterComplete() {
        if (BrailleData.patternsMatch(this.userPattern, this.targetPattern)) {
            AppState.recordAnswer(true);
            this.score += 50;

            const word = this.words[this.currentWordIndex];

            setTimeout(() => {
                if (this.currentLetterIndex < word.length - 1) {
                    // Next letter in word
                    this.currentLetterIndex++;
                    HintSystem.reset();
                    this.render();
                } else if (this.currentWordIndex < this.words.length - 1) {
                    // Word complete - show celebration then next word
                    this.currentWordIndex++;
                    this.currentLetterIndex = 0;
                    HintSystem.reset();

                    Haptics.celebration();
                    AudioFeedback.celebration();

                    setTimeout(() => {
                        this.render();
                    }, 500);
                } else {
                    // All words complete
                    this.complete();
                }
            }, 500);
        }
    },

    /**
     * Show hint
     */
    showHint() {
        const word = this.words[this.currentWordIndex];
        const letter = word[this.currentLetterIndex].toUpperCase();
        const cell = document.getElementById('words-cell');
        const hintContainer = document.getElementById('hint-container');

        HintSystem.requestHint();
        HintSystem.renderHint(letter, hintContainer, cell);

        Haptics.tap();
    },

    /**
     * Reset current cell
     */
    resetCell() {
        const cell = document.getElementById('words-cell');
        const dots = cell.querySelectorAll('.braille-dot');

        dots.forEach(dot => {
            dot.classList.remove('correct', 'incorrect', 'hint', 'ghost');
            dot.setAttribute('aria-pressed', 'false');
        });

        this.userPattern = [0, 0, 0, 0, 0, 0];

        const hintContainer = document.getElementById('hint-container');
        hintContainer.classList.add('hidden');
        hintContainer.innerHTML = '';

        Haptics.tap();
    },

    /**
     * Complete activity
     */
    complete() {
        const accuracy = Math.round((this.correctCount / Math.max(this.totalAttempts, 1)) * 100);

        Modal.showGameComplete(
            { score: this.score, accuracy },
            () => {
                this.start(this.words, this.onComplete);
            },
            () => {
                this.close();
                Navigation.navigateTo('home');
            }
        );

        if (this.onComplete) {
            this.onComplete({
                type: 'words',
                words: this.words,
                score: this.score,
                accuracy,
                completed: true
            });
        }

        this.close();
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
