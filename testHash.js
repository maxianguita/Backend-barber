// testHash.js
const bcrypt = require('bcryptjs');

// 👉 Cambiá estos dos valores con tu password real y el hash sacado de tu base de datos:
const plainPassword = 'admin123';
const hash = '$2b$10$t2.ZdgiYsdtRyPzQvCSS3OsVc1O6ktb9Stgl0uso3yzlWXcqgEwP2';

console.log('🔑 Hash de la base de datos:', hash);

// Compara el password plano con el hash
bcrypt.compare(plainPassword, hash)
  .then(result => {
    console.log('¿Coinciden?', result);
  })
  .catch(err => {
    console.error('❌ Error comparando hash:', err);
  });
