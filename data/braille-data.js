/**
 * Braille Data - Complete Braille alphabet and patterns
 * 
 * Braille dots are numbered:
 * 1 4
 * 2 5
 * 3 6
 * 
 * Array format: [dot1, dot2, dot3, dot4, dot5, dot6]
 * 1 = raised (active), 0 = flat (inactive)
 */

const BrailleData = {
    // Standard Spanish Braille Alphabet
    ALPHABET: {
        'A': [1, 0, 0, 0, 0, 0],
        'B': [1, 1, 0, 0, 0, 0],
        'C': [1, 0, 0, 1, 0, 0],
        'D': [1, 0, 0, 1, 1, 0],
        'E': [1, 0, 0, 0, 1, 0],
        'F': [1, 1, 0, 1, 0, 0],
        'G': [1, 1, 0, 1, 1, 0],
        'H': [1, 1, 0, 0, 1, 0],
        'I': [0, 1, 0, 1, 0, 0],
        'J': [0, 1, 0, 1, 1, 0],
        'K': [1, 0, 1, 0, 0, 0],
        'L': [1, 1, 1, 0, 0, 0],
        'M': [1, 0, 1, 1, 0, 0],
        'N': [1, 0, 1, 1, 1, 0],
        'Ñ': [1, 0, 1, 1, 1, 1],
        'O': [1, 0, 1, 0, 1, 0],
        'P': [1, 1, 1, 1, 0, 0],
        'Q': [1, 1, 1, 1, 1, 0],
        'R': [1, 1, 1, 0, 1, 0],
        'S': [0, 1, 1, 1, 0, 0],
        'T': [0, 1, 1, 1, 1, 0],
        'U': [1, 0, 1, 0, 0, 1],
        'V': [1, 1, 1, 0, 0, 1],
        'W': [0, 1, 0, 1, 1, 1],
        'X': [1, 0, 1, 1, 0, 1],
        'Y': [1, 0, 1, 1, 1, 1],
        'Z': [1, 0, 1, 0, 1, 1]
    },

    // Vowels with accents (Spanish)
    ACCENTED: {
        'Á': [1, 0, 0, 0, 0, 1],
        'É': [0, 1, 0, 1, 0, 1],
        'Í': [0, 0, 1, 1, 0, 0],
        'Ó': [0, 0, 1, 1, 1, 0],
        'Ú': [0, 0, 1, 1, 1, 1],
        'Ü': [1, 1, 0, 0, 1, 1]
    },

    // Numbers (preceded by number sign ⠼)
    NUMBERS: {
        '0': [0, 1, 0, 1, 1, 0], // Same as J
        '1': [1, 0, 0, 0, 0, 0], // Same as A
        '2': [1, 1, 0, 0, 0, 0], // Same as B
        '3': [1, 0, 0, 1, 0, 0], // Same as C
        '4': [1, 0, 0, 1, 1, 0], // Same as D
        '5': [1, 0, 0, 0, 1, 0], // Same as E
        '6': [1, 1, 0, 1, 0, 0], // Same as F
        '7': [1, 1, 0, 1, 1, 0], // Same as G
        '8': [1, 1, 0, 0, 1, 0], // Same as H
        '9': [0, 1, 0, 1, 0, 0]  // Same as I
    },

    // Number sign
    NUMBER_SIGN: [0, 0, 1, 1, 1, 1],

    // Punctuation
    PUNCTUATION: {
        '.': [0, 0, 1, 0, 0, 1],
        ',': [0, 1, 0, 0, 0, 0],
        ';': [0, 1, 1, 0, 0, 0],
        ':': [0, 1, 0, 0, 1, 0],
        '?': [0, 1, 0, 0, 0, 1],
        '!': [0, 1, 1, 0, 1, 0],
        '¿': [0, 0, 1, 0, 0, 1],
        '¡': [0, 0, 1, 1, 0, 1],
        '"': [0, 1, 1, 0, 0, 1],
        '(': [1, 1, 0, 0, 0, 1],
        ')': [0, 0, 1, 1, 0, 0],
        '-': [0, 0, 1, 0, 0, 1]
    },

    /**
     * Similar patterns for Pick activity distractors
     * Key: letter, Value: array of visually similar letters (1-2 dot difference)
     */
    SIMILAR_PATTERNS: {
        'A': ['B', 'C', 'E', 'K'],
        'B': ['A', 'F', 'H', 'L'],
        'C': ['A', 'D', 'F', 'I'],
        'D': ['C', 'E', 'G', 'N'],
        'E': ['A', 'D', 'H', 'O'],
        'F': ['B', 'C', 'G', 'P'],
        'G': ['D', 'F', 'H', 'Q'],
        'H': ['B', 'E', 'G', 'R'],
        'I': ['C', 'J', 'S', 'F'],
        'J': ['D', 'I', 'T', 'W'],
        'K': ['A', 'L', 'M', 'U'],
        'L': ['B', 'K', 'M', 'V'],
        'M': ['C', 'K', 'N', 'X'],
        'N': ['D', 'M', 'O', 'Y'],
        'O': ['E', 'N', 'R', 'Z'],
        'P': ['F', 'L', 'Q', 'V'],
        'Q': ['G', 'P', 'R', 'Y'],
        'R': ['H', 'O', 'Q', 'V'],
        'S': ['I', 'T', 'L', 'F'],
        'T': ['J', 'S', 'N', 'G'],
        'U': ['A', 'K', 'V', 'X'],
        'V': ['B', 'L', 'U', 'R'],
        'W': ['I', 'J', 'Y', 'T'],
        'X': ['C', 'M', 'U', 'Y'],
        'Y': ['D', 'N', 'X', 'Q'],
        'Z': ['E', 'O', 'U', 'Y']
    },

    /**
     * Get the Braille pattern for a character
     * @param {string} char - Single character
     * @returns {number[]} - Array of 6 values (0 or 1)
     */
    getPattern(char) {
        const upperChar = char.toUpperCase();
        return this.ALPHABET[upperChar] || 
               this.ACCENTED[upperChar] || 
               this.NUMBERS[upperChar] || 
               this.PUNCTUATION[upperChar] ||
               [0, 0, 0, 0, 0, 0];
    },

    /**
     * Get similar letters for distractors (Pick activity)
     * @param {string} letter - Target letter
     * @param {number} count - Number of distractors needed
     * @returns {string[]} - Array of distractor letters
     */
    getSimilarLetters(letter, count = 3) {
        const upperLetter = letter.toUpperCase();
        const similar = this.SIMILAR_PATTERNS[upperLetter] || [];
        
        // Shuffle and take required count
        const shuffled = [...similar].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, count);
    },

    /**
     * Calculate difference between two patterns
     * @param {number[]} pattern1 
     * @param {number[]} pattern2 
     * @returns {number} - Number of different dots
     */
    patternDifference(pattern1, pattern2) {
        let diff = 0;
        for (let i = 0; i < 6; i++) {
            if (pattern1[i] !== pattern2[i]) diff++;
        }
        return diff;
    },

    /**
     * Get dots that are active in a pattern
     * @param {number[]} pattern 
     * @returns {number[]} - Array of dot numbers (1-6)
     */
    getActiveDots(pattern) {
        const dots = [];
        for (let i = 0; i < 6; i++) {
            if (pattern[i] === 1) dots.push(i + 1);
        }
        return dots;
    },

    /**
     * Check if a pattern matches the target
     * @param {number[]} userPattern 
     * @param {number[]} targetPattern 
     * @returns {boolean}
     */
    patternsMatch(userPattern, targetPattern) {
        for (let i = 0; i < 6; i++) {
            if (userPattern[i] !== targetPattern[i]) return false;
        }
        return true;
    },

    /**
     * Get all letters as array
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
        return ['A', 'E', 'I', 'O', 'U'];
    },

    /**
     * Get consonants
     * @returns {string[]}
     */
    getConsonants() {
        return Object.keys(this.ALPHABET).filter(
            letter => !['A', 'E', 'I', 'O', 'U'].includes(letter)
        );
    }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BrailleData;
}
