/**
 * Haptic and Audio Feedback Utilities
 */

const Haptics = {
    /**
     * Check if vibration is supported
     */
    isSupported() {
        return 'vibrate' in navigator;
    },

    /**
     * Light tap feedback
     */
    tap() {
        if (this.isSupported() && AppState.getSettings().hapticEnabled) {
            navigator.vibrate(10);
        }
    },

    /**
     * Success feedback
     */
    success() {
        if (this.isSupported() && AppState.getSettings().hapticEnabled) {
            navigator.vibrate([20, 50, 20]);
        }
    },

    /**
     * Error feedback
     */
    error() {
        if (this.isSupported() && AppState.getSettings().hapticEnabled) {
            navigator.vibrate([50, 30, 50, 30, 50]);
        }
    },

    /**
     * Celebration feedback
     */
    celebration() {
        if (this.isSupported() && AppState.getSettings().hapticEnabled) {
            navigator.vibrate([100, 50, 100, 50, 200]);
        }
    }
};

const AudioFeedback = {
    // Audio context
    audioCtx: null,

    /**
     * Initialize audio context
     */
    init() {
        if (!this.audioCtx) {
            this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
    },

    /**
     * Check if audio is enabled
     */
    isEnabled() {
        return AppState.getSettings().soundEnabled;
    },

    /**
     * Play a simple tone
     * @param {number} frequency - Frequency in Hz
     * @param {number} duration - Duration in ms
     * @param {string} type - Oscillator type
     */
    playTone(frequency, duration = 100, type = 'sine') {
        if (!this.isEnabled()) return;

        this.init();

        const oscillator = this.audioCtx.createOscillator();
        const gainNode = this.audioCtx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioCtx.destination);

        oscillator.type = type;
        oscillator.frequency.value = frequency;

        gainNode.gain.setValueAtTime(0.3, this.audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration / 1000);

        oscillator.start(this.audioCtx.currentTime);
        oscillator.stop(this.audioCtx.currentTime + duration / 1000);
    },

    /**
     * Tap sound
     */
    tap() {
        this.playTone(800, 50);
    },

    /**
     * Success sound
     */
    success() {
        this.playTone(523, 100); // C5
        setTimeout(() => this.playTone(659, 100), 100); // E5
        setTimeout(() => this.playTone(784, 150), 200); // G5
    },

    /**
     * Error sound
     */
    error() {
        this.playTone(200, 150, 'square');
    },

    /**
     * Celebration sound
     */
    celebration() {
        const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
        notes.forEach((freq, i) => {
            setTimeout(() => this.playTone(freq, 150), i * 100);
        });
    },

    /**
     * Read text aloud using TTS
     * @param {string} text 
     */
    speak(text) {
        if (!AppState.getSettings().voiceEnabled) return;

        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'es-ES';
            utterance.rate = 0.9;
            speechSynthesis.speak(utterance);
        }
    }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Haptics, AudioFeedback };
}
