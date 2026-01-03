/**
 * Games Activity
 * Fun reinforcement games: Memory Grid, Speed Challenge, Pattern Hunt
 * 
 * SPECS:
 * - Non-penalizing (don't affect progression)
 * - Unlimited replays
 * - Star system (1-3 stars)
 */

const GamesActivity = {
    gameType: 'speed', // memory, speed, hunt
    letters: [],
    onComplete: null,
    score: 0,
    timeRemaining: 60,
    timerInterval: null,
    currentQuestionIndex: 0,
    totalQuestions: 0,
    correctAnswers: 0,

    /**
     * Start games activity
     */
    start(letters, onComplete, options = {}) {
        this.letters = letters;
        this.onComplete = onComplete;
        this.gameType = options.gameType || 'speed';
        this.score = 0;
        this.currentQuestionIndex = 0;
        this.correctAnswers = 0;

        switch (this.gameType) {
            case 'memory':
                this.startMemoryGame();
                break;
            case 'speed':
            default:
                this.startSpeedChallenge();
                break;
        }
    },

    // ═══════════════════════════════════════════════════════════
    // SPEED CHALLENGE
    // ═══════════════════════════════════════════════════════════

    startSpeedChallenge() {
        this.timeRemaining = 60;
        this.totalQuestions = 0;
        this.renderSpeedGame();
        this.startTimer();
    },

    renderSpeedGame() {
        const overlay = document.getElementById('activity-overlay');
        const dotOrder = [1, 4, 2, 5, 3, 6];

        // Get random letter and generate question
        const targetLetter = this.letters[Math.floor(Math.random() * this.letters.length)];
        const pattern = BrailleData.getPattern(targetLetter);

        // Generate 4 options (1 correct + 3 distractors)
        const distractors = BrailleData.getSmartDistractors(targetLetter, 3);
        const options = [targetLetter, ...distractors].sort(() => Math.random() - 0.5);

        // Alternate between showing letter or pattern
        const showPattern = Math.random() > 0.5;

        overlay.innerHTML = `
            <div class="activity-header" style="background: linear-gradient(135deg, var(--color-primary) 0%, #ff8a50 100%); color: white; padding: var(--space-4);">
                <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                    <button class="icon-btn" id="activity-close" style="color: white;">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </button>
                    <div style="text-align: center;">
                        <div style="font-size: 32px; font-weight: bold;" id="timer-display">${this.timeRemaining}</div>
                        <div style="font-size: 12px; opacity: 0.8;">segundos</div>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-size: 24px; font-weight: bold;" id="score-display">${this.score}</div>
                        <div style="font-size: 12px; opacity: 0.8;">puntos</div>
                    </div>
                </div>
            </div>

            <div class="activity-content" style="padding-top: var(--space-6);">
                <p class="activity-instruction">
                    ${showPattern ? '¿Qué letra es?' : '¿Cuál es el patrón?'}
                </p>
                
                ${showPattern ? `
                    <!-- Show pattern, pick letter -->
                    <div class="activity-cell-container" style="margin-bottom: var(--space-4);">
                        <div class="braille-cell size-lg">
                            ${dotOrder.map(dotNum => `
                                <div class="braille-dot ${pattern[dotNum - 1] === 1 ? 'active' : ''}"></div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="letter-options-grid" id="game-options">
                        ${options.map(letter => `
                            <button class="letter-option" data-answer="${letter}" data-correct="${letter === targetLetter}">
                                ${letter.toUpperCase()}
                            </button>
                        `).join('')}
                    </div>
                ` : `
                    <!-- Show letter, pick pattern -->
                    <div class="activity-letter" style="margin-bottom: var(--space-4);">${targetLetter.toUpperCase()}</div>
                    <div class="pick-grid" id="game-options">
                        ${options.map(letter => {
            const optPattern = BrailleData.getPattern(letter);
            return `
                                <button class="pick-option" data-answer="${letter}" data-correct="${letter === targetLetter}">
                                    <div class="braille-cell size-md">
                                        ${dotOrder.map(dotNum => `
                                            <div class="braille-dot ${optPattern[dotNum - 1] === 1 ? 'active' : ''}"></div>
                                        `).join('')}
                                    </div>
                                </button>
                            `;
        }).join('')}
                    </div>
                `}
            </div>

            <div class="activity-footer" style="text-align: center;">
                <p style="color: var(--color-text-secondary); font-size: var(--font-size-sm);">
                    🎯 Respuestas correctas: <strong id="correct-count">${this.correctAnswers}</strong>
                </p>
            </div>
        `;

        overlay.classList.remove('hidden');
        Navigation.hide();

        this.attachSpeedEventListeners();
    },

    attachSpeedEventListeners() {
        // Close button
        document.getElementById('activity-close').addEventListener('click', () => {
            this.stopTimer();
            this.close();
        });

        // Answer options
        const options = document.querySelectorAll('#game-options button');
        options.forEach(option => {
            option.addEventListener('click', () => {
                this.handleSpeedAnswer(option);
            });
        });
    },

    handleSpeedAnswer(optionEl) {
        const isCorrect = optionEl.dataset.correct === 'true';
        this.totalQuestions++;

        // Disable all options briefly
        document.querySelectorAll('#game-options button').forEach(opt => {
            opt.style.pointerEvents = 'none';
        });

        if (isCorrect) {
            this.correctAnswers++;
            this.score += 10;

            // Speed bonus
            if (this.timeRemaining > 45) this.score += 5;
            else if (this.timeRemaining > 30) this.score += 3;
            else if (this.timeRemaining > 15) this.score += 1;

            optionEl.classList.add('correct');
            Haptics.success();

            // Update displays
            document.getElementById('score-display').textContent = this.score;
            document.getElementById('correct-count').textContent = this.correctAnswers;
        } else {
            optionEl.classList.add('incorrect');
            Haptics.error();

            // Show correct
            document.querySelectorAll('#game-options button').forEach(opt => {
                if (opt.dataset.correct === 'true') {
                    opt.classList.add('correct');
                }
            });
        }

        // Next question
        setTimeout(() => {
            if (this.timeRemaining > 0) {
                this.renderSpeedGame();
            }
        }, 400);
    },

    startTimer() {
        this.timerInterval = setInterval(() => {
            this.timeRemaining--;

            const timerDisplay = document.getElementById('timer-display');
            if (timerDisplay) {
                timerDisplay.textContent = this.timeRemaining;

                // Warning colors
                if (this.timeRemaining <= 10) {
                    timerDisplay.style.color = '#ef4444';
                } else if (this.timeRemaining <= 20) {
                    timerDisplay.style.color = '#f59e0b';
                }
            }

            if (this.timeRemaining <= 0) {
                this.stopTimer();
                this.completeSpeedGame();
            }
        }, 1000);
    },

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    },

    completeSpeedGame() {
        const accuracy = this.totalQuestions > 0
            ? Math.round((this.correctAnswers / this.totalQuestions) * 100)
            : 0;

        const stars = Progression.calculateStars(accuracy);

        Haptics.celebration();
        AudioFeedback.celebration();

        Modal.showGameComplete(this.score, accuracy, {
            stars,
            title: '⏱️ ¡Tiempo!',
            subtitle: `Respondiste ${this.correctAnswers} de ${this.totalQuestions} correctamente`,
            onRetry: () => {
                Modal.hide();
                this.start(this.letters, this.onComplete, { gameType: 'speed' });
            },
            onContinue: () => {
                Modal.hide();
                if (this.onComplete) {
                    this.onComplete({
                        type: 'games',
                        gameType: 'speed',
                        completed: true,
                        score: this.score,
                        accuracy,
                        stars
                    });
                }
                this.close();
            }
        });
    },

    // ═══════════════════════════════════════════════════════════
    // MEMORY GAME
    // ═══════════════════════════════════════════════════════════

    memoryCards: [],
    flippedCards: [],
    matchedPairs: 0,
    memoryMoves: 0,

    startMemoryGame() {
        // Create pairs
        const pairs = this.letters.slice(0, 6); // Max 6 pairs = 12 cards
        this.memoryCards = [...pairs, ...pairs]
            .map((letter, index) => ({
                id: index,
                letter,
                isFlipped: false,
                isMatched: false
            }))
            .sort(() => Math.random() - 0.5);

        this.flippedCards = [];
        this.matchedPairs = 0;
        this.memoryMoves = 0;
        this.score = 0;

        this.renderMemoryGame();
    },

    renderMemoryGame() {
        const overlay = document.getElementById('activity-overlay');
        const dotOrder = [1, 4, 2, 5, 3, 6];

        overlay.innerHTML = `
            <div class="activity-header">
                <button class="icon-btn" id="activity-close">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </button>
                <h3 style="flex: 1; text-align: center; font-weight: bold;">Memory Braille</h3>
                <div style="text-align: right; min-width: 60px;">
                    <span id="moves-display">${this.memoryMoves}</span> movimientos
                </div>
            </div>

            <div class="activity-content">
                <p class="activity-instruction">Encuentra los pares de letras</p>
                
                <div class="memory-grid" id="memory-grid">
                    ${this.memoryCards.map(card => {
            const pattern = BrailleData.getPattern(card.letter);
            return `
                            <button class="memory-card ${card.isFlipped || card.isMatched ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''}" 
                                    data-id="${card.id}"
                                    ${card.isMatched ? 'disabled' : ''}>
                                <div class="memory-card-back">?</div>
                                <div class="memory-card-front">
                                    <div class="braille-cell size-sm">
                                        ${dotOrder.map(dotNum => `
                                            <div class="braille-dot ${pattern[dotNum - 1] === 1 ? 'active' : ''}"></div>
                                        `).join('')}
                                    </div>
                                    <span class="memory-letter">${card.letter.toUpperCase()}</span>
                                </div>
                            </button>
                        `;
        }).join('')}
                </div>
            </div>

            <div class="activity-footer" style="text-align: center;">
                <p style="color: var(--color-text-secondary); font-size: var(--font-size-sm);">
                    Pares encontrados: <strong id="pairs-count">${this.matchedPairs}</strong> / ${this.memoryCards.length / 2}
                </p>
            </div>
        `;

        overlay.classList.remove('hidden');
        Navigation.hide();

        this.attachMemoryEventListeners();
    },

    attachMemoryEventListeners() {
        document.getElementById('activity-close').addEventListener('click', () => {
            this.close();
        });

        const cards = document.querySelectorAll('.memory-card:not(.matched)');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                this.flipCard(parseInt(card.dataset.id));
            });
        });
    },

    flipCard(cardId) {
        const card = this.memoryCards.find(c => c.id === cardId);
        if (!card || card.isFlipped || card.isMatched || this.flippedCards.length >= 2) return;

        card.isFlipped = true;
        this.flippedCards.push(card);

        // Update visual
        const cardEl = document.querySelector(`[data-id="${cardId}"]`);
        cardEl.classList.add('flipped');

        Haptics.tap();

        if (this.flippedCards.length === 2) {
            this.memoryMoves++;
            document.getElementById('moves-display').textContent = this.memoryMoves;

            const [first, second] = this.flippedCards;

            if (first.letter === second.letter) {
                // Match!
                first.isMatched = true;
                second.isMatched = true;
                this.matchedPairs++;
                this.score += 20;

                document.getElementById('pairs-count').textContent = this.matchedPairs;

                setTimeout(() => {
                    document.querySelector(`[data-id="${first.id}"]`).classList.add('matched');
                    document.querySelector(`[data-id="${second.id}"]`).classList.add('matched');
                }, 300);

                Haptics.success();

                if (this.matchedPairs === this.memoryCards.length / 2) {
                    setTimeout(() => this.completeMemoryGame(), 500);
                }
            } else {
                // No match
                Haptics.error();

                setTimeout(() => {
                    first.isFlipped = false;
                    second.isFlipped = false;
                    document.querySelector(`[data-id="${first.id}"]`).classList.remove('flipped');
                    document.querySelector(`[data-id="${second.id}"]`).classList.remove('flipped');
                }, 800);
            }

            this.flippedCards = [];
        }
    },

    completeMemoryGame() {
        // Calculate stars based on moves (fewer = better)
        const idealMoves = this.memoryCards.length / 2;
        const efficiency = Math.min(100, Math.round((idealMoves / this.memoryMoves) * 100));
        const stars = Progression.calculateStars(efficiency);

        Haptics.celebration();

        Modal.showGameComplete(this.score, efficiency, {
            stars,
            title: '🧠 ¡Completado!',
            subtitle: `${this.memoryMoves} movimientos`,
            onRetry: () => {
                Modal.hide();
                this.start(this.letters, this.onComplete, { gameType: 'memory' });
            },
            onContinue: () => {
                Modal.hide();
                if (this.onComplete) {
                    this.onComplete({
                        type: 'games',
                        gameType: 'memory',
                        completed: true,
                        score: this.score,
                        moves: this.memoryMoves,
                        stars
                    });
                }
                this.close();
            }
        });
    },

    /**
     * Close game
     */
    close() {
        this.stopTimer();
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
