// Contenido de las vistas y secuencias del proyecto.
// Se mantiene separado de la lógica de interfaz para facilitar su edición.

window.COCINA_VIEWS = {
    inicio: {
        title: "Vista general",
        description: "Explore los sensores y la arquitectura de la solución IoT.",
        mode: "static",
        src: "assets/images/cover.webp",
        alt: "Portada del proyecto Cocina Inteligente"
    },
    proximidad: {
        title: "Sensor de proximidad (PIR)",
        description: "Detección de presencia en el área de cocina mediante un sensor PIR basado en eventos.",
        mode: "sequence",
        steps: [
            {
                src: "assets/images/sequences/proximidad/step-1.webp",
                title: "Sistema en reposo",
                description: "El sensor PIR permanece monitoreando el área de cocina sin detectar movimiento. Mientras no exista presencia, el sistema conserva el estado de espera y no genera ninguna acción.",
                state: "En espera",
                tone: "normal"
            },
            {
                src: "assets/images/sequences/proximidad/step-2.webp",
                title: "Movimiento detectado",
                description: "El sensor PIR detecta movimiento dentro de su área de cobertura y genera un evento de presencia. La detección inicia el flujo de comunicación hacia el sistema IoT.",
                state: "Presencia detectada",
                tone: "info"
            },
            {
                src: "assets/images/sequences/proximidad/step-3.webp",
                title: "Procesamiento del evento",
                description: "El evento generado por el sensor se transmite al sistema, donde se valida y registra. Esto permite confirmar la detección antes de ejecutar la acción configurada.",
                state: "Evento procesado",
                tone: "info"
            },
            {
                src: "assets/images/sequences/proximidad/step-4.webp",
                title: "Acción activada",
                description: "Después de validar el evento, el sistema ejecuta la acción configurada, por ejemplo encender la iluminación del área. La respuesta ocurre únicamente mientras exista una detección válida.",
                state: "Automatización activa",
                tone: "info"
            },
            {
                src: "assets/images/sequences/proximidad/step-5.webp",
                title: "Retorno a reposo",
                description: "Cuando deja de detectarse movimiento durante el intervalo definido, el sistema finaliza la acción y el sensor vuelve al estado de espera para continuar monitoreando el área.",
                state: "En espera",
                tone: "normal"
            }
        ]
    },
    temperatura: {
        title: "Temperatura del refrigerador",
        description: "Monitoreo de la temperatura interna del refrigerador para proteger la conservación de los alimentos.",
        mode: "sequence",
        steps: [
            {
                src: "assets/images/sequences/temperatura/step-1.webp",
                title: "Temperatura normal",
                description: "El sensor mide continuamente la temperatura interna del refrigerador. Una lectura dentro del rango configurado de 2 a 6 °C indica condiciones adecuadas para la conservación de los alimentos.",
                state: "4.1 °C · Normal",
                tone: "normal"
            },
            {
                src: "assets/images/sequences/temperatura/step-2.webp",
                title: "Temperatura elevada",
                description: "La lectura supera el límite configurado y permanece fuera del rango esperado. Este cambio puede indicar una puerta abierta, pérdida de enfriamiento o una condición que afecte la conservación de los alimentos.",
                state: "8.2 °C · Fuera de rango",
                tone: "warning"
            },
            {
                src: "assets/images/sequences/temperatura/step-3.webp",
                title: "Procesamiento del evento",
                description: "La lectura se transmite al sistema IoT, donde se compara con el rango permitido y se registra la variación. Si supera el umbral, el evento se clasifica para generar una alerta.",
                state: "Evento procesado",
                tone: "info"
            },
            {
                src: "assets/images/sequences/temperatura/step-4.webp",
                title: "Notificación enviada",
                description: "La aplicación notifica al usuario que la temperatura del refrigerador superó el límite configurado e incluye la lectura detectada para facilitar una revisión rápida del equipo.",
                state: "Alerta enviada",
                tone: "warning"
            },
            {
                src: "assets/images/sequences/temperatura/step-5.webp",
                title: "Revisión del refrigerador",
                description: "El usuario debe verificar que la puerta cierre correctamente, revisar el sello y confirmar el funcionamiento del sistema de enfriamiento. La temperatura debe volver al rango normal.",
                state: "Revisión recomendada",
                tone: "warning"
            }
        ]
    },
    corriente: {
        title: "Sensor de corriente eléctrica",
        description: "Monitoreo de la corriente consumida por un electrodoméstico para identificar comportamientos anómalos.",
        mode: "sequence",
        steps: [
            {
                src: "assets/images/sequences/corriente/step-1.webp",
                title: "Medición normal",
                description: "El sensor de corriente mide el consumo eléctrico del equipo conectado y mantiene la lectura dentro del rango esperado. Esta referencia permite identificar cambios anormales en el comportamiento eléctrico.",
                state: "0.65 A · Normal",
                tone: "normal"
            },
            {
                src: "assets/images/sequences/corriente/step-2.webp",
                title: "Consumo elevado",
                description: "El sensor registra un aumento significativo de corriente por encima del umbral configurado. El valor elevado puede indicar sobreconsumo, una carga inesperada o una condición que requiere revisión.",
                state: "6.28 A · Elevado",
                tone: "warning"
            },
            {
                src: "assets/images/sequences/corriente/step-3.webp",
                title: "Procesamiento del evento",
                description: "La lectura se transmite al sistema IoT, donde se valida contra el umbral definido y se registra el evento de sobreconsumo para conservar evidencia del comportamiento detectado.",
                state: "Evento procesado",
                tone: "info"
            },
            {
                src: "assets/images/sequences/corriente/step-4.webp",
                title: "Notificación enviada",
                description: "La aplicación informa al usuario sobre el consumo eléctrico elevado y muestra la lectura registrada. La notificación permite identificar rápidamente qué condición originó la advertencia.",
                state: "Alerta enviada",
                tone: "warning"
            },
            {
                src: "assets/images/sequences/corriente/step-5.webp",
                title: "Acción recomendada",
                description: "Se recomienda revisar el equipo conectado, el circuito y sus conexiones antes de continuar utilizándolo. El objetivo es descartar una carga anormal o una posible falla eléctrica.",
                state: "Revisión recomendada",
                tone: "warning"
            }
        ]
    },
    humo: {
        title: "Sensor de humo",
        description: "Detección de partículas de humo en el ambiente para activar una alerta de seguridad.",
        mode: "sequence",
        steps: [
            {
                src: "assets/images/sequences/humo/step-1.webp",
                title: "Ambiente normal",
                description: "El detector monitorea continuamente el ambiente de la cocina sin identificar una concentración de partículas de humo por encima del nivel configurado. El sistema permanece en estado normal.",
                state: "Sin humo",
                tone: "normal"
            },
            {
                src: "assets/images/sequences/humo/step-2.webp",
                title: "Humo detectado",
                description: "El detector identifica partículas de humo por encima del umbral establecido y genera un evento de seguridad. La detección inicia el envío de la alerta hacia el sistema IoT.",
                state: "Humo detectado",
                tone: "critical"
            },
            {
                src: "assets/images/sequences/humo/step-3.webp",
                title: "Procesamiento del evento",
                description: "El evento se transmite al sistema, donde se valida y registra la detección de humo. Esta etapa confirma la condición antes de presentar la alerta correspondiente al usuario.",
                state: "Evento procesado",
                tone: "info"
            },
            {
                src: "assets/images/sequences/humo/step-4.webp",
                title: "Notificación enviada",
                description: "La aplicación envía una alerta al dispositivo del usuario indicando que se detectó humo en la cocina. La notificación permite reaccionar rápidamente ante la condición registrada.",
                state: "Alerta enviada",
                tone: "critical"
            },
            {
                src: "assets/images/sequences/humo/step-5.webp",
                title: "Acción recomendada",
                description: "El usuario debe identificar la posible fuente de humo, revisar el área y ventilarla cuando sea seguro hacerlo. La alerta se mantiene como referencia hasta atender la condición.",
                state: "Atención requerida",
                tone: "critical"
            }
        ]
    },
    gas: {
        title: "Sensor de gas combustible",
        description: "Detección de gas combustible en la cocina para activar una alerta ante una posible fuga.",
        mode: "sequence",
        steps: [
            {
                src: "assets/images/sequences/gas/step-1.webp",
                title: "Ambiente seguro",
                description: "El sensor monitorea la concentración de gas combustible en el área de cocina, especialmente cerca del cilindro y sus conexiones. Mientras los valores sean normales, el sistema permanece en estado seguro.",
                state: "Sin fuga",
                tone: "normal"
            },
            {
                src: "assets/images/sequences/gas/step-2.webp",
                title: "Gas detectado",
                description: "El sensor identifica una concentración de gas superior al umbral configurado cerca del cilindro o de sus conexiones. La lectura se interpreta como una posible fuga y genera un evento crítico.",
                state: "Fuga detectada",
                tone: "critical"
            },
            {
                src: "assets/images/sequences/gas/step-3.webp",
                title: "Procesamiento crítico",
                description: "El evento de gas se transmite al sistema IoT, donde se valida, clasifica como crítico y registra. Debido al nivel de riesgo, se prepara inmediatamente la notificación correspondiente.",
                state: "Evento crítico procesado",
                tone: "critical"
            },
            {
                src: "assets/images/sequences/gas/step-4.webp",
                title: "Notificación crítica",
                description: "La aplicación envía una alerta crítica al usuario indicando la posible fuga de gas y el área afectada. La prioridad es comunicar la condición con claridad para facilitar una respuesta inmediata.",
                state: "Alerta enviada",
                tone: "critical"
            },
            {
                src: "assets/images/sequences/gas/step-5.webp",
                title: "Acción recomendada",
                description: "Ante una posible fuga, se recomienda cerrar la válvula del cilindro si es seguro hacerlo, ventilar el área y evitar accionar interruptores o equipos eléctricos que puedan producir una chispa.",
                state: "Estado crítico",
                tone: "critical"
            }
        ]
    },
    topologia: {
        title: "Topología de la red IoT",
        description: "Muestra cómo los sensores IoT de la cocina se conectan y transmiten información a través de la red hasta la aplicación de monitoreo.",
        mode: "static",
        src: "assets/images/topology.webp",
        alt: "Diagrama de topología de la cocina inteligente"
    }
};
