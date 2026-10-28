const mongoose = require('mongoose');

const bibliotecaSchema = new mongoose.Schema({
    nombre_biblioteca: {
        type: String,
        required: [true, 'El nombre de la biblioteca es obligatorio'],
        trim: true
    },
    bibliografia: {
        type: String,
        trim: true
    },
    fotografia: {
        type: String,
        trim: true
    },
    obras: {
        type: String,
        trim: true
    },
    ubicacion: {
        type: String,
        required: [true, 'La ubicación es obligatoria'],
        trim: true
    },
    ubicacion_referencia: {
        type: String,
        trim: true
    },
    horarios_atencion: {
        type: String,
        trim: true
    },
    direccion: {
        type: String,
        trim: true
    },
    telefono: {
        type: String,
        trim: true
    },
    responsable: {
        type: String,
        trim: true
    },
    descripcion: {
        type: String,
        trim: true
    }
}, { collection: 'Biblioteca' });

module.exports = mongoose.model('Biblioteca', bibliotecaSchema);
