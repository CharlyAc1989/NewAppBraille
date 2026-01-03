/**
 * Levels Data - Complete Educational Content Structure
 * 
 * 14 Capítulos (0-13)
 * Capítulos 0-6: GRATIS
 * Capítulos 7-13: PREMIUM
 */

const LevelsData = {
    chapters: [
        // ═══════════════════════════════════════════════════════════
        // 🟢 CAPÍTULO 0 — ORIENTACIÓN (GRATIS)
        // ═══════════════════════════════════════════════════════════
        {
            id: 'chapter-0',
            number: 0,
            title: 'Orientación',
            description: 'Introducción a la celda Braille y los 6 puntos.',
            isPremium: false,
            status: 'unlocked',
            lessons: [
                {
                    id: 'c0-l1',
                    title: 'La Celda Braille',
                    type: 'observe',
                    content: ['cell-intro'],
                    description: 'Conoce la estructura de 6 puntos'
                },
                {
                    id: 'c0-l2',
                    title: 'Puntos 1, 2, 3 (Izquierda)',
                    type: 'observe',
                    content: ['dots-left'],
                    description: 'Columna izquierda'
                },
                {
                    id: 'c0-l3',
                    title: 'Puntos 4, 5, 6 (Derecha)',
                    type: 'observe',
                    content: ['dots-right'],
                    description: 'Columna derecha'
                },
                {
                    id: 'c0-l4',
                    title: 'Practica los Puntos',
                    type: 'build',
                    content: ['dot-practice'],
                    description: 'Toca cada punto'
                }
            ]
        },

        // ═══════════════════════════════════════════════════════════
        // 🟢 CAPÍTULO 1 — VOCALES (GRATIS)
        // ═══════════════════════════════════════════════════════════
        {
            id: 'chapter-1',
            number: 1,
            title: 'Vocales',
            description: 'Aprende las vocales: a, e, i, o, u.',
            isPremium: false,
            status: 'locked',
            lessons: [
                {
                    id: 'c1-l1',
                    title: 'Vocales A, E, I',
                    type: 'build',
                    content: ['a', 'e', 'i'],
                    description: 'Construye las primeras vocales'
                },
                {
                    id: 'c1-l2',
                    title: 'Vocales O, U',
                    type: 'build',
                    content: ['o', 'u'],
                    description: 'Completa las vocales'
                },
                {
                    id: 'c1-l3',
                    title: 'Reconoce las Vocales',
                    type: 'pick',
                    content: ['a', 'e', 'i', 'o', 'u'],
                    description: 'Identifica cada vocal'
                },
                {
                    id: 'c1-l4',
                    title: 'Juego de Vocales',
                    type: 'games',
                    gameType: 'memory',
                    content: ['a', 'e', 'i', 'o', 'u'],
                    description: 'Refuerza tu memoria'
                }
            ]
        },

        // ═══════════════════════════════════════════════════════════
        // 🟢 CAPÍTULO 2 — CONSONANTES ÚTILES (GRATIS)
        // ═══════════════════════════════════════════════════════════
        {
            id: 'chapter-2',
            number: 2,
            title: 'Consonantes Útiles',
            description: 'Letras de uso frecuente para formar palabras.',
            isPremium: false,
            status: 'locked',
            lessons: [
                {
                    id: 'c2-l1',
                    title: 'Letras L, M, P',
                    type: 'build',
                    content: ['l', 'm', 'p'],
                    description: 'Consonantes básicas'
                },
                {
                    id: 'c2-l2',
                    title: 'Letras T, R, S',
                    type: 'build',
                    content: ['t', 'r', 's'],
                    description: 'Más consonantes útiles'
                },
                {
                    id: 'c2-l3',
                    title: 'Letras N, D',
                    type: 'build',
                    content: ['n', 'd'],
                    description: 'Completa el grupo'
                },
                {
                    id: 'c2-l4',
                    title: 'Palabras Simples',
                    type: 'words',
                    content: ['mama', 'papa', 'sol', 'sal'],
                    description: 'Tus primeras palabras'
                },
                {
                    id: 'c2-l5',
                    title: 'Más Palabras',
                    type: 'words',
                    content: ['mar', 'pan', 'oso', 'ama'],
                    description: 'Practica más palabras'
                },
                {
                    id: 'c2-l6',
                    title: 'Juego de Repaso',
                    type: 'games',
                    gameType: 'speed',
                    content: ['l', 'm', 'p', 't', 'r', 's', 'n', 'd'],
                    description: 'Pon a prueba tu velocidad'
                }
            ]
        },

        // ═══════════════════════════════════════════════════════════
        // 🟢 CAPÍTULO 3 — FAMILIAS BRAILLE (GRATIS)
        // ═══════════════════════════════════════════════════════════
        {
            id: 'chapter-3',
            number: 3,
            title: 'Familias Braille',
            description: 'Patrones relacionados y contrastes importantes.',
            isPremium: false,
            status: 'locked',
            lessons: [
                {
                    id: 'c3-l1',
                    title: 'Familia A-B-C',
                    type: 'build',
                    content: ['a', 'b', 'c'],
                    description: 'Primera familia'
                },
                {
                    id: 'c3-l2',
                    title: 'Reconoce A-B-C',
                    type: 'pick',
                    content: ['a', 'b', 'c'],
                    description: 'Identifica la familia'
                },
                {
                    id: 'c3-l3',
                    title: 'Familia D-E-F',
                    type: 'build',
                    content: ['d', 'e', 'f'],
                    description: 'Segunda familia'
                },
                {
                    id: 'c3-l4',
                    title: 'Reconoce D-E-F',
                    type: 'pick',
                    content: ['d', 'e', 'f'],
                    description: 'Identifica la familia'
                },
                {
                    id: 'c3-l5',
                    title: 'Familia G-H-I-J',
                    type: 'build',
                    content: ['g', 'h', 'i', 'j'],
                    description: 'Contraste I vs J'
                },
                {
                    id: 'c3-l6',
                    title: 'Contraste I vs J',
                    type: 'pick',
                    content: ['i', 'j'],
                    description: '⚠️ Confusión común'
                },
                {
                    id: 'c3-l7',
                    title: 'Palabras con Familias',
                    type: 'words',
                    content: ['iba', 'jefe', 'hijo', 'hija'],
                    description: 'Practica en contexto'
                }
            ]
        },

        // ═══════════════════════════════════════════════════════════
        // 🟢 CAPÍTULO 4 — EXPANSIÓN ALFABETO (GRATIS)
        // ═══════════════════════════════════════════════════════════
        {
            id: 'chapter-4',
            number: 4,
            title: 'Expansión Alfabeto',
            description: 'Completa las letras K a T.',
            isPremium: false,
            status: 'locked',
            lessons: [
                {
                    id: 'c4-l1',
                    title: 'Letras K-L-M',
                    type: 'build',
                    content: ['k', 'l', 'm'],
                    description: 'Tercera familia'
                },
                {
                    id: 'c4-l2',
                    title: 'Letras N-O-P',
                    type: 'build',
                    content: ['n', 'o', 'p'],
                    description: 'Cuarta familia'
                },
                {
                    id: 'c4-l3',
                    title: 'Reconoce K a P',
                    type: 'pick',
                    content: ['k', 'l', 'm', 'n', 'o', 'p'],
                    description: 'Identifica las letras'
                },
                {
                    id: 'c4-l4',
                    title: 'Letras Q-R-S-T',
                    type: 'build',
                    content: ['q', 'r', 's', 't'],
                    description: 'Quinta familia'
                },
                {
                    id: 'c4-l5',
                    title: 'Reconoce A a T',
                    type: 'pick',
                    content: ['a', 'e', 'i', 'o', 'u', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't'],
                    description: 'Repaso general'
                }
            ]
        },

        // ═══════════════════════════════════════════════════════════
        // 🟢 CAPÍTULO 5 — ALFABETO COMPLETO + Ñ (GRATIS)
        // ═══════════════════════════════════════════════════════════
        {
            id: 'chapter-5',
            number: 5,
            title: 'Alfabeto Completo',
            description: 'De la U a la Z, más la Ñ española.',
            isPremium: false,
            status: 'locked',
            lessons: [
                {
                    id: 'c5-l1',
                    title: 'Letras U-V-W',
                    type: 'build',
                    content: ['u', 'v', 'w'],
                    description: 'Sexta familia'
                },
                {
                    id: 'c5-l2',
                    title: 'Letras X-Y-Z-Ñ',
                    type: 'build',
                    content: ['x', 'y', 'z', 'ñ'],
                    description: 'Últimas letras + Ñ'
                },
                {
                    id: 'c5-l3',
                    title: 'Contraste N vs Ñ',
                    type: 'pick',
                    content: ['n', 'ñ'],
                    description: '⚠️ Confusión común'
                },
                {
                    id: 'c5-l4',
                    title: 'Alfabeto A-Z-Ñ',
                    type: 'build',
                    content: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
                    description: 'Todo el alfabeto'
                },
                {
                    id: 'c5-l5',
                    title: 'Reconoce Todo',
                    type: 'pick',
                    content: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
                    description: 'Domina el alfabeto'
                }
            ]
        },

        // ═══════════════════════════════════════════════════════════
        // 🟢 CAPÍTULO 6 — FLUIDEZ (GRATIS)
        // ═══════════════════════════════════════════════════════════
        {
            id: 'chapter-6',
            number: 6,
            title: 'Fluidez',
            description: 'Palabras mixtas y frases cortas.',
            isPremium: false,
            status: 'locked',
            lessons: [
                {
                    id: 'c6-l1',
                    title: 'Palabras Mixtas',
                    type: 'words',
                    content: ['libro', 'mesa', 'silla', 'agua'],
                    description: 'Objetos cotidianos'
                },
                {
                    id: 'c6-l2',
                    title: 'Más Palabras',
                    type: 'words',
                    content: ['perro', 'gato', 'casa', 'niño'],
                    description: 'Vocabulario común'
                },
                {
                    id: 'c6-l3',
                    title: 'Palabras con Ñ',
                    type: 'words',
                    content: ['niña', 'año', 'mañana', 'España'],
                    description: 'Practica la Ñ'
                },
                {
                    id: 'c6-l4',
                    title: 'Frases Cortas',
                    type: 'words',
                    content: ['hola', 'como', 'estas'],
                    description: 'Tu primera frase'
                },
                {
                    id: 'c6-l5',
                    title: 'Juego de Velocidad',
                    type: 'games',
                    gameType: 'speed',
                    content: ['a', 'e', 'i', 'o', 'u', 'l', 'm', 'n', 'p', 's'],
                    description: 'Reta tu velocidad'
                }
            ]
        },

        // ═══════════════════════════════════════════════════════════
        // 🟣 CAPÍTULO 7 — MAESTRÍA (PREMIUM)
        // ═══════════════════════════════════════════════════════════
        {
            id: 'chapter-7',
            number: 7,
            title: 'Maestría',
            description: 'Retos de velocidad y precisión.',
            isPremium: true,
            status: 'locked',
            lessons: [
                {
                    id: 'c7-l1',
                    title: 'Reto Velocidad',
                    type: 'build',
                    content: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't'],
                    timeLimit: 90,
                    description: '20 letras en 90 segundos'
                },
                {
                    id: 'c7-l2',
                    title: 'Reconocimiento Experto',
                    type: 'pick',
                    content: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
                    description: 'Velocidad máxima'
                },
                {
                    id: 'c7-l3',
                    title: 'Maestro del Braille',
                    type: 'build',
                    content: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
                    noHints: true,
                    description: 'Sin pistas disponibles'
                }
            ]
        },

        // ═══════════════════════════════════════════════════════════
        // 🟣 CAPÍTULO 8 — MAYÚSCULAS (PREMIUM)
        // ═══════════════════════════════════════════════════════════
        {
            id: 'chapter-8',
            number: 8,
            title: 'Mayúsculas',
            description: 'El signo de mayúscula y su uso.',
            isPremium: true,
            status: 'locked',
            lessons: [
                {
                    id: 'c8-l1',
                    title: 'Signo de Mayúscula',
                    type: 'observe',
                    content: ['uppercase-sign'],
                    description: 'Puntos 4,6'
                },
                {
                    id: 'c8-l2',
                    title: 'Construye el Signo',
                    type: 'build',
                    content: ['uppercase-sign'],
                    description: 'Practica el prefijo'
                },
                {
                    id: 'c8-l3',
                    title: 'Mayúsculas A-J',
                    type: 'build',
                    content: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
                    description: '2 celdas por letra'
                },
                {
                    id: 'c8-l4',
                    title: 'Reconoce Mayúsculas',
                    type: 'pick',
                    content: ['A', 'B', 'C', 'D', 'E'],
                    description: 'Identifica mayúsculas'
                },
                {
                    id: 'c8-l5',
                    title: 'Nombres Propios',
                    type: 'words',
                    content: ['Ana', 'Luis', 'Maria'],
                    description: 'Nombres con mayúscula'
                },
                {
                    id: 'c8-l6',
                    title: 'Siglas',
                    type: 'words',
                    content: ['ONU', 'USA'],
                    description: 'Todas mayúsculas'
                }
            ]
        },

        // ═══════════════════════════════════════════════════════════
        // 🟣 CAPÍTULO 9 — NÚMEROS (PREMIUM)
        // ═══════════════════════════════════════════════════════════
        {
            id: 'chapter-9',
            number: 9,
            title: 'Números',
            description: 'El signo numérico y los dígitos 0-9.',
            isPremium: true,
            status: 'locked',
            lessons: [
                {
                    id: 'c9-l1',
                    title: 'Signo Numérico',
                    type: 'observe',
                    content: ['number-sign'],
                    description: 'Puntos 3,4,5,6'
                },
                {
                    id: 'c9-l2',
                    title: 'Construye el Signo',
                    type: 'build',
                    content: ['number-sign'],
                    description: 'Practica el prefijo'
                },
                {
                    id: 'c9-l3',
                    title: 'Números 1-5',
                    type: 'build',
                    content: ['1', '2', '3', '4', '5'],
                    description: 'Primera mitad'
                },
                {
                    id: 'c9-l4',
                    title: 'Números 6-9, 0',
                    type: 'build',
                    content: ['6', '7', '8', '9', '0'],
                    description: 'Segunda mitad'
                },
                {
                    id: 'c9-l5',
                    title: 'Reconoce Números',
                    type: 'pick',
                    content: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
                    description: 'Identifica cada número'
                },
                {
                    id: 'c9-l6',
                    title: 'Números en Frases',
                    type: 'words',
                    content: ['123', '2024'],
                    description: 'Practica secuencias'
                }
            ]
        },

        // ═══════════════════════════════════════════════════════════
        // 🟣 CAPÍTULO 10 — PUNTUACIÓN (PREMIUM)
        // ═══════════════════════════════════════════════════════════
        {
            id: 'chapter-10',
            number: 10,
            title: 'Puntuación',
            description: 'Signos de puntuación básicos.',
            isPremium: true,
            status: 'locked',
            lessons: [
                {
                    id: 'c10-l1',
                    title: 'Punto y Coma',
                    type: 'observe',
                    content: ['.', ',', ';', ':'],
                    description: 'Puntuación básica'
                },
                {
                    id: 'c10-l2',
                    title: 'Construye Puntuación',
                    type: 'build',
                    content: ['.', ',', ';', ':'],
                    description: 'Practica los signos'
                },
                {
                    id: 'c10-l3',
                    title: 'Signos Españoles',
                    type: 'build',
                    content: ['¿', '?', '¡', '!'],
                    description: 'Interrogación y exclamación'
                },
                {
                    id: 'c10-l4',
                    title: 'Otros Signos',
                    type: 'build',
                    content: ['-', '"', "'"],
                    description: 'Guión, comillas, apóstrofo'
                },
                {
                    id: 'c10-l5',
                    title: 'Frases con Puntuación',
                    type: 'words',
                    content: ['¿hola?', '¡bien!'],
                    description: 'Practica en contexto'
                },
                {
                    id: 'c10-l6',
                    title: 'Reconoce Signos',
                    type: 'pick',
                    content: ['.', ',', '?', '!', '-', '"'],
                    description: 'Identifica puntuación'
                }
            ]
        },

        // ═══════════════════════════════════════════════════════════
        // 🟣 CAPÍTULO 11 — VOCALES CON TILDE (PREMIUM)
        // ═══════════════════════════════════════════════════════════
        {
            id: 'chapter-11',
            number: 11,
            title: 'Vocales con Tilde',
            description: 'Las vocales acentuadas: á, é, í, ó, ú.',
            isPremium: true,
            status: 'locked',
            lessons: [
                {
                    id: 'c11-l1',
                    title: 'Concepto de Tilde',
                    type: 'observe',
                    content: ['accent-concept'],
                    description: 'Vocales acentuadas'
                },
                {
                    id: 'c11-l2',
                    title: 'Construye Tildes',
                    type: 'build',
                    content: ['á', 'é', 'í', 'ó', 'ú'],
                    description: 'Cada tilde es única'
                },
                {
                    id: 'c11-l3',
                    title: 'Contraste A vs Á',
                    type: 'pick',
                    content: ['a', 'á', 'e', 'é', 'i', 'í', 'o', 'ó', 'u', 'ú'],
                    description: 'Sin tilde vs con tilde'
                },
                {
                    id: 'c11-l4',
                    title: 'Palabras con Tilde',
                    type: 'words',
                    content: ['mamá', 'papá', 'café', 'aquí'],
                    description: 'Vocabulario acentuado'
                },
                {
                    id: 'c11-l5',
                    title: 'Más Palabras',
                    type: 'words',
                    content: ['música', 'teléfono', 'rápido'],
                    description: 'Practica más'
                }
            ]
        },

        // ═══════════════════════════════════════════════════════════
        // 🟣 CAPÍTULO 12 — DIÉRESIS (PREMIUM)
        // ═══════════════════════════════════════════════════════════
        {
            id: 'chapter-12',
            number: 12,
            title: 'Diéresis (Ü)',
            description: 'La ü con diéresis.',
            isPremium: true,
            status: 'locked',
            lessons: [
                {
                    id: 'c12-l1',
                    title: 'La Diéresis',
                    type: 'observe',
                    content: ['ü'],
                    description: 'Concepto de ü'
                },
                {
                    id: 'c12-l2',
                    title: 'Construye Ü',
                    type: 'build',
                    content: ['ü'],
                    description: 'Practica la diéresis'
                },
                {
                    id: 'c12-l3',
                    title: 'Palabras con Ü',
                    type: 'words',
                    content: ['pingüino', 'vergüenza', 'bilingüe'],
                    description: 'Vocabulario con ü'
                }
            ]
        },

        // ═══════════════════════════════════════════════════════════
        // 🟣 CAPÍTULO 13 — SIGNOS MATEMÁTICOS Y DIGITALES (PREMIUM)
        // ═══════════════════════════════════════════════════════════
        {
            id: 'chapter-13',
            number: 13,
            title: 'Signos Digitales',
            description: 'Matemáticas y símbolos digitales.',
            isPremium: true,
            status: 'locked',
            lessons: [
                {
                    id: 'c13-l1',
                    title: 'Signos Matemáticos',
                    type: 'build',
                    content: ['+', '−', '×', '÷', '='],
                    description: 'Operaciones básicas'
                },
                {
                    id: 'c13-l2',
                    title: 'Operaciones',
                    type: 'words',
                    content: ['1+2=3', '5-3=2'],
                    description: 'Practica matemáticas'
                },
                {
                    id: 'c13-l3',
                    title: 'Signos Digitales',
                    type: 'build',
                    content: ['@', '%', '#'],
                    description: 'Email y porcentaje'
                },
                {
                    id: 'c13-l4',
                    title: 'Emails y URLs',
                    type: 'words',
                    content: ['hola@mail'],
                    description: 'Practica emails'
                }
            ]
        }
    ],

    // ═══════════════════════════════════════════════════════════
    // 📚 MÉTODOS AUXILIARES
    // ═══════════════════════════════════════════════════════════

    /**
     * Get chapter by ID
     */
    getChapter(id) {
        return this.chapters.find(ch => ch.id === id);
    },

    /**
     * Get chapter by number
     */
    getChapterByNumber(num) {
        return this.chapters.find(ch => ch.number === num);
    },

    /**
     * Get all free chapters
     */
    getFreeChapters() {
        return this.chapters.filter(ch => !ch.isPremium);
    },

    /**
     * Get all premium chapters
     */
    getPremiumChapters() {
        return this.chapters.filter(ch => ch.isPremium);
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
     * Calculate overall progress
     */
    getOverallProgress(completedLessons = []) {
        let total = 0;
        let completed = 0;

        this.chapters.forEach(chapter => {
            total += chapter.lessons.length;
            chapter.lessons.forEach(lesson => {
                if (completedLessons.includes(lesson.id)) {
                    completed++;
                }
            });
        });

        return Math.round((completed / total) * 100);
    },

    /**
     * Get next available lesson
     */
    getNextLesson(completedLessons = []) {
        for (const chapter of this.chapters) {
            for (const lesson of chapter.lessons) {
                if (!completedLessons.includes(lesson.id)) {
                    return { chapter, lesson };
                }
            }
        }
        return null;
    },

    /**
     * Check if chapter is accessible (not premium or user has premium)
     */
    isChapterAccessible(chapterId, hasPremium = false) {
        const chapter = this.getChapter(chapterId);
        if (!chapter) return false;
        return !chapter.isPremium || hasPremium;
    },

    /**
     * Get current chapter in progress
     * Based on user progress from AppState
     */
    getCurrentChapter() {
        // Try to get completed lessons from AppState
        let completedLessons = [];
        try {
            const progress = AppState?.getProgress?.()?.completedLessons || [];
            completedLessons = progress;
        } catch (e) {
            completedLessons = [];
        }

        // Find first chapter with incomplete lessons
        for (const chapter of this.chapters) {
            const hasIncompleteLessons = chapter.lessons.some(
                lesson => !completedLessons.includes(lesson.id)
            );
            if (hasIncompleteLessons) {
                return chapter;
            }
        }

        // All complete, return last chapter
        return this.chapters[this.chapters.length - 1];
    },

    /**
     * Get all chapters
     */
    getChapters() {
        return this.chapters;
    }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LevelsData;
}
