import express from 'express';
import * as contactoController from '../controllers/contactoController.js';

const router = express.Router();

// GET /api/contactos - Listar todos los contactos
router.get('/', contactoController.listarContactos);

// POST /api/contactos - Crear un nuevo contacto
router.post('/', contactoController.crearContacto);

export default router;

