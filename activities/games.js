/**
 * Games Activity
 * Timed challenges with score tracking
 */

const GamesActivity = {
    letters: [],
    onComplete: null,
    currentLetter: null,
    score: 0,
    correctCount: 0,
    wrongCount: 0,
    timeRemaining: 60,
    timerInterval: null,
    isActive: false,

    /**
     * Start games activity
     * @param {string[]} letters - Letters to use
     * @param {Function} onComplete - Callback when activity ends
     */
    start(letters, onComplete) {
        this.letters = letters;
        this.onComplete = onComplete;
        this.score = 0;
        this.correctCount = 0;
        this.wrongCount = 0;
        this.timeRemaining = 60;
        this.isActive = true;

        this.render();
        this.startTimer();
        this.nextQuestion();
    },

    /**
     * Render game UI
     */
    render() {
        const overlay = document.getElementById('activity-overlay');
        const dotOrder = [1, 4, 2, 5, 3, 6];

        overlay.innerHTML = `
            <div class="activity-header" style="background: var(--gradient-primary); color: white; padding: var(--space-4);">
                <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                    <div style="display: flex; align-items: center; gap: var(--space-2);">
                        <span style="font-size: var(--font-size-xl);">⭐</span>
                        <span id="game-score" style="font-size: var(--font-size-xl); font-weight: var(--font-weight-bold);">
                            ${this.score}
                        </span>
                    </div>
                    
                    <div style="display: flex; align-items: center; gap: var(--space-1);">
                        <span style="font-size: var(--font-size-xs); text-transform: uppercase;">Precisión</span>
                        <span id="game-accuracy" style="font-weight: var(--font-weight-bold);">
                            ${this.getAccuracy()}%
                        </span>
                    </div>
                    
                    <div class="avatar" style="width: 40px; height: 40px; border-color: white;">
                        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23FFE4D6'/%3E%3Ccircle cx='20' cy='16' r='8' fill='%23FF6B35'/%3E%3Cpath d='M8 36c0-8 5.4-12 12-12s12 4 12 12' fill='%23FF6B35'/%3E%3C/svg%3E" alt="Avatar">
                    </div>
                </div>
                
                <!-- Timer bar -->
                <div style="margin-top: var(--space-3);">
                    <div class="progress-bar" style="background: rgba(255,255,255,0.3);">
                        <div id="timer-bar" class="progress-bar-fill" style="width: 100%; background: white;"></div>
                    </div>
                </div>
            </div>

            <div class="activity-content" style="background: var(--color-background);">
                <div id="game-question" style="text-align: center;">
                    <!-- Question will be inserted here -->
                </div>
                
                <div class="activity-options" id="game-options" style="margin-top: var(--space-6);">
                    <!-- Options will be inserted here -->
                </div>
            </div>
        `;

        overlay.classList.remove('hidden');
        Navigation.hide();
    },

    /**
     * Start countdown timer
     */
    startTimer() {
        this.timerInterval = setInterval(() => {
            this.timeRemaining--;

            const timerBar = document.getElementById('timer-bar');
            if (timerBar) {
                timerBar.style.width = `${(this.timeRemaining / 60) * 100}%`;

                // Change color as time runs low
                if (this.timeRemaining <= 10) {
                    timerBar.style.background = 'var(--color-error)';
                } else if (this.timeRemaining <= 20) {
                    timerBar.style.background = 'var(--color-streak)';
                }
            }

            if (this.timeRemaining <= 0) {
                this.endGame();
            }
        }, 1000);
    },

    /**
     * Get current accuracy percentage
     */
    getAccuracy() {
        const total = this.correctCount + this.wrongCount;
        if (total === 0) return 100;
        return Math.round((this.correctCount / total) * 100);
    },

    /**
     * Show next question
     */
    nextQuestion() {
        if (!this.isActive) return;

        // Pick random letter
        this.currentLetter = this.letters[Math.floor(Math.random() * this.letters.length)];

        const questionContainer = document.getElementById('game-question');
        const optionsContainer = document.getElementById('game-options');
        const dotOrder = [1, 4, 2, 5, 3, 6];

        // Random question type
        const questionType = Math.random() > 0.5 ? 'letter-to-braille' : 'braille-to-letter';

        if (questionType === 'letter-to-braille') {
            // Show letter, pick correct Braille pattern
            questionContainer.innerHTML = `
                <p class="activity-instruction">¿Cuál es el patrón para?</p>
                <div class="activity-letter">${this.currentLetter}</div>
            `;

            // Generate options
            const options = this.generateOptions(this.currentLetter);
            optionsContainer.innerHTML = options.map(letter => {
                const pattern = BrailleData.getPattern(letter);
                return `
                    <div class="option-card" data-option="${letter}">
                        <div class="braille-cell size-sm">
                            ${dotOrder.map(dotNum => `
                                <div class="braille-dot ${pattern[dotNum - 1] === 1 ? 'active' : ''}" 
                                     data-dot="${dotNum}">
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            }).join('');
        } else {
            // Show Braille pattern, pick correct letter
            const pattern = BrailleData.getPattern(this.currentLetter);

            questionContainer.innerHTML = `
                <p class="activity-instruction">¿Qué letra es?</p>
                <div class="braille-cell size-lg" style="margin: var(--space-4) auto;">
                    ${dotOrder.map(dotNum => `
                        <div class="braille-dot ${pattern[dotNum - 1] === 1 ? 'active' : ''}" 
                             data-dot="${dotNum}">
                        </div>
                    `).join('')}
                </div>
            `;

            // Generate letter options
            const options = this.generateOptions(this.currentLetter);
            optionsContainer.innerHTML = options.map(letter => `
                <div class="option-card" data-option="${letter}" style="justify-content: center;">
                    <span style="font-size: var(--font-size-2xl); font-weight: var(--font-weight-bold);">
                        ${letter}
                    </span>
                </div>
            `).join('');
        }

        // Attach click handlers
        const optionCards = optionsContainer.querySelectorAll('.option-card');
        optionCards.forEach(card => {
            card.addEventListener('click', () => {
                this.handleAnswer(card);
            });
        });
    },

    /**
     * Generate options with similar distractors
     */
    generateOptions(correctLetter) {
        const similar = BrailleData.getSimilarLetters(correctLetter, 3);
        const options = [correctLetter, ...similar];
        return options.sort(() => Math.random() - 0.5);
    },

    /**
     * Handle answer selection
     */
    handleAnswer(card) {
        if (!this.isActive) return;

        const selected = card.getAttribute('data-option');
        const isCorrect = selected === this.currentLetter;

        // Disable all options temporarily
        const allOptions = document.querySelectorAll('.option-card');
        allOptions.forEach(opt => opt.style.pointerEvents = 'none');

        if (isCorrect) {
            card.classList.add('correct');
            this.correctCount++;
            this.score += 10 + Math.floor(this.timeRemaining / 10); // Bonus for speed

            Haptics.success();
            AudioFeedback.success();
            AppState.recordAnswer(true);
        } else {
            card.classList.add('incorrect');
            this.wrongCount++;

            // Show correct answer
            allOptions.forEach(opt => {
                if (opt.getAttribute('data-option') === this.currentLetter) {
                    opt.classList.add('correct');
                }
            });

            Haptics.error();
            AudioFeedback.error();
            AppState.recordAnswer(false);
        }

        // Update score display
        const scoreEl = document.getElementById('game-score');
        const accuracyEl = document.getElementById('game-accuracy');
        if (scoreEl) scoreEl.textContent = this.score;
        if (accuracyEl) accuracyEl.textContent = `${this.getAccuracy()}%`;

        // Next question after delay
        setTimeout(() => {
            allOptions.forEach(opt => {
                opt.style.pointerEvents = 'auto';
                opt.classList.remove('correct', 'incorrect');
            });
            this.nextQuestion();
        }, isCorrect ? 300 : 800);
    },

    /**
     * End the game
     */
    endGame() {
        this.isActive = false;
        clearInterval(this.timerInterval);

        const accuracy = this.getAccuracy();

        Modal.showGameComplete(
            { score: this.score, accuracy },
            () => {
                // Retry
                Modal.hide();
                this.start(this.letters, this.onComplete);
            },
            () => {
                // Menu
                Modal.hide();
                this.close();
                Navigation.navigateTo('home');
            }
        );

        if (this.onComplete) {
            this.onComplete({
                type: 'games',
                score: this.score,
                accuracy,
                correctCount: this.correctCount,
                wrongCount: this.wrongCount,
                completed: true
            });
        }
    },

    /**
     * Close activity
     */
    close() {
        this.isActive = false;
        clearInterval(this.timerInterval);

        const overlay = document.getElementById('activity-overlay');
        overlay.classList.add('hidden');
        overlay.innerHTML = '';
        Navigation.show();
    }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GamesActivity;
}
