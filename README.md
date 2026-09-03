# Cocina Inteligente IoT

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000)
![IoT](https://img.shields.io/badge/IoT-Internet%20of%20Things-355C7D)

**Versión:** 1.2.0  
**Tipo:** demostración académica de redes e IoT  

## Demo en línea

[Ver Cocina Inteligente IoT](https://andreacarrilloop.github.io/Cocina-IOT/)

## Propósito

Este **no es un proyecto orientado al desarrollo de software**. Es una representación académica y visual de un escenario de **redes e IoT aplicado a una cocina inteligente**.

El objetivo principal es mostrar el comportamiento de distintos sensores y, especialmente, cómo se constituye la **topología de comunicación** entre los dispositivos, la red o gateway, el procesamiento de la información y la aplicación de monitoreo.

La interfaz web funciona únicamente como medio interactivo para ilustrar estos conceptos.

## Sensores representados

- PIR de proximidad y movimiento.
- Temperatura del refrigerador.
- Corriente eléctrica.
- Humo.
- Gas combustible.

Cada sensor utiliza una secuencia de cinco pasos para representar de forma simple el flujo desde la detección o medición hasta el procesamiento y la respuesta del sistema.

## Topología IoT

La topología resume el flujo principal:

```text
Sensores IoT → Red / Gateway → Procesamiento → Aplicación / Usuario
```

## Ejecución

No requiere instalación ni dependencias.

1. Descomprima el proyecto.
2. Abra `index.html` en un navegador moderno.

También puede utilizar **Live Server** en Visual Studio Code.

## Estructura

```text
Cocina-IOT/
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── images/
│   │   ├── sequences/
│   │   │   ├── corriente/
│   │   │   ├── gas/
│   │   │   ├── humo/
│   │   │   ├── proximidad/
│   │   │   └── temperatura/
│   │   ├── cover.webp
│   │   ├── logo.png
│   │   └── topology.webp
│   └── js/
│       ├── app.js
│       └── views.js
├── README.md
└── index.html

```

---

**Proyecto académico · Cocina Inteligente IoT**  
Andrea Carrillo Oporto · Jerry Solera Celestino  
© 2022-2026 · Todos los derechos reservados.
