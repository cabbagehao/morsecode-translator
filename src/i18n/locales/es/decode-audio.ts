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
    multiplier: "multiplicador"
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
    segments: "Segmentos de Señal"
  },
  
  instructions: {
    title: "Cómo Usar el Decodificador de Código Morse de Audio",
    step1: {
      title: "Subir Archivo de Audio",
      description: "Selecciona un archivo de audio que contenga señales de código Morse. Los formatos soportados incluyen MP3, WAV, M4A, AAC y OGG."
    },
    step2: {
      title: "Ajustar Configuración (Opcional)",
      description: "Ajusta finamente los parámetros de análisis basados en las características de tu audio. El rango de frecuencia y los umbrales de tiempo pueden impactar significativamente la precisión de detección."
    },
    step3: {
      title: "Procesamiento Automático", 
      description: "El sistema analiza automáticamente el audio usando procesamiento avanzado de señales para detectar patrones de código Morse y convertirlos a texto."
    },
    step4: {
      title: "Revisar Resultados",
      description: "Examina el código Morse detectado y el texto decodificado. Usa la puntuación de confianza para evaluar la precisión de la detección."
    },
    tips: {
      title: "Consejos para Mejores Resultados:",
      tip1: "Usar grabaciones de alta calidad con relación señal-ruido clara",
      tip2: "Asegurar frecuencia consistente a lo largo de la grabación",
      tip3: "Minimizar ruido de fondo e interferencia",
      tip4: "Ajustar rango de frecuencia para coincidir con las características de tu señal",
      tip5: "Afinar umbrales de tiempo para diferentes velocidades de transmisión"
    }
  },
  
  errors: {
    fileTooBig: "El tamaño del archivo excede el límite de 50MB",
    unsupportedFormat: "Formato de audio no soportado",
    processingError: "Error procesando archivo de audio",
    analysisError: "Error analizando señales de audio",
    uploadError: "Error subiendo archivo"
  }
};