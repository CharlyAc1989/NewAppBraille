/**
 * Build Activity
 * Construct Braille patterns by tapping dots
 * KEY RULE: Immediate feedback per dot
 */

const BuildActivity = {
    currentIndex: 0,
    letters: [],
    onComplete: null,
    targetPattern: [],
    userPattern: [],
    correctCount: 0,
    totalAttempts: 0,
    score: 0,

    /**
     * Start build activity
     * @param {string[]} letters - Letters to build
     * @param {Function} onComplete - Callback when activity ends
     */
    start(letters, onComplete) {
        this.letters = letters;
        this.currentIndex = 0;
        this.onComplete = onComplete;
        this.correctCount = 0;
        this.totalAttempts = 0;
        this.score = 0;

        HintSystem.reset();
        this.render();
    },

    /**
     * Render current letter
     */
    render() {
        const overlay = document.getElementById('activity-overlay');
        const letter = this.letters[this.currentIndex];
        this.targetPattern = BrailleData.getPattern(letter);
        this.userPattern = [0, 0, 0, 0, 0, 0];

        const progress = ((this.currentIndex + 1) / this.letters.length) * 100;
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
                <span style="font-size: var(--font-size-sm); color: var(--color-text-secondary); min-width: 40px; text-align: right;">
                    ${this.currentIndex + 1}/${this.letters.length}
                </span>
            </div>

            <div class="activity-content">
                <p class="activity-instruction">Construye el patrón Braille</p>
                
                <div class="activity-letter">${letter}</div>
                
                <div class="activity-cell-container">
                    <div class="braille-cell size-lg interactive" id="build-cell">
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
                    <button class="btn btn-secondary" id="build-hint" style="flex: 1;">
                        💡 Pista
                    </button>
                    <button class="btn btn-secondary" id="build-reset" style="flex: 1;">
                        🔄 Reiniciar
                    </button>
                </div>
            </div>
        `;

        overlay.classList.remove('hidden');
        Navigation.hide();

        this.attachEventListeners();

        // Speak the letter
        AudioFeedback.speak(`Construye la letra ${letter}`);
    },

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        // Close button
        document.getElementById('activity-close').addEventListener('click', () => {
            this.close();
        });

        // Dot taps - IMMEDIATE FEEDBACK
        const cell = document.getElementById('build-cell');
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
        document.getElementById('build-hint').addEventListener('click', () => {
            this.showHint();
        });

        // Reset button
        document.getElementById('build-reset').addEventListener('click', () => {
            this.resetCell();
        });
    },

    /**
     * Handle dot tap with IMMEDIATE FEEDBACK
     * @param {HTMLElement} dot 
     */
    handleDotTap(dot) {
        const dotNum = parseInt(dot.getAttribute('data-dot'));
        const dotIndex = dotNum - 1;
        const targetValue = this.targetPattern[dotIndex];

        // Current state of this dot
        const isCurrentlyActive = dot.classList.contains('correct');

        this.totalAttempts++;

        // Clear previous error states
        dot.classList.remove('incorrect');

        if (!isCurrentlyActive) {
            // User is trying to activate this dot
            if (targetValue === 1) {
                // CORRECT - this dot should be active
                dot.classList.add('correct');
                this.userPattern[dotIndex] = 1;
                this.correctCount++;

                Haptics.success();
                AudioFeedback.success();

                // Check if pattern is complete
                this.checkComplete();
            } else {
                // INCORRECT - this dot should NOT be active
                dot.classList.add('incorrect');

                Haptics.error();
                AudioFeedback.error();

                // Remove incorrect state after animation
                setTimeout(() => {
                    dot.classList.remove('incorrect');
                }, 300);

                // Record failed attempt for hint system
                AppState.recordAnswer(false);
                if (HintSystem.recordFailedAttempt()) {
                    this.showHint();
                }
            }
        } else {
            // User is trying to deactivate - in build mode we don't allow deactivation of correct dots
            Haptics.tap();
        }
    },

    /**
     * Check if pattern is complete
     */
    checkComplete() {
        const letter = this.letters[this.currentIndex];

        if (BrailleData.patternsMatch(this.userPattern, this.targetPattern)) {
            // Pattern complete!
            AppState.recordAnswer(true);
            this.score += 100;

            // Celebrate briefly then move to next
            setTimeout(() => {
                if (this.currentIndex < this.letters.length - 1) {
                    this.currentIndex++;
                    HintSystem.reset();
                    this.render();
                } else {
                    this.complete();
                }
            }, 500);
        }
    },

    /**
     * Show hint
     */
    showHint() {
        const letter = this.letters[this.currentIndex];
        const cell = document.getElementById('build-cell');
        const hintContainer = document.getElementById('hint-container');

        HintSystem.requestHint();
        HintSystem.renderHint(letter, hintContainer, cell);

        Haptics.tap();
    },

    /**
     * Reset current cell
     */
    resetCell() {
        const cell = document.getElementById('build-cell');
        const dots = cell.querySelectorAll('.braille-dot');

        dots.forEach(dot => {
            dot.classList.remove('correct', 'incorrect', 'hint', 'ghost');
            dot.setAttribute('aria-pressed', 'false');
        });

        this.userPattern = [0, 0, 0, 0, 0, 0];

        // Clear hints
        const hintContainer = document.getElementById('hint-container');
        hintContainer.classList.add('hidden');
        hintContainer.innerHTML = '';

        Haptics.tap();
    },

    /**
     * Complete activity
     */
    complete() {
        const totalDots = this.letters.length * 6;
        const accuracy = Math.round((this.correctCount / Math.max(this.totalAttempts, 1)) * 100);

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
                type: 'build',
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
    module.exports = BuildActivity;
}
