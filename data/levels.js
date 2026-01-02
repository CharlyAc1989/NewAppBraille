/**
 * Levels Data - Chapter and lesson structure
 */

const LevelsData = {
    chapters: [
        {
            id: 'basics',
            title: 'Capítulo 1: Básicos',
            description: 'Introducción al sistema Braille y puntos.',
            status: 'completed',
            lessons: [
                {
                    id: 'intro',
                    title: 'Introducción al Braille',
                    type: 'observe',
                    content: ['A', 'B', 'C']
                },
                {
                    id: 'first-dots',
                    title: 'Primeros puntos',
                    type: 'build',
                    content: ['A', 'B', 'C']
                },
                {
                    id: 'recognize-abc',
                    title: 'Reconoce A, B, C',
                    type: 'pick',
                    content: ['A', 'B', 'C']
                }
            ]
        },
        {
            id: 'vowels',
            title: 'Capítulo 2: Vocales',
            description: 'Letras a, e, i, o, u acentuadas.',
            status: 'completed',
            lessons: [
                {
                    id: 'learn-vowels',
                    title: 'Aprende las vocales',
                    type: 'observe',
                    content: ['A', 'E', 'I', 'O', 'U']
                },
                {
                    id: 'build-vowels',
                    title: 'Construye vocales',
                    type: 'build',
                    content: ['A', 'E', 'I', 'O', 'U']
                },
                {
                    id: 'pick-vowels',
                    title: 'Identifica vocales',
                    type: 'pick',
                    content: ['A', 'E', 'I', 'O', 'U']
                },
                {
                    id: 'vowel-words',
                    title: 'Palabras con vocales',
                    type: 'words',
                    content: ['ALA', 'OJO', 'UNO']
                }
            ]
        },
        {
            id: 'consonants',
            title: 'Capítulo 3: Consonantes',
            description: 'Aprende las letras B, C, D, F, G... con ejercicios táctiles.',
            status: 'in-progress',
            progress: '3/15 Lecciones',
            lessons: [
                {
                    id: 'consonants-1',
                    title: 'Consonantes B, C, D',
                    type: 'observe',
                    content: ['B', 'C', 'D']
                },
                {
                    id: 'build-bcd',
                    title: 'Construye B, C, D',
                    type: 'build',
                    content: ['B', 'C', 'D']
                },
                {
                    id: 'pick-bcd',
                    title: 'Identifica B, C, D',
                    type: 'pick',
                    content: ['B', 'C', 'D']
                },
                {
                    id: 'consonants-2',
                    title: 'Consonantes F, G, H',
                    type: 'observe',
                    content: ['F', 'G', 'H']
                },
                {
                    id: 'build-fgh',
                    title: 'Construye F, G, H',
                    type: 'build',
                    content: ['F', 'G', 'H']
                },
                {
                    id: 'consonants-3',
                    title: 'Consonantes J, K, L',
                    type: 'observe',
                    content: ['J', 'K', 'L']
                },
                {
                    id: 'consonants-4',
                    title: 'Consonantes M, N, Ñ',
                    type: 'observe',
                    content: ['M', 'N', 'Ñ']
                },
                {
                    id: 'consonants-5',
                    title: 'Consonantes P, Q, R',
                    type: 'observe',
                    content: ['P', 'Q', 'R']
                },
                {
                    id: 'consonants-6',
                    title: 'Consonantes S, T',
                    type: 'observe',
                    content: ['S', 'T']
                },
                {
                    id: 'consonants-7',
                    title: 'Consonantes V, W, X',
                    type: 'observe',
                    content: ['V', 'W', 'X']
                },
                {
                    id: 'consonants-8',
                    title: 'Consonantes Y, Z',
                    type: 'observe',
                    content: ['Y', 'Z']
                },
                {
                    id: 'all-consonants-build',
                    title: 'Practica todas',
                    type: 'build',
                    content: ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z']
                },
                {
                    id: 'consonants-words',
                    title: 'Palabras simples',
                    type: 'words',
                    content: ['SOL', 'LUZ', 'PAZ', 'MAR']
                },
                {
                    id: 'consonants-game',
                    title: 'Juego de consonantes',
                    type: 'games',
                    content: ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T']
                },
                {
                    id: 'consonants-review',
                    title: 'Repaso final',
                    type: 'pick',
                    content: ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z']
                }
            ]
        },
        {
            id: 'numbers',
            title: 'Capítulo 4: Números',
            description: 'Signo numérico y dígitos 1-0.',
            status: 'locked',
            lessons: [
                {
                    id: 'number-sign',
                    title: 'El signo numérico',
                    type: 'observe',
                    content: ['#']
                },
                {
                    id: 'numbers-1-5',
                    title: 'Números 1-5',
                    type: 'observe',
                    content: ['1', '2', '3', '4', '5']
                },
                {
                    id: 'numbers-6-0',
                    title: 'Números 6-0',
                    type: 'observe',
                    content: ['6', '7', '8', '9', '0']
                },
                {
                    id: 'build-numbers',
                    title: 'Construye números',
                    type: 'build',
                    content: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
                },
                {
                    id: 'pick-numbers',
                    title: 'Identifica números',
                    type: 'pick',
                    content: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
                }
            ]
        },
        {
            id: 'punctuation',
            title: 'Capítulo 5: Puntuación',
            description: 'Comas, puntos y signos básicos.',
            status: 'locked',
            lessons: [
                {
                    id: 'basic-punctuation',
                    title: 'Puntuación básica',
                    type: 'observe',
                    content: ['.', ',', '?', '!']
                },
                {
                    id: 'spanish-punctuation',
                    title: 'Signos españoles',
                    type: 'observe',
                    content: ['¿', '¡']
                },
                {
                    id: 'build-punctuation',
                    title: 'Construye signos',
                    type: 'build',
                    content: ['.', ',', '?', '!', '¿', '¡']
                }
            ]
        }
    ],

    /**
     * Get chapter by ID
     */
    getChapter(id) {
        return this.chapters.find(ch => ch.id === id);
    },

    /**
     * Get current chapter (in-progress)
     */
    getCurrentChapter() {
        return this.chapters.find(ch => ch.status === 'in-progress');
    },

    /**
     * Get lesson by chapter and lesson ID
     */
    getLesson(chapterId, lessonId) {
        const chapter = this.getChapter(chapterId);
        if (!chapter) return null;
        return chapter.lessons.find(l => l.id === lessonId);
    },

    /**
     * Calculate overall progress percentage
     */
    getOverallProgress() {
        let completed = 0;
        let total = 0;

        this.chapters.forEach(chapter => {
            total += chapter.lessons.length;
            if (chapter.status === 'completed') {
                completed += chapter.lessons.length;
            } else if (chapter.status === 'in-progress' && chapter.progress) {
                const match = chapter.progress.match(/(\d+)\/(\d+)/);
                if (match) {
                    completed += parseInt(match[1]);
                }
            }
        });

        return Math.round((completed / total) * 100);
    },

    /**
     * Get next lesson to continue
     */
    getNextLesson() {
        const currentChapter = this.getCurrentChapter();
        if (!currentChapter) return null;

        // Find lesson index from progress
        if (currentChapter.progress) {
            const match = currentChapter.progress.match(/(\d+)\/(\d+)/);
            if (match) {
                const currentIndex = parseInt(match[1]);
                if (currentIndex < currentChapter.lessons.length) {
                    return {
                        chapter: currentChapter,
                        lesson: currentChapter.lessons[currentIndex]
                    };
                }
            }
        }

        return {
            chapter: currentChapter,
            lesson: currentChapter.lessons[0]
        };
    }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LevelsData;
}
