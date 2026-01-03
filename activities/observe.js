/**
 * Observe Activity
 * View and learn Braille patterns
 * 
 * SPECS:
 * - Minimum 3 seconds display time
 * - Fade-in animation (0.5s)
 * - "Continuar" button (no auto-advance)
 * - VoiceOver/TalkBack narration: "La letra [X] se forma con los puntos [lista]"
 */

const ObserveActivity = {
    currentIndex: 0,
    letters: [],
    onComplete: null,
    canContinue: false,
    MINIMUM_DISPLAY_TIME: 3000, // 3 seconds

    /**
     * Start observe activity
     * @param {string[]} letters - Letters to observe
     * @param {Function} onComplete - Callback when activity ends
     */
    start(letters, onComplete) {
        this.letters = letters;
        this.currentIndex = 0;
        this.onComplete = onComplete;
        this.canContinue = false;

        this.render();
    },

    /**
     * Render current letter
     */
    render() {
        const overlay = document.getElementById('activity-overlay');
        const item = this.letters[this.currentIndex];
        const progress = ((this.currentIndex + 1) / this.letters.length) * 100;
        const dotOrder = [1, 4, 2, 5, 3, 6];

        // Handle special content types
        let displayLetter = item;
        let pattern = [0, 0, 0, 0, 0, 0];
        let description = '';
        let narration = '';

        if (item === 'cell-intro') {
            displayLetter = '⠿';
            pattern = [1, 1, 1, 1, 1, 1];
            description = 'La celda Braille tiene 6 puntos organizados en 2 columnas y 3 filas.';
            narration = 'La celda Braille tiene 6 puntos. Los puntos 1, 2 y 3 están a la izquierda. Los puntos 4, 5 y 6 están a la derecha.';
        } else if (item === 'dots-left') {
            displayLetter = '⠇';
            pattern = [1, 1, 1, 0, 0, 0];
            description = 'Columna izquierda: puntos 1 (arriba), 2 (centro), 3 (abajo)';
            narration = 'La columna izquierda tiene los puntos 1, 2 y 3. El punto 1 está arriba, el punto 2 en el centro, y el punto 3 abajo.';
        } else if (item === 'dots-right') {
            displayLetter = '⠸';
            pattern = [0, 0, 0, 1, 1, 1];
            description = 'Columna derecha: puntos 4 (arriba), 5 (centro), 6 (abajo)';
            narration = 'La columna derecha tiene los puntos 4, 5 y 6. El punto 4 está arriba, el punto 5 en el centro, y el punto 6 abajo.';
        } else if (item === 'uppercase-sign') {
            displayLetter = 'MAY';
            pattern = BrailleData.SIGNS['uppercase'];
            description = 'El signo de mayúscula se coloca antes de la letra.';
            narration = 'El signo de mayúscula se forma con los puntos 4 y 6. Se coloca antes de cualquier letra para indicar que es mayúscula.';
        } else if (item === 'number-sign') {
            displayLetter = '#';
            pattern = BrailleData.SIGNS['number'];
            description = 'El signo numérico se coloca antes de los dígitos.';
            narration = 'El signo numérico se forma con los puntos 3, 4, 5 y 6. Se coloca antes de los números.';
        } else if (item === 'accent-concept') {
            displayLetter = 'TILDES';
            pattern = [0, 0, 0, 0, 0, 0];
            description = 'Las vocales con tilde (á, é, í, ó, ú) tienen patrones únicos de 1 celda.';
            narration = 'En Braille español, las vocales acentuadas tienen su propio patrón de una sola celda. No se necesita un signo adicional.';
        } else {
            // Regular letter
            pattern = BrailleData.getPattern(item);
            description = BrailleData.getDescription(item);
            narration = BrailleData.getNarration(item);
        }

        const activeDots = BrailleData.getActiveDots(pattern);

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
                <p class="activity-instruction">Observa el patrón</p>
                
                <div class="activity-letter observe-fade-in" id="observe-letter">${displayLetter}</div>
                
                <div class="activity-cell-container observe-fade-in" id="observe-cell-container" style="animation-delay: 0.2s;">
                    <div class="braille-cell size-lg" id="observe-cell">
                        ${dotOrder.map(dotNum => `
                            <div class="braille-dot ${pattern[dotNum - 1] === 1 ? 'active' : ''}" 
                                 data-dot="${dotNum}"
                                 aria-label="Punto ${dotNum} ${pattern[dotNum - 1] === 1 ? 'activo' : 'inactivo'}">
                            </div>
                        `).join('')}
                    </div>
                </div>

                <p class="observe-description observe-fade-in" style="animation-delay: 0.4s; color: var(--color-text-secondary); font-size: var(--font-size-sm); text-align: center; max-width: 280px; margin: 0 auto;">
                    ${description || `Puntos: ${activeDots.length > 0 ? activeDots.join(', ') : 'Ninguno'}`}
                </p>
            </div>

            <div class="activity-footer">
                <button class="btn btn-primary btn-block btn-lg" id="observe-next" disabled>
                    <span id="observe-next-text">${this.currentIndex < this.letters.length - 1 ? 'Continuar' : 'Finalizar'}</span>
                    <span id="observe-countdown" style="margin-left: 8px; opacity: 0.7;"></span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
        `;

        overlay.classList.remove('hidden');
        Navigation.hide();

        this.attachEventListeners();

        // Speak the narration (VoiceOver/TalkBack support)
        AudioFeedback.speak(narration || `Letra ${displayLetter}`);

        // Start minimum display timer
        this.canContinue = false;
        this.startCountdown();
    },

    /**
     * Start countdown before allowing continue
     */
    startCountdown() {
        const countdownEl = document.getElementById('observe-countdown');
        const nextBtn = document.getElementById('observe-next');
        let remaining = 3;

        const tick = () => {
            if (remaining > 0) {
                countdownEl.textContent = `(${remaining}s)`;
                remaining--;
                setTimeout(tick, 1000);
            } else {
                countdownEl.textContent = '';
                nextBtn.disabled = false;
                this.canContinue = true;
                Haptics.tap();
            }
        };

        tick();
    },

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        // Close button
        document.getElementById('activity-close').addEventListener('click', () => {
            this.close();
        });

        // Next button
        document.getElementById('observe-next').addEventListener('click', () => {
            if (this.canContinue) {
                this.next();
            }
        });

        // Tap cell to hear narration again
        const cell = document.getElementById('observe-cell');
        if (cell) {
            cell.addEventListener('click', () => {
                const item = this.letters[this.currentIndex];
                Haptics.tap();

                if (typeof item === 'string' && item.length === 1) {
                    AudioFeedback.speak(BrailleData.getNarration(item));
                }
            });
        }
    },

    /**
     * Go to next letter
     */
    next() {
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
        Haptics.success();

        if (this.onComplete) {
            this.onComplete({
                type: 'observe',
                letters: this.letters,
                completed: true,
                accuracy: 100 // Observe is always 100% since there's no interaction
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
    module.exports = ObserveActivity;
}
