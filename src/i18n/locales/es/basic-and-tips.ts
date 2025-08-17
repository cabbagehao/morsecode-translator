export const esBasicAndTips = {
  meta: {
    title: "Básicos de Código Morse y Consejos de Aprendizaje – Guía Completa para Principiantes",
    description: "Aprende el alfabeto, números y puntuación del código morse con técnicas de aprendizaje probadas. Guía completa para principiantes con consejos de memoria y métodos de práctica."
  },
  header: {
    title: "Básicos y Consejos de Código Morse",
    subtitle: "Domina los fundamentos del código morse con nuestra guía integral"
  },
  sections: {
    letters: "Letras",
    numbers: "Números", 
    punctuation: "Puntuación"
  },
  basicRules: {
    title: "Reglas Básicas",
    rules: [
      "Un punto (.) representa una señal corta",
      "Un guión (-) representa una señal larga", 
      "El espacio entre partes de la misma letra es igual a un punto",
      "El espacio entre letras es igual a tres puntos",
      "El espacio entre palabras es igual a siete puntos"
    ]
  },
  shorthandMethod: {
    title: "Método de Taquigrafía del Código Morse",
    numbers: {
      title: "Código Morse para Números",
      description: "Comienza con números, ya que son particularmente fáciles de recordar. Todos los números están compuestos de 5 puntos o guiones.",
      rules: [
        "Para 1 a 5: El número mismo determina cuántos puntos hay al principio, y las posiciones restantes se llenan con guiones.",
        "Para 6 a 9: Resta 5 del número; el resultado determina cuántos guiones hay al principio, y las posiciones restantes se llenan con puntos.",
        "Para 0: Simplemente memorízalo como 5 guiones (-----)."
      ],
      examples: "1: .---- | 2: ..--- | 3: ...-- | 4: ....- | 5: ..... | 6: -.... | 7: --... | 8: ---.. | 9: ----. | 0: -----"
    },
    letters: {
      title: "Código Morse para Letras",
      sosExample: {
        intro: "Comencemos con el ejemplo más práctico, SOS:",
        explanation: "S es ..., y O es ---, entonces el código morse para SOS es ...---...",
        simple: "Sí, es así de simple."
      },
      alphabet: {
        intro: "A continuación, veamos el comienzo del alfabeto:",
        pairs: [
          "A es .-, y N es -.. Estos dos forman una pareja.",
          "Similarmente, D es -.., y U es ..-. Estos dos también son una pareja."
        ],
        symmetry: {
          intro: "Si comparas cuidadosamente, notarás que las siguientes parejas de letras tienen códigos simétricos:",
          pairs: "AN, BJ, DW, ET, FQ, GU, KR, LY, XP",
          tip: "Una vez que memorices la primera letra de cada pareja, la segunda vendrá naturalmente."
        },
        reverseSymmetry: {
          intro: "Hay otro tipo de simetría, como B y V:",
          example: "B es -..., y V es ...-.",
          description: "Este tipo de simetría se encuentra en las siguientes 3 parejas:",
          pairs: "BV, DU, GW"
        }
      },
      description: "Las letras más comúnmente usadas en español tienen los códigos más cortos:",
      commonLetters: "E(.), T(-), A(.-), I(..), N(-.), O(---), H(....), S(...), R(.-.)",
      pattern: "Nota: Códigos cortos para letras comunes, códigos más largos para las menos comunes."
    },
    patterns: {
      title: "Solo Puntos o Guiones",
      description: "También es fácil memorizar códigos hechos completamente de puntos o guiones:",
      dots: {
        title: "Puntos:",
        items: [
          ". es E",
          ".. es I", 
          "... es S",
          ".... es H"
        ]
      },
      dashes: {
        title: "Guiones:",
        items: [
          "- es T",
          "-- es M",
          "--- es O"
        ]
      }
    },
    finalTips: {
      title: "Consejos Finales",
      description: "Practicando repetidamente estas reglas, encontrarás que solo hay dos códigos que necesitan ser memorizados por separado:",
      exceptions: [
        "C: -.-.",
        "Z: --.."
      ]
    }
  },
  visualMethod: {
    title: "Método de Aprendizaje Visual",
    description: "Puedes combinar los métodos de codificación visual mostrados en este video para memorizar código morse más rápidamente. El video demuestra la visualización de cada letra, haciendo más fácil entender los patrones y relaciones entre diferentes caracteres.",
    videoTitle: "Video de Aprendizaje de Código Morse"
  },
  learningTips: {
    title: "Consejos de Aprendizaje",
    tips: [
      {
        title: "Comienza con Letras Comunes",
        description: "Comienza aprendiendo con las letras más frecuentemente usadas: E, T, A, O, I, N. Estas componen una gran porción del texto en español."
      },
      {
        title: "Practica el Ritmo",
        description: "Enfócate en el ritmo y tiempo en lugar de solo memorizar puntos y guiones. Cada letra tiene su propio patrón musical."
      },
      {
        title: "Usa Mnemotécnicos",
        description: "Crea asociaciones de palabras: \"A\" (.-) = \"Amor\", \"B\" (-...) = \"Buen día\", \"C\" (-.-.) = \"Coca Cola\""
      }
    ]
  },
  externalResources: {
    title: "Recursos de Aprendizaje Externos",
    resources: [
      {
        title: "Morse Code World",
        description: "Una plataforma interactiva que ofrece práctica de código morse en tiempo real con sonido. Las características incluyen velocidad de transmisión ajustable y varios modos de práctica tanto para enviar como recibir código morse."
      },
      {
        title: "Google Morse Code Experiments", 
        description: "Una colección de experimentos innovadores de Google que hacen que aprender código morse sea divertido y atractivo. Incluye juegos y herramientas interactivas diseñadas para ayudar a los principiantes a dominar el código morse naturalmente."
      },
      {
        title: "Morse Free",
        description: "Una plataforma integral de aprendizaje de código morse con tutoriales, ejercicios de práctica y herramientas de conversión. Ideal tanto para principiantes como para usuarios avanzados que buscan mejorar sus habilidades de código morse."
      }
    ]
  },
  actions: {
    startPracticing: "Comenzar a Practicar"
  },
  seoContent: {
    interestingFacts: {
      title: "Datos Interesantes sobre el Código Morse",
      paragraphs: [
        {
          title: "Código Morse como Lenguaje",
          content: "es más que solo una combinación de puntos y guiones. Es una herramienta de comunicación elegante y simple que ha estado en uso por más de un siglo. Su universalidad y simplicidad han conectado personas a través de vastas distancias, haciéndolo una herramienta globalmente reconocida para comunicaciones de emergencia y técnicas."
        },
        {
          content: "El Código Morse no solo se usa para transmitir **Código Morse para Alfabeto** y **Código Morse para Números**, sino que también puede expresar signos de puntuación y frases comunes, como SOS (...---...) y CQ (una señal de llamada general). Estos métodos de codificación hacen del Código Morse un sistema de comunicación eficiente y versátil, especialmente en escenarios marítimos, de aviación y de emergencia."
        },
        {
          content: "Interesantemente, muchas personas escriben mal el Código Morse como \\\"Código Nórdico\\\" e incluso buscan un \\\"Traductor Nórdico\\\". En realidad, esto es solo un error de ortografía común y no tiene nada que ver con el Código Morse. La ortografía y uso correcto del Código Morse representa la combinación única de puntos (.) y guiones (-), en lugar de algo relacionado con la cultura nórdica."
        },
        {
          content: "¿Sabías que el Código Morse tiene diferentes nombres en varios idiomas? Por ejemplo, en persa se llama کد مورس (Kood-e-Morse). Su universalidad no solo se refleja en sus reglas de codificación translingüísticas sino también en sus contribuciones significativas a la comunicación internacional."
        },
        {
          content: "Incluso secuencias aparentemente crípticas como ..---...._ pueden ser decodificadas entendiendo el **Código Morse para Alfabeto** y **Código Morse para Números**. Cada bit de Código Morse lleva significado, y a través de la combinación de puntos, guiones y reglas de codificación, se convierte en una herramienta de comunicación global que trasciende las barreras del idioma."
        },
        {
          content: "Ya sea la famosa señal de emergencia SOS (\\\"3 puntos y un guión\\\") o frases románticas como \\\"Te amo\\\" transmitidas en Código Morse, su encanto radica en su simplicidad y practicidad. Aprendiendo las letras, números, signos de puntuación y frases comunes, puedes dominar fácilmente esta habilidad de comunicación clásica."
        }
      ]
    },
    fundamentalsGuide: {
      title: "Dominar los Fundamentos del Código Morse: Guía Completa para Principiantes de Puntos y Guiones",
      intro: "Aprende el **alfabeto del código morse** sistemáticamente con métodos probados usados por operadores de radio amateur en todo el mundo.",
      techniques: {
        title: "Técnicas Esenciales:",
        items: [
          "Memorización completa del **gráfico de código morse** desde **A en código morse** (punto-guión) hasta combinaciones complejas",
          "Patrones simétricos: parejas de letras como AN, DU, y BV con relaciones lógicas",
          "Fundamentos de tiempo: puntos (cortos), guiones (3 veces más largos), espaciado apropiado",
          "Aplicaciones: licencia de radio amateur, preparación de emergencia, historia de telecomunicaciones"
        ]
      }
    },
    advancedTechniques: {
      title: "Técnicas de Aprendizaje Avanzadas: De Patrones Básicos a Competencia Profesional",
      intro: "Acelera tu viaje de **cómo aprender código morse** con técnicas de memorización avanzadas y ejercicios prácticos diseñados para desarrollo rápido de habilidades. Continúa tu aprendizaje con más recursos en nuestra sección de aprender.",
      methods: {
        title: "Métodos de Aprendizaje:",
        items: [
          "Métodos de aprendizaje visual y gráficos",
          "Técnicas de práctica basadas en ritmo",
          "Dispositivos mnemotécnicos para memorización",
          "Estándares internacionales de código morse"
        ]
      },
      patterns: {
        title: "Reconocimiento de Patrones:",
        items: [
          "Letras solo de puntos: E, I, S, H",
          "Letras solo de guiones: T, M, O", 
          "Simetrías lógicas entre parejas",
          "Memoria muscular para enviar/recibir"
        ]
      },
      conclusion: "Estos métodos probados en el tiempo han ayudado a miles de estudiantes a lograr el éxito en licencias de radio amateur y desarrollar habilidades de código morse confiables y precisas para comunicaciones de emergencia, contactos DX y operaciones QRP."
    }
  }
};