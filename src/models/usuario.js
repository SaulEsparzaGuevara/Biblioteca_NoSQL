const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
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
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true,
        trim: true
    },
    tipo_miembro: {
        type: String,
        required: [true, 'El tipo de miembro es obligatorio'],
        enum: ['afiliado', 'no afiliado']
    }
}, { collection: 'Usuario' });

module.exports = mongoose.model('Usuario', usuarioSchema);
