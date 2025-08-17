import { esBasicAndTips } from './basic-and-tips';
import { esLearn } from './learn';
import { esHistory } from './history';
import { esSheet } from './sheet';
import { esCommonWords } from './common-words';
import { esCommonPhrases } from './common-phrases';
import { esCommonAbbr } from './common-abbr';
import { esMorseCodeSheet } from './morse-code-sheet';
import { esMorseCodeAlphabet } from './morse-code-alphabet';
import { esMorseCodeNumbers } from './morse-code-numbers';
import { decodeText } from './decode-text';
import { decodeAudio } from './decode-audio';
import { decodeImage } from './decode-image';
import { txtToMorse } from './txt-to-morse';

export const es = {
  site: {
    name: "Traductor de Código Morse",
    title: "Traductor de Código Morse - Texto, Sonido, Imagen y Audio",
    description: "Traductor gratuito de código morse con decodificación de imagen y audio. Convierte texto a morse, extrae de imágenes, reproduce sonido, flash de luz y descarga audio al instante."
  },
  nav: {
    translator: "Traductor",
    learn: "Aprender",
    sheet: "Tabla", 
    decoders: "Decodificadores",
    shop: "Tienda",
    learnSubItems: {
      basicAndTips: "Básico y Consejos",
      history: "Historia"
    },
    sheetSubItems: {
      morseCodeSheet: "Tabla de Código Morse",
      commonAbbr: "Abrev. Comunes",
      commonWords: "Palabras Comunes",
      commonPhrases: "Frases Comunes",
      morseCodeAlphabet: "Alfabeto Código Morse",
      morseCodeNumbers: "Números Código Morse"
    },
    decodersSubItems: {
      decodeText: "Decodificar Texto",
      decodeImage: "Decodificar Imagen",
      decodeAudio: "Decodificar Audio",
      textToMorse: "Texto a Morse"
    }
  },
  home: {
    title: "Traductor de Código Morse",
    subtitle: "Traduce Morse a Español y Español a Código Morse al Instante",
    textLabel: "Texto",
    morseLabel: "Código Morse",
    quickStart: {
      title: "Guía de Inicio Rápido - Usa el traductor de código morse en segundos",
      description: "Comienza inmediatamente con nuestro traductor de código morse intuitivo. Ya sea que necesites convertir frases en español como \"hola en código morse\" o decodificar señales de emergencia recibidas a largas distancias, nuestra interfaz simplificada asegura resultados instantáneos con precisión profesional siguiendo el sistema original de Samuel Morse.",
      step1: {
        title: "Escribe tu Mensaje",
        description: "Ingresa cualquier texto en español o código morse directamente en las cajas del traductor morse"
      },
      step2: {
        title: "Traducción Instantánea", 
        description: "Observa como cada carácter morse aparece instantáneamente con puntos (•) y rayas (-)"
      },
      step3: {
        title: "Escucha y Aprende",
        description: "Usa la reproducción de audio o patrones de luz intermitente para experimentar señales eléctricas auténticas"
      }
    },
    features: {
      title: "Características Avanzadas - Más allá del Convertidor de Código Morse Basado en Texto",
      description: "Experimenta tecnología de conversión de código morse de vanguardia que se extiende mucho más allá de la traducción simple de texto. Nuestra plataforma integral integra estándares tradicionales de Código Morse Internacional con capacidades de reconocimiento impulsadas por IA moderna, admitiendo métodos de entrada diversos desde imágenes hasta archivos de audio mientras mantiene compatibilidad perfecta con protocolos telegráficos históricos.",
      imageProcessing: {
        title: "Procesamiento Inteligente de Imágenes",
        description: "Sube fotos que contengan patrones morse y extrae texto usando nuestro decodificador de imágenes de código morse"
      },
      audioAnalysis: {
        title: "Análisis de Señales de Audio", 
        description: "Decodifica código morse de grabaciones de audio con nuestro traductor inteligente de audio de código morse"
      },
      batchProcessing: {
        title: "Procesamiento de Archivos en Lote",
        description: "Maneja archivos de texto grandes con nuestro codificador archivo-a-morse y herramientas decodificadoras de texto"
      },
      visualSignal: {
        title: "Simulación de Señales Visuales",
        description: "Experimenta patrones auténticos de luz intermitente que replican señales eléctricas telegráficas tradicionales"
      },
      errorResistant: {
        title: "Traducción Resistente a Errores",
        description: "Manejo inteligente de caracteres que no pueden ser traducidos con sugerencias útiles y alternativas"
      },
      multiLanguage: {
        title: "Soporte Multiidioma",
        description: "Convierte español y otros idiomas usando el alfabeto morse completo con soporte de caracteres internacionales"
      }
    },
    technical: {
      title: "¿Cómo funciona nuestro traductor de código morse?",
      description: "Nuestra plataforma integral emplea múltiples tecnologías sofisticadas para manejar diversas aplicaciones de código morse. Desde traducción de texto tradicional hasta reconocimiento de imágenes impulsado por IA de vanguardia, cada herramienta utiliza algoritmos especializados diseñados para máxima precisión a través de diferentes métodos de entrada y escenarios de comunicación a largas distancias.",
      engine: {
        title: "Motor de Mapeo de Caracteres en Tiempo Real",
        description: "Cada carácter morse se mapea usando el sistema estándar establecido por Samuel Morse, convirtiendo el texto de entrada en secuencias punto-raya de código morse con intervalos de tiempo auténticos"
      },
      ocr: {
        title: "Reconocimiento Avanzado de Patrones OCR", 
        description: "Nuestro traductor de imágenes de código morse usa aprendizaje automático para detectar patrones morse de fotografías y convertir el código morse al español."
      },
      dsp: {
        title: "Procesamiento Digital de Señales",
        description: "El traductor de audio de código morse emplea análisis de frecuencia para interpretar señales eléctricas de varias fuentes de sonido, detectando patrones de tiempo precisos"
      },
      education: {
        title: "Gestión de Contenido Educativo",
        description: "Nuestro sistema de referencia y plataforma de aprendizaje proporcionan entrenamiento estructurado del alfabeto morse y contexto histórico"
      }
    },
    training: {
      title: "Recursos de Entrenamiento Profesional - De Principiante a Experto", 
      description: "Domina la comunicación morse a través de nuestro entorno de aprendizaje estructurado diseñado para todos los niveles de habilidad. Ya sea que estés estudiando para certificación de radio amateur, explorando métodos telegráficos históricos, o desarrollando habilidades de comunicación de emergencia, nuestros recursos educativos proporcionan entrenamiento integral tanto en teoría como en aplicación práctica de principios de código morse.",
      modules: {
        title: "Módulos de Aprendizaje Estructurado:",
        alphabet: "Referencia completa del alfabeto morse con gráficos imprimibles y guías de tiempo",
        vocabulary: "Construcción progresiva de habilidades a través de vocabulario esencial y frases de comunicación", 
        abbreviations: "Abreviaciones profesionales y proseñales usadas en comunicaciones de radio",
        audio: "Entrenamiento de audio interactivo con velocidades ajustables y retroalimentación visual a través de indicadores de luz intermitente"
      },
      applications: {
        title: "Aplicaciones del Mundo Real:",
        ham: "Preparación para examen de licencia de radio amateur (HAM) y procedimientos operativos",
        emergency: "Protocolos de comunicación de emergencia marítima y de aviación para aplicaciones de seguridad",
        historical: "Operación telegráfica histórica y comprensión de señales eléctricas en redes de comunicación", 
        stem: "Aplicaciones educativas STEM para enseñar resolución de problemas y habilidades de reconocimiento de patrones"
      },
      popular: "Temas de Aprendizaje Populares: Los estudiantes frecuentemente exploran la codificación de mensajes románticos como \"te amo en código morse\", señales de emergencia como \"SOS código morse\", y frases prácticas como \"hola mundo código morse\". Nuestra plataforma acomoda todos los niveles de habilidad mientras proporciona orientación para caracteres que no pueden ser traducidos, asegurando dominio integral del alfabeto morse."
    }
  },
  instructions: {
    title: "Cómo Usar el Traductor de Código Morse",
    step1: {
      title: "Traducción de Texto a Código Morse",
      description: "Escribe o pega cualquier texto en la caja de entrada superior, o haz clic en el botón aleatorio (🔀). Soportamos letras, números y puntuación."
    },
    step2: {
      title: "Decodificación de Código Morse a Texto",
      description: "Ingresa código morse en la caja inferior usando puntos (.) y rayas (-). Separa las letras con espacios y las palabras con barras diagonales (/)."
    },
    step3: {
      title: "Reproducción de Audio y Entrenamiento",
      description: "Haz clic en el botón de reproducción para escuchar tu código morse con señales de audio auténticas. Ajusta la velocidad de reproducción, frecuencia y WPM."
    },
    step4: {
      title: "Indicador de Luz Visual",
      description: "Observa el indicador de luz visual parpadear en sincronía con la reproducción de audio. Perfecto para aprender el ritmo y tiempo de las señales de código morse."
    },
    step5: {
      title: "Opciones de Descarga y Exportación",
      description: "Descarga tus conversiones como archivos de texto o exporta código morse como archivos de audio (WAV/MP3) para práctica offline y compartir."
    },
    step6: {
      title: "Configuraciones Profesionales",
      description: "Accede a configuraciones avanzadas de audio para personalizar frecuencia (200-1000 Hz), velocidad de reproducción y WPM para estándares de entrenamiento profesional."
    },
    tips: {
      title: "💡 Consejos Pro para Mejores Resultados:",
      tip1: "Creador de Código Morse: usa el botón verde generador de código morse para crear frases aleatorias",
      tip2: "Usa el botón de copiar para compartir texto rápidamente",
      tip3: "Alterna separadores de barra diagonal para diferentes estilos de formato",
      tip4: "Practica con modo de repetición para desarrollo de habilidades",
      tip5: "Conteo de caracteres en tiempo real para seguimiento de mensajes",
      tip6: "Soporta alfabeto completo, números y puntuación",
      tip7: "Perfecto para radio amateur y comunicaciones de emergencia"
    }
  },
  basicAndTips: esBasicAndTips,
  learn: esLearn,
  history: esHistory,
  sheet: esSheet,
  commonWords: esCommonWords,
  commonPhrases: esCommonPhrases,
  commonAbbr: esCommonAbbr,
  morseCodeSheet: esMorseCodeSheet,
  morseCodeAlphabet: esMorseCodeAlphabet,
  morseCodeNumbers: esMorseCodeNumbers,
  decodeText: decodeText,
  decodeAudio: decodeAudio,
  decodeImage: decodeImage,
  txtToMorse: txtToMorse
};