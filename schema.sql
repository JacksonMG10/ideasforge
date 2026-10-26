CREATE DATABASE IF NOT EXISTS ideasforge_db;
USE ideasforge_db;

CREATE TABLE IF NOT EXISTS categorias_innovacion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    area VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS proyectos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    progreso_porcentaje INT DEFAULT 0,
    categoria_id INT,
    FOREIGN KEY (categoria_id) REFERENCES categorias_innovacion(id) ON DELETE SET NULL
);

INSERT INTO categorias_innovacion (nombre, area) VALUES
('Algoritmos', 'Inteligencia Artificial'),
('Gráficos', 'Desarrollo Multimedial'),
('Ciberseguridad', 'Infraestructura y Redes');

INSERT INTO proyectos (titulo, progreso_porcentaje, categoria_id) VALUES
('IA de Análisis Predictivo', 85, 1),
('Motor de Renderizado 3D', 60, 2),
('Sistema de Encriptación Quantum', 95, 3);