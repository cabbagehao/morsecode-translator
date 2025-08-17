export const decodeAudio = {
  title: "Traductor de Código Morse de Audio: Extraer Señales de Archivo de Sonido",
  description: "Decodifica código Morse de archivos de audio con procesamiento avanzado de señales. Sube grabaciones, detecta pitidos y tonos, convierte a texto automáticamente.",
  
  mainHeading: "Decodificador de Código Morse de Audio",
  subtitle: "Extrae código Morse de grabaciones de audio usando procesamiento avanzado de señales",
  
  uploadSection: {
    title: "Subir Archivo de Audio",
    dragAndDrop: "Arrastra y suelta tu archivo de audio aquí, o haz clic para navegar",
    supportedFormats: "Formatos soportados: MP3, WAV, M4A, AAC, OGG",
    maxFileSize: "Tamaño máximo de archivo: 50MB",
    selectFile: "Seleccionar Archivo de Audio",
    removeFile: "Eliminar archivo",
    processing: "Procesando...",
    analyzing: "Analizando audio..."
  },
  
  audioPlayer: {
    play: "Reproducir",
    pause: "Pausar", 
    stop: "Detener",
    volume: "Volumen",
    currentTime: "Tiempo actual",
    duration: "Duración"
  },
  
  analysisSettings: {
    title: "Configuración de Análisis",
    showSettings: "Mostrar Configuración",
    hideSettings: "Ocultar Configuración",
    minFrequency: "Frecuencia Mínima",
    maxFrequency: "Frecuencia Máxima",
    dotThreshold: "Umbral de Punto",
    dashThreshold: "Umbral de Raya",
    silenceThreshold: "Umbral de Silencio", 
    noiseFloor: "Piso de Ruido",
    charSeparation: "Separación de Caracteres",
    wordSeparation: "Separación de Palabras",
    autoAddSpaces: "Agregar Espacios Automáticamente",
    hz: "Hz",
    seconds: "segundos",
    db: "dB",
    multiplier: "multiplicador",
    processing: {
      detectingSignalPatterns: "Detectando patrones de señal...",
      calculatingOptimalParameters: "Calculando parámetros óptimos...",
      noClearSignalsDetected: "No se detectaron señales claras",
      analysisComplete: "Análisis completo",
      preAnalysisFailed: "Pre-análisis falló"
    },
    presets: {
      fastMorse: "Morse Rápido",
      standard: "Estándar",
      slowMorse: "Morse Lento"
    },
    labels: {
      noiseFloorDb: "Piso de Ruido (dB)",
      charSeparationMultiplier: "Multiplicador de Separación de Caracteres",
      wordSeparationMultiplier: "Multiplicador de Separación de Palabras"
    }
  },
  
  results: {
    title: "Resultados del Análisis",
    detectedMorse: "Código Morse Detectado",
    decodedText: "Texto Decodificado",
    confidence: "Confianza",
    noResults: "No se detectó código Morse en el archivo de audio",
    tryAdjusting: "Intenta ajustar la configuración de análisis para mejores resultados",
    copyMorse: "Copiar código Morse",
    downloadMorse: "Descargar código Morse",
    copyText: "Copiar texto decodificado", 
    downloadText: "Descargar texto decodificado",
    copiedToClipboard: "¡Copiado al portapapeles!",
    segments: "Segmentos de Señal",
    total: "Total",
    dots: "Puntos",
    dashes: "Rayas",
    spacesDetected: "Espacios Detectados",
    recognitionNotAccurate: "¿El reconocimiento no es preciso?",
    helpImproveMessage: "Ayúdanos a mejorar enviando comentarios sobre los resultados de audio.",
    sendFeedback: "Enviar Comentarios"
  },
  
  instructions: {
    title: "Cómo Usar el Decodificador de Código Morse de Audio",
    steps: [
      {
        number: "1",
        text: "Sube tu archivo de audio (MP3, WAV, M4A soportados) usando arrastrar y soltar o selección de archivos"
      },
      {
        number: "2",
        text: "Ajusta el rango de frecuencia y configuraciones de tiempo para coincidir con las características de tu grabación"
      },
      {
        number: "3",
        text: "Haz clic en 'Analizar Código Morse' para procesar el audio y extraer patrones morse"
      },
      {
        number: "4",
        text: "Revisa los resultados de código morse detectado y texto decodificado con puntuaciones de confianza"
      }
    ],
    tips: {
      title: "Consejos para Mejores Resultados:",
      tip1: "Usar grabaciones de alta calidad con relación señal-ruido clara",
      tip2: "Asegurar frecuencia consistente a lo largo de la grabación",
      tip3: "Minimizar ruido de fondo e interferencia",
      tip4: "Ajustar rango de frecuencia para coincidir con las características de tu señal",
      tip5: "Afinar umbrales de tiempo para diferentes velocidades de transmisión",
      tip6: "Si la configuración automática no es óptima, ajusta los parámetros manualmente"
    },
    userActions: {
      clickAnalyzeMorseCode: "Haz clic en 'Analizar Código Morse' para procesar el audio"
    }
  },
  
  errors: {
    fileTooBig: "El tamaño del archivo excede el límite de 50MB",
    unsupportedFormat: "Formato de audio no soportado",
    processingError: "Error procesando archivo de audio",
    analysisError: "Error analizando señales de audio",
    uploadError: "Error subiendo archivo"
  },
  
  seoContent: {
    professionalTechnology: {
      title: "Tecnología Profesional de Descifrado de Código Morse Basada en Audio",
      description: "Nuestro sistema avanzado de **decodificador de audio morse** utiliza algoritmos sofisticados de procesamiento de señales de audio para detectar, analizar y decodificar automáticamente patrones de código Morse de archivos de audio grabados. Esta tecnología de vanguardia de **descifrado de código Morse** transforma señales de audio en texto legible, convirtiéndolo en una herramienta invaluable para operadores de radio aficionados, especialistas en comunicaciones de emergencia y entusiastas del procesamiento de señales digitales.",
      mainTranslatorLink: "Para conversión básica de texto, prueba nuestro <a href=\"/\" className=\"text-blue-600 dark:text-blue-400 hover:underline\">traductor de código morse</a> principal.",
      
      advancedProcessing: {
        title: "Procesamiento de Audio Avanzado:",
        items: [
          "Análisis de frecuencia en tiempo real y detección de tonos",
          "Filtrado adaptativo de ruido y mejora de señales",
          "Calibración automática de temporización para velocidades variables",
          "Soporte para archivos de audio multiformato (MP3, WAV, M4A)",
          "Ajuste dinámico de umbrales para precisión óptima"
        ]
      },
      
      professionalUseCases: {
        title: "Casos de Uso Profesionales:",
        items: [
          "Análisis y documentación de comunicaciones de emergencia",
          "Transcripción de grabaciones de concursos de radio aficionados",
          "Digitalización de archivos de audio históricos",
          "Preparación y evaluación de materiales de entrenamiento",
          "Investigación de comunicaciones marítimas y de aviación"
        ]
      },
      
      conclusion: "Ya sea que estés descifrando grabaciones de radio vintage, analizando transmisiones de emergencia o procesando materiales de entrenamiento, nuestro descifrador de código Morse basado en audio proporciona la precisión y confiabilidad necesarias para aplicaciones profesionales."
    }
  },
  
  relatedTools: {
    title: "Herramientas Relacionadas de Audio de Código Morse",
    soundPlayer: {
      title: "🔊 Reproductor de Sonidos de Código Morse",
      description: "Experimenta sonidos auténticos de pitidos de código morse y efectos de audio. Escucha señales SOS, descarga archivos de sonido y aprende cómo suena el código morse.",
      linkText: "Probar Reproductor de Sonidos →"
    },
    mainTranslator: {
      title: "📱 Traductor Principal",
      description: "Convierte texto a código morse y viceversa con nuestra herramienta de traducción principal que incluye reproducción de audio y patrones de flash visual.",
      linkText: "Ir al Traductor →"
    }
  }
};