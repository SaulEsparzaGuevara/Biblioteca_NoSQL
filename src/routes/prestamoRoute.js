const crearCrudRouter = require('./crudBibliotecaRoute.js');
const Prestamo = require('../models/prestamo.js');

module.exports = crearCrudRouter(Prestamo, 'préstamo', 'préstamo', ['usuario', 'libros']);
