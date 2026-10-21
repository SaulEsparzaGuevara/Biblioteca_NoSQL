const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');

const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.8.4']); //Forzar DNS de Google

const path = require('path');
require ('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const bibliotecaRoutes = require('./routes/bibliotecaRoute.js');
const categoriaRoutes = require('./routes/categoriaRoute.js');
const libroRoutes = require('./routes/libroRoute.js');
const usuarioRoutes = require('./routes/usuarioRoute.js');

// routers
app.use(express.json());
app.use('/api/bibliotecas', bibliotecaRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/libros', libroRoutes);
app.use('/api/usuarios', usuarioRoutes);

// Routers
app.get('/', (req, res) => {
  res.send('Bienvenido a la API REST de la Biblioteca');
});

// Conexión a MongoDB
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Conexión con MongoDB - Esparza Guevara');
        console.log('URI de conexión:', process.env.MONGODB_URI);
    })
    .catch((error) => {
        console.error('Error al conectar con MongoDB:', error);
    });

// Escuchar el puerto
app.listen(port, () => {
        console.log(`Servidor activo en http://localhost:${port}`);
});