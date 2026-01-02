/**
 * Card Components
 * Reusable card components for various UI elements
 */

const Cards = {
    /**
     * Create streak badge
     * @param {number} days 
     * @returns {string} HTML
     */
    streakBadge(days) {
        return `<span class="streak-badge">RACHA: ${days} DÍAS</span>`;
    },

    /**
     * Create guided route card
     * @param {object} data - { level, title, progress }
     * @returns {string} HTML
     */
    guidedRouteCard(data) {
        return `
            <div class="card card-primary" id="guided-route-card">
                ${this.streakBadge(data.streak || 3)}
                <h3 style="font-size: var(--font-size-xl); font-weight: var(--font-weight-bold); margin: var(--space-3) 0 var(--space-1);">
                    Ruta Guiada
                </h3>
                <p style="color: var(--color-text-secondary); margin-bottom: var(--space-3);">
                    Nivel ${data.level}: ${data.title}
                </p>
                <a class="link" id="continue-route">
                    Continuar →
                </a>
                <div style="position: absolute; right: var(--space-4); top: 50%; transform: translateY(-50%);">
                    <div style="width: 56px; height: 56px; background: var(--gradient-primary); border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: center; color: white; font-size: 24px;">
                        📘
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Create mode card
     * @param {object} data - { id, title, subtitle, icon, color }
     * @returns {string} HTML
     */
    modeCard(data) {
        return `
            <div class="mode-card" data-mode="${data.id}">
                <div class="mode-icon ${data.color}">${data.icon}</div>
                <h3>${data.title}</h3>
                <p>${data.subtitle}</p>
            </div>
        `;
    },

    /**
     * Create chapter item
     * @param {object} chapter 
     * @returns {string} HTML
     */
    chapterItem(chapter) {
        const statusIcon = {
            'completed': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
            'in-progress': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 3l14 9-14 9V3z" fill="currentColor"/></svg>`,
            'locked': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" stroke-width="2"/><path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" stroke-width="2"/></svg>`
        };

        const badgeClass = chapter.status === 'completed' ? 'completed' :
            chapter.status === 'in-progress' ? 'in-progress' : '';

        const badgeText = chapter.status === 'completed' ? 'Completado' :
            chapter.status === 'in-progress' ? 'En curso' : '';

        return `
            <div class="chapter-item ${chapter.status === 'in-progress' ? 'active' : ''} ${chapter.status === 'locked' ? 'locked' : ''}" 
                 data-chapter="${chapter.id}">
                <div class="chapter-status ${chapter.status}">
                    ${statusIcon[chapter.status]}
                </div>
                <div class="chapter-content">
                    <h4 class="chapter-title">${chapter.title}</h4>
                    <p class="chapter-desc">${chapter.description}</p>
                    ${badgeText ? `<span class="chapter-badge ${badgeClass}">${badgeText}</span>` : ''}
                    ${chapter.progress ? `<p class="chapter-progress">${chapter.progress}</p>` : ''}
                </div>
            </div>
        `;
    },

    /**
     * Create benefit card (for premium screen)
     * @param {object} data - { icon, color, title, subtitle }
     * @returns {string} HTML
     */
    benefitCard(data) {
        return `
            <div class="benefit-card">
                <div class="benefit-icon ${data.color}">${data.icon}</div>
                <h4>${data.title}</h4>
                <p>${data.subtitle}</p>
            </div>
        `;
    },

    /**
     * Create settings item
     * @param {object} data - { icon, iconColor, title, subtitle, type, value, id }
     * @returns {string} HTML
     */
    settingsItem(data) {
        let control = '';

        switch (data.type) {
            case 'toggle':
                control = `
                    <div class="toggle ${data.value ? 'active' : ''}" data-setting="${data.id}">
                        <div class="toggle-knob"></div>
                    </div>
                `;
                break;
            case 'value':
                control = `<span class="settings-value">${data.value}</span>`;
                break;
            case 'slider':
                control = ''; // Slider rendered separately
                break;
        }

        return `
            <div class="settings-item" data-setting-item="${data.id}">
                <div class="settings-item-content">
                    <div class="settings-icon ${data.iconColor}">${data.icon}</div>
                    <div class="settings-item-text">
                        <h4>${data.title}</h4>
                        ${data.subtitle ? `<p>${data.subtitle}</p>` : ''}
                    </div>
                </div>
                ${control}
            </div>
        `;
    },

    /**
     * Create letter card for dictionary
     * @param {string} letter 
     * @returns {HTMLElement}
     */
    letterCard(letter) {
        const card = document.createElement('div');
        card.className = 'mode-card';
        card.setAttribute('data-letter', letter);

        const pattern = BrailleData.getPattern(letter);
        const cell = BrailleCell.create({ pattern, size: 'sm' });

        card.innerHTML = `
            <div class="letter-display" style="font-size: var(--font-size-2xl); font-weight: var(--font-weight-bold); margin-bottom: var(--space-2);">
                ${letter}
            </div>
        `;
        card.appendChild(cell);

        return card;
    }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Cards;
}
