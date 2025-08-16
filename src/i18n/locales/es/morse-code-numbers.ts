export const esMorseCodeNumbers = {
  meta: {
    title: "Tabla de Números en Código Morse – Guía Completa de Referencia 0-9",
    description: "Tabla completa de números en código morse del 0-9. Aprende los patrones de puntos y rayas de cada número, sistema de numeración y técnicas de memorización."
  },
  header: {
    title: "Tabla de Números en Código Morse",
    subtitle: "Referencia completa del 0 al 9 para números en código morse"
  },
  content: {
    title: "Números (0-9)",
    description: "Representación en código morse de todos los números",
    printButton: "Imprimir Tabla de Números",
    printTitle: "Tabla de Números en Código Morse (0-9)"
  },
  patterns: {
    title: "Sistema de Patrones Numéricos",
    items: [
      { range: "1-5", description: "Empiezan con puntos, terminan con rayas", example: "1: .---- (1 punto + 4 rayas)" },
      { range: "6-9", description: "Empiezan con rayas, terminan con puntos", example: "6: -.... (1 raya + 4 puntos)" },
      { range: "0", description: "Cinco rayas", example: "0: ----- (5 rayas)" }
    ]
  },
  learning: {
    title: "Cómo Aprender los Números en Código Morse",
    tips: [
      "Todos los números usan exactamente 5 señales (puntos y rayas)",
      "Los números 1-5 empiezan con puntos igual al número",
      "Los números 6-9 empiezan con rayas (6 empieza con 1 raya, 7 con 2, etc.)",
      "Cero es el único número con todas rayas",
      "Practica patrones de conteo para desarrollar memoria muscular"
    ]
  },
  qaSection: {
    title: "Preguntas Frecuentes sobre Números en Código Morse",
    items: [
      {
        question: "¿Cómo funcionan los números en código morse?",
        answer: "Los números en código morse usan un sistema consistente de 5 señales donde cada dígito del 0-9 se representa con exactamente 5 puntos y rayas.\n\nLos números 1-5 empiezan con el número correspondiente de puntos seguidos de rayas, mientras que los números 6-9 empiezan con rayas seguidas de puntos. Cero se representa con cinco rayas (-----)."
      },
      {
        question: "¿Cuál es el patrón para los números en código morse del 1-10?",
        answer: "El patrón para números en código morse del 1-10 sigue una secuencia lógica:\n\n• 1(.----), 2(..---), 3(...--), 4(....-), 5(.....)\n• 6(-....), 7(--...), 8(---..), 9(----.), 0(-----)\n\nNota que no hay \"10\" en morse - se transmitiría como \"1\" seguido de \"0\" como dígitos separados."
      },
      {
        question: "¿Cómo usar un traductor de números en código morse?",
        answer: "Un traductor de números en código morse convierte dígitos a sus patrones correspondientes de puntos-rayas y viceversa.\n\nSimplemente ingresa números como \"123\" y el traductor producirá \".---- ..--- ...--\". Nuestro traductor de números en código morse también proporciona reproducción de audio para ayudarte a aprender el ritmo y tempo de cada número."
      },
      {
        question: "¿Hay números en código morse para uso de emergencia?",
        answer: "Sí, el código morse con números es esencial para comunicaciones de emergencia.\n\nLos números se usan para coordenadas, frecuencias, códigos de emergencia como 911, y señales de llamada. El patrón consistente de 5 señales hace que el código morse en números sea confiable incluso en malas condiciones, por eso aún se usa en protocolos de emergencia marítimos y de aviación."
      },
      {
        question: "¿Cuánto tiempo toma aprender números en código morse del 1-100?",
        answer: "Aprender números en código morse del 1-100 comienza dominando los dígitos básicos 0-9, que típicamente toma 1-2 semanas con práctica diaria.\n\nUna vez que conoces los dígitos individuales, puedes representar cualquier número del 1 al 100 combinándolos. Practica con nuestra herramienta de traductor de números en código morse para desarrollar velocidad y precisión con secuencias numéricas."
      },
      {
        question: "¿Cuáles son los estándares internacionales de números en código morse?",
        answer: "Los números en código morse internacional siguen el estándar ITU-R Radio Regulations, usando el mismo sistema de 5 señales mundialmente.\n\nEsta estandarización asegura que el código morse de números sea universalmente entendido por operadores de radio amateur, servicios marítimos, y profesionales de aviación globalmente, haciéndolo un componente esencial de protocolos internacionales de comunicación de emergencia."
      }
    ]
  }
};