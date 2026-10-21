const crearCrudRouter = require('./crudBibliotecaRoute.js');
const Categoria = require('../models/categoria.js');

module.exports = crearCrudRouter(Categoria, 'categoría', 'nombre de la categoría');
