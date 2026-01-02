/**
 * Stats Screen
 * User statistics and achievements
 */

const StatsScreen = {
    /**
     * Render stats screen
     * @param {HTMLElement} container 
     */
    render(container) {
        const stats = AppState.getStats();
        const user = AppState.getUser();
        const progress = LevelsData.getOverallProgress();

        container.innerHTML = `
            <div class="screen active" id="stats-screen">
                <!-- User Summary -->
                <div class="card card-primary" style="text-align: center; margin-bottom: var(--space-6);">
                    <div class="avatar" style="width: 64px; height: 64px; margin: 0 auto var(--space-3);">
                        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23FFE4D6'/%3E%3Ccircle cx='20' cy='16' r='8' fill='%23FF6B35'/%3E%3Cpath d='M8 36c0-8 5.4-12 12-12s12 4 12 12' fill='%23FF6B35'/%3E%3C/svg%3E" alt="Avatar">
                    </div>
                    <h3 style="font-size: var(--font-size-xl); font-weight: var(--font-weight-bold);">
                        ${user.name}
                    </h3>
                    <p style="color: var(--color-text-secondary); margin-bottom: var(--space-3);">
                        Estudiante de Braille
                    </p>
                    <span class="streak-badge">RACHA: ${user.streak} DÍAS</span>
                </div>

                <!-- Progress Overview -->
                <div class="settings-section">
                    <h4 class="settings-title">Progreso General</h4>
                    <div class="card" style="margin-bottom: var(--space-4);">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-2);">
                            <span>Curso completado</span>
                            <span style="font-weight: var(--font-weight-bold); color: var(--color-primary);">
                                ${progress}%
                            </span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-bar-fill" style="width: ${progress}%;"></div>
                        </div>
                    </div>
                </div>

                <!-- Stats Grid -->
                <div class="settings-section">
                    <h4 class="settings-title">Estadísticas</h4>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-3);">
                        <div class="card" style="text-align: center;">
                            <div style="font-size: var(--font-size-3xl); font-weight: var(--font-weight-bold); color: var(--color-primary);">
                                ${stats.totalLessons}
                            </div>
                            <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">
                                Lecciones completadas
                            </div>
                        </div>
                        <div class="card" style="text-align: center;">
                            <div style="font-size: var(--font-size-3xl); font-weight: var(--font-weight-bold); color: var(--color-success);">
                                ${stats.averageAccuracy || 0}%
                            </div>
                            <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">
                                Precisión promedio
                            </div>
                        </div>
                        <div class="card" style="text-align: center;">
                            <div style="font-size: var(--font-size-3xl); font-weight: var(--font-weight-bold); color: var(--color-secondary);">
                                ${stats.correctAnswers}
                            </div>
                            <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">
                                Respuestas correctas
                            </div>
                        </div>
                        <div class="card" style="text-align: center;">
                            <div style="font-size: var(--font-size-3xl); font-weight: var(--font-weight-bold); color: var(--color-streak);">
                                ${user.streak}
                            </div>
                            <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">
                                Días de racha
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Achievements -->
                <div class="settings-section">
                    <h4 class="settings-title">Logros</h4>
                    <div class="modes-grid">
                        ${this.renderAchievement('🎯', 'Primera lección', stats.totalLessons >= 1)}
                        ${this.renderAchievement('🔥', 'Racha de 3 días', user.streak >= 3)}
                        ${this.renderAchievement('⭐', 'Vocales dominadas', progress >= 20)}
                        ${this.renderAchievement('🏆', 'Experto en Braille', progress >= 100)}
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Render an achievement card
     * @param {string} icon 
     * @param {string} title 
     * @param {boolean} unlocked 
     * @returns {string} HTML
     */
    renderAchievement(icon, title, unlocked) {
        return `
            <div class="mode-card" style="text-align: center; ${!unlocked ? 'opacity: 0.5;' : ''}">
                <div style="font-size: 32px; margin-bottom: var(--space-2);">
                    ${unlocked ? icon : '🔒'}
                </div>
                <h3 style="font-size: var(--font-size-sm);">${title}</h3>
                <p style="font-size: var(--font-size-xs); color: ${unlocked ? 'var(--color-success)' : 'var(--color-text-tertiary)'};">
                    ${unlocked ? 'Desbloqueado' : 'Bloqueado'}
                </p>
            </div>
        `;
    }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StatsScreen;
}
