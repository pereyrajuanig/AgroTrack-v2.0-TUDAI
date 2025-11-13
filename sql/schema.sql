-- Script SQL para crear la base de datos y tabla de AgroTrack
-- Actividad Obligatoria 2 - Programación Web II

-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS agrotrack;

-- Usar la base de datos
USE agrotrack;

-- Crear la tabla de contactos
CREATE TABLE IF NOT EXISTS contactos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    mensaje TEXT NOT NULL,
    fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

