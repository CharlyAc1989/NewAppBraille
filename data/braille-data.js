/**
 * Braille Data - Official Spanish Braille Standard
 * 
 * FUENTE ÚNICA DE VERDAD - NO MODIFICAR PATRONES
 * 
 * Braille dots are numbered:
 * [1] [4]
 * [2] [5]
 * [3] [6]
 * 
 * Array format: [dot1, dot2, dot3, dot4, dot5, dot6]
 * 1 = raised (active), 0 = flat (inactive)
 */

const BrailleData = {
    // ═══════════════════════════════════════════════════════════
    // 🔤 ALFABETO BÁSICO (MINÚSCULAS - 1 CELDA)
    // ═══════════════════════════════════════════════════════════
    ALPHABET: {
        'a': [1, 0, 0, 0, 0, 0],           // Punto 1
        'b': [1, 1, 0, 0, 0, 0],           // Puntos 1,2
        'c': [1, 0, 0, 1, 0, 0],           // Puntos 1,4
        'd': [1, 0, 0, 1, 1, 0],           // Puntos 1,4,5
        'e': [1, 0, 0, 0, 1, 0],           // Puntos 1,5
        'f': [1, 1, 0, 1, 0, 0],           // Puntos 1,2,4
        'g': [1, 1, 0, 1, 1, 0],           // Puntos 1,2,4,5
        'h': [1, 1, 0, 0, 1, 0],           // Puntos 1,2,5
        'i': [0, 1, 0, 1, 0, 0],           // Puntos 2,4
        'j': [0, 1, 0, 1, 1, 0],           // Puntos 2,4,5
        'k': [1, 0, 1, 0, 0, 0],           // Puntos 1,3
        'l': [1, 1, 1, 0, 0, 0],           // Puntos 1,2,3
        'm': [1, 0, 1, 1, 0, 0],           // Puntos 1,3,4
        'n': [1, 0, 1, 1, 1, 0],           // Puntos 1,3,4,5
        'ñ': [1, 1, 0, 1, 1, 1],           // Puntos 1,2,4,5,6
        'o': [1, 0, 1, 0, 1, 0],           // Puntos 1,3,5
        'p': [1, 1, 1, 1, 0, 0],           // Puntos 1,2,3,4
        'q': [1, 1, 1, 1, 1, 0],           // Puntos 1,2,3,4,5
        'r': [1, 1, 1, 0, 1, 0],           // Puntos 1,2,3,5
        's': [0, 1, 1, 1, 0, 0],           // Puntos 2,3,4
        't': [0, 1, 1, 1, 1, 0],           // Puntos 2,3,4,5
        'u': [1, 0, 1, 0, 0, 1],           // Puntos 1,3,6
        'v': [1, 1, 1, 0, 0, 1],           // Puntos 1,2,3,6
        'w': [0, 1, 0, 1, 1, 1],           // Puntos 2,4,5,6
        'x': [1, 0, 1, 1, 0, 1],           // Puntos 1,3,4,6
        'y': [1, 0, 1, 1, 1, 1],           // Puntos 1,3,4,5,6
        'z': [1, 0, 1, 0, 1, 1]            // Puntos 1,3,5,6
    },

    // ═══════════════════════════════════════════════════════════
    // 🔤 VOCALES CON TILDE (1 CELDA)
    // ═══════════════════════════════════════════════════════════
    ACCENTED: {
        'á': [1, 1, 1, 0, 1, 1],           // Puntos 1,2,3,5,6
        'é': [0, 1, 1, 1, 0, 1],           // Puntos 2,3,4,6
        'í': [0, 0, 1, 1, 0, 0],           // Puntos 3,4
        'ó': [0, 0, 1, 1, 0, 1],           // Puntos 3,4,6
        'ú': [0, 1, 1, 1, 1, 1],           // Puntos 2,3,4,5,6
        'ü': [1, 1, 0, 0, 1, 1]            // Puntos 1,2,5,6
    },

    // ═══════════════════════════════════════════════════════════
    // 🔵 SIGNOS ESPECIALES (PREFIJOS)
    // ═══════════════════════════════════════════════════════════
    SIGNS: {
        'uppercase': [0, 0, 0, 1, 0, 1],   // Puntos 4,6 - Signo de mayúscula
        'number': [0, 0, 1, 1, 1, 1]       // Puntos 3,4,5,6 - Signo numérico
    },

    // ═══════════════════════════════════════════════════════════
    // 🔢 NÚMEROS (letra base, se antepone signo numérico)
    // ═══════════════════════════════════════════════════════════
    NUMBERS: {
        '1': [1, 0, 0, 0, 0, 0],           // = a
        '2': [1, 1, 0, 0, 0, 0],           // = b
        '3': [1, 0, 0, 1, 0, 0],           // = c
        '4': [1, 0, 0, 1, 1, 0],           // = d
        '5': [1, 0, 0, 0, 1, 0],           // = e
        '6': [1, 1, 0, 1, 0, 0],           // = f
        '7': [1, 1, 0, 1, 1, 0],           // = g
        '8': [1, 1, 0, 0, 1, 0],           // = h
        '9': [0, 1, 0, 1, 0, 0],           // = i
        '0': [0, 1, 0, 1, 1, 0]            // = j
    },

    // ═══════════════════════════════════════════════════════════
    // ✍️ SIGNOS DE PUNTUACIÓN (1 CELDA)
    // ═══════════════════════════════════════════════════════════
    PUNCTUATION: {
        '.': [0, 0, 1, 0, 0, 0],           // Punto 3
        ',': [0, 1, 0, 0, 0, 0],           // Punto 2
        ';': [0, 1, 1, 0, 0, 0],           // Puntos 2,3
        ':': [0, 1, 0, 0, 1, 0],           // Puntos 2,5
        '¿': [0, 1, 0, 0, 0, 1],           // Puntos 2,6 (inicio y final)
        '?': [0, 1, 0, 0, 0, 1],           // Puntos 2,6
        '¡': [0, 1, 1, 0, 1, 0],           // Puntos 2,3,5 (inicio y final)
        '!': [0, 1, 1, 0, 1, 0],           // Puntos 2,3,5
        '(': [0, 1, 1, 0, 1, 1],           // Puntos 2,3,5,6 (abre/cierra)
        ')': [0, 1, 1, 0, 1, 1],           // Puntos 2,3,5,6
        '-': [0, 0, 1, 0, 0, 1],           // Puntos 3,6 (guión)
        '"': [0, 1, 1, 0, 0, 1],           // Puntos 2,3,6 (comillas)
        "'": [0, 0, 0, 1, 0, 0]            // Punto 4 (apóstrofo)
    },

    // ═══════════════════════════════════════════════════════════
    // ➕ SIGNOS MATEMÁTICOS (1 CELDA)
    // ═══════════════════════════════════════════════════════════
    MATH: {
        '+': [0, 1, 1, 0, 1, 0],           // Puntos 2,3,5
        '−': [0, 0, 1, 0, 0, 1],           // Puntos 3,6
        '×': [1, 0, 0, 0, 0, 1],           // Puntos 1,6
        '÷': [0, 0, 1, 1, 0, 0],           // Puntos 3,4
        '=': [0, 1, 1, 0, 1, 1]            // Puntos 2,3,5,6
    },

    // ═══════════════════════════════════════════════════════════
    // 🌐 SIGNOS DIGITALES / ESPECIALES (1 CELDA)
    // ═══════════════════════════════════════════════════════════
    DIGITAL: {
        '@': [0, 0, 0, 0, 1, 0],           // Punto 5
        '%': [0, 0, 1, 1, 0, 1],           // Puntos 3,4,6
        '#': [0, 0, 1, 1, 1, 1],           // Puntos 3,4,5,6
        '/': [0, 0, 1, 1, 0, 0],           // Puntos 3,4
        '&': [1, 1, 1, 1, 0, 1]            // Puntos 1,2,3,4,6
    },

    // ═══════════════════════════════════════════════════════════
    // 🧩 CONFUSIONES REALES (para distractores inteligentes)
    // ═══════════════════════════════════════════════════════════
    CONFUSIONS: {
        'a': ['e', 'c', 'k'],              // 1 dot difference
        'b': ['l', 'f', 'h'],
        'c': ['a', 'd', 'f', 'i'],
        'd': ['c', 'e', 'n'],
        'e': ['a', 'd', 'i'],
        'f': ['b', 'c', 'g'],
        'g': ['f', 'h', 'd'],
        'h': ['b', 'g', 'e'],
        'i': ['j', 'c', 'e'],              // ⚠️ Confusión real i/j
        'j': ['i', 'd', 't'],              // ⚠️ Confusión real i/j
        'k': ['a', 'm', 'u'],
        'l': ['b', 'k', 'r'],
        'm': ['k', 'n', 'o'],
        'n': ['m', 'd', 'ñ'],              // ⚠️ Confusión real n/ñ
        'ñ': ['n', 'g', 'y'],              // ⚠️ Confusión real n/ñ
        'o': ['e', 'm', 'z'],
        'p': ['l', 'f', 'q'],
        'q': ['p', 'g', 'r'],
        'r': ['l', 'h', 'o'],
        's': ['i', 't', 'f'],
        't': ['s', 'j', 'n'],
        'u': ['k', 'x', 'z'],
        'v': ['l', 'u', 'r'],
        'w': ['j', 'y', 't'],
        'x': ['m', 'u', 'y'],
        'y': ['n', 'x', 'ñ'],
        'z': ['o', 'u', 'x']
    },

    // ═══════════════════════════════════════════════════════════
    // 📚 MÉTODOS AUXILIARES
    // ═══════════════════════════════════════════════════════════

    /**
     * Get pattern for a character (lowercase automatic)
     * @param {string} char 
     * @returns {number[]}
     */
    getPattern(char) {
        const lower = char.toLowerCase();
        return this.ALPHABET[lower] ||
            this.ACCENTED[lower] ||
            this.NUMBERS[char] ||
            this.PUNCTUATION[char] ||
            this.MATH[char] ||
            this.DIGITAL[char] ||
            [0, 0, 0, 0, 0, 0];
    },

    /**
     * Get patterns for multi-cell characters (uppercase, numbers)
     * @param {string} char 
     * @returns {number[][]} Array of patterns (1 or 2 cells)
     */
    getPatterns(char) {
        // Check if uppercase letter
        if (/[A-ZÑÁÉÍÓÚÜ]/.test(char)) {
            const lower = char.toLowerCase();
            const letterPattern = this.ALPHABET[lower] || this.ACCENTED[lower];
            if (letterPattern) {
                return [this.SIGNS['uppercase'], letterPattern];
            }
        }

        // Check if number
        if (/[0-9]/.test(char)) {
            return [this.SIGNS['number'], this.NUMBERS[char]];
        }

        // Single cell character
        return [this.getPattern(char)];
    },

    /**
     * Check if character requires 2 cells
     * @param {string} char 
     * @returns {boolean}
     */
    isMultiCell(char) {
        return /[A-ZÑÁÉÍÓÚÜ0-9]/.test(char);
    },

    /**
     * Get smart distractors for PICK activity
     * @param {string} letter 
     * @param {number} count 
     * @returns {string[]}
     */
    getSmartDistractors(letter, count = 3) {
        const lower = letter.toLowerCase();
        const confusions = this.CONFUSIONS[lower] || [];

        // Shuffle and take required count
        const shuffled = [...confusions].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, count);
    },

    /**
     * Get active dot numbers for a pattern
     * @param {number[]} pattern 
     * @returns {number[]}
     */
    getActiveDots(pattern) {
        const dots = [];
        for (let i = 0; i < 6; i++) {
            if (pattern[i] === 1) dots.push(i + 1);
        }
        return dots;
    },

    /**
     * Get verbal description of pattern
     * @param {string} char 
     * @returns {string}
     */
    getDescription(char) {
        const pattern = this.getPattern(char);
        const dots = this.getActiveDots(pattern);

        if (dots.length === 0) return "celda vacía";
        if (dots.length === 1) return `punto ${dots[0]}`;
        return `puntos ${dots.slice(0, -1).join(', ')} y ${dots[dots.length - 1]}`;
    },

    /**
     * Get narration for VoiceOver/TalkBack
     * @param {string} char 
     * @returns {string}
     */
    getNarration(char) {
        return `La letra ${char.toUpperCase()} se forma con los ${this.getDescription(char)}`;
    },

    /**
     * Check if patterns match
     * @param {number[]} pattern1 
     * @param {number[]} pattern2 
     * @returns {boolean}
     */
    patternsMatch(pattern1, pattern2) {
        for (let i = 0; i < 6; i++) {
            if (pattern1[i] !== pattern2[i]) return false;
        }
        return true;
    },

    /**
     * Get all letters
     * @returns {string[]}
     */
    getAllLetters() {
        return Object.keys(this.ALPHABET);
    },

    /**
     * Get vowels
     * @returns {string[]}
     */
    getVowels() {
        return ['a', 'e', 'i', 'o', 'u'];
    },

    /**
     * Get consonants
     * @returns {string[]}
     */
    getConsonants() {
        return Object.keys(this.ALPHABET).filter(
            letter => !['a', 'e', 'i', 'o', 'u'].includes(letter)
        );
    }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BrailleData;
}
