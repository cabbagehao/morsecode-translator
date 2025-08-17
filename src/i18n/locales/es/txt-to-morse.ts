export const txtToMorse = {
  title: "Traductor de Archivo de Texto a Código Morse – Convertir archivo de texto a morse",
  description: "Convierte archivos de texto a código Morse con reproducción de audio, flash visual y opciones de descarga. Procesamiento por lotes para documentos con generación de sonido.",
  
  mainHeading: "Conversor de Archivo de Texto a Código Morse",
  subtitle: "Sube archivos de texto y conviértelos a código Morse con reproducción de audio y opciones de descarga",
  
  uploadSection: {
    title: "Subir Archivo de Texto",
    dragAndDrop: "Arrastra y suelta un archivo de texto aquí, o haz clic para seleccionar",
    supportedFormats: "Soporta TXT y otros formatos de texto (Máx 5MB)",
    selectFile: "Seleccionar Archivo de Texto",
    removeFile: "Eliminar archivo",
    removing: "Eliminando...",
    processing: "Procesando archivo...",
    analyzing: "Analizando texto..."
  },
  
  fileInfo: {
    fileName: "Nombre del Archivo",
    fileSize: "Tamaño del Archivo",
    wordsCount: "Palabras",
    charactersCount: "Caracteres"
  },
  
  controls: {
    playMorse: "Reproducir Código Morse",
    pause: "Pausar",
    resume: "Reanudar",
    preparingAudio: "Preparando audio...",
    repeatMode: "Modo Repetir",
    repeatModeOn: "Modo Repetir Activado",
    repeatModeOff: "Modo Repetir Desactivado",
    audioSettings: "Configuración de Audio",
    copyToClipboard: "Copiar al portapapeles",
    downloadOptions: "Opciones de descarga",
    copiedToClipboard: "¡Copiado al portapapeles!"
  },
  
  results: {
    title: "Resultados de Conversión",
    originalText: "Texto Original",
    morseCode: "Código Morse",
    downloadText: "Descargar Texto (.txt)",
    downloadMorse: "Descargar Morse (.txt)",
    downloadAudio: "Descargar Audio (.wav)",
    noContent: "No hay contenido para mostrar",
    processingComplete: "¡Procesamiento completado!"
  },
  
  instructions: {
    title: "Cómo Usar el Conversor de Archivo de Texto a Morse",
    step1: {
      title: "Subir Archivo de Texto",
      description: "Selecciona un archivo de texto (formato .txt recomendado) que contenga el contenido que quieres convertir a código Morse."
    },
    step2: {
      title: "Conversión Automática",
      description: "El sistema convierte automáticamente tu texto a código Morse y proporciona capacidades de reproducción de audio."
    },
    step3: {
      title: "Reproducción de Audio",
      description: "Escucha el código Morse con configuración de audio personalizable incluyendo frecuencia, velocidad y modo repetir."
    },
    step4: {
      title: "Descargar Resultados",
      description: "Descarga el texto original, código Morse o archivo de audio generado para uso offline y compartir."
    },
    tips: {
      title: "Consejos para Mejores Resultados:",
      tip1: "Usar archivos de texto plano para mejor compatibilidad",
      tip2: "Mantener el tamaño del archivo bajo 5MB para rendimiento óptimo",
      tip3: "Ajustar configuración de audio para escucha cómoda",
      tip4: "Usar modo repetir para práctica de código Morse",
      tip5: "Descargar archivos de audio para entrenamiento portátil de Morse"
    }
  },
  
  errors: {
    fileTooBig: "El tamaño del archivo excede el límite de 5MB",
    unsupportedFormat: "Formato de archivo no soportado",
    processingError: "Error procesando archivo de texto",
    uploadError: "Error subiendo archivo",
    conversionError: "Error convirtiendo a código Morse"
  }
};