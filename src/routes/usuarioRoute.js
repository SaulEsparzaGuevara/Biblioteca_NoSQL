const crearCrudRouter = require('./crudBibliotecaRoute.js');
const Usuario = require('../models/usuario.js');

module.exports = crearCrudRouter(Usuario, 'usuario', 'correo');
