/**
 * Build Activity
 * Construct Braille patterns by tapping dots
 * 
 * SPECS:
 * - Immediate per-dot feedback:
 *   ✅ Correct: visual positive + soft haptic
 *   ❌ Incorrect: visual negative (0.5s) + strong haptic, dot stays
 * - 3-level hint system with 5s cooldown:
 *   1. Conceptual: "Necesitas el punto superior derecho"
 *   2. Technical: "Activa el punto 4"
 *   3. Ghost pattern (30% opacity, 1s, non-interactive)
 * - No attempt limit
 */

const BuildActivity = {
    currentIndex: 0,
    letters: [],
    onComplete: null,
    userPattern: [0, 0, 0, 0, 0, 0],
    targetPattern: [],
    score: 0,
    totalAttempts: 0,
    correctAttempts: 0,
    hintLevel: 0,
    hintCooldown: false,
    noHints: false,
    timeLimit: null,
    startTime: null,
    HINT_COOLDOWN_MS: 5000, // 5 seconds

    /**
     * Start build activity
     */
    start(letters, onComplete, options = {}) {
        this.letters = letters;
        this.currentIndex = 0;
        this.onComplete = onComplete;
        this.score = 0;
        this.totalAttempts = 0;
        this.correctAttempts = 0;
        this.noHints = options.noHints || false;
        this.timeLimit = options.timeLimit || null;
        this.startTime = Date.now();

        this.resetPattern();
        this.render();
    },

    /**
     * Reset current pattern
     */
    resetPattern() {
        this.userPattern = [0, 0, 0, 0, 0, 0];
        this.hintLevel = 0;
        this.hintCooldown = false;

        const letter = this.letters[this.currentIndex];

        // Handle special content types
        if (letter === 'dot-practice') {
            // Practice all 6 dots
            this.targetPattern = [1, 1, 1, 1, 1, 1];
            this.displayLetter = '⠿';
            this.instruction = 'Toca todos los puntos';
        } else if (letter === 'uppercase-sign') {
            this.targetPattern = BrailleData.SIGNS ? BrailleData.SIGNS['uppercase'] : [0, 0, 0, 1, 0, 1];
            this.displayLetter = 'MAY';
            this.instruction = 'Construye el signo de mayúscula';
        } else if (letter === 'number-sign') {
            this.targetPattern = BrailleData.SIGNS ? BrailleData.SIGNS['number'] : [0, 0, 1, 1, 1, 1];
            this.displayLetter = '#';
            this.instruction = 'Construye el signo numérico';
        } else {
            this.targetPattern = BrailleData.getPattern(letter) || [1, 0, 0, 0, 0, 0];
            this.displayLetter = letter.toUpperCase();
            this.instruction = 'Construye la letra';
        }
    },

    /**
     * Render activity
     */
    render() {
        const overlay = document.getElementById('activity-overlay');
        const letter = this.letters[this.currentIndex];
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
                <p class="activity-instruction">${this.instruction || 'Construye la letra'}</p>
                
                <div class="activity-letter">${this.displayLetter || letter.toUpperCase()}</div>
                
                <div class="activity-cell-container" id="build-cell-container">
                    <div class="braille-cell size-lg interactive" id="build-cell">
                        ${dotOrder.map(dotNum => `
                            <div class="braille-dot ${this.userPattern[dotNum - 1] === 1 ? 'active' : ''}" 
                                 data-dot="${dotNum}"
                                 tabindex="0"
                                 role="button"
                                 aria-label="Punto ${dotNum}"
                                 aria-pressed="${this.userPattern[dotNum - 1] === 1}">
                            </div>
                        `).join('')}
                    </div>
                    <!-- Ghost pattern overlay -->
                    <div class="ghost-overlay hidden" id="ghost-overlay">
                        <div class="braille-cell size-lg ghost">
                            ${dotOrder.map(dotNum => `
                                <div class="braille-dot ${this.targetPattern[dotNum - 1] === 1 ? 'ghost' : ''}" 
                                     data-dot="${dotNum}">
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- Hint text area -->
                <div id="hint-area" class="hint-area" style="min-height: 24px; margin-top: var(--space-2); text-align: center;">
                </div>
            </div>

            <div class="activity-footer">
                <!-- Botón Siguiente (aparece cuando el patrón está completo) -->
                <button class="btn btn-primary btn-block btn-lg hidden" id="next-btn" style="margin-bottom: var(--space-3);">
                    Siguiente
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style="margin-left: 8px;">
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <div style="display: flex; gap: var(--space-3); margin-bottom: var(--space-3);">
                    ${!this.noHints ? `
                        <button class="btn btn-secondary flex-1" id="hint-btn">
                            <span class="material-symbols-outlined" style="font-size: 18px; margin-right: 4px;">lightbulb</span>
                            Pista
                        </button>
                    ` : ''}
                    <button class="btn btn-secondary flex-1" id="reset-btn">
                        <span class="material-symbols-outlined" style="font-size: 18px; margin-right: 4px;">refresh</span>
                        Reiniciar
                    </button>
                </div>
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
        const cell = document.getElementById('build-cell');
        const dots = cell.querySelectorAll('.braille-dot');

        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const dotNum = parseInt(e.target.dataset.dot);
                this.toggleDot(dotNum);
            });

            // Keyboard accessibility
            dot.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const dotNum = parseInt(e.target.dataset.dot);
                    this.toggleDot(dotNum);
                }
            });
        });

        // Hint button
        const hintBtn = document.getElementById('hint-btn');
        if (hintBtn) {
            hintBtn.addEventListener('click', () => {
                this.showHint();
            });
        }

        // Reset button
        document.getElementById('reset-btn').addEventListener('click', () => {
            this.resetCurrentPattern();
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
     * Toggle a dot and provide immediate feedback
     */
    toggleDot(dotNum) {
        const dotIndex = dotNum - 1;
        const isTarget = this.targetPattern[dotIndex] === 1;
        const isCurrentlyActive = this.userPattern[dotIndex] === 1;

        // If turning off a dot
        if (isCurrentlyActive) {
            this.userPattern[dotIndex] = 0;
            this.updateDotVisual(dotNum, 'default');
            Haptics.tap();
            return;
        }

        // Turning on a dot - check if correct
        this.totalAttempts++;

        if (isTarget) {
            // CORRECT
            this.userPattern[dotIndex] = 1;
            this.correctAttempts++;
            this.updateDotVisual(dotNum, 'correct');
            Haptics.success();
            AudioFeedback.playTone('success');

            // Check if pattern is complete
            if (this.isPatternComplete()) {
                this.onPatternComplete();
            }
        } else {
            // INCORRECT - show error for 0.5s, dot stays
            this.userPattern[dotIndex] = 1;
            this.updateDotVisual(dotNum, 'incorrect');
            Haptics.error();
            AudioFeedback.playTone('error');

            // Keep error state for 0.5s
            setTimeout(() => {
                // Keep the dot active but change to default state
                const dotEl = document.querySelector(`[data-dot="${dotNum}"]`);
                if (dotEl) {
                    dotEl.classList.remove('incorrect');
                    dotEl.classList.add('active');
                }
            }, 500);
        }
    },

    /**
     * Update dot visual state
     */
    updateDotVisual(dotNum, state) {
        const dotEl = document.querySelector(`#build-cell [data-dot="${dotNum}"]`);
        if (!dotEl) return;

        dotEl.classList.remove('default', 'active', 'correct', 'incorrect', 'ghost');
        dotEl.classList.add(state);
        dotEl.setAttribute('aria-pressed', state !== 'default');
    },

    /**
     * Check if pattern is complete (all target dots are active)
     */
    isPatternComplete() {
        for (let i = 0; i < 6; i++) {
            if (this.targetPattern[i] === 1 && this.userPattern[i] !== 1) {
                return false;
            }
        }
        return true;
    },

    /**
     * Handle pattern completion - show next button
     */
    onPatternComplete() {
        console.log('Pattern complete! Showing next button...');
        this.score += 10;

        // Use setTimeout to ensure DOM is updated before modifying
        setTimeout(() => {
            // Show the next button
            const nextBtn = document.getElementById('next-btn');
            console.log('Next button found:', nextBtn);
            if (nextBtn) {
                nextBtn.classList.remove('hidden');
                nextBtn.style.display = 'block'; // Force display
                console.log('Next button should be visible now');
            }

            // Update hint area with success message
            const hintArea = document.getElementById('hint-area');
            if (hintArea) {
                hintArea.innerHTML = `<p style="color: var(--color-success); font-size: var(--font-size-sm); font-weight: bold;">✅ ¡Correcto! Toca "Siguiente" para continuar</p>`;
            }
        }, 100);
    },

    /**
     * Go to next letter/exercise
     */
    goToNext() {
        Haptics.tap();

        if (this.currentIndex < this.letters.length - 1) {
            this.currentIndex++;
            this.resetPattern();
            this.render();
        } else {
            this.complete();
        }
    },

    /**
     * Show hint based on current level
     */
    showHint() {
        if (this.hintCooldown) return;

        this.hintLevel++;
        const hintArea = document.getElementById('hint-area');
        const hintBtn = document.getElementById('hint-btn');

        // Find a missing dot
        let missingDot = -1;
        for (let i = 0; i < 6; i++) {
            if (this.targetPattern[i] === 1 && this.userPattern[i] !== 1) {
                missingDot = i + 1;
                break;
            }
        }

        if (missingDot === -1) return;

        // Get position description
        const positions = {
            1: 'superior izquierdo',
            2: 'central izquierdo',
            3: 'inferior izquierdo',
            4: 'superior derecho',
            5: 'central derecho',
            6: 'inferior derecho'
        };

        if (this.hintLevel === 1) {
            // Level 1: Conceptual hint
            hintArea.innerHTML = `<p style="color: var(--color-primary); font-size: var(--font-size-sm);">
                💡 Necesitas el punto ${positions[missingDot]}
            </p>`;
            Haptics.tap();
        } else if (this.hintLevel === 2) {
            // Level 2: Technical hint
            hintArea.innerHTML = `<p style="color: var(--color-primary); font-size: var(--font-size-sm); font-weight: bold;">
                🎯 Activa el punto ${missingDot}
            </p>`;
            Haptics.tap();
        } else if (this.hintLevel >= 3) {
            // Level 3: Ghost pattern
            this.showGhostPattern();
            hintArea.innerHTML = `<p style="color: var(--color-text-secondary); font-size: var(--font-size-sm);">
                👻 Patrón mostrado
            </p>`;
        }

        // Start cooldown
        this.hintCooldown = true;
        if (hintBtn) {
            hintBtn.disabled = true;
            hintBtn.style.opacity = '0.5';
        }

        setTimeout(() => {
            this.hintCooldown = false;
            if (hintBtn) {
                hintBtn.disabled = false;
                hintBtn.style.opacity = '1';
            }
        }, this.HINT_COOLDOWN_MS);
    },

    /**
     * Show ghost pattern overlay
     */
    showGhostPattern() {
        const ghostOverlay = document.getElementById('ghost-overlay');
        if (!ghostOverlay) return;

        ghostOverlay.classList.remove('hidden');
        ghostOverlay.style.opacity = '0.3';

        // Hide after 1 second
        setTimeout(() => {
            ghostOverlay.classList.add('hidden');
        }, 1000);
    },

    /**
     * Reset current pattern
     */
    resetCurrentPattern() {
        Haptics.tap();
        this.userPattern = [0, 0, 0, 0, 0, 0];
        this.hintLevel = 0;

        const cell = document.getElementById('build-cell');
        if (cell) {
            cell.querySelectorAll('.braille-dot').forEach(dot => {
                dot.classList.remove('active', 'correct', 'incorrect', 'ghost');
                dot.setAttribute('aria-pressed', 'false');
            });
        }

        const hintArea = document.getElementById('hint-area');
        if (hintArea) {
            hintArea.innerHTML = '';
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

        // Show completion modal
        Modal.showGameComplete(this.score, accuracy, {
            stars,
            onRetry: () => {
                Modal.hide();
                this.start(this.letters, this.onComplete);
            },
            onContinue: () => {
                Modal.hide();
                if (this.onComplete) {
                    this.onComplete({
                        type: 'build',
                        letters: this.letters,
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
    module.exports = BuildActivity;
}
