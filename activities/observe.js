/**
 * Observe Activity
 * View and learn Braille patterns
 */

const ObserveActivity = {
    currentIndex: 0,
    letters: [],
    onComplete: null,

    /**
     * Start observe activity
     * @param {string[]} letters - Letters to observe
     * @param {Function} onComplete - Callback when activity ends
     */
    start(letters, onComplete) {
        this.letters = letters;
        this.currentIndex = 0;
        this.onComplete = onComplete;

        this.render();
    },

    /**
     * Render current letter
     */
    render() {
        const overlay = document.getElementById('activity-overlay');
        const letter = this.letters[this.currentIndex];
        const pattern = BrailleData.getPattern(letter);
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
                <p class="activity-instruction">Observa el patrón de la letra</p>
                
                <div class="activity-letter">${letter}</div>
                
                <div class="activity-cell-container">
                    <div class="braille-cell size-lg" id="observe-cell">
                        ${dotOrder.map(dotNum => `
                            <div class="braille-dot ${pattern[dotNum - 1] === 1 ? 'active' : ''}" 
                                 data-dot="${dotNum}"
                                 aria-label="Punto ${dotNum} ${pattern[dotNum - 1] === 1 ? 'activo' : 'inactivo'}">
                            </div>
                        `).join('')}
                    </div>
                </div>

                <p style="color: var(--color-text-secondary); font-size: var(--font-size-sm);">
                    Puntos: ${BrailleData.getActiveDots(pattern).join(', ') || 'Ninguno'}
                </p>
            </div>

            <div class="activity-footer">
                <button class="btn btn-primary btn-block btn-lg" id="observe-next">
                    ${this.currentIndex < this.letters.length - 1 ? 'Siguiente' : 'Finalizar'}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
        `;

        overlay.classList.remove('hidden');
        Navigation.hide();

        this.attachEventListeners();

        // Speak the letter
        AudioFeedback.speak(`Letra ${letter}`);
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
            this.next();
        });

        // Also allow tapping the cell to hear the letter again
        const cell = document.getElementById('observe-cell');
        if (cell) {
            cell.addEventListener('click', () => {
                const letter = this.letters[this.currentIndex];
                Haptics.tap();
                AudioFeedback.speak(`Letra ${letter}`);
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
            // Activity complete
            this.complete();
        }
    },

    /**
     * Complete activity
     */
    complete() {
        if (this.onComplete) {
            this.onComplete({
                type: 'observe',
                letters: this.letters,
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
    module.exports = ObserveActivity;
}
