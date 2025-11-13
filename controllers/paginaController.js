// Controlador para manejar las páginas web HTML
import { pool } from '../db.js';

// Función para escapar HTML
function escapeHtml(text) {
    if (typeof text !== 'string') return '';
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Listar consultas (HTML)
export async function listarConsultas(req, res, next) {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.execute(
            'SELECT id, fecha, nombre, email, mensaje FROM contactos ORDER BY fecha DESC'
        );

        connection.release();

        // Formatear las consultas (escapar para prevenir XSS)
        let contenido = '';
        if (rows.length > 0) {
            rows.forEach(consulta => {
                const fecha = new Date(consulta.fecha).toISOString().slice(0, 19).replace('T', ' ');
                contenido += `-------------------------
Fecha: ${fecha}
Nombre: ${escapeHtml(consulta.nombre)}
Email: ${escapeHtml(consulta.email)}
Mensaje: ${escapeHtml(consulta.mensaje)}
-------------------------

`;
            });
        }

        res.render('consultasListar', {
            consultas: rows,
            contenido: contenido
        });
    } catch (error) {
        if (connection) {
            connection.release();
        }
        next(error);
    }
}

// Procesar login (HTML)
export function procesarLogin(req, res) {
    const usuario = req.body.usuario || '';
    const clave = req.body.clave || '';

    res.render('loginResultado', {
        usuario: usuario,
        clave: clave
    });
}

// Procesar contacto (HTML)
export async function procesarContacto(req, res, next) {
    let connection;
    try {
        const nombre = req.body.nombre || '';
        const email = req.body.email || '';
        const mensaje = req.body.mensaje || '';

        // Validación básica
        if (!nombre || !email || !mensaje) {
            return res.status(400).render('errorValidacion');
        }

        // Insertar la consulta en la base de datos
        connection = await pool.getConnection();
        const fecha = new Date();
        
        await connection.execute(
            'INSERT INTO contactos (fecha, nombre, email, mensaje) VALUES (?, ?, ?, ?)',
            [fecha, nombre.trim(), email.trim(), mensaje.trim()]
        );

        connection.release();

        res.render('contactoEnviado', {
            nombre: nombre,
            email: email,
            mensaje: mensaje
        });
    } catch (error) {
        if (connection) {
            connection.release();
        }
        next(error);
    }
}

