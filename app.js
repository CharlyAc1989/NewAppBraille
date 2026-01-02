/**
 * Braille Quest - Main Application
 * 
 * Entry point that initializes all modules and handles app lifecycle
 */

const App = {
    /**
     * Initialize the application
     */
    init() {
        console.log('Braille Quest v2.4.0 - Initializing...');

        // Initialize state
        AppState.init();
        AppState.applySettings();

        // Initialize navigation
        Navigation.init();

        // Setup modal overlay click to close
        const modalOverlay = document.getElementById('modal-overlay');
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                Modal.hide();
            }
        });

        // Setup menu button
        const menuBtn = document.getElementById('menu-btn');
        if (menuBtn) {
            menuBtn.addEventListener('click', () => {
                this.showMenu();
            });
        }

        console.log('Braille Quest - Ready!');
    },

    /**
     * Show side menu (placeholder)
     */
    showMenu() {
        Haptics.tap();
        // For now, show premium screen as menu option
        Modal.show(`
            <div style="text-align: center;">
                <h2 class="modal-title">Menú</h2>
                
                <div style="display: flex; flex-direction: column; gap: var(--space-3); margin: var(--space-4) 0;">
                    <button class="btn btn-secondary btn-block" id="menu-premium">
                        ⭐ Premium
                    </button>
                    <button class="btn btn-secondary btn-block" id="menu-profile">
                        👤 Mi Perfil
                    </button>
                    <button class="btn btn-secondary btn-block" id="menu-help">
                        ❓ Ayuda
                    </button>
                </div>
                
                <button class="btn btn-text btn-block" id="menu-close">
                    Cerrar
                </button>
            </div>
        `);

        document.getElementById('menu-premium').addEventListener('click', () => {
            Modal.hide();
            this.showPremium();
        });

        document.getElementById('menu-profile').addEventListener('click', () => {
            Modal.hide();
            Navigation.navigateTo('stats');
        });

        document.getElementById('menu-help').addEventListener('click', () => {
            Modal.hide();
            this.showHelp();
        });

        document.getElementById('menu-close').addEventListener('click', () => {
            Modal.hide();
        });
    },

    /**
     * Show premium screen
     */
    showPremium() {
        const overlay = document.getElementById('activity-overlay');

        overlay.innerHTML = `
            <div style="min-height: 100%; display: flex; flex-direction: column;">
                <div class="activity-header" style="background: var(--color-surface);">
                    <button class="icon-btn" id="premium-close">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </button>
                    <h3 style="font-size: var(--font-size-lg); font-weight: var(--font-weight-semibold);">
                        Premium Access
                    </h3>
                    <button class="btn btn-text" id="premium-restore" style="color: var(--color-primary);">
                        Restore
                    </button>
                </div>

                <div style="flex: 1; padding: var(--space-4); overflow-y: auto;">
                    <div class="premium-hero">
                        <div class="premium-hero-icon">⭐</div>
                    </div>

                    <h2 class="premium-title">Unlock Full Potential</h2>
                    <p class="premium-subtitle">
                        Accelerate your Braille learning journey with exclusive features designed for mastery.
                    </p>

                    <div class="premium-benefits">
                        <p class="premium-benefits-title">Premium Benefits</p>
                        <div class="benefits-grid">
                            <div class="benefit-card">
                                <div class="benefit-icon red">🚫</div>
                                <h4>Ad-Free</h4>
                                <p>Learn without interruptions.</p>
                            </div>
                            <div class="benefit-card">
                                <div class="benefit-icon purple">🎮</div>
                                <h4>Hard Games</h4>
                                <p>Exclusive Braille puzzles.</p>
                            </div>
                            <div class="benefit-card">
                                <div class="benefit-icon blue">📚</div>
                                <h4>All Chapters</h4>
                                <p>Unlock advanced lessons.</p>
                            </div>
                            <div class="benefit-card">
                                <div class="benefit-icon orange">📱</div>
                                <h4>Offline Mode</h4>
                                <p>Practice anywhere.</p>
                            </div>
                        </div>
                    </div>

                    <div class="premium-pricing">
                        <p class="pricing-label">Pricing</p>
                        <p class="pricing-value">$4.99<span class="pricing-period"> / month</span></p>
                    </div>

                    <button class="btn btn-primary btn-block btn-lg" id="premium-upgrade">
                        Upgrade to Premium →
                    </button>
                    
                    <button class="btn btn-text btn-block" id="premium-later" style="margin-top: var(--space-3);">
                        Maybe Later
                    </button>
                </div>
            </div>
        `;

        overlay.classList.remove('hidden');
        Navigation.hide();

        document.getElementById('premium-close').addEventListener('click', () => {
            overlay.classList.add('hidden');
            Navigation.show();
        });

        document.getElementById('premium-later').addEventListener('click', () => {
            overlay.classList.add('hidden');
            Navigation.show();
        });

        document.getElementById('premium-upgrade').addEventListener('click', () => {
            Haptics.celebration();
            Modal.show(`
                <div class="modal-icon">🎉</div>
                <h2 class="modal-title">¡Gracias!</h2>
                <p class="modal-subtitle">La compra premium se integrará próximamente.</p>
                <button class="btn btn-primary btn-block" id="premium-ok">Entendido</button>
            `);
            document.getElementById('premium-ok').addEventListener('click', () => {
                Modal.hide();
                overlay.classList.add('hidden');
                Navigation.show();
            });
        });

        document.getElementById('premium-restore').addEventListener('click', () => {
            Haptics.tap();
            // Placeholder for restore purchases
        });
    },

    /**
     * Show help screen
     */
    showHelp() {
        Modal.show(`
            <div style="text-align: left;">
                <h2 class="modal-title" style="text-align: center;">Ayuda</h2>
                
                <div style="margin: var(--space-4) 0;">
                    <h4 style="margin-bottom: var(--space-2);">¿Cómo funciona el Braille?</h4>
                    <p style="color: var(--color-text-secondary); font-size: var(--font-size-sm);">
                        El sistema Braille usa celdas de 6 puntos organizados en 2 columnas y 3 filas. 
                        Cada patrón de puntos representa una letra, número o símbolo.
                    </p>
                </div>
                
                <div style="margin: var(--space-4) 0;">
                    <h4 style="margin-bottom: var(--space-2);">Tipos de actividad</h4>
                    <ul style="color: var(--color-text-secondary); font-size: var(--font-size-sm); padding-left: var(--space-4);">
                        <li><strong>Observar:</strong> Aprende viendo los patrones</li>
                        <li><strong>Construir:</strong> Crea patrones tocando puntos</li>
                        <li><strong>Elegir:</strong> Selecciona la opción correcta</li>
                        <li><strong>Palabras:</strong> Practica con palabras completas</li>
                        <li><strong>Juegos:</strong> Reta tus conocimientos</li>
                    </ul>
                </div>
                
                <button class="btn btn-primary btn-block" id="help-close">Entendido</button>
            </div>
        `);

        document.getElementById('help-close').addEventListener('click', () => {
            Modal.hide();
        });
    },

    /**
     * Start an activity
     * @param {string} type - observe, build, pick, words, games
     * @param {string[]} content - Letters or words
     * @param {Function} onComplete - Callback when done
     */
    startActivity(type, content, onComplete = null) {
        Haptics.tap();

        const callback = onComplete || ((result) => {
            console.log('Activity completed:', result);
            if (result.completed) {
                AppState.completeLesson('activity', type, result.score || 0, result.accuracy || 100);
            }
        });

        switch (type) {
            case 'observe':
                ObserveActivity.start(content, callback);
                break;
            case 'build':
                BuildActivity.start(content, callback);
                break;
            case 'pick':
                PickActivity.start(content, callback);
                break;
            case 'words':
                WordsActivity.start(content, callback);
                break;
            case 'games':
                GamesActivity.start(content, callback);
                break;
            default:
                console.error(`Unknown activity type: ${type}`);
        }
    },

    /**
     * Start a specific lesson
     * @param {object} chapter 
     * @param {object} lesson 
     */
    startLesson(chapter, lesson) {
        Haptics.tap();
        console.log(`Starting lesson: ${chapter.id}/${lesson.id}`);

        const onComplete = (result) => {
            console.log('Lesson completed:', result);
            if (result.completed) {
                AppState.completeLesson(chapter.id, lesson.id, result.score || 0, result.accuracy || 100);
            }
        };

        this.startActivity(lesson.type, lesson.content, onComplete);
    }
};

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = App;
}
