const mongoose = require('mongoose');

const libroSchema = new mongoose.Schema({
    isbn: {
        type: String,
        required: [true, 'El ISBN es obligatorio'],
        unique: true,
        trim: true
    },
    titulo: {
        type: String,
        required: [true, 'El título es obligatorio'],
        trim: true
    },
    autor: {
        type: String,
        required: [true, 'El autor es obligatorio'],
        trim: true
    },
    genero: {
        type: String,
        required: [true, 'El género es obligatorio'],
        trim: true
    },
    anioPublicacion: {
        type: Number,
        required: [true, 'El año de publicación es obligatorio']
    },
    precio: {
        type: Number,
        required: [true, 'El precio es obligatorio'],
        min: [0, 'El precio no puede ser negativo']
    },
    stock: {
        type: Number,
        required: [true, 'El stock es obligatorio'],
        min: [0, 'El stock no puede ser negativo']
    },
    disponible: {
        type: Boolean,
        required: [true, 'La disponibilidad es obligatoria']
    }
}, { collection: 'Libros' });

module.exports = mongoose.model('Libro', libroSchema);
