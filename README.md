# 🌾 AgroTrack v2.0 - Sistema de Gestión Agroindustrial

## 📋 Información del Proyecto

**Nombre del Estudiante:** Pereyra Juan Ignacio  
**Materia:** Desarrollo Web II  
**Carrera:** T.U.D.A.I  
**Versión:** 2.0  
**Actividad:** Obligatoria 2

## 📌 Sobre esta Versión

**AgroTrack v2.0** es la evolución del proyecto desarrollado en la Actividad Obligatoria 1. Esta versión incorpora los conocimientos de las Unidades 4, 5 y 6 del programa, migrando de un servidor HTTP básico con módulos nativos de Node.js a una arquitectura moderna con **Express.js** y **MySQL**.

### Principales Mejoras respecto a v1.0

- ✅ Migración de servidor HTTP nativo a **Express.js**
- ✅ Implementación de **API REST** con endpoints JSON
- ✅ Integración con **base de datos MySQL** para persistencia
- ✅ Arquitectura **MVC** con separación de responsabilidades
- ✅ Motor de plantillas **EJS** para renderizado seguro
- ✅ Middleware de logging y manejo centralizado de errores
- ✅ Validación robusta de datos con códigos de estado HTTP apropiados
- ✅ Pool de conexiones MySQL para mejor rendimiento 

## 🚀 Instrucciones de Ejecución

### Requisitos Previos
- Node.js versión 14 o superior
- MySQL 5.7 o superior (o MariaDB 10.2+)
- Sistema operativo Windows, macOS o Linux

### Instalación de Dependencias

1. Clonar o descargar el proyecto
2. Abrir terminal/cmd en la carpeta del proyecto
3. Instalar las dependencias de Node.js:
   ```bash
   npm install
   ```

### Configuración de la Base de Datos

1. Asegúrate de que MySQL esté instalado y ejecutándose
2. Crea la base de datos y tabla ejecutando el script SQL:
   ```bash
   mysql -u root -p < sql/schema.sql
   ```
   
   O ejecuta manualmente en MySQL:
   ```sql
   CREATE DATABASE IF NOT EXISTS agrotrack;
   USE agrotrack;
   CREATE TABLE IF NOT EXISTS contactos (
       id INT AUTO_INCREMENT PRIMARY KEY,
       nombre VARCHAR(255) NOT NULL,
       email VARCHAR(255) NOT NULL,
       mensaje TEXT NOT NULL,
       fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
   );
   ```

### Configuración del Archivo .env

1. Copia el archivo de ejemplo:
   ```bash
   cp .env.example .env
   ```

2. Edita el archivo `.env` y configura las variables según tu entorno:
   ```env
   PORT=8888
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=tu_contraseña_mysql
   DB_NAME=agrotrack
   ```

### Ejecutar el Servidor

1. Ejecutar el comando:
   ```bash
   npm start
   ```
   O directamente:
   ```bash
   node app.js
   ```

2. Abrir navegador en: `http://localhost:8888`

### Puerto Utilizado
**Puerto:** 8888 (configurable en `.env`)

## 🔗 Descripción de Rutas

### Endpoint de Verificación

| Ruta | Método | Descripción | Respuesta |
|------|--------|-------------|-----------|
| `/health` | GET | Estado del servidor | `{ "status": "ok" }` (JSON) |

### API REST de Contactos

| Ruta | Método | Descripción | Respuesta |
|------|--------|-------------|-----------|
| `/api/contactos` | GET | Listar todos los contactos | JSON con array de contactos |
| `/api/contactos` | POST | Crear un nuevo contacto | JSON con el contacto creado |

**Ejemplo GET /api/contactos:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nombre": "Juan Pérez",
      "email": "juan@example.com",
      "mensaje": "Consulta sobre productos",
      "fecha": "2024-01-15 10:30:00"
    }
  ],
  "count": 1
}
```

**Ejemplo POST /api/contactos:**
```json
// Request Body (JSON o form-urlencoded)
{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "mensaje": "Consulta sobre productos"
}

