// Controlador para manejar las peticiones HTTP de contactos
import * as contactoService from '../services/contactoService.js';

// GET /api/contactos - Listar todos los contactos
export async function listarContactos(req, res, next) {
    try {
        const contactos = await contactoService.getAllContactos();
        
        res.json({
            success: true,
            data: contactos,
            count: contactos.length
        });
    } catch (error) {
        next(error);
    }
}

// POST /api/contactos - Crear un nuevo contacto
export async function crearContacto(req, res, next) {
    try {
        // Validar y sanitizar datos de entrada
        const validation = contactoService.validateContactData(
            req.body.nombre,
            req.body.email,
            req.body.mensaje
        );

        // Si hay errores de validación, devolver 400
        if (!validation.isValid) {
            return res.status(400).json({
                success: false,
                error: 'Error de validación',
                errors: validation.errors
            });
        }

        // Crear el contacto usando el servicio
        const contacto = await contactoService.createContacto(
            validation.data.nombre,
            validation.data.email,
            validation.data.mensaje
        );

        res.status(201).json({
            success: true,
            message: 'Contacto creado exitosamente',
            data: contacto
        });
    } catch (error) {
        next(error);
    }
}


