// // config/db.js
// const { Sequelize } = require('sequelize');
// require('dotenv').config();

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     dialect: 'postgres',
//     port: process.env.DB_PORT,
//     logging: false
//   }
// );
// async function testConnection() {
//   try{
//       await sequelize.authenticate();
//       console.log('Conexion exitosa a Postgre')
//   }catch (error){
//       console.log(' Error al conectar a base de datos');
      
//   }
  
// }  
// testConnection();

// module.exports = sequelize;
require('dotenv').config();

const { Sequelize } = require('sequelize');

const isProduction = process.env.NODE_ENV === 'production';

const databaseUrl = isProduction
  ? process.env.DATABASE_URL // Esta variable debe estar definida en Railway (producción)
  : 'postgres://postgres:zeus2025@localhost:5432/turnos_barber'; // Local

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: isProduction ? {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  } : {},
  logging: false,
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión exitosa a PostgreSQL');
  } catch (error) {
    console.error('❌ Error al conectar a la base de datos:', error);
  }
}

testConnection();

module.exports = sequelize;
