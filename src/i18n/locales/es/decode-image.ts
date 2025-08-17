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
    togglePreview: "Alternar vista previa de imagen",
    alt: "Image preview"
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
    invalidFileType: "Por favor sube un archivo de imagen (PNG, JPG, JPEG, GIF, BMP, etc.)",
    fileTooLarge: "El tamaño del archivo debe ser menor a 10MB. Las imágenes grandes serán automáticamente comprimidas para un procesamiento más rápido.",
    fileTooBig: "El tamaño del archivo excede el límite de 10MB",
    unsupportedFormat: "Formato de imagen no soportado",
    processingError: "Error procesando archivo de imagen",
    ocrError: "Procesamiento OCR falló",
    uploadError: "Error subiendo archivo",
    aiError: "Análisis de IA falló",
    imageCompressionFailed: "Compresión de imagen falló",
    failedToLoadImage: "Error al cargar imagen para compresión",
    ocrProcessingFailed: "Procesamiento OCR falló.",
    httpError: "Error HTTP! estado:",
    timeout: "Tiempo de procesamiento agotado. Prueba entrada manual o una imagen más clara.",
    networkError: "Error de red cargando motor OCR. Verifica tu conexión o usa entrada manual.",
    memoryError: "Procesamiento de imagen falló. Prueba:\n\n• Usar entrada manual abajo\n• Probar un archivo de imagen más pequeño\n• Usar una imagen más clara con mejor contraste",
    generalError: "Por favor prueba:\n\n• Entrada manual abajo\n• Imagen diferente\n• Mejor iluminación/contraste en la foto",
    noMorseDetected: "No se detectaron patrones de código Morse - prueba entrada manual",
    ocrFailedManualAvailable: "OCR falló - entrada manual disponible",
    recognitionFailedMessage: "Reconocimiento falló. Prueba entrada manual abajo o usa una imagen más clara con mejor contraste.",
    
    // Timeout and performance messages
    timeoutLongerForLarge: "• Esto puede tomar más tiempo para imágenes grandes",
    compressionNote: "Imagen comprimida de {originalSize}MB a {compressedSize}MB",
    compressionWarning: "Archivo grande detectado ({fileSize}MB) - será comprimido para mejor rendimiento OCR",
    
    // Alert messages
    timeoutMessage: "El procesamiento tomó más tiempo del esperado (>{timeoutSeconds}s). Prueba estas soluciones:\n\n• Usar entrada manual abajo (recomendado)\n• Probar una imagen más pequeña/de menor resolución\n• Recortar la imagen para enfocar en el área de código Morse\n• Asegurar buen contraste (texto negro sobre fondo blanco)",
    networkErrorMessage: "Error de red cargando motor OCR. Verifica tu conexión o usa entrada manual.",
    imageProcessingFailed: "Procesamiento de imagen falló. Prueba:\n\n• Usar entrada manual abajo\n• Probar un archivo de imagen más pequeño\n• Usar formato PNG en lugar de JPEG",
    unexpectedError: "Error inesperado. Por favor prueba entrada manual abajo."
  },
  
  // File size formatting
  fileSize: {
    bytes: "Bytes",
    kb: "KB",
    mb: "MB",
    gb: "GB"
  },
  
  // SEO content section
  seoContent: {
    title: "Reconocimiento Avanzado de Código Morse en Imágenes",
    description: "Sube imágenes que contengan patrones de código Morse y decodifícalas instantáneamente usando tecnología OCR e IA avanzada. Perfecto para documentos históricos, materiales educativos y ejercicios de práctica.",
    
    // Main sections
    revolutionary: {
      title: "Traductor Revolucionario de Código Morse de Imagen - Tecnología OCR Avanzada",
      description: "Nuestro traductor de código Morse de imágenes de vanguardia representa un avance en la tecnología de reconocimiento óptico de caracteres, específicamente diseñado para extraer y decodificar patrones de código Morse de imágenes digitales con precisión sin precedentes. Esta poderosa herramienta de traducción de código Morse de imagen combina algoritmos avanzados de visión por computadora con reconocimiento especializado de patrones de código Morse para transformar contenido visual en mensajes de texto legibles.",
      capabilities: "Ya sea que estés trabajando con documentos telegráficos históricos, comunicaciones militares vintage, materiales de referencia de radioaficionados o contenido educativo, nuestra herramienta de vanguardia puede convertir con precisión fotos a código Morse y decodificar instantáneamente los mensajes ocultos dentro de tus imágenes. El sistema soporta múltiples formatos de imagen y proporciona preprocesamiento inteligente para mejorar la precisión del reconocimiento en varias calidades y condiciones de imagen.",
      comprehensive: "Capacidades Integrales de Procesamiento de Imágenes:",
      
      imageTypes: {
        title: "Soporte de Tipos de Imagen:",
        scannedDocuments: "Documentos escaneados: Telegramas históricos, manuales de entrenamiento y hojas de referencia",
        photographs: "Fotografías: Imágenes de tablas de código Morse, notas manuscritas y pantallas",
        screenshots: "Capturas de pantalla: Pantallas digitales, salidas de software y contenido en línea",
        handwritten: "Materiales manuscritos: Notas personales, ejercicios de práctica y guías de estudio",
        printed: "Materiales impresos: Libros, revistas, carteles y recursos educativos"
      },
      
      applications: {
        title: "Aplicaciones Profesionales:",
        historical: "Investigación histórica: Digitalización de comunicaciones telegráficas vintage y archivos militares",
        educational: "Instituciones educativas: Procesamiento de ejercicios de libros de texto y materiales de examen",
        amateur: "Comunidad de radioaficionados: Conversión de referencias impresas y registros de concursos",
        museum: "Colecciones de museos: Preservación de registros de comunicaciones marítimas y de aviación",
        emergency: "Servicios de emergencia: Preparación de materiales de entrenamiento y documentación"
      }
    },
    
    professional: {
      title: "Traductor de Código Morse de Imagen de Grado Profesional - Motor de Reconocimiento Mejorado",
      description: "Experimenta la solución más sofisticada para extraer código Morse de imágenes con nuestro sistema OCR inteligente potenciado por algoritmos avanzados de aprendizaje automático. Nuestro motor de reconocimiento mejorado puede procesar varios formatos de imagen incluyendo archivos PNG, JPEG, GIF y TIFF, convirtiendo automáticamente patrones Morse visuales en texto legible preciso con tasas de precisión líderes en la industria.",
      capabilities: "El sistema emplea técnicas de procesamiento de múltiples etapas incluyendo preprocesamiento de imagen, reducción de ruido, segmentación de caracteres y coincidencia de patrones para asegurar resultados óptimos en diversas condiciones de imagen. Desde fotografías históricas de baja resolución hasta documentos escaneados de alta definición, nuestra herramienta decodificadora de código Morse de imagen se adapta para entregar rendimiento consistente independientemente de la calidad del material fuente.",
      
      features: {
        ocrTitle: "Características OCR Avanzadas",
        ocrItems: [
          "Reconocimiento inteligente de caracteres con 95%+ de precisión",
          "Algoritmos automáticos de distinción de puntos y rayas",
          "Detección inteligente de espaciado para límites de palabras",
          "Filtrado de ruido y mejora de imagen",
          "Soporte de motor OCR multiidioma",
          "Seguimiento de progreso de procesamiento en tiempo real"
        ],
        
        optimizationTitle: "Optimización de Calidad de Imagen",
        optimizationItems: [
          "Ajuste automático de contraste y brillo",
          "Corrección de perspectiva para imágenes sesgadas",
          "Eliminación de ruido de fondo y aislamiento",
          "Detección de bordes e identificación de límites de caracteres",
          "Mejora de resolución para imágenes de baja calidad",
          "Conversión de espacio de color y optimización en escala de grises"
        ],
        
        outputTitle: "Salida e Integración",
        outputItems: [
          "Conversión de texto instantánea y validación",
          "Múltiples formatos de exportación (TXT, CSV, JSON)",
          "Funcionalidad de copiar al portapapeles",
          "Resultados descargables con marcas de tiempo",
          "Detección de errores y sugerencias de corrección",
          "Entrada manual de respaldo para casos extremos"
        ]
      }
    },
    
    industry: {
      title: "Aplicaciones de la Industria y Escenarios de Casos de Uso",
      description: "Nuestro descifrador integral de código Morse de imagen sirve a diversas comunidades profesionales e instituciones educativas en todo el mundo. Desde la preservación del patrimonio marítimo hasta el entrenamiento en comunicaciones de emergencia, esta herramienta versátil aborda desafíos del mundo real en documentación histórica, evaluación educativa y análisis de comunicación profesional. Para conversión rápida de texto, usa nuestra herramienta traductor de morse.",
      
      research: {
        title: "Aplicaciones de Investigación y Académicas",
        historical: {
          title: "Análisis de Documentos Históricos",
          description: "Digitaliza y preserva comunicaciones telegráficas vintage, mensajes de guerra y libros de registro marítimos con capacidades de transcripción automatizada."
        },
        educational: {
          title: "Evaluación Educativa",
          description: "Procesa ejercicios de estudiantes, materiales de examen y documentación de entrenamiento para sistemas eficientes de calificación y retroalimentación."
        }
      },
      
      professional: {
        title: "Aplicaciones Profesionales y Técnicas",
        emergency: {
          title: "Comunicaciones de Emergencia",
          description: "Analiza y documenta transmisiones de emergencia, escenarios de entrenamiento y protocolos de comunicación de desastres."
        },
        amateur: {
          title: "Operaciones de Radioaficionados",
          description: "Convierte registros de concursos, materiales de referencia y documentación técnica para archivo digital y análisis."
        }
      },
      
      conclusion: "Ya seas un historiador trabajando con materiales de archivo, un educador preparando contenido de curso, o un entusiasta de la radio digitalizando materiales de referencia, nuestro traductor de código Morse basado en imagen proporciona la precisión, confiabilidad y eficiencia necesarias para resultados de grado profesional. El manejo robusto de errores del sistema y la entrada manual de respaldo aseguran procesamiento exitoso incluso con materiales fuente desafiantes."
    },
    
    technical: {
      title: "Especificaciones Técnicas y Optimización de Rendimiento",
      description: "Construido sobre tecnología OCR de vanguardia con algoritmos especializados de reconocimiento de código Morse, nuestro sistema entrega rendimiento de nivel empresarial con accesibilidad amigable para el consumidor. La arquitectura subyacente combina el motor OCR Tesseract.js con modelos de reconocimiento de patrones personalizados específicamente entrenados en conjuntos de caracteres de código Morse y convenciones de formato.",
      
      stats: {
        accuracy: "95%+",
        accuracyLabel: "Precisión de Reconocimiento",
        fileSize: "10MB",
        fileSizeLabel: "Tamaño Máximo de Archivo",
        formats: "5+",
        formatsLabel: "Formatos Soportados"
      },
      
      performance: {
        title: "Características de Rendimiento:",
        items: [
          "Procesamiento del lado del cliente para mayor privacidad y seguridad",
          "No se requieren subidas al servidor - todo el procesamiento ocurre localmente",
          "Carga progresiva con actualizaciones de estado en tiempo real",
          "Manejo automático de tiempo de espera para procesamiento de archivos grandes",
          "Algoritmos eficientes en memoria para compatibilidad con dispositivos móviles",
          "Compatibilidad entre navegadores con estándares web modernos"
        ]
      },
      
      quality: {
        title: "Aseguramiento de Calidad:",
        items: [
          "Múltiples etapas de validación para verificación de precisión",
          "Puntuación de confianza para cada carácter reconocido",
          "Detección automática de errores y sugerencias de corrección",
          "Capacidad de anulación manual para casos extremos",
          "Visualización de salida OCR cruda para propósitos de depuración",
          "Registro integral de errores y diagnósticos"
        ]
      }
    },
    
    instructions: {
      title: "Cómo Usar el Decodificador de Morse de Imagen",
      step1: "Sube un archivo de imagen que contenga patrones de código Morse (puntos y rayas)",
      step3: "Ve el código Morse extraído y su traducción de texto decodificado",
      
      tips: {
        title: "Consejos para Mejores Resultados",
        items: [
          "Usa imágenes claras de alto contraste con puntos y rayas distintos",
          "Asegúrate de que los símbolos de código Morse estén bien separados y sean legibles",
          "Evita fondos demasiado complejos o elementos decorativos",
          "Las imágenes con texto negro sobre fondo blanco funcionan mejor",
          "Prueba diferentes formatos de imagen si OCR falla (PNG funciona mejor que JPEG para texto)",
          "Revisa el \"Texto OCR Crudo\" para ver qué reconoció realmente el sistema",
          "Puede ser necesaria corrección manual para imágenes complejas o de baja calidad"
        ]
      },
      
      troubleshooting: {
        title: "Solución de Problemas de OCR",
        ocrLoadingFails: "El motor OCR no se carga: Prueba refrescar la página o usar la opción de entrada manual",
        processingTimeout: "Tiempo de procesamiento agotado: Usa una imagen más pequeña o cambia a entrada manual para resultados más rápidos",
        noTextRecognized: "No se reconoció texto: Asegúrate de que la imagen contenga código Morse basado en texto claro, o usa entrada manual",
        wrongCharacters: "Caracteres incorrectos detectados: El sistema convierte caracteres similares automáticamente (| → ., O → -, etc.)",
        mixedResults: "Resultados mixtos: Revisa el texto OCR crudo o usa entrada manual para mejor precisión"
      }
    },
    
    features: {
      title: "Características de Reconocimiento:",
      items: [
        "Tecnología OCR avanzada para reconocimiento preciso de texto",
        "Integración de ChatGPT-4 potenciada por IA para detección mejorada",
        "Soporte para múltiples formatos de imagen (PNG, JPG, GIF, BMP)",
        "Compresión automática de imagen para procesamiento óptimo",
        "Opción de entrada manual para imágenes difíciles",
        "Procesamiento en tiempo real con indicadores de progreso"
      ]
    },
    
    capabilities: {
      title: "Capacidades de Procesamiento:",
      items: [
        "Maneja varias condiciones de iluminación y calidad de imagen",
        "Reconoce código Morse manuscrito e impreso",
        "Procesa documentos históricos y fotografías",
        "Soporta archivos de imagen grandes con compresión automática",
        "Manejo de errores con opciones de respaldo",
        "Depuración de texto OCR crudo para solución de problemas"
      ]
    },
    
    useCases: {
      title: "Casos de Uso:",
      items: [
        "Análisis de documentos telegráficos históricos",
        "Materiales educativos de aprendizaje de código Morse",
        "Práctica y entrenamiento de radioaficionados",
        "Archivos de comunicación militar y de emergencia",
        "Digitalización de documentos de museos y bibliotecas",
        "Proyectos personales de pasatiempos y colecciones"
      ]
    },
    
    technology: {
      title: "Tecnología:",
      description: "Nuestro decodificador de imagen combina OCR (Reconocimiento Óptico de Caracteres) potente con reconocimiento de patrones mejorado por IA para identificar con precisión patrones de código Morse en fotografías, documentos escaneados e imágenes digitales."
    }
  }
};