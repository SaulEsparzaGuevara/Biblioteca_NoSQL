const express = require('express');
const Libro = require('../models/libro.js');
const Prestamo = require('../models/prestamo.js');
const Usuario = require('../models/usuario.js');

const router = express.Router();

const responderError = (res, error) => {
    res.status(500).json({
        mensaje: 'Error al ejecutar la consulta',
        detalles: error.message
    });
};

router.get('/libros-por-categoria', async (req, res) => {
    try {
        const resultado = await Libro.aggregate([
            {
                $lookup: {
                    from: 'Categorias',
                    localField: 'categoria_tematica',
                    foreignField: '_id',
                    as: 'categoria'
                }
            },
            { $unwind: { path: '$categoria', preserveNullAndEmptyArrays: true } },
            {
                $group: {
                    _id: '$categoria._id',
                    categoria: { $first: { $ifNull: ['$categoria.nombre', 'Sin categoría'] } },
                    total_libros: { $sum: 1 },
                    stock_total: { $sum: '$stock' },
                    precio_promedio: { $avg: '$precio' }
                }
            },
            { $sort: { total_libros: -1, categoria: 1 } }
        ]);
        res.status(200).json(resultado);
    } catch (error) {
        responderError(res, error);
    }
});

router.get('/prestamos-por-usuario', async (req, res) => {
    try {
        const resultado = await Prestamo.aggregate([
            {
                $lookup: {
                    from: 'Usuario',
                    localField: 'usuario',
                    foreignField: '_id',
                    as: 'usuario'
                }
            },
            { $unwind: '$usuario' },
            {
                $project: {
                    usuario: '$usuario.nombre',
                    correo: '$usuario.correo',
                    total_prestamos: { $literal: 1 },
                    libros_prestados: { $size: '$libros' },
                    fecha: 1,
                    fecha_entrega: 1
                }
            },
            {
                $group: {
                    _id: '$usuario',
                    correo: { $first: '$correo' },
                    total_prestamos: { $sum: '$total_prestamos' },
                    libros_prestados: { $sum: '$libros_prestados' },
                    ultimo_prestamo: { $max: '$fecha' },
                    proxima_entrega: { $min: '$fecha_entrega' }
                }
            },
            { $sort: { total_prestamos: -1, usuario: 1 } }
        ]);
        res.status(200).json(resultado);
    } catch (error) {
        responderError(res, error);
    }
});

router.get('/usuarios-sin-prestamos', async (req, res) => {
    try {
        const resultado = await Usuario.aggregate([
            {
                $lookup: {
                    from: 'Prestamos',
                    localField: '_id',
                    foreignField: 'usuario',
                    as: 'prestamos'
                }
            },
            { $match: { prestamos: { $size: 0 } } },
            {
                $project: {
                    _id: 1,
                    nombre: 1,
                    correo: 1,
                    tipo_miembro: 1
                }
            },
            { $sort: { nombre: 1 } }
        ]);
        res.status(200).json(resultado);
    } catch (error) {
        responderError(res, error);
    }
});

module.exports = router;
