/**
 * Home Screen
 * Main landing screen with greeting, streak, guided route, and modes
 */

const HomeScreen = {
    /**
     * Render home screen
     * @param {HTMLElement} container 
     */
    render(container) {
        const user = AppState.getUser();
        const streak = AppState.getStreak();
        const currentChapter = LevelsData.getCurrentChapter();
        const progress = LevelsData.getOverallProgress();

        container.innerHTML = `
            <div class="screen active" id="home-screen">
                <!-- Greeting -->
                <div class="greeting">
                    <h2>¡Hola, ${user.name}!</h2>
                    <p>Listo para continuar tu aprendizaje?</p>
                </div>

                <!-- Guided Route Card -->
                <div class="card card-primary" id="guided-route-card" style="position: relative; padding-right: 80px;">
                    <span class="streak-badge">RACHA: ${streak} DÍAS</span>
                    <h3 style="font-size: var(--font-size-xl); font-weight: var(--font-weight-bold); margin: var(--space-3) 0 var(--space-1);">
                        Ruta Guiada
                    </h3>
                    <p style="color: var(--color-text-secondary); margin-bottom: var(--space-3);">
                        Nivel 3: ${currentChapter ? currentChapter.title.split(':')[1].trim() : 'Alfabeto Básico'}
                    </p>
                    <a class="link" id="continue-route">
                        Continuar →
                    </a>
                    <div style="position: absolute; right: var(--space-4); top: 50%; transform: translateY(-50%);">
                        <div style="width: 56px; height: 56px; background: var(--gradient-primary); border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: center; position: relative;">
                            <span style="font-size: 28px;">📘</span>
                            <div style="position: absolute; bottom: -4px; right: -4px; width: 20px; height: 20px; background: var(--color-success); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M5 3l14 9-14 9V3z" fill="currentColor"/></svg>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Explore Modes -->
                <h3 class="section-title" style="margin-top: var(--space-6);">Explorar modos</h3>
                <div class="modes-grid">
                    <div class="mode-card" data-mode="practice">
                        <div class="mode-icon blue">📝</div>
                        <h3>Práctica libre</h3>
                        <p>Sin límites de tiempo</p>
                    </div>
                    <div class="mode-card" data-mode="games">
                        <div class="mode-icon purple">🎮</div>
                        <h3>Juegos</h3>
                        <p>Retos divertidos</p>
                    </div>
                    <div class="mode-card" data-mode="review">
                        <div class="mode-icon red">🔄</div>
                        <h3>Repasar</h3>
                        <p>Corrige tus fallos</p>
                    </div>
                    <div class="mode-card" data-mode="achievements">
                        <div class="mode-icon gold">🏆</div>
                        <h3>Logros</h3>
                        <p>Tus medallas</p>
                    </div>
                </div>

                <!-- Page Indicator -->
                <div style="display: flex; justify-content: center; gap: var(--space-2); margin-top: var(--space-6);">
                    <div style="width: 8px; height: 8px; border-radius: 50%; background: var(--color-primary);"></div>
                    <div style="width: 8px; height: 8px; border-radius: 50%; background: var(--color-border);"></div>
                    <div style="width: 8px; height: 8px; border-radius: 50%; background: var(--color-border);"></div>
                </div>
            </div>
        `;

        this.attachEventListeners(container);
    },

    /**
     * Attach event listeners
     * @param {HTMLElement} container 
     */
    attachEventListeners(container) {
        // Continue route
        const continueBtn = container.querySelector('#continue-route');
        if (continueBtn) {
            continueBtn.addEventListener('click', () => {
                LearningPathScreen.show();
            });
        }

        // Guided route card click
        const routeCard = container.querySelector('#guided-route-card');
        if (routeCard) {
            routeCard.addEventListener('click', (e) => {
                if (e.target.tagName !== 'A') {
                    LearningPathScreen.show();
                }
            });
            routeCard.style.cursor = 'pointer';
        }

        // Mode cards
        const modeCards = container.querySelectorAll('.mode-card');
        modeCards.forEach(card => {
            card.addEventListener('click', () => {
                const mode = card.getAttribute('data-mode');
                this.handleModeClick(mode);
            });
        });
    },

    /**
     * Handle mode card clicks
     * @param {string} mode 
     */
    handleModeClick(mode) {
        Haptics.tap();

        switch (mode) {
            case 'practice':
                // Start free practice
                App.startActivity('build', ['A', 'B', 'C', 'D', 'E']);
                break;
            case 'games':
                // Start games mode
                App.startActivity('games', BrailleData.getAllLetters().slice(0, 10));
                break;
            case 'review':
                // Show review screen or dictionary
                Navigation.navigateTo('dictionary');
                break;
            case 'achievements':
                // Show stats/achievements
                Navigation.navigateTo('stats');
                break;
        }
    }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HomeScreen;
}