// Response (201 Created)
{
  "success": true,
  "message": "Contacto creado exitosamente",
  "data": {
    "id": 1,
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "mensaje": "Consulta sobre productos",
    "fecha": "2024-01-15 10:30:00"
  }
}
```

**Error de validación (400 Bad Request):**
```json
{
  "success": false,
  "error": "Error de validación",
  "errors": [
    "El email no tiene un formato válido",
    "El mensaje es requerido"
  ]
}
```

### Rutas GET (Páginas Web)

| Ruta | Descripción | Archivo Servido |
|------|-------------|-----------------|
| `/` | Página principal con información sobre AgroTrack | `public/index.html` |
| `/productos.html` | Catálogo de productos y servicios agroindustriales | `public/productos.html` |
| `/contacto.html` | Formulario de contacto y información de la empresa | `public/contacto.html` |
| `/login.html` | Formulario de acceso al sistema | `public/login.html` |
| `/estilos.css` | Archivo de estilos CSS | `public/estilos.css` |
| `/contacto/listar` | Lista todas las consultas recibidas desde MySQL | Contenido dinámico (HTML) |

### Rutas POST (Procesamiento de Formularios)

| Ruta | Descripción | Función |
|------|-------------|---------|
| `/auth/recuperar` | Procesa datos de login y los muestra | Autenticación de demostración |
| `/contacto/cargar` | Guarda consulta de contacto en MySQL | Almacenamiento en base de datos (HTML) |

## 📝 Ejemplos de Respuestas Esperadas

### GET `/health`
- **Respuesta:** JSON con estado del servidor
- **Content-Type:** `application/json`
- **Código:** 200 OK
```json
{
  "status": "ok"
}
```

### GET `/api/contactos`
- **Respuesta:** JSON con lista de contactos
- **Content-Type:** `application/json`
- **Código:** 200 OK
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nombre": "Juan Pérez",
      "email": "juan@example.com",
      "mensaje": "Consulta sobre productos",
      "fecha": "2024-01-15 10:30:00"
    }
  ],
  "count": 1
}
```

