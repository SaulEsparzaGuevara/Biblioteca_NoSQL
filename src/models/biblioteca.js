const mongoose = require('mongoose');

const bibliotecaSchema = new mongoose.Schema({
    nombre_biblioteca: {
        type: String,
        required: [true, 'El nombre de la biblioteca es obligatorio'],
        trim: true
    },
    direccion: {
        type: String,
        required: [true, 'La dirección es obligatoria'],
        trim: true
    },
    telefono: {
        type: String,
        required: [true, 'El teléfono es obligatorio'],
        trim: true
    },
    responsable: {
        type: String,
        required: [true, 'El responsable es obligatorio'],
        trim: true
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria'],
        trim: true
    }
}, { collection: 'Biblioteca' });

module.exports = mongoose.model('Biblioteca', bibliotecaSchema);
