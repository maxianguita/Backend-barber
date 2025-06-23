const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');

const Usuario = require('./models/User');
const { Profesional, Disponibilidad } = require('./models');
const Slot = require('./models/Slot');

const userRoutes = require('./routes/UserRoutes');
const authRoutes = require('./routes/authRoutes');
const turnoRoutes = require('./routes/TurnosRoutes');
const disponibilidadRoutes = require('./routes/disponibilidadRoutes');
const profesionalRoutes = require('./routes/profesionalRoute');


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/usuarios', userRoutes);
// console.log('✅ Usuarios routes registrados');

app.use('/api/auth', authRoutes);
// console.log('✅ Auth routes registrados');

app.use('/api/turnos', turnoRoutes);
// console.log('✅ Turnos routes registrados');

app.use('/api/disponibilidad', disponibilidadRoutes);
// console.log('✅ Disponibilidad routes registradas');

app.use('/api/profesionales', profesionalRoutes);
// console.log('✅ Profesional routes registradas');

// Definición de relaciones (muy importante antes de sincronizar)
Profesional.hasMany(Slot, { foreignKey: 'profesionalId' });
Slot.belongsTo(Profesional, { foreignKey: 'profesionalId' });

// Sincronizar base de datos con fuerza para resetear tablas
sequelize.sync()
  .then(async () => {
    console.log('🟢 Base de datos sincronizada');

    // Crear usuario admin si no existe
    const adminExists = await Usuario.findOne({ where: { email: 'admin@turnos.com' } });
    if (!adminExists) {
      await Usuario.create({
        nombre: 'Admin',
        email: 'admin@turnos.com',
        password: 'admin123',
        rol: 'admin'
      });
      console.log('👑 Usuario admin creado');
    } else {
      // console.log('👑 Usuario admin ya existe');
    }
    // Iniciar servidor
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Error al sincronizar la base de datos:', err);
  });
