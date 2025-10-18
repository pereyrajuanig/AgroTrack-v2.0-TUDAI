import http from 'node:http';
import fs from 'node:fs';
import url from 'node:url';
import path from 'node:path';

// Puerto del servidor
const PORT = 8888;

// Función para obtener el MIME type según la extensión del archivo
function getMimeType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon',
        '.txt': 'text/plain'
    };
    return mimeTypes[ext] || 'text/plain';
}

// Función para leer archivos de forma asíncrona
function readFileAsync(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

// Función para escribir archivos de forma asíncrona
function appendFileAsync(filePath, data) {
    return new Promise((resolve, reject) => {
        fs.appendFile(filePath, data, (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
}

// Función para servir archivos estáticos
async function serveStaticFile(res, filePath, contentType = null) {
    try {
        const data = await readFileAsync(filePath);
        const mimeType = contentType || getMimeType(filePath);
        
        res.writeHead(200, {
            'Content-Type': mimeType,
            'Content-Length': data.length
        });
        res.end(data);
    } catch (error) {
        console.error('Error al leer archivo:', error);
        res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Error Interno</title>
                <link rel="stylesheet" href="/estilos.css">
            </head>
            <body>
                <div class="container">
                    <h1>Error interno del servidor</h1>
                    <p>Ha ocurrido un error al procesar tu solicitud.</p>
                    <a href="/" class="btn">Volver al inicio</a>
                </div>
            </body>
            </html>
        `);
    }
}

// Función para manejar página 404
function serve404(res) {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Página no encontrada</title>
            <link rel="stylesheet" href="/estilos.css">
        </head>
        <body>
            <div class="container">
                <h1>404 - Página no encontrada</h1>
                <p>La página que buscas no existe.</p>
                <a href="/" class="btn">Volver al inicio</a>
            </div>
        </body>
        </html>
    `);
}

// Función para parsear el cuerpo de la petición POST
function parsePostData(req) {
    return new Promise((resolve) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            resolve(body);
        });
    });
}

// Crear el servidor HTTP
const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const method = req.method;

    console.log(`${method} ${pathname}`);

    try {
        // Rutas GET
        if (method === 'GET') {
            switch (pathname) {
                case '/':
                    await serveStaticFile(res, './public/index.html');
                    break;
                
                case '/productos.html':
                    await serveStaticFile(res, './public/productos.html');
                    break;
                
                case '/contacto.html':
                    await serveStaticFile(res, './public/contacto.html');
                    break;
                
                case '/login.html':
                    await serveStaticFile(res, './public/login.html');
                    break;
                
                case '/estilos.css':
                    await serveStaticFile(res, './public/estilos.css');
                    break;
                
                case '/contacto/listar':
                    await handleContactList(res);
                    break;
                
                default:
                    serve404(res);
                    break;
            }
        }
        // Rutas POST
        else if (method === 'POST') {
            switch (pathname) {
                case '/auth/recuperar':
                    await handleLogin(req, res);
                    break;
                
                case '/contacto/cargar':
                    await handleContactSubmit(req, res);
                    break;
                
                default:
                    serve404(res);
                    break;
            }
        }
        else {
            serve404(res);
        }
    } catch (error) {
        console.error('Error en el servidor:', error);
        res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Error Interno</title>
                <link rel="stylesheet" href="/estilos.css">
            </head>
            <body>
                <div class="container">
                    <h1>Error interno del servidor</h1>
                    <p>Ha ocurrido un error inesperado.</p>
                    <a href="/" class="btn">Volver al inicio</a>
                </div>
            </body>
            </html>
        `);
    }
});

// Función para manejar el login
async function handleLogin(req, res) {
    try {
        const body = await parsePostData(req);
        const params = new URLSearchParams(body);
        const usuario = params.get('usuario') || '';
        const clave = params.get('clave') || '';

        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Datos Recibidos</title>
                <link rel="stylesheet" href="/estilos.css">
            </head>
            <body>
                <div class="container">
                    <h2>Datos recibidos</h2>
                    <div class="data-display">
                        <p><strong>Usuario:</strong> ${usuario}</p>
                        <p><strong>Clave:</strong> ${clave}</p>
                    </div>
                    <a href="/" class="btn">Volver al inicio</a>
                </div>
            </body>
            </html>
        `);
    } catch (error) {
        console.error('Error en login:', error);
        throw error;
    }
}

