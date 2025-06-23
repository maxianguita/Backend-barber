const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize } = require('../models'); // Importar Sequelize
const createAdminUser = require('../seeders'); // Seeder del admin

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Ruta de prueba (después la reemplazás con las reales)
app.get('/', (req, res) => {
  res.send('Servidor funcionando...');
});

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    // Conectar y sincronizar Sequelize
    await sequelize.authenticate();
    console.log('Conexión a la base de datos exitosa.');

    await sequelize.sync({ alter: true }); // Alternativa: { force: false }
    console.log('Modelos sincronizados.');

    // Ejecutar Seeder para crear Admin
    await createAdminUser();

    // Levantar servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });

  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
};

startServer();
