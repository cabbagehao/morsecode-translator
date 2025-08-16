export const decodeImage = {
  title: "Traductor de Código Morse de Imagen – decodificar foto, imagen",
  description: "Decodifica código Morse de imágenes usando tecnología OCR avanzada. Extrae puntos y rayas de fotos, documentos escaneados y señales visuales al instante.",
  
  mainHeading: "Decodificador de Código Morse de Imagen",
  subtitle: "Extrae código Morse de fotos e imágenes usando tecnología OCR avanzada",
  
  uploadSection: {
    title: "Subir Archivo de Imagen",
    dragAndDrop: "Haz clic para subir o arrastra y suelta",
    supportedFormats: "Soporta JPG, PNG, GIF, WebP y otros formatos de imagen (máx 10MB)",
    selectFile: "Seleccionar Archivo de Imagen",
    removeFile: "Eliminar archivo",
    processing: "Procesando imagen...",
    analyzing: "Analizando imagen..."
  },
  
  imagePreview: {
    show: "Mostrar vista previa de imagen",
    hide: "Ocultar vista previa de imagen",
    togglePreview: "Alternar vista previa de imagen"
  },
  
  processing: {
    status: "Estado de Procesamiento",
    ocrProcessing: "Procesamiento OCR...",
    extractingMorse: "Extrayendo patrones Morse...",
    analyzingText: "Analizando texto...",
    progress: "Progreso"
  },
  
  results: {
    title: "Resultados de Extracción", 
    extractedMorse: "Código Morse Extraído",
    decodedText: "Texto Decodificado",
    rawOcrText: "Texto OCR Crudo",
    showRawText: "Mostrar texto OCR crudo",
    hideRawText: "Ocultar texto OCR crudo",
    noResults: "No se detectó código Morse en la imagen",
    tryDifferent: "Prueba una imagen diferente o ajusta la calidad de la imagen",
    copyMorse: "Copiar código Morse",
    downloadMorse: "Descargar código Morse", 
    copyText: "Copiar texto decodificado",
    downloadText: "Descargar texto decodificado",
    downloadOptions: "Opciones de descarga",
    copiedToClipboard: "¡Copiado al portapapeles!"
  },
  
  manualInput: {
    title: "Entrada Manual de Código Morse",
    description: "Si OCR no detectó correctamente, puedes ingresar manualmente el código Morse:",
    placeholder: "Ingresa código Morse manualmente (puntos y rayas)",
    showInput: "Mostrar entrada manual",
    hideInput: "Ocultar entrada manual",
    process: "Procesar Entrada Manual"
  },
  
  aiAssistant: {
    title: "Análisis de Asistente IA",
    description: "Usa IA para ayudar a extraer patrones de código Morse que OCR podría perderse:",
    analyze: "Analizar con IA",
    analyzing: "La IA está analizando la imagen...", 
    showOutput: "Mostrar análisis de IA",
    hideOutput: "Ocultar análisis de IA",
    error: "El análisis de IA falló. Por favor intenta de nuevo más tarde."
  },
  
  instructions: {
    title: "Cómo Usar el Decodificador de Código Morse de Imagen",
    step1: {
      title: "Subir Imagen",
      description: "Selecciona una imagen clara que contenga patrones de código Morse. Mejores resultados con imágenes de alto contraste."
    },
    step2: {
      title: "Procesamiento OCR Automático",
      description: "El sistema escanea automáticamente la imagen usando tecnología OCR para detectar patrones de texto."
    },
    step3: {
      title: "Extracción de Código Morse", 
      description: "Algoritmos avanzados identifican y extraen patrones de código Morse del texto detectado."
    },
    step4: {
      title: "Revisar y Descargar",
      description: "Revisa el código Morse extraído y el texto decodificado. Descarga resultados o copia al portapapeles."
    },
    tips: {
      title: "Consejos para Mejores Resultados:",
      tip1: "Usar imágenes de alto contraste con puntos y rayas claros",
      tip2: "Asegurar iluminación y enfoque apropiados en fotografías",
      tip3: "Evitar imágenes muy comprimidas o de baja resolución",
      tip4: "Probar el asistente IA para patrones complejos o poco claros",
      tip5: "Usar entrada manual si los resultados de OCR son inexactos"
    }
  },
  
  errors: {
    fileTooBig: "El tamaño del archivo excede el límite de 10MB",
    unsupportedFormat: "Formato de imagen no soportado",
    processingError: "Error procesando archivo de imagen",
    ocrError: "Procesamiento OCR falló",
    uploadError: "Error subiendo archivo",
    aiError: "Análisis de IA falló"
  }
};