const bcrypt = require('bcryptjs');

const plainPassword = 'max123';
const hash = '$2b$10$2ukLyXP7xx2HdQ1xL9NKx.Sc9BsVhzXUuKUa3ECRef8DXi5dpaHU6';

bcrypt.compare(plainPassword, hash).then(result => {
  console.log('¿Coinciden?', result);
});
