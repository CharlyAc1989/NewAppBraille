/**
 * Pick Activity
 * Select correct Braille pattern from options
 * KEY RULE: Similar distractors, not random
 */

const PickActivity = {
    currentIndex: 0,
    letters: [],
    onComplete: null,
    correctCount: 0,
    score: 0,
    currentOptions: [],
    correctAnswer: null,

    /**
     * Start pick activity
     * @param {string[]} letters - Letters to pick
     * @param {Function} onComplete - Callback when activity ends
     */
    start(letters, onComplete) {
        this.letters = letters;
        this.currentIndex = 0;
        this.onComplete = onComplete;
        this.correctCount = 0;
        this.score = 0;

        HintSystem.reset();
        this.render();
    },

    /**
     * Generate options with similar distractors
     * @param {string} correctLetter 
     * @returns {string[]} - Array of 4 letters including correct one
     */
    generateOptions(correctLetter) {
        // Get similar letters (1-2 dot difference)
        const similar = BrailleData.getSimilarLetters(correctLetter, 3);

        // Create options array with correct answer
        const options = [correctLetter, ...similar];

        // Shuffle options
        return options.sort(() => Math.random() - 0.5);
    },

    /**
     * Render current question
     */
    render() {
        const overlay = document.getElementById('activity-overlay');
        const letter = this.letters[this.currentIndex];
        const pattern = BrailleData.getPattern(letter);
        const progress = ((this.currentIndex + 1) / this.letters.length) * 100;
        const dotOrder = [1, 4, 2, 5, 3, 6];

        // Generate options with similar distractors
        this.currentOptions = this.generateOptions(letter);
        this.correctAnswer = letter;

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
                <span style="font-size: var(--font-size-sm); color: var(--color-text-secondary); min-width: 40px; text-align: right;">
                    ${this.currentIndex + 1}/${this.letters.length}
                </span>
            </div>

            <div class="activity-content">
                <p class="activity-instruction">¿Cuál es el patrón correcto para?</p>
                
                <div class="activity-letter">${letter}</div>
                
                <div class="activity-options" id="pick-options">
                    ${this.currentOptions.map((optLetter, idx) => {
            const optPattern = BrailleData.getPattern(optLetter);
            return `
                            <div class="option-card" data-option="${optLetter}" data-index="${idx}">
                                <div class="braille-cell size-sm">
                                    ${dotOrder.map(dotNum => `
                                        <div class="braille-dot ${optPattern[dotNum - 1] === 1 ? 'active' : ''}" 
                                             data-dot="${dotNum}">
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        `;
        }).join('')}
                </div>

                <div class="hint-container hidden" id="hint-container"></div>
            </div>

            <div class="activity-footer">
                <button class="btn btn-secondary btn-block" id="pick-hint">
                    💡 Pista
                </button>
            </div>
        `;

        overlay.classList.remove('hidden');
        Navigation.hide();

        this.attachEventListeners();

        // Speak the instruction
        AudioFeedback.speak(`Selecciona el patrón para la letra ${letter}`);
    },

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        // Close button
        document.getElementById('activity-close').addEventListener('click', () => {
            this.close();
        });

        // Option cards
        const options = document.querySelectorAll('.option-card');
        options.forEach(option => {
            option.addEventListener('click', () => {
                this.handleOptionSelect(option);
            });
        });

        // Hint button
        document.getElementById('pick-hint').addEventListener('click', () => {
            this.showHint();
        });
    },

    /**
     * Handle option selection
     * @param {HTMLElement} option 
     */
    handleOptionSelect(option) {
        const selectedLetter = option.getAttribute('data-option');
        const isCorrect = selectedLetter === this.correctAnswer;

        // Disable all options
        const allOptions = document.querySelectorAll('.option-card');
        allOptions.forEach(opt => {
            opt.style.pointerEvents = 'none';
        });

        if (isCorrect) {
            option.classList.add('correct');
            this.correctCount++;
            this.score += 100;

            Haptics.success();
            AudioFeedback.success();
            AppState.recordAnswer(true);

            // Move to next after brief pause
            setTimeout(() => {
                if (this.currentIndex < this.letters.length - 1) {
                    this.currentIndex++;
                    HintSystem.reset();
                    this.render();
                } else {
                    this.complete();
                }
            }, 800);
        } else {
            option.classList.add('incorrect');

            Haptics.error();
            AudioFeedback.error();
            AppState.recordAnswer(false);

            // Show correct answer
            allOptions.forEach(opt => {
                if (opt.getAttribute('data-option') === this.correctAnswer) {
                    opt.classList.add('correct');
                }
            });

            // Record failed attempt for hints
            if (HintSystem.recordFailedAttempt()) {
                this.showHint();
            }

            // Move to next after showing correct answer
            setTimeout(() => {
                if (this.currentIndex < this.letters.length - 1) {
                    this.currentIndex++;
                    HintSystem.reset();
                    this.render();
                } else {
                    this.complete();
                }
            }, 1500);
        }
    },

    /**
     * Show hint
     */
    showHint() {
        const letter = this.letters[this.currentIndex];
        const hintContainer = document.getElementById('hint-container');

        HintSystem.requestHint();
        const hint = HintSystem.getHint(letter);

        if (hint.text) {
            hintContainer.innerHTML = `
                <span class="hint-icon">💡</span>
                <span class="hint-text">${hint.text}</span>
            `;
            hintContainer.classList.remove('hidden');
        }

        // For level 2+, highlight the correct option
        if (hint.level >= 2) {
            const options = document.querySelectorAll('.option-card');
            options.forEach(opt => {
                if (opt.getAttribute('data-option') === this.correctAnswer) {
                    opt.style.borderColor = 'var(--color-secondary)';
                    opt.style.boxShadow = '0 0 0 2px rgba(91, 141, 239, 0.3)';
                }
            });
        }

        Haptics.tap();
    },

    /**
     * Complete activity
     */
    complete() {
        const accuracy = Math.round((this.correctCount / this.letters.length) * 100);

        Modal.showGameComplete(
            { score: this.score, accuracy },
            () => {
                // Retry
                this.start(this.letters, this.onComplete);
            },
            () => {
                // Menu
                this.close();
                Navigation.navigateTo('home');
            }
        );

        if (this.onComplete) {
            this.onComplete({
                type: 'pick',
                letters: this.letters,
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
    module.exports = PickActivity;
}
