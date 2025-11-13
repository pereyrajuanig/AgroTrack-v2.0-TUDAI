import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import { pool } from './db.js';
import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import contactosRouter from './routes/contactos.js';
import * as paginaController from './controllers/paginaController.js';

// Cargar variables de entorno
dotenv.config();

// Obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración del servidor
const PORT = process.env.PORT || 8888;

// Crear la aplicación Express
const app = express();

// Middleware para parsear JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de logger
app.use(logger);

// Configurar motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir archivos estáticos desde la carpeta public
app.use(express.static('public'));

// Rutas GET (Páginas Web)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/productos.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'productos.html'));
});

app.get('/contacto.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contacto.html'));
});

app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Endpoint de verificación de salud (GET /health)
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// API REST de contactos
app.use('/api/contactos', contactosRouter);

// Ruta para listar consultas (mantener compatibilidad con versión anterior)
app.get('/contacto/listar', paginaController.listarConsultas);

// Rutas POST (mantener compatibilidad con versión anterior)
app.post('/auth/recuperar', paginaController.procesarLogin);
app.post('/contacto/cargar', paginaController.procesarContacto);

// Manejo de errores generales (debe ir ANTES del 404)
app.use(errorHandler);

// Manejo de errores 404 (debe ir al final, después de todas las rutas)
app.use((req, res) => {
    res.status(404).render('error404');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor AgroTrack ejecutándose en http://localhost:${PORT}`);
    console.log(`📁 Sirviendo archivos desde: ./public/`);
    console.log(`💾 Base de datos: ${process.env.DB_NAME || 'agrotrack'} en ${process.env.DB_HOST || 'localhost'}`);
    console.log(`\n🔗 Rutas disponibles:`);
    console.log(`   GET  / - Página principal`);
    console.log(`   GET  /health - Estado del servidor (JSON)`);
    console.log(`   GET  /api/contactos - Listar contactos (API REST)`);
    console.log(`   POST /api/contactos - Crear contacto (API REST)`);
    console.log(`   GET  /productos.html - Productos agroindustriales`);
    console.log(`   GET  /contacto.html - Formulario de contacto`);
    console.log(`   GET  /login.html - Formulario de login`);
    console.log(`   POST /auth/recuperar - Procesar login`);
    console.log(`   POST /contacto/cargar - Procesar contacto`);
    console.log(`   GET  /contacto/listar - Listar consultas`);
});

// Manejo de cierre del servidor
process.on('SIGINT', async () => {
    console.log('\n🛑 Cerrando servidor...');
    // Cerrar el pool de conexiones antes de salir
    await pool.end();
    process.exit(0);
});

