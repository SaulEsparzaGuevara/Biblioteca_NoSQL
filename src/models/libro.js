const mongoose = require('mongoose');

const libroSchema = new mongoose.Schema({
    numero_identificacion: {
        type: String,
        trim: true
    },
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
    lugar_publicacion: {
        type: String,
        trim: true
    },
    edicion: {
        type: String,
        trim: true
    },
    anioPublicacion: {
        type: Number,
        required: [true, 'El año de publicación es obligatorio']
    },
    numero_paginas: {
        type: Number,
        min: [1, 'El número de páginas debe ser positivo']
    },
    categoria_tematica: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria'
    },
    version_pdf: {
        type: String,
        trim: true
    },
    resena: {
        type: String,
        trim: true
    },
    fotografia: {
        type: String,
        trim: true
    },
    genero: {
        type: String,
        trim: true
    },
    precio: {
        type: Number,
        min: [0, 'El precio no puede ser negativo']
    },
    stock: {
        type: Number,
        default: 0,
        min: [0, 'El stock no puede ser negativo']
    },
    disponible: {
        type: Boolean,
        default: true
    }
}, { collection: 'Libros' });

module.exports = mongoose.model('Libro', libroSchema);
