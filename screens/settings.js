/**
 * Settings Screen
 * Visual and sensory feedback settings
 */

const SettingsScreen = {
    /**
     * Render settings screen
     * @param {HTMLElement} container 
     */
    render(container) {
        const settings = AppState.getSettings();

        container.innerHTML = `
            <div class="screen active" id="settings-screen">
                <!-- Back button area -->
                <div style="margin-bottom: var(--space-4);">
                    <button class="icon-btn" id="settings-back" aria-label="Volver">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>

                <!-- Visual Settings -->
                <div class="settings-section">
                    <h4 class="settings-title">Visual</h4>
                    <div class="settings-list">
                        <!-- High Contrast -->
                        <div class="settings-item">
                            <div class="settings-item-content">
                                <div class="settings-icon contrast">🌓</div>
                                <div class="settings-item-text">
                                    <h4>Alto Contraste</h4>
                                    <p>Aumenta la legibilidad</p>
                                </div>
                            </div>
                            <div class="toggle ${settings.highContrast ? 'active' : ''}" data-setting="highContrast">
                                <div class="toggle-knob"></div>
                            </div>
                        </div>

                        <!-- Invert Colors -->
                        <div class="settings-item">
                            <div class="settings-item-content">
                                <div class="settings-icon invert">🔄</div>
                                <div class="settings-item-text">
                                    <h4>Invertir Colores</h4>
                                </div>
                            </div>
                            <div class="toggle ${settings.invertColors ? 'active' : ''}" data-setting="invertColors">
                                <div class="toggle-knob"></div>
                            </div>
                        </div>

                        <!-- Braille Size -->
                        <div class="settings-item" style="flex-direction: column; align-items: stretch;">
                            <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; margin-bottom: var(--space-3);">
                                <div class="settings-item-content">
                                    <div class="settings-icon braille">⠿</div>
                                    <div class="settings-item-text">
                                        <h4>Tamaño de puntos Braille</h4>
                                    </div>
                                </div>
                                <span class="settings-value" id="braille-size-value">${settings.brailleSize}%</span>
                            </div>
                            <div class="slider-container">
                                <span class="slider-label">A</span>
                                <input type="range" class="slider" id="braille-size-slider" 
                                       min="80" max="150" value="${settings.brailleSize}" step="10">
                                <span class="slider-label" style="font-size: var(--font-size-lg); font-weight: var(--font-weight-bold);">A</span>
                            </div>
                        </div>
                    </div>

                    <!-- Preview -->
                    <div class="preview-box">
                        <span class="preview-label">Vista Previa</span>
                        <div id="braille-preview"></div>
                    </div>
                </div>

                <!-- Sensory Feedback -->
                <div class="settings-section">
                    <h4 class="settings-title">Feedback Sensorial</h4>
                    <div class="settings-list">
                        <!-- Haptic -->
                        <div class="settings-item">
                            <div class="settings-item-content">
                                <div class="settings-icon haptic">📳</div>
                                <div class="settings-item-text">
                                    <h4>Vibración (Háptica)</h4>
                                    <p>Respuesta táctil al tocar</p>
                                </div>
                            </div>
                            <div class="toggle ${settings.hapticEnabled ? 'active' : ''}" data-setting="hapticEnabled">
                                <div class="toggle-knob"></div>
                            </div>
                        </div>

                        <!-- Sound -->
                        <div class="settings-item">
                            <div class="settings-item-content">
                                <div class="settings-icon sound">🔊</div>
                                <div class="settings-item-text">
                                    <h4>Efectos de Sonido</h4>
                                </div>
                            </div>
                            <div class="toggle ${settings.soundEnabled ? 'active' : ''}" data-setting="soundEnabled">
                                <div class="toggle-knob"></div>
                            </div>
                        </div>

                        <!-- Voice -->
                        <div class="settings-item">
                            <div class="settings-item-content">
                                <div class="settings-icon voice">🗣️</div>
                                <div class="settings-item-text">
                                    <h4>Lectura de Voz (TTS)</h4>
                                    <p>Leer instrucciones en voz alta</p>
                                </div>
                            </div>
                            <div class="toggle ${settings.voiceEnabled ? 'active' : ''}" data-setting="voiceEnabled">
                                <div class="toggle-knob"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Reset Button -->
                <button class="btn btn-text btn-block" id="reset-settings" style="color: var(--color-primary);">
                    Restaurar valores predeterminados
                </button>

                <!-- Version -->
                <p class="version-text">Braille Quest v2.4.0</p>
            </div>
        `;

        this.renderPreview();
        this.attachEventListeners(container);
    },

    /**
     * Render Braille cell preview
     */
    renderPreview() {
        const previewContainer = document.getElementById('braille-preview');
        if (!previewContainer) return;

        previewContainer.innerHTML = '';

        // Create a sample cell showing letter 'A'
        const pattern = BrailleData.getPattern('A');
        const cell = BrailleCell.create({ pattern, size: 'md' });
        previewContainer.appendChild(cell);
    },

    /**
     * Attach event listeners
     * @param {HTMLElement} container 
     */
    attachEventListeners(container) {
        // Back button
        const backBtn = container.querySelector('#settings-back');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                Navigation.navigateTo('home');
            });
        }

        // Toggle switches
        const toggles = container.querySelectorAll('.toggle');
        toggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                const setting = toggle.getAttribute('data-setting');
                const newValue = !toggle.classList.contains('active');

                toggle.classList.toggle('active', newValue);
                AppState.updateSetting(setting, newValue);

                Haptics.tap();
            });
        });

        // Size slider
        const slider = container.querySelector('#braille-size-slider');
        const sizeValue = container.querySelector('#braille-size-value');

        if (slider) {
            slider.addEventListener('input', () => {
                const value = parseInt(slider.value);
                sizeValue.textContent = `${value}%`;
                AppState.updateSetting('brailleSize', value);
                this.renderPreview();
            });
        }

        // Reset button
        const resetBtn = container.querySelector('#reset-settings');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                Modal.showConfirm(
                    'Restaurar configuración',
                    '¿Estás seguro de que quieres restaurar todos los ajustes a sus valores predeterminados?',
                    () => {
                        AppState.reset();
                        this.render(container);
                    }
                );
            });
        }
    }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SettingsScreen;
}
