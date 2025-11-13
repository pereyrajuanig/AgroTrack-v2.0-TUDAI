// Middleware de logger para registrar todas las peticiones HTTP

export function logger(req, res, next) {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.originalUrl || req.url;
    const ip = req.ip || req.connection.remoteAddress;
    
    // Registrar la petición
    console.log(`[${timestamp}] ${method} ${url} - IP: ${ip}`);
    
    // Continuar con el siguiente middleware
    next();
}