// Función para manejar el envío de consultas de contacto
async function handleContactSubmit(req, res) {
    try {
        const body = await parsePostData(req);
        const params = new URLSearchParams(body);
        const nombre = params.get('nombre') || '';
        const email = params.get('email') || '';
        const mensaje = params.get('mensaje') || '';

        // Crear la entrada con el formato especificado
        const fecha = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const entrada = `-------------------------
Fecha: ${fecha}
Nombre: ${nombre}
Email: ${email}
Mensaje: ${mensaje}
-------------------------

`;

        // Asegurar que la carpeta data existe
        if (!fs.existsSync('./data')) {
            fs.mkdirSync('./data');
        }

        // Guardar la consulta en el archivo
        await appendFileAsync('./data/consultas.txt', entrada);

        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Consulta Enviada</title>
                <link rel="stylesheet" href="/estilos.css">
            </head>
            <body>
                <div class="container">
                    <h2>¡Gracias por tu consulta!</h2>
                    <p>Hemos recibido tu mensaje y te responderemos pronto.</p>
                    <div class="success-message">
                        <p><strong>Nombre:</strong> ${nombre}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Mensaje:</strong> ${mensaje}</p>
                    </div>
                    <a href="/" class="btn">Volver al inicio</a>
                    <a href="/contacto/listar" class="btn btn-secondary">Ver todas las consultas</a>
                </div>
            </body>
            </html>
        `);
    } catch (error) {
        console.error('Error al guardar consulta:', error);
        throw error;
    }
}

// Función para listar las consultas
async function handleContactList(res) {
    try {
        let contenido = '';
        let existeArchivo = false;

        // Verificar si el archivo existe
        try {
            contenido = await readFileAsync('./data/consultas.txt');
            existeArchivo = true;
        } catch (error) {
            // El archivo no existe o está vacío
            existeArchivo = false;
        }

        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        
        if (existeArchivo && contenido.toString().trim()) {
            res.end(`
                <!DOCTYPE html>
                <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Consultas Recibidas</title>
                    <link rel="stylesheet" href="/estilos.css">
                </head>
                <body>
                    <div class="container">
                        <h2>Consultas Recibidas</h2>
                        <div class="consultas-container">
                            <pre>${contenido.toString()}</pre>
                        </div>
                        <a href="/" class="btn">Volver al inicio</a>
                        <a href="/contacto.html" class="btn btn-secondary">Nueva consulta</a>
                    </div>
                </body>
                </html>
            `);
        } else {
            res.end(`
                <!DOCTYPE html>
                <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Consultas Recibidas</title>
                    <link rel="stylesheet" href="/estilos.css">
                </head>
                <body>
                    <div class="container">
                        <h2>Consultas Recibidas</h2>
                        <p class="no-data">Aún no hay consultas</p>
                        <a href="/" class="btn">Volver al inicio</a>
                        <a href="/contacto.html" class="btn btn-secondary">Nueva consulta</a>
                    </div>
                </body>
                </html>
            `);
        }
    } catch (error) {
        console.error('Error al listar consultas:', error);
        throw error;
    }
}

// Iniciar el servidor
server.listen(PORT, () => {
    console.log(`🚀 Servidor AgroTrack ejecutándose en http://localhost:${PORT}`);
    console.log(`📁 Sirviendo archivos desde: ./public/`);
    console.log(`💾 Datos guardados en: ./data/`);
    console.log(`\n🔗 Rutas disponibles:`);
    console.log(`   GET  / - Página principal`);
    console.log(`   GET  /productos.html - Productos agroindustriales`);
    console.log(`   GET  /contacto.html - Formulario de contacto`);
    console.log(`   GET  /login.html - Formulario de login`);
    console.log(`   POST /auth/recuperar - Procesar login`);
    console.log(`   POST /contacto/cargar - Procesar contacto`);
    console.log(`   GET  /contacto/listar - Listar consultas`);
});

// Manejo de errores del servidor
server.on('error', (error) => {
    console.error('Error del servidor:', error);
});

// Manejo de cierre del servidor
process.on('SIGINT', () => {
    console.log('\n🛑 Cerrando servidor...');
    server.close(() => {
        console.log('✅ Servidor cerrado correctamente');
        process.exit(0);
    });
});


