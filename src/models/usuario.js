const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true
    },
    comprobante_domicilio: {
        type: String,
        trim: true
    },
    curp: {
        type: String,
        trim: true,
        uppercase: true
    },
    identificacion_oficial: {
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
    celular: {
        type: String,
        trim: true
    },
    correo: {
        type: String,
        unique: true,
        trim: true
    },
    tipo_miembro: {
        type: String,
        enum: ['afiliado', 'no afiliado'],
        default: 'afiliado'
    }
}, { collection: 'Usuario' });

module.exports = mongoose.model('Usuario', usuarioSchema);
