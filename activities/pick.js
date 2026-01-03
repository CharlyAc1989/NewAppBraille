/**
 * Pick Activity
 * Recognize correct Braille pattern from options
 * 
 * SPECS:
 * - Always 4 options (2x2 grid)
 * - 1 correct + 3 smart distractors
 * - Distractors: 1-2 dot difference, prioritize real confusions (i/j, e/i, n/ñ)
 * - No mirror patterns, no repeat distractors in same level
 * - Random order
 */

const PickActivity = {
    currentIndex: 0,
    letters: [],
    onComplete: null,
    score: 0,
    attempts: 0,
    correct: 0,
    usedDistractors: new Set(),

    /**
     * Start pick activity
     */
    start(letters, onComplete) {
        this.letters = letters;
        this.currentIndex = 0;
        this.onComplete = onComplete;
        this.score = 0;
        this.attempts = 0;
        this.correct = 0;
        this.usedDistractors = new Set();

        this.render();
    },

    /**
     * Generate smart distractors
     */
    generateDistractors(targetLetter, count = 3) {
        const distractors = [];

        // First, get confusion pairs from BrailleData
        const confusions = BrailleData.CONFUSIONS[targetLetter.toLowerCase()] || [];

        // Filter out already used distractors
        const availableConfusions = confusions.filter(c =>
            !this.usedDistractors.has(c) && c !== targetLetter.toLowerCase()
        );

        // Add confusions first (they are smart distractors)
        for (const conf of availableConfusions) {
            if (distractors.length >= count) break;
            distractors.push(conf);
            this.usedDistractors.add(conf);
        }

        // If we need more, find letters with 1-2 dot difference
        if (distractors.length < count) {
            const targetPattern = BrailleData.getPattern(targetLetter);
            const allLetters = BrailleData.getAllLetters();

            const candidates = allLetters.filter(letter => {
                if (letter === targetLetter.toLowerCase()) return false;
                if (distractors.includes(letter)) return false;
                if (this.usedDistractors.has(letter)) return false;

                const pattern = BrailleData.getPattern(letter);
                const diff = this.countDotDifference(targetPattern, pattern);

                // 1-2 dot difference, not a mirror
                return diff >= 1 && diff <= 2 && !this.isMirror(targetPattern, pattern);
            });

            // Shuffle and take what we need
            candidates.sort(() => Math.random() - 0.5);

            for (const candidate of candidates) {
                if (distractors.length >= count) break;
                distractors.push(candidate);
                this.usedDistractors.add(candidate);
            }
        }

        // If still not enough, add random letters (fallback)
        if (distractors.length < count) {
            const allLetters = BrailleData.getAllLetters();
            const remaining = allLetters.filter(l =>
                l !== targetLetter.toLowerCase() &&
                !distractors.includes(l)
            );
            remaining.sort(() => Math.random() - 0.5);

            while (distractors.length < count && remaining.length > 0) {
                distractors.push(remaining.pop());
            }
        }

        return distractors;
    },

    /**
     * Count dot differences between patterns
     */
    countDotDifference(pattern1, pattern2) {
        let diff = 0;
        for (let i = 0; i < 6; i++) {
            if (pattern1[i] !== pattern2[i]) diff++;
        }
        return diff;
    },

    /**
     * Check if pattern is a horizontal mirror
     */
    isMirror(pattern1, pattern2) {
        // Check if swapping left (0,1,2) and right (3,4,5) columns creates pattern2
        const mirrored = [
            pattern1[3], pattern1[4], pattern1[5],
            pattern1[0], pattern1[1], pattern1[2]
        ];

        return mirrored.every((val, i) => val === pattern2[i]);
    },

    /**
     * Render activity
     */
    render() {
        const overlay = document.getElementById('activity-overlay');
        const targetLetter = this.letters[this.currentIndex];
        const progress = ((this.currentIndex + 1) / this.letters.length) * 100;
        const dotOrder = [1, 4, 2, 5, 3, 6];

        // Generate options: 1 correct + 3 distractors
        const distractors = this.generateDistractors(targetLetter, 3);
        const options = [targetLetter.toLowerCase(), ...distractors];

        // Shuffle options randomly
        options.sort(() => Math.random() - 0.5);

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
                <p class="activity-instruction">¿Cuál es la letra?</p>
                
                <div class="activity-letter">${targetLetter.toUpperCase()}</div>
                
                <!-- 2x2 Grid of options -->
                <div class="pick-grid" id="pick-options">
                    ${options.map(letter => {
            const pattern = BrailleData.getPattern(letter);
            return `
                            <button class="pick-option" data-letter="${letter}" data-correct="${letter === targetLetter.toLowerCase()}">
                                <div class="braille-cell size-md">
                                    ${dotOrder.map(dotNum => `
                                        <div class="braille-dot ${pattern[dotNum - 1] === 1 ? 'active' : ''}" 
                                             data-dot="${dotNum}">
                                        </div>
                                    `).join('')}
                                </div>
                            </button>
                        `;
        }).join('')}
                </div>
            </div>

            <div class="activity-footer">
                <!-- Botón Siguiente (aparece cuando acierta) -->
                <button class="btn btn-primary btn-block btn-lg hidden" id="next-btn" style="margin-bottom: var(--space-3);">
                    Siguiente
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style="margin-left: 8px;">
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <p id="pick-hint" style="text-align: center; color: var(--color-text-secondary); font-size: var(--font-size-sm);">
                    Toca el patrón correcto
                </p>
            </div>
        `;

        overlay.classList.remove('hidden');
        Navigation.hide();

        // Speak the prompt
        AudioFeedback.speak(`¿Cuál es la letra ${targetLetter.toUpperCase()}?`);

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

        // Option buttons
        const options = document.querySelectorAll('.pick-option');
        options.forEach(option => {
            option.addEventListener('click', () => {
                this.selectOption(option);
            });
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
     * Handle option selection
     */
    selectOption(optionEl) {
        const isCorrect = optionEl.dataset.correct === 'true';
        const selectedLetter = optionEl.dataset.letter;

        this.attempts++;

        // Disable all options
        document.querySelectorAll('.pick-option').forEach(opt => {
            opt.style.pointerEvents = 'none';
        });

        if (isCorrect) {
            // CORRECT
            this.correct++;
            this.score += 10;
            optionEl.classList.add('correct');
            Haptics.success();
            AudioFeedback.success();

            // Show next button after short delay
            setTimeout(() => {
                const nextBtn = document.getElementById('next-btn');
                if (nextBtn) {
                    nextBtn.classList.remove('hidden');
                    nextBtn.style.display = 'block';
                }

                // Update hint text
                const pickHint = document.getElementById('pick-hint');
                if (pickHint) {
                    pickHint.innerHTML = `<span style="color: var(--color-success); font-weight: bold;">✅ ¡Correcto! Toca "Siguiente"</span>`;
                }
            }, 100);
        } else {
            // INCORRECT
            optionEl.classList.add('incorrect');
            Haptics.error();
            AudioFeedback.error();

            // Show correct answer
            document.querySelectorAll('.pick-option').forEach(opt => {
                if (opt.dataset.correct === 'true') {
                    opt.classList.add('correct');
                }
            });

            // Allow retry after showing feedback
            setTimeout(() => {
                // Re-enable options, resetting incorrect state
                optionEl.classList.remove('incorrect');
                document.querySelectorAll('.pick-option').forEach(opt => {
                    opt.classList.remove('correct');
                    opt.style.pointerEvents = 'auto';
                });
            }, 800);
        }
    },

    /**
     * Go to next letter/exercise
     */
    goToNext() {
        Haptics.tap();

        if (this.currentIndex < this.letters.length - 1) {
            this.currentIndex++;
            this.render();
        } else {
            this.complete();
        }
    },

    /**
     * Complete activity
     */
    complete() {
        const accuracy = this.attempts > 0
            ? Math.round((this.correct / this.attempts) * 100)
            : 100;

        const stars = Progression.calculateStars(accuracy);
        const completed = Progression.isLevelComplete(accuracy);

        Haptics.celebration();
        AudioFeedback.celebration();

        Modal.showGameComplete(this.score, accuracy, {
            stars,
            onRetry: () => {
                Modal.hide();
                this.usedDistractors.clear();
                this.start(this.letters, this.onComplete);
            },
            onContinue: () => {
                Modal.hide();
                if (this.onComplete) {
                    this.onComplete({
                        type: 'pick',
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
    module.exports = PickActivity;
}
