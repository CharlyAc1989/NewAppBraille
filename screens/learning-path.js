/**
 * Learning Path Screen
 * Shows chapters with progress and lesson navigation
 */

const LearningPathScreen = {
    /**
     * Show learning path (full screen overlay style)
     */
    show() {
        const content = document.getElementById('main-content');
        this.render(content);

        // Update header
        const header = document.getElementById('main-header');
        const title = header.querySelector('.app-title');
        title.textContent = 'Braille Quest';
    },

    /**
     * Render learning path
     * @param {HTMLElement} container 
     */
    render(container) {
        const user = AppState.getUser();
        const progress = LevelsData.getOverallProgress();
        const chapters = LevelsData.chapters;
        const currentChapter = LevelsData.getCurrentChapter();

        container.innerHTML = `
            <div class="screen active" id="learning-path-screen">
                <!-- Header Info -->
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
                    <div>
                        <h3 style="font-size: var(--font-size-lg); font-weight: var(--font-weight-semibold);">
                            Braille Quest
                        </h3>
                        <p style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">
                            ¡Hola, ${user.name}!
                        </p>
                    </div>
                    <div class="streak-badge">RACHA: ${AppState.getStreak()} DÍAS</div>
                </div>

                <!-- Overall Progress -->
                <div style="margin-bottom: var(--space-6);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-2);">
                        <span style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">
                            Nivel 3: Fundamentos
                        </span>
                        <span style="font-size: var(--font-size-sm); font-weight: var(--font-weight-semibold); color: var(--color-primary);">
                            ${progress}%
                        </span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-bar-fill" style="width: ${progress}%;"></div>
                    </div>
                </div>

                <!-- Quick Modes -->
                <h3 class="section-title">Modos Rápidos</h3>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-3); margin-bottom: var(--space-6);">
                    <div class="mode-card" data-quick-mode="practice">
                        <div class="mode-icon blue" style="width: 40px; height: 40px; font-size: 18px;">✋</div>
                        <h3 style="font-size: var(--font-size-base);">Práctica Libre</h3>
                        <p style="font-size: var(--font-size-xs);">Entrena sin límites</p>
                    </div>
                    <div class="mode-card" data-quick-mode="games">
                        <div class="mode-icon purple" style="width: 40px; height: 40px; font-size: 18px;">🎮</div>
                        <h3 style="font-size: var(--font-size-base);">Juegos</h3>
                        <p style="font-size: var(--font-size-xs);">Desafíos divertidos</p>
                    </div>
                </div>

                <!-- Chapter List -->
                <h3 class="section-title">Tu Ruta</h3>
                <div class="chapter-list" id="chapter-list">
                    ${chapters.map(chapter => this.renderChapter(chapter)).join('')}
                </div>

                <!-- Continue Button -->
                <div style="margin-top: var(--space-6);">
                    <button class="btn btn-primary btn-block btn-lg" id="continue-btn">
                        Continuar: ${currentChapter ? currentChapter.title : 'Orientación'}
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;

        this.attachEventListeners(container);
    },

    /**
     * Render a chapter item
     * @param {object} chapter 
     * @returns {string} HTML
     */
    renderChapter(chapter) {
        const statusIcon = {
            'completed': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
            'in-progress': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 3l14 9-14 9V3z" fill="currentColor"/></svg>`,
            'locked': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" stroke-width="2"/><path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" stroke-width="2"/></svg>`
        };

        const isActive = chapter.status === 'in-progress';
        const isLocked = chapter.status === 'locked';
        const isCompleted = chapter.status === 'completed';

        return `
            <div class="chapter-item ${isActive ? 'active' : ''} ${isLocked ? 'locked' : ''}" 
                 data-chapter="${chapter.id}" 
                 ${isLocked ? 'aria-disabled="true"' : ''}>
                <div class="chapter-status ${chapter.status}">
                    ${statusIcon[chapter.status]}
                </div>
                <div class="chapter-content">
                    <div style="display: flex; align-items: center; gap: var(--space-2); flex-wrap: wrap;">
                        <h4 class="chapter-title" style="margin: 0;">${chapter.title}</h4>
                        ${isCompleted ? '<span class="chapter-badge completed">Completado</span>' : ''}
                        ${isActive ? '<span class="chapter-badge in-progress">En curso</span>' : ''}
                    </div>
                    <p class="chapter-desc">${chapter.description}</p>
                    ${chapter.progress ? `<p class="chapter-progress">${chapter.progress}</p>` : ''}
                </div>
            </div>
        `;
    },

    /**
     * Attach event listeners
     * @param {HTMLElement} container 
     */
    attachEventListeners(container) {
        // Chapter clicks
        const chapterItems = container.querySelectorAll('.chapter-item:not(.locked)');
        chapterItems.forEach(item => {
            item.addEventListener('click', () => {
                const chapterId = item.getAttribute('data-chapter');
                this.handleChapterClick(chapterId);
            });
        });

        // Quick mode clicks
        const quickModes = container.querySelectorAll('[data-quick-mode]');
        quickModes.forEach(mode => {
            mode.addEventListener('click', () => {
                const modeName = mode.getAttribute('data-quick-mode');
                if (modeName === 'practice') {
                    App.startActivity('build', ['A', 'B', 'C', 'D', 'E']);
                } else if (modeName === 'games') {
                    App.startActivity('games', BrailleData.getAllLetters().slice(0, 10));
                }
            });
        });

        // Continue button
        const continueBtn = container.querySelector('#continue-btn');
        if (continueBtn) {
            continueBtn.addEventListener('click', () => {
                const next = LevelsData.getNextLesson();
                if (next) {
                    App.startLesson(next.chapter, next.lesson);
                }
            });
        }
    },

    /**
     * Handle chapter click
     * @param {string} chapterId 
     */
    handleChapterClick(chapterId) {
        Haptics.tap();
        const chapter = LevelsData.getChapter(chapterId);

        if (chapter && chapter.lessons.length > 0) {
            // Start first incomplete lesson in chapter
            const lesson = chapter.lessons[0];
            App.startLesson(chapter, lesson);
        }
    }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LearningPathScreen;
}
