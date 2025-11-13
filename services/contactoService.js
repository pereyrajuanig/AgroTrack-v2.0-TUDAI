// Servicio para manejar la lógica de negocio de contactos
import { getConnection } from '../db.js';

// Función para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para validar y sanitizar datos de entrada
export function validateContactData(nombre, email, mensaje) {
    const errors = [];
    
    // Validar nombre
    if (!nombre || nombre.trim().length === 0) {
        errors.push('El nombre es requerido');
    } else if (nombre.trim().length > 255) {
        errors.push('El nombre es demasiado largo (máximo 255 caracteres)');
    }
    
    // Validar email
    if (!email || email.trim().length === 0) {
        errors.push('El email es requerido');
    } else if (!isValidEmail(email.trim())) {
        errors.push('El email no tiene un formato válido');
    } else if (email.trim().length > 255) {
        errors.push('El email es demasiado largo (máximo 255 caracteres)');
    }
    
    // Validar mensaje
    if (!mensaje || mensaje.trim().length === 0) {
        errors.push('El mensaje es requerido');
    } else if (mensaje.trim().length > 65535) {
        errors.push('El mensaje es demasiado largo');
    }
    
    return {
        isValid: errors.length === 0,
        errors,
        data: {
            nombre: nombre ? nombre.trim() : '',
            email: email ? email.trim() : '',
            mensaje: mensaje ? mensaje.trim() : ''
        }
    };
}

// Obtener todos los contactos
export async function getAllContactos() {
    let connection;
    try {
        connection = await getConnection();
        const [rows] = await connection.execute(
            'SELECT id, nombre, email, mensaje, fecha FROM contactos ORDER BY fecha DESC'
        );
        connection.release();
        return rows;
    } catch (error) {
        if (connection) {
            connection.release();
        }
        throw error;
    }
}

// Crear un nuevo contacto
export async function createContacto(nombre, email, mensaje) {
    let connection;
    try {
        const fecha = new Date();
        connection = await getConnection();
        
        const [result] = await connection.execute(
            'INSERT INTO contactos (fecha, nombre, email, mensaje) VALUES (?, ?, ?, ?)',
            [fecha, nombre, email, mensaje]
        );

        connection.release();

        // Obtener el contacto creado
        connection = await getConnection();
        const [rows] = await connection.execute(
            'SELECT id, nombre, email, mensaje, fecha FROM contactos WHERE id = ?',
            [result.insertId]
        );
        connection.release();

        return rows[0];
    } catch (error) {
        if (connection) {
            connection.release();
        }
        throw error;
    }
}


