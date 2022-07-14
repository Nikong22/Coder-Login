const mongoose = require('mongoose');

const URI = 'mongodb://localhost:27017/coder';

const optionsDB = mongoose.connect(URI,
    {
      serverSelectionTimeoutMS: 5000
    },
    (error) => {
      if (error) {
        throw 'Error al conectarse a la base de datos';
      }
    });

module.exports = {
    optionsDB
}