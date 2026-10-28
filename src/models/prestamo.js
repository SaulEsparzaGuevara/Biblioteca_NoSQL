const mongoose = require('mongoose');

const prestamoSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El usuario es obligatorio']
    },
    fecha: {
        type: Date,
        required: [true, 'La fecha del préstamo es obligatoria'],
        default: Date.now
    },
    fecha_entrega: {
        type: Date,
        required: [true, 'La fecha de entrega es obligatoria']
    },
    libros: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Libro',
        required: [true, 'Debe incluir al menos un libro']
    }]
}, {
    collection: 'Prestamos',
    timestamps: true
});

prestamoSchema.path('libros').validate(function (libros) {
    return Array.isArray(libros) && libros.length > 0;
}, 'El préstamo debe incluir al menos un libro');

prestamoSchema.pre('validate', function (next) {
    if (this.fecha && this.fecha_entrega && this.fecha_entrega < this.fecha) {
        this.invalidate(
            'fecha_entrega',
            'La fecha de entrega no puede ser anterior a la fecha del préstamo'
        );
    }
    next();
});

module.exports = mongoose.model('Prestamo', prestamoSchema);
