// db.js
const mongoose = require('mongoose');

const dbURI = 'mongodb://localhost:27017/DBProyectoFinal';

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log(`Conexión establecida a ${dbURI}`);
});

mongoose.connection.on('error', (err) => {
  console.log('Error de conexión:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Conexión a la base de datos cerrada');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Conexión a la base de datos cerrada debido a la terminación de la aplicación');
    process.exit(0);
  });
});
