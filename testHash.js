// testHash.js
const bcrypt = require('bcryptjs');

// 👉 Cambiá estos dos valores con tu password real y el hash sacado de tu base de datos:
const plainPassword = 'max123';
const hash = '$2b$10$2ukLyXP7xx2HdQ1xL9NKx.Sc9BsVhzXUuKUa3ECRef8DXi5dpaHU6';

// Compara el password plano con el hash
bcrypt.compare(plainPassword, hash).then(result => {
  console.log('¿Coinciden?', result);
}).catch(err => {
  console.error('❌ Error comparando hash:', err);
});
