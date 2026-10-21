const crearCrudRouter = require('./crudBibliotecaRoute.js');
const Libro = require('../models/libro.js');

module.exports = crearCrudRouter(Libro, 'libro', 'ISBN');
