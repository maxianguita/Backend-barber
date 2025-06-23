// config/db.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    logging: false
  }
);
async function testConnection() {
  try{
      await sequelize.authenticate();
      console.log('Conexion exitosa a Postgre')
  }catch (error){
      console.log(' Error al conectar a base de datos');
      
  }
  
}  
testConnection();

module.exports = sequelize;
