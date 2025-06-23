const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 
const bcrypt = require('bcryptjs');

const ROLES_PERMITIDOS = ['cliente', 'admin', 'empleado', 'barbero'];

class Usuario extends Model {
  // Método para comparar contraseñas
  async comparePassword(password) {
    return await bcrypt.compare(password, this.password);
  }
}

Usuario.init(
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rol: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [ROLES_PERMITIDOS],
      },
    },
  },
  {
    sequelize,
    modelName: 'Usuario',
    tableName: 'usuarios',
  }
);

// Hashear la contraseña antes de crear o actualizar el usuario
const hashPassword = async (usuario) => {
  if (usuario.password && usuario.changed('password')) {
    const hashedPassword = await bcrypt.hash(usuario.password, 10);
    usuario.password = hashedPassword;
  }
};

Usuario.beforeCreate(hashPassword);
Usuario.beforeUpdate(hashPassword);

module.exports = Usuario;
