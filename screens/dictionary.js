/**
 * Dictionary Screen
 * Browse all Braille letters and patterns
 */

const DictionaryScreen = {
    /**
     * Render dictionary screen
     * @param {HTMLElement} container 
     */
    render(container) {
        const letters = BrailleData.getAllLetters();
        const vowels = BrailleData.getVowels();
        const consonants = BrailleData.getConsonants();

        container.innerHTML = `
            <div class="screen active" id="dictionary-screen">
                <!-- Search (placeholder) -->
                <div style="margin-bottom: var(--space-4);">
                    <div style="
                        display: flex;
                        align-items: center;
                        gap: var(--space-3);
                        padding: var(--space-3) var(--space-4);
                        background: var(--color-surface);
                        border-radius: var(--radius-full);
                        border: 1px solid var(--color-border);
                    ">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-tertiary)" stroke-width="2">
                            <circle cx="11" cy="11" r="8"/>
                            <path d="M21 21l-4.35-4.35"/>
                        </svg>
                        <input type="text" id="dictionary-search" placeholder="Buscar letra..."
                               style="
                                   flex: 1;
                                   border: none;
                                   background: transparent;
                                   font-size: var(--font-size-base);
                                   color: var(--color-text-primary);
                                   outline: none;
                               ">
                    </div>
                </div>

                <!-- Vowels Section -->
                <div class="settings-section">
                    <h4 class="settings-title">Vocales</h4>
                    <div class="modes-grid" id="vowels-grid">
                        ${vowels.map(letter => this.renderLetterCard(letter)).join('')}
                    </div>
                </div>

                <!-- Consonants Section -->
                <div class="settings-section">
                    <h4 class="settings-title">Consonantes</h4>
                    <div class="modes-grid" id="consonants-grid">
                        ${consonants.map(letter => this.renderLetterCard(letter)).join('')}
                    </div>
                </div>

                <!-- Special Characters -->
                <div class="settings-section">
                    <h4 class="settings-title">Especiales</h4>
                    <div class="modes-grid" id="special-grid">
                        ${this.renderLetterCard('Ñ')}
                    </div>
                </div>
            </div>
        `;

        this.attachEventListeners(container);
    },

    /**
     * Render a letter card
     * @param {string} letter 
     * @returns {string} HTML
     */
    renderLetterCard(letter) {
        const pattern = BrailleData.getPattern(letter);
        const dotOrder = [1, 4, 2, 5, 3, 6];

        return `
            <div class="mode-card" data-letter="${letter}" style="text-align: center; padding: var(--space-3);">
                <div style="font-size: var(--font-size-2xl); font-weight: var(--font-weight-bold); margin-bottom: var(--space-2);">
                    ${letter}
                </div>
                <div class="braille-cell size-sm" style="margin: 0 auto;">
                    ${dotOrder.map(dotNum => `
                        <div class="braille-dot ${pattern[dotNum - 1] === 1 ? 'active' : ''}" 
                             data-dot="${dotNum}"></div>
                    `).join('')}
                </div>
            </div>
        `;
    },

    /**
     * Attach event listeners
     * @param {HTMLElement} container 
     */
    attachEventListeners(container) {
        // Letter card clicks
        const letterCards = container.querySelectorAll('[data-letter]');
        letterCards.forEach(card => {
            card.addEventListener('click', () => {
                const letter = card.getAttribute('data-letter');
                this.showLetterDetail(letter);
            });
        });

        // Search functionality
        const searchInput = container.querySelector('#dictionary-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.toUpperCase();
                this.filterLetters(container, query);
            });
        }
    },

    /**
     * Filter letters by search query
     * @param {HTMLElement} container 
     * @param {string} query 
     */
    filterLetters(container, query) {
        const cards = container.querySelectorAll('[data-letter]');
        cards.forEach(card => {
            const letter = card.getAttribute('data-letter');
            const matches = !query || letter.includes(query);
            card.style.display = matches ? '' : 'none';
        });
    },

    /**
     * Show letter detail modal
     * @param {string} letter 
     */
    showLetterDetail(letter) {
        Haptics.tap();

        const pattern = BrailleData.getPattern(letter);
        const activeDots = BrailleData.getActiveDots(pattern);
        const dotOrder = [1, 4, 2, 5, 3, 6];

        const content = `
            <div style="text-align: center;">
                <div style="font-size: 4rem; font-weight: var(--font-weight-bold); margin-bottom: var(--space-4);">
                    ${letter}
                </div>
                
                <div class="braille-cell size-lg" style="margin: 0 auto var(--space-4);">
                    ${dotOrder.map(dotNum => `
                        <div class="braille-dot ${pattern[dotNum - 1] === 1 ? 'active' : ''}" 
                             data-dot="${dotNum}"></div>
                    `).join('')}
                </div>

                <p style="color: var(--color-text-secondary); margin-bottom: var(--space-4);">
                    Puntos activos: ${activeDots.length > 0 ? activeDots.join(', ') : 'Ninguno'}
                </p>

                <div class="modal-actions">
                    <button class="btn btn-primary btn-block" id="practice-letter">
                        Practicar "${letter}"
                    </button>
                    <button class="btn btn-secondary btn-block" id="close-detail">
                        Cerrar
                    </button>
                </div>
            </div>
        `;

        Modal.show(content);

        // Speak the letter if voice is enabled
        AudioFeedback.speak(letter);

        // Practice button
        document.getElementById('practice-letter').addEventListener('click', () => {
            Modal.hide();
            App.startActivity('build', [letter]);
        });

        // Close button
        document.getElementById('close-detail').addEventListener('click', () => {
            Modal.hide();
        });
    }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DictionaryScreen;
}
