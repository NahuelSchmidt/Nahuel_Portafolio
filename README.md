# Portfolio de Nahuel

Portfolio personal con pantalla de carga y diseño moderno.

## Estructura del Proyecto

```
Portfolio/
├── index.html      # Estructura HTML principal
├── styles.css      # Estilos CSS
├── script.js       # Funcionalidades JavaScript
├── imagenes/       # Carpeta para tus imágenes
└── README.md       # Este archivo
```

## Características

- ✨ Pantalla de bienvenida con barra de carga animada
- 🎨 Diseño moderno y responsivo
- 📱 Compatible con dispositivos móviles
- 🧭 Navegación suave entre secciones
- ⚡ Efecto de typing en el texto principal
- 🎯 Scroll navigation en todas las secciones

## Cómo Usar

### Opción 1: Servidor Local Simple

```bash
# Python 3
python3 -m http.server 8000

# O Python 2
python -m SimpleHTTPServer 8000
```

Luego abre tu navegador en: `http://localhost:8000`

### Opción 2: Servidor con Node.js

```bash
# Si tienes http-server instalado
npx http-server -p 8000

# O con live-server para recarga automática
npx live-server --port=8000
```

### Opción 3: Extensión de VS Code

Instala la extensión "Live Server" en VS Code y haz clic en "Go Live" en la barra inferior.

## Agregar Imágenes

1. Coloca tus imágenes en la carpeta `imagenes/`
2. Reemplaza los placeholders en `index.html`:

```html
<!-- Ejemplo para la imagen del hero -->
<img src="imagenes/tu-foto.jpg" alt="Nahuel">
```

## Personalizar

### Cambiar el nombre
- Busca todas las instancias de "Nahuel" en `index.html` y reemplázalas

### Cambiar información personal
- Edita la sección "Acerca de Mí" en `index.html`
- Modifica las habilidades técnicas en la misma sección

### Modificar proyectos
- Edita la sección "Proyectos" en `index.html`
- Agrega o elimina tarjetas de proyectos según necesites

### Cambiar servicios
- Edita la sección "Servicios" en `index.html`
- Personaliza los iconos y descripciones

## Secciones del Portfolio

1. **Inicio**: Presentación personal con efecto typing
2. **Acerca**: Información sobre ti, educación y experiencia
3. **Proyectos**: Galería de proyectos con tarjetas
4. **Servicios**: Servicios que ofreces

## Notas

- La pantalla de carga se muestra automáticamente al cargar la página
- Puedes hacer clic en el botón de play para saltar la carga
- Los botones de navegación a la derecha permiten desplazarse entre secciones
- El portfolio es completamente responsivo

## Próximos Pasos

- Agrega tus imágenes reales en la carpeta `imagenes/`
- Personaliza los enlaces de redes sociales
- Agrega los enlaces reales a tus proyectos
- Configura el botón de descarga de CV

¡Disfruta tu nuevo portfolio! 🚀

# Nahuel_Portafolio
