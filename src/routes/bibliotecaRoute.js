const crearCrudRouter = require('./crudBibliotecaRoute.js');
const Biblioteca = require('../models/biblioteca.js');

module.exports = crearCrudRouter(Biblioteca, 'biblioteca', 'nombre de la biblioteca');
