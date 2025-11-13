import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Configuración de MySQL
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'agrotrack'
};

// Validar que las credenciales de MySQL estén configuradas
if (!process.env.DB_PASS) {
    console.warn('⚠️  ADVERTENCIA: DB_PASS no está configurada en el archivo .env');
    console.warn('   El servidor intentará conectarse sin contraseña, lo cual puede fallar.');
    console.warn('   Crea un archivo .env basado en .env.example y configura tu contraseña de MySQL.');
}

// Crear pool de conexiones MySQL (más eficiente que crear conexiones individuales)
const pool = mysql.createPool({
    ...dbConfig,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Función para obtener conexión del pool
export async function getConnection() {
    try {
        const connection = await pool.getConnection();
        return connection;
    } catch (error) {
        console.error('Error al obtener conexión del pool:', error.message);
        if (error.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error('💡 Solución: Verifica que las credenciales en el archivo .env sean correctas.');
            console.error('   Asegúrate de que el archivo .env existe y contiene DB_PASS con tu contraseña de MySQL.');
        }
        throw error;
    }
}

// Exportar el pool para cierre al terminar
export { pool };


