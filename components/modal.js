/**
 * Modal Component
 * Handles modal dialogs including game completion and premium screens
 */

const Modal = {
    /**
     * Show a modal
     * @param {string} content - HTML content
     */
    show(content) {
        const overlay = document.getElementById('modal-overlay');
        const modalContent = document.getElementById('modal-content');

        modalContent.innerHTML = content;
        overlay.classList.remove('hidden');

        // Trap focus in modal
        const focusableElements = modalContent.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusableElements.length > 0) {
            focusableElements[0].focus();
        }
    },

    /**
     * Hide modal
     */
    hide() {
        const overlay = document.getElementById('modal-overlay');
        overlay.classList.add('hidden');
    },

    /**
     * Show game completion modal
     * @param {number} score - Player score
     * @param {number} accuracy - Accuracy percentage
     * @param {object} options - { stars, onRetry, onContinue }
     */
    showGameComplete(score, accuracy, options = {}) {
        const { stars = 0, onRetry, onContinue } = options;

        // Generate stars display
        const starsDisplay = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);

        const content = `
            <div class="modal-icon">🏆</div>
            <h2 class="modal-title">¡Lección Completada!</h2>
            <p class="modal-subtitle">¡Has hecho un trabajo increíble!</p>
            
            <div class="modal-stars" style="font-size: 32px; text-align: center; margin: var(--space-3) 0;">
                ${starsDisplay}
            </div>
            
            <div class="modal-stats">
                <div class="stat-card">
                    <div class="stat-label">Puntuación</div>
                    <div class="stat-value">${score.toLocaleString()}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Precisión</div>
                    <div class="stat-value">${accuracy}%</div>
                </div>
            </div>
            
            <div class="modal-actions">
                <button class="btn btn-primary btn-block" id="modal-continue">
                    Siguiente
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <button class="btn btn-secondary btn-block" id="modal-retry">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M1 4v6h6M23 20v-6h-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Reintentar
                </button>
            </div>
        `;

        this.show(content);

        // Attach event listeners
        document.getElementById('modal-continue').addEventListener('click', () => {
            this.hide();
            if (onContinue) onContinue();
        });

        document.getElementById('modal-retry').addEventListener('click', () => {
            this.hide();
            if (onRetry) onRetry();
        });

        // Play celebration
        Haptics.celebration();
        AudioFeedback.celebration();
    },

    /**
     * Show lesson complete modal
     * @param {object} data - { letter, nextLetter }
     * @param {Function} onNext - Callback for next button
     */
    showLessonComplete(data, onNext) {
        const content = `
            <div class="modal-icon">✨</div>
            <h2 class="modal-title">¡Excelente!</h2>
            <p class="modal-subtitle">Has aprendido la letra "${data.letter}"</p>
            
            <div class="modal-actions">
                <button class="btn btn-primary btn-block" id="modal-next">
                    Continuar
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
        `;

        this.show(content);

        document.getElementById('modal-next').addEventListener('click', () => {
            this.hide();
            if (onNext) onNext();
        });

        Haptics.success();
        AudioFeedback.success();
    },

    /**
     * Show confirmation dialog
     * @param {string} title 
     * @param {string} message 
     * @param {Function} onConfirm 
     * @param {Function} onCancel 
     */
    showConfirm(title, message, onConfirm, onCancel) {
        const content = `
            <h2 class="modal-title">${title}</h2>
            <p class="modal-subtitle">${message}</p>
            
            <div class="modal-actions">
                <button class="btn btn-primary btn-block" id="modal-confirm">Confirmar</button>
                <button class="btn btn-secondary btn-block" id="modal-cancel">Cancelar</button>
            </div>
        `;

        this.show(content);

        document.getElementById('modal-confirm').addEventListener('click', () => {
            this.hide();
            if (onConfirm) onConfirm();
        });

        document.getElementById('modal-cancel').addEventListener('click', () => {
            this.hide();
            if (onCancel) onCancel();
        });
    }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Modal;
}
