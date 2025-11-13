// Middleware centralizado para manejo de errores

export function errorHandler(err, req, res, next) {
    console.error('Error en el servidor:', err);
    
    // Si la respuesta ya fue enviada, delegar al handler por defecto de Express
    if (res.headersSent) {
        return next(err);
    }
    
    // Determinar el código de estado
    const statusCode = err.statusCode || err.status || 500;
    const message = err.message || 'Ha ocurrido un error inesperado.';
    
    // Responder con JSON para APIs o HTML para rutas web
    if (req.path.startsWith('/api')) {
        // Respuesta JSON para endpoints de API
        res.status(statusCode).json({
            error: true,
            message: message,
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
        });
    } else {
        // Respuesta HTML para rutas web usando plantilla EJS
        res.status(statusCode).render('error500', {
            mensaje: message
        });
    }
}

