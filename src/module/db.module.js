// Carga las variables de entorno desde un archivo .env a process.env
require('dotenv').config();

// Importa la clase Sequelize desde el paquete 'sequelize'
const { Sequelize } = require('sequelize');

// Configuración de Sequelize utilizando variables de entorno para mayor seguridad y flexibilidad
const sequelize = new Sequelize({
  database: process.env.DB_NAME,        // Nombre de la base de datos
  username: process.env.DB_USER,        // Nombre de usuario para la base de datos
  password: process.env.DB_PASSWORD,    // Contraseña para el usuario de la base de datos
  host: process.env.DB_HOST,            // Dirección del host donde se encuentra la base de datos
  port: process.env.DB_PORT,            // Puerto en el que se está ejecutando la base de datos
  dialect: 'mysql',                     // Dialecto de la base de datos que Sequelize usará (en este caso, MySQL)
  logging: false,                       // Desactiva el logging de las consultas SQL (opcional)
});

// Función autoejecutable para verificar la conexión a la base de datos
(async () => {
    try {
      // Intenta autenticar la conexión con la base de datos
      await sequelize.authenticate();
      console.log('Conexión a la base de datos exitosa.');
    } catch (error) {
      // Captura y muestra cualquier error que ocurra durante la autenticación
      console.error('No se pudo conectar a la base de datos:', error);
    }
  })();

// Exporta la instancia de Sequelize para que pueda ser utilizada en otras partes de la aplicación
module.exports = sequelize;