### POST `/api/contactos`
- **Entrada (JSON):** 
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "mensaje": "Consulta sobre servicios"
}
```
- **Respuesta:** JSON con contacto creado
- **Content-Type:** `application/json`
- **Código:** 201 Created
```json
{
  "success": true,
  "message": "Contacto creado exitosamente",
  "data": {
    "id": 1,
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "mensaje": "Consulta sobre servicios",
    "fecha": "2024-01-15 10:30:00"
  }
}
```

### POST `/api/contactos` (Error de validación)
- **Entrada inválida:** `{ "nombre": "", "email": "email-invalido" }`
- **Respuesta:** JSON con errores
- **Content-Type:** `application/json`
- **Código:** 400 Bad Request
```json
{
  "success": false,
  "error": "Error de validación",
  "errors": [
    "El nombre es requerido",
    "El email no tiene un formato válido",
    "El mensaje es requerido"
  ]
}
```

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
- **Almacenamiento:** Se guarda en la tabla `contactos` de MySQL

### GET `/contacto/listar`
- **Respuesta:** Lista de todas las consultas guardadas en formato estructurado
- **Formato:** Texto plano dentro de etiquetas `<pre>`
- **Origen:** Datos obtenidos desde MySQL

## ⚙️ Justificación Técnica

### Framework Express
El servidor utiliza Express.js para:
- **Manejo de rutas:** Sistema de routing simplificado y flexible con inyección de controladores
- **Middleware:** Procesamiento automático de datos de formularios con `express.urlencoded()` y `express.json()`
- **Archivos estáticos:** Servicio automático con `express.static()`
- **Manejo de errores:** Middleware centralizado para errores 404 y 500
- **Arquitectura modular:** Separación en rutas, controladores y servicios para mejor escalabilidad

### Base de Datos MySQL
El sistema utiliza MySQL2 para:
- **Conexiones asíncronas:** Promesas nativas para operaciones no bloqueantes
- **Prepared statements:** Protección contra inyección SQL
- **Gestión de conexiones:** Apertura y cierre automático de conexiones
- **Almacenamiento persistente:** Reemplazo del sistema de archivos por base de datos relacional

### Operaciones Asíncronas
El servidor utiliza operaciones asíncronas para:
- **Consultas a MySQL:** `mysql2/promise` con async/await
- **Manejo de errores:** Try-catch con async/await para gestión robusta de errores
- **Cierre de conexiones:** Garantiza el cierre correcto en bloques `finally`

### Gestión de Errores

#### Error 404 (Not Found)
- **Cuándo:** Ruta no encontrada
- **Respuesta:** Página HTML personalizada con mensaje y enlace al inicio
- **Código:** 404

#### Error 500 (Internal Server Error)
- **Cuándo:** Errores de conexión a MySQL o errores del servidor
- **Respuesta:** Página HTML con mensaje de error interno
- **Código:** 500
- **Logging:** Errores registrados en consola para debugging

## 🏗️ Arquitectura del Sistema

### Dependencias Utilizadas
- **`express`:** Framework web para Node.js (v4.18.2)
- **`mysql2`:** Cliente MySQL con soporte para promesas (v3.6.5)
- **`dotenv`:** Carga variables de entorno desde archivo `.env` (v16.3.1)
- **`ejs`:** Motor de plantillas para renderizado seguro de HTML (v3.1.10)
- **`path`:** Manejo de rutas de archivos (nativo)
- **`url`:** Parsing de URLs (nativo, usado implícitamente por Express)

### Estructura de Archivos
```
AgroTrack-js/              # Proyecto v2.0
├── app.js                 # Servidor Express principal (reemplaza server.js de v1.0)
├── db.js                  # Configuración de base de datos MySQL
├── package.json           # Dependencias del proyecto
├── package-lock.json      # Lock file de dependencias
├── .env                   # Variables de entorno (no versionado)
├── .env.example           # Ejemplo de configuración
├── routes/                # Rutas de la aplicación
│   └── contactos.js      # Rutas de la API REST (inyecta controladores)
├── controllers/           # Controladores (manejan peticiones HTTP)
│   ├── contactoController.js  # Controlador de contactos (API REST)
│   └── paginaController.js    # Controlador de páginas HTML
├── services/             # Servicios (lógica de negocio)
│   └── contactoService.js    # Servicio de contactos (validaciones y BD)
├── middleware/           # Middlewares personalizados
│   ├── logger.js         # Middleware de logging
│   └── errorHandler.js   # Middleware de manejo de errores
├── views/                # Plantillas EJS (motor de plantillas)
│   ├── error404.ejs      # Página de error 404
│   ├── error500.ejs      # Página de error 500
│   ├── consultasListar.ejs
│   ├── contactoEnviado.ejs
│   ├── errorValidacion.ejs
│   └── loginResultado.ejs
├── sql/                   # Scripts SQL
│   └── schema.sql        # Script de creación de base de datos y tabla
├── public/                # Archivos estáticos
│   ├── index.html         # Página principal
│   ├── productos.html     # Catálogo de productos
│   ├── contacto.html      # Formulario de contacto
│   ├── login.html         # Formulario de acceso
│   └── estilos.css        # Estilos CSS
├── .gitignore            # Archivos a ignorar en Git
├── README.md             # Este archivo
└── AgroTrack_Postman_Collection.json  # Colección Postman con todos los endpoints
```

### Arquitectura del Sistema (Patrón MVC)

El proyecto sigue una arquitectura modular basada en el patrón **MVC (Model-View-Controller)** con separación de responsabilidades:

#### Capas de la Arquitectura

1. **Routes (Rutas)** - `routes/contactos.js`
   - Define las rutas de la API
   - Inyecta controladores como callbacks
   - Sin lógica de negocio

2. **Controllers (Controladores)** - `controllers/contactoController.js`
   - Maneja las peticiones HTTP (req, res)
   - Valida datos de entrada
   - Llama a los servicios
   - Formatea las respuestas

3. **Services (Servicios)** - `services/contactoService.js`
   - Contiene la lógica de negocio
   - Realiza validaciones de datos
   - Accede a la base de datos
   - Reutilizable desde múltiples controladores

4. **Database (Base de Datos)** - `db.js`
   - Configuración del pool de conexiones MySQL
   - Gestión de conexiones

#### Ventajas de esta Arquitectura

- ✅ **Escalable**: Fácil agregar nuevas funcionalidades sin modificar código existente
- ✅ **Mantenible**: Separación clara de responsabilidades
- ✅ **Testeable**: Cada capa puede probarse independientemente
- ✅ **Reutilizable**: Los servicios pueden usarse desde múltiples controladores
- ✅ **Inyección de Dependencias**: Los controladores se inyectan como callbacks en las rutas

### Flujo de Datos

1. **Cliente** envía petición HTTP
2. **Express** parsea URL y método
3. **Router** (`routes/`) determina la ruta e inyecta el controlador correspondiente
4. **Controller** (`controllers/`) recibe la petición y valida los datos
5. **Service** (`services/`) ejecuta la lógica de negocio y accede a la BD
6. **Database** (`db.js`) realiza las operaciones en MySQL
7. **Controller** formatea la respuesta (JSON o HTML)
8. **Cliente** recibe la respuesta apropiada

#### Ejemplo de Código - Arquitectura Modular

**Router** (`routes/contactos.js`):
```javascript
import express from 'express';
import * as contactoController from '../controllers/contactoController.js';

const router = express.Router();

// Inyección de controladores como callbacks
router.get('/', contactoController.listarContactos);
router.post('/', contactoController.crearContacto);

