/**
 * Home Screen
 * Main landing screen with greeting, streak, guided route, and modes
 * RESTORED: Using exact design from Homescreen.html
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

        container.innerHTML = `
            <div class="flex flex-col font-display">
                <!-- Greeting & Daily Progress -->
                <div class="pt-4 pb-6">
                    <h1 class="text-text-main dark:text-white tracking-tight text-[28px] font-bold leading-tight mb-1">
                        ¡Hola, ${user.name}!</h1>
                    <p class="text-text-sub dark:text-gray-400 text-sm font-medium">Listo para continuar tu aprendizaje?</p>
                </div>

                <!-- Featured "Continue" Card (Ruta Guiada highlight) -->
                <div class="mb-6">
                    <div id="guided-route-card"
                        class="group relative flex items-stretch justify-between gap-4 rounded-2xl bg-white dark:bg-[#2e1f1a] p-5 shadow-[0_4px_12px_rgba(0,0,0,0.05)] border-2 border-transparent hover:border-primary/20 transition-all active:scale-[0.98] cursor-pointer overflow-hidden">
                        <!-- Decor element -->
                        <div class="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-primary/10"></div>
                        <div class="flex flex-[2_2_0px] flex-col justify-between z-10">
                            <div class="flex flex-col gap-2">
                                <div class="inline-flex items-center gap-1.5 self-start rounded-full bg-primary/10 px-2.5 py-1">
                                    <span class="material-symbols-outlined text-primary text-[14px]">local_fire_department</span>
                                    <span class="text-primary text-xs font-bold uppercase tracking-wide">Racha: ${streak} días</span>
                                </div>
                                <div>
                                    <h3 class="text-text-main dark:text-white text-lg font-bold leading-tight">Ruta Guiada</h3>
                                    <p class="text-text-sub dark:text-gray-400 text-sm font-normal mt-1">Nivel 3: Alfabeto Básico</p>
                                </div>
                            </div>
                            <div class="mt-4">
                                <span id="continue-route" class="inline-flex items-center gap-1 text-primary font-bold text-sm group-hover:underline">
                                    Continuar
                                    <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
                                </span>
                            </div>
                        </div>
                        <div class="w-24 shrink-0 flex items-center justify-center">
                            <!-- Abstract Map/Path Illustration -->
                            <div class="relative w-20 h-20 rounded-full bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center">
                                <span class="material-symbols-outlined text-primary text-4xl">map</span>
                                <div class="absolute -bottom-1 -right-1 bg-green-500 border-2 border-white dark:border-[#2e1f1a] rounded-full p-1">
                                    <span class="material-symbols-outlined text-white text-[12px] block">play_arrow</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Grid of Other Modes -->
                <h3 class="text-text-main dark:text-white text-lg font-bold mb-4 px-1">Explorar modos</h3>
                <div class="grid grid-cols-2 gap-4">
                    <!-- Práctica Libre -->
                    <button data-mode="practice"
                        class="group flex flex-col gap-3 rounded-2xl bg-white dark:bg-[#2e1f1a] p-5 shadow-sm active:scale-95 transition-all text-left border-2 border-transparent hover:border-blue-100 dark:hover:border-blue-900/30 h-44 relative overflow-hidden">
                        <div class="absolute inset-0 bg-blue-50/50 dark:bg-blue-900/5 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/10 transition-colors"></div>
                        <div class="relative z-10 w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 flex items-center justify-center mb-auto">
                            <span class="material-symbols-outlined text-3xl">menu_book</span>
                        </div>
                        <div class="relative z-10">
                            <p class="text-text-main dark:text-white text-base font-bold leading-tight">Práctica libre</p>
                            <p class="text-text-sub dark:text-gray-400 text-xs mt-1">Sin límites de tiempo</p>
                        </div>
                    </button>

                    <!-- Juegos -->
                    <button data-mode="games"
                        class="group flex flex-col gap-3 rounded-2xl bg-white dark:bg-[#2e1f1a] p-5 shadow-sm active:scale-95 transition-all text-left border-2 border-transparent hover:border-purple-100 dark:hover:border-purple-900/30 h-44 relative overflow-hidden">
                        <div class="absolute inset-0 bg-purple-50/50 dark:bg-purple-900/5 group-hover:bg-purple-50 dark:group-hover:bg-purple-900/10 transition-colors"></div>
                        <div class="relative z-10 w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 flex items-center justify-center mb-auto">
                            <span class="material-symbols-outlined text-3xl">sports_esports</span>
                        </div>
                        <div class="relative z-10">
                            <p class="text-text-main dark:text-white text-base font-bold leading-tight">Juegos</p>
                            <p class="text-text-sub dark:text-gray-400 text-xs mt-1">Retos divertidos</p>
                        </div>
                    </button>

                    <!-- Repasar Errores -->
                    <button data-mode="review"
                        class="group flex flex-col gap-3 rounded-2xl bg-white dark:bg-[#2e1f1a] p-5 shadow-sm active:scale-95 transition-all text-left border-2 border-transparent hover:border-red-100 dark:hover:border-red-900/30 h-44 relative overflow-hidden">
                        <div class="absolute inset-0 bg-red-50/50 dark:bg-red-900/5 group-hover:bg-red-50 dark:group-hover:bg-red-900/10 transition-colors"></div>
                        <div class="relative z-10 w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300 flex items-center justify-center mb-auto">
                            <span class="material-symbols-outlined text-3xl">replay_circle_filled</span>
                        </div>
                        <div class="relative z-10">
                            <p class="text-text-main dark:text-white text-base font-bold leading-tight">Repasar</p>
                            <p class="text-text-sub dark:text-gray-400 text-xs mt-1">Corrige tus fallos</p>
                        </div>
                    </button>

                    <!-- Logros -->
                    <button data-mode="achievements"
                        class="group flex flex-col gap-3 rounded-2xl bg-white dark:bg-[#2e1f1a] p-5 shadow-sm active:scale-95 transition-all text-left border-2 border-transparent hover:border-amber-100 dark:hover:border-amber-900/30 h-44 relative overflow-hidden">
                        <div class="absolute inset-0 bg-amber-50/50 dark:bg-amber-900/5 group-hover:bg-amber-50 dark:group-hover:bg-amber-900/10 transition-colors"></div>
                        <div class="relative z-10 w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-300 flex items-center justify-center mb-auto">
                            <span class="material-symbols-outlined text-3xl">emoji_events</span>
                        </div>
                        <div class="relative z-10">
                            <p class="text-text-main dark:text-white text-base font-bold leading-tight">Logros</p>
                            <p class="text-text-sub dark:text-gray-400 text-xs mt-1">Tus medallas</p>
                        </div>
                    </button>
                </div>

                <!-- Braille Hint Decoration -->
                <div class="mt-8 flex justify-center opacity-30">
                    <div class="flex gap-4">
                        <div class="w-2 h-2 rounded-full bg-text-sub"></div>
                        <div class="w-2 h-2 rounded-full bg-text-sub"></div>
                        <div class="w-2 h-2 rounded-full bg-text-sub"></div>
                    </div>
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
            continueBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                LearningPathScreen.show();
            });
        }

        // Guided route card click
        const routeCard = container.querySelector('#guided-route-card');
        if (routeCard) {
            routeCard.addEventListener('click', () => {
                LearningPathScreen.show();
            });
        }

        // Mode cards
        const modeCards = container.querySelectorAll('[data-mode]');
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
                // Start free practice with vowels
                App.startActivity('build', ['a', 'e', 'i', 'o', 'u']);
                break;
            case 'games':
                // Start games mode
                App.startActivity('games', BrailleData.getAllLetters().slice(0, 10));
                break;
            case 'review':
                // Show dictionary
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
