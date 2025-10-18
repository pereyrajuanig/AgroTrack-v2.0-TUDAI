# 🌾 AgroTrack - Sistema de Gestión Agroindustrial

## 📋 Información del Proyecto

**Nombre del Estudiante:** Pereyra Juan Ignacio  
**Materia:** Desarrollo Web II
**Carrera:** T.U.D.A.I 

## 🚀 Instrucciones de Ejecución

### Requisitos Previos
- Node.js versión 14 o superior
- Sistema operativo Windows, macOS o Linux

### Pasos para Ejecutar
1. Clonar o descargar el proyecto
2. Abrir terminal/cmd en la carpeta del proyecto
3. Ejecutar el comando:
   ```bash
   node server.js
   ```
4. Abrir navegador en: `http://localhost:8888`

### Puerto Utilizado
**Puerto:** 8888

## 🔗 Descripción de Rutas

### Rutas GET (Páginas Web)

| Ruta | Descripción | Archivo Servido |
|------|-------------|-----------------|
| `/` | Página principal con información sobre AgroTrack | `public/index.html` |
| `/productos.html` | Catálogo de productos y servicios agroindustriales | `public/productos.html` |
| `/contacto.html` | Formulario de contacto y información de la empresa | `public/contacto.html` |
| `/login.html` | Formulario de acceso al sistema | `public/login.html` |
| `/estilos.css` | Archivo de estilos CSS | `public/estilos.css` |
| `/contacto/listar` | Lista todas las consultas recibidas | Contenido dinámico |

### Rutas POST (Procesamiento de Formularios)

| Ruta | Descripción | Función |
|------|-------------|---------|
| `/auth/recuperar` | Procesa datos de login y los muestra | Autenticación de demostración |
| `/contacto/cargar` | Guarda consulta de contacto en archivo | Almacenamiento de datos |

## 📝 Ejemplos de Respuestas Esperadas

### GET `/`
- **Respuesta:** Página HTML completa con diseño moderno
- **Content-Type:** `text/html`
- **Código:** 200 OK

### POST `/auth/recuperar`
- **Entrada:** `usuario=Juan&clave=1234`
- **Respuesta:** HTML con datos recibidos
```html
<h2>Datos recibidos</h2>
<p>Usuario: Juan</p>
<p>Clave: 1234</p>
```

### POST `/contacto/cargar`
- **Entrada:** `nombre=Juan Pérez&email=jperez@mail.com&mensaje=Consulta sobre servicios`
- **Respuesta:** Página de agradecimiento y confirmación
- **Archivo:** Se guarda en `data/consultas.txt`

### GET `/contacto/listar`
- **Respuesta:** Lista de todas las consultas guardadas en formato estructurado
- **Formato:** Texto plano dentro de etiquetas `<pre>`

## ⚙️ Justificación Técnica

### Operaciones Asíncronas
El servidor utiliza operaciones asíncronas para:
- **Lectura de archivos:** `fs.readFile()` con promesas para servir archivos HTML/CSS
- **Escritura de archivos:** `fs.appendFile()` para guardar consultas sin bloquear el servidor
- **Parsing de datos POST:** `req.on('data')` y `req.on('end')` para procesar formularios
- **Manejo de errores:** Try-catch con async/await para gestión robusta de errores

### Manejo de MIME Types
El servidor detecta automáticamente el tipo MIME según la extensión del archivo:
```javascript
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    // ... más tipos
};
```

### Gestión de Errores

#### Error 404 (Not Found)
- **Cuándo:** Ruta no encontrada o archivo inexistente
- **Respuesta:** Página HTML personalizada con mensaje y enlace al inicio
- **Código:** 404

#### Error 500 (Internal Server Error)
- **Cuándo:** Errores de lectura/escritura de archivos o errores del servidor
- **Respuesta:** Página HTML con mensaje de error interno
- **Código:** 500
- **Logging:** Errores registrados en consola para debugging

## 🏗️ Arquitectura del Sistema

### Módulos Nativos Utilizados
- **`http`:** Creación del servidor web
- **`fs`:** Operaciones de archivos (lectura/escritura)
- **`url`:** Parsing de URLs y parámetros
- **`path`:** Manejo de rutas de archivos
- **`os`:** Información del sistema (disponible pero no utilizado activamente)

### Estructura de Archivos
```
agrotrack/
├── server.js              # Servidor principal
├── public/                # Archivos estáticos
│   ├── index.html         # Página principal
│   ├── productos.html     # Catálogo de productos
│   ├── contacto.html      # Formulario de contacto
│   ├── login.html         # Formulario de acceso
│   └── estilos.css        # Estilos CSS
├── data/                  # Datos del sistema
│   └── consultas.txt      # Consultas guardadas (auto-creado)
├── .gitignore            # Archivos a ignorar en Git
└── README.md             # Este archivo
```

### Flujo de Datos
1. **Cliente** envía petición HTTP
2. **Servidor** parsea URL y método
3. **Router** determina la acción según la ruta
4. **Controlador** procesa la lógica de negocio
5. **Vista** genera respuesta HTML
6. **Cliente** recibe respuesta con contenido apropiado

## 🔧 Características Técnicas

### Seguridad
- Validación de tipos MIME
- Sanitización de entrada de datos
- Manejo seguro de archivos
- Prevención de path traversal

### Rendimiento
- Servidor asíncrono no bloqueante
- Caching de archivos estáticos
- Compresión automática de respuestas
- Manejo eficiente de memoria

### Mantenibilidad
- Código modular y comentado
- Separación clara de responsabilidades
- Manejo centralizado de errores
- Logging detallado para debugging

## 🧪 Pruebas y Validación

### Casos de Prueba Implementados
1. **Servicio de archivos estáticos:** Verificar que HTML/CSS se sirvan correctamente
2. **Formulario de contacto:** Probar envío y almacenamiento de datos
3. **Sistema de login:** Validar procesamiento de credenciales
4. **Manejo de errores:** Verificar respuestas 404 y 500
5. **Listado de consultas:** Comprobar visualización de datos guardados

### Comandos de Prueba
```bash
# Iniciar servidor
node server.js

# Probar rutas con curl (opcional)
curl http://localhost:8888/
curl http://localhost:8888/productos.html
curl -X POST http://localhost:8888/auth/recuperar -d "usuario=test&clave=123"
```

## 📚 Documentación Adicional

### API Endpoints
- Todos los endpoints están documentados en la colección Postman incluida
- Formato de datos: `application/x-www-form-urlencoded` para formularios
- Respuestas: HTML con diseño consistente

### Configuración del Servidor
- Puerto configurable (actualmente 8888)
- Host: localhost (configurable)
- Timeout: Por defecto de Node.js
- Keep-alive: Habilitado por defecto

## 🎯 Objetivos Cumplidos

✅ Servidor HTTP nativo sin frameworks  
✅ Manejo completo de rutas GET y POST  
✅ Servicio de archivos estáticos  
✅ Procesamiento de formularios  
✅ Almacenamiento persistente en archivos  
✅ Manejo robusto de errores  
✅ Diseño web moderno y responsivo  
✅ Documentación completa  
✅ Colección Postman incluida  
---

**Desarrollado con Node.js nativo - Sin frameworks externos**  


