# Interactivas UNIFRANZ

Experiencia interactiva web inspirada en plataformas clásicas, diseñada para uso en pantallas o kioscos. El usuario puede hacer saltar al personaje (Pikachu, Stitch o cualquier otro que configures) para golpear un bloque y mostrar mensajes o interacciones, todo con una interfaz simple y accesible.

## Características
- Personaje principal con dos estados: espera y salto (imágenes intercambiables).
- Botón de salto estilizado con gradiente, sombras y animaciones hover/active.
- Fondo de pantalla a pantalla completa con ajuste (object-fit) para distintas resoluciones.
- Bloque con animación de impacto.
- Mensajes emergentes con diseño tipo tarjeta.
- Diseño responsive optimizado para desktop, tablet y móviles.

## Estructura del proyecto
```
interactivas/
├─ index.html                # Estructura principal del juego/experiencia
├─ assets/
│  ├─ css/
│  │  └─ style.css          # Estilos del layout, personaje, botón y mensajes
│  ├─ js/
│  │  └─ app.js             # Lógica de interacción (salto, colisiones, mensajes)
│  └─ data/
│     └─ propuestas.json    # Datos para mostrar en los mensajes (si aplica)
├─ images/
│  ├─ pikachu/              # Sprites de Pikachu (sentado/saltando)
│  ├─ stitch/               # Sprites de Stitch (sentado/saltando)
│  ├─ bloque.png            # Textura del bloque con interrogación
│  ├─ FondoOrignal.jpg      # Imagen de fondo
│  └─ icono.png             # Ícono del botón (si se usa)
├─ sounds/
│  ├─ coin.mp3              # Sonido de recompensa
│  └─ salto.mp3             # Sonido de salto
├─ instrucciones.txt         # Guía corta de edición para usuarios internos
└─ README.md                 # Este archivo
```

## Cómo ejecutar
1. Abre el archivo `index.html` en tu navegador.
2. Asegúrate de que las rutas relativas se mantengan (no muevas las carpetas sin actualizar las referencias).
3. En entornos locales con servidores (p. ej. Laragon), coloca la carpeta en el directorio público y accede vía http.

## Personalización rápida

### Cambiar el personaje
El personaje se controla con el elemento `#personaje` en CSS usando `background-image`.
- En reposo (espera): regla `#personaje`
- En salto: regla `#personaje.jumping`

Ejemplo (ya configurado en style.css con comentarios):
- Pikachu (espera): `images/pikachu/pikachu_sentado.png`
- Pikachu (salto): `images/pikachu/pikachu_saltando.webp`
- Stitch (espera): `images/stitch/stitch_sentado.png`
- Stitch (salto): `images/stitch/stitch_saltando.png`

Puedes sustituir por cualquier otra carpeta/personaje manteniendo las proporciones recomendadas.

### Ajustar tamaño del personaje
- Reposo: en `#personaje` modifica `width` (p. ej. en `vw` o `px`) y, si es necesario, `aspect-ratio`.
- Salto: en `#personaje.jumping` ajusta `width` y `aspect-ratio`.

Sugerencia: usar `vw` permite que el tamaño sea proporcional a la pantalla.

### Ajustar altura (posición vertical)
- El personaje y el botón tienen propiedades `bottom` coordinadas para mantener su separación visual.
- Para subir/bajar ambos sin romper la distancia entre sí, incrementa/decrementa los valores `bottom` de `#personaje` y `.jump-button` en el mismo delta (también en los media queries).

### Botón de salto
El botón `.jump-button` está diseñado con:
- Gradiente (amarillos/naranjas), borde redondeado tipo píldora y sombras.
- Icono SVG embebido con texto “Saltar” vía pseudo-elementos (::before y ::after).
- Animaciones `:hover` y `:active` para sensación de “botón físico”.

Para cambiar el tamaño del botón, ajusta:
- `width` y `max-width`
- `aspect-ratio` (recomendado ~2.0–2.6:1)
- Repite ajustes en los breakpoints de 1024px, 768px y 480px para mantener coherencia en móviles.

## Accesibilidad
- El botón tiene `aria-label="Saltar"` para describir su acción.
- Colores con buen contraste para visibilidad.
- Mensajes emergentes con tamaños de fuente y espaciados legibles.

## Recomendaciones de imágenes
- Usa PNG/WebP con fondos transparentes para el personaje (mejor calidad y menor peso).
- Mantén proporciones similares entre los sprites de espera y salto para que la animación sea fluida.
- Optimiza imágenes (TinyPNG, Squoosh) antes de subirlas.

## Notas técnicas
- CSS organiza estilos por secciones (fondo, personaje, bloque, botón, mensajes) y media queries para tablet y móviles.
- Se eliminaron reglas vacías para evitar advertencias de linters.
- Se utilizan unidades relativas (`vw`, `%`) para responsividad en distintas pantallas.
- El id del personaje cambió de `#mario` a `#personaje`. En JavaScript se consulta con `document.getElementById('personaje')` y la animación de salto aplica la clase `.jumping` sobre ese elemento.

## Créditos y licencias
- Verifica que las imágenes/sprites utilizados tengan permisos adecuados para su uso.
- Este proyecto se pensó como demo educativa/experiencial. Ajusta la autoría y licencias según tus recursos.

## Futuras mejoras (ideas)
- Selector en pantalla para cambiar de personaje sin editar código.
- Sistema de puntuación y lógica de colisiones más completa.
- Soporte para control por teclado/gestos (espacio o flecha arriba).
- Persistencia de datos (localStorage) para preferencias del usuario.