export default router;
```

**Controller** (`controllers/contactoController.js`):
```javascript
import * as contactoService from '../services/contactoService.js';

export async function crearContacto(req, res, next) {
    try {
        // Validación usando el servicio
        const validation = contactoService.validateContactData(...);
        
        // Lógica de negocio delegada al servicio
        const contacto = await contactoService.createContacto(...);
        
        // Formatear respuesta
        res.status(201).json({ success: true, data: contacto });
    } catch (error) {
        next(error);
    }
}
```

**Service** (`services/contactoService.js`):
```javascript
import { getConnection } from '../db.js';

export async function createContacto(nombre, email, mensaje) {
    // Lógica de negocio y acceso a BD
    const connection = await getConnection();
    // ... operaciones en MySQL
    return contacto;
}
```

## 🔧 Características Técnicas

### Seguridad
- Prepared statements para prevenir inyección SQL
- Variables de entorno para credenciales sensibles
- Validación de entrada de datos
- Manejo seguro de conexiones a base de datos

### Rendimiento
- Servidor asíncrono no bloqueante
- Caching de archivos estáticos por Express
- Conexiones MySQL eficientes
- Manejo eficiente de memoria

### Mantenibilidad
- Código modular y comentado
- Separación clara de responsabilidades
- Manejo centralizado de errores
- Logging detallado para debugging
- Configuración externa mediante variables de entorno

## 🧪 Pruebas y Validación

### Casos de Prueba Implementados
1. **Servicio de archivos estáticos:** Verificar que HTML/CSS se sirvan correctamente
2. **Formulario de contacto:** Probar envío y almacenamiento en MySQL
3. **Sistema de login:** Validar procesamiento de credenciales
4. **Manejo de errores:** Verificar respuestas 404 y 500
5. **Listado de consultas:** Comprobar visualización de datos desde MySQL

### Comandos de Prueba
```bash
# Iniciar servidor
npm start

# Probar rutas con curl (opcional)
curl http://localhost:8888/
curl http://localhost:8888/productos.html
curl -X POST http://localhost:8888/auth/recuperar -d "usuario=test&clave=123"
curl -X POST http://localhost:8888/contacto/cargar -d "nombre=Test&email=test@test.com&mensaje=Mensaje de prueba"
```

## 📚 Documentación Adicional

### API Endpoints
- Todos los endpoints están documentados en la colección Postman incluida
- Formato de datos: `application/x-www-form-urlencoded` para formularios
- Respuestas: HTML con diseño consistente

### Configuración del Servidor
- Puerto configurable mediante variable de entorno `PORT` (por defecto 8888)
- Host: localhost (configurable)
- Base de datos: Configurable mediante variables de entorno

### Estructura de la Base de Datos

**Tabla: `contactos`**
- `id` (INT, AUTO_INCREMENT, PRIMARY KEY)
- `nombre` (VARCHAR(255), NOT NULL)
- `email` (VARCHAR(255), NOT NULL)
- `mensaje` (TEXT, NOT NULL)
- `fecha` (DATETIME, NOT NULL, DEFAULT CURRENT_TIMESTAMP)

## 🎯 Objetivos Cumplidos - v2.0

### Requisitos de la Actividad Obligatoria 2

✅ **Servidor Express** configurado y funcionando  
✅ **API REST** completa: GET/POST `/api/contactos` con respuestas JSON  
✅ **Endpoint de verificación**: GET `/health` retorna `{status: 'ok'}`  
✅ **Base de datos MySQL** con tabla `contactos`  
✅ **Validación completa** de campos y formato de email  
✅ **Código 400** para errores de validación con mensajes descriptivos  
✅ **Middleware de logger** para registro de peticiones  
✅ **Middleware de errorHandler** centralizado  
✅ **Configuración con `.env`** usando dotenv  
✅ **Archivo `schema.sql`** en carpeta `sql/`  
✅ **Documentación completa** en README.md  
✅ **Colección Postman** con todos los endpoints  

### Mejoras Adicionales Implementadas

✅ **Arquitectura MVC** con separación en routes, controllers y services  
✅ **Motor de plantillas EJS** para renderizado seguro de HTML  
✅ **Pool de conexiones MySQL** para mejor rendimiento  
✅ **Inyección de dependencias** con controladores como callbacks  
✅ **Escape HTML** para prevenir vulnerabilidades XSS  
✅ **Prepared statements** para prevenir inyección SQL  
✅ **Estructura modular** escalable y mantenible  

---

**AgroTrack v2.0** - Desarrollado con Express.js, MySQL y EJS  
**Evolución de la Actividad Obligatoria 1** - Programación Web II
