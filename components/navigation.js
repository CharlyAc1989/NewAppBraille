/**
 * Navigation Component
 * Handles bottom tab navigation and screen switching
 */

const Navigation = {
    currentScreen: 'home',
    screens: ['home', 'dictionary', 'stats', 'settings'],

    /**
     * Initialize navigation
     */
    init() {
        const navItems = document.querySelectorAll('.nav-item');

        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const screen = item.getAttribute('data-screen');
                this.navigateTo(screen);
            });
        });

        // Navigate to initial screen
        this.navigateTo('home');
    },

    /**
     * Navigate to a screen
     * @param {string} screenName 
     */
    navigateTo(screenName) {
        if (!this.screens.includes(screenName)) {
            console.error(`Unknown screen: ${screenName}`);
            return;
        }

        // Update nav items
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            const isActive = item.getAttribute('data-screen') === screenName;
            item.classList.toggle('active', isActive);
        });

        // Update current screen
        this.currentScreen = screenName;

        // Render the screen
        this.renderScreen(screenName);

        // Update header visibility
        this.updateHeader(screenName);
    },

    /**
     * Render a screen
     * @param {string} screenName 
     */
    renderScreen(screenName) {
        const content = document.getElementById('main-content');

        switch (screenName) {
            case 'home':
                HomeScreen.render(content);
                break;
            case 'dictionary':
                DictionaryScreen.render(content);
                break;
            case 'stats':
                StatsScreen.render(content);
                break;
            case 'settings':
                SettingsScreen.render(content);
                break;
        }
    },

    /**
     * Update header based on screen
     * @param {string} screenName 
     */
    updateHeader(screenName) {
        const header = document.getElementById('main-header');
        const title = header.querySelector('.app-title');
        const menuBtn = header.querySelector('#menu-btn');
        const avatar = header.querySelector('#user-avatar');

        switch (screenName) {
            case 'home':
                title.textContent = 'Braille Quest';
                menuBtn.classList.remove('hidden');
                avatar.classList.remove('hidden');
                break;
            case 'dictionary':
                title.textContent = 'Diccionario';
                menuBtn.classList.add('hidden');
                avatar.classList.add('hidden');
                break;
            case 'stats':
                title.textContent = 'Estadísticas';
                menuBtn.classList.add('hidden');
                avatar.classList.add('hidden');
                break;
            case 'settings':
                title.textContent = 'Configuración';
                menuBtn.classList.add('hidden');
                avatar.classList.add('hidden');
                break;
        }
    },

    /**
     * Go back to the previous screen
     */
    goBack() {
        this.navigateTo('home');
    },

    /**
     * Hide bottom nav (for activities)
     */
    hide() {
        const nav = document.getElementById('bottom-nav');
        nav.classList.add('hidden');
    },

    /**
     * Show bottom nav
     */
    show() {
        const nav = document.getElementById('bottom-nav');
        nav.classList.remove('hidden');
    }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Navigation;
}
