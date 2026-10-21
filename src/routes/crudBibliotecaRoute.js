const express = require('express');
const mongoose = require('mongoose');

const crearCrudRouter = (Modelo, recurso, campoUnico) => {
    const router = express.Router();

    const responderError = (res, error) => {
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                mensaje: 'Error de validación',
                detalles: error.message
            });
        }

        if (error.code === 11000) {
            return res.status(409).json({
                mensaje: `El ${campoUnico} ya está registrado`
            });
        }

        return res.status(500).json({
            mensaje: 'Error interno del servidor',
            detalles: error.message
        });
    };

    const validarId = (req, res) => {
        if (!mongoose.isValidObjectId(req.params.id)) {
            res.status(400).json({
                mensaje: `El ID de ${recurso} no es válido`
            });
            return false;
        }
        return true;
    };

    router.post('/', async (req, res) => {
        try {
            const registro = await Modelo.create(req.body);
            res.status(201).json({
                mensaje: `${recurso} creado exitosamente`,
                datos: registro
            });
        } catch (error) {
            responderError(res, error);
        }
    });

    router.get('/', async (req, res) => {
        try {
            res.status(200).json(await Modelo.find());
        } catch (error) {
            responderError(res, error);
        }
    });

    router.get('/:id', async (req, res) => {
        if (!validarId(req, res)) return;

        try {
            const registro = await Modelo.findById(req.params.id);
            if (!registro) {
                return res.status(404).json({
                    mensaje: `${recurso} no encontrado`
                });
            }
            res.status(200).json(registro);
        } catch (error) {
            responderError(res, error);
        }
    });

    router.put('/:id', async (req, res) => {
        if (!validarId(req, res)) return;

        try {
            const registro = await Modelo.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );
            if (!registro) {
                return res.status(404).json({
                    mensaje: `${recurso} no encontrado`
                });
            }
            res.status(200).json({
                mensaje: `${recurso} actualizado exitosamente`,
                datos: registro
            });
        } catch (error) {
            responderError(res, error);
        }
    });

    router.delete('/:id', async (req, res) => {
        if (!validarId(req, res)) return;

        try {
            const registro = await Modelo.findByIdAndDelete(req.params.id);
            if (!registro) {
                return res.status(404).json({
                    mensaje: `${recurso} no encontrado`
                });
            }
            res.status(200).json({
                mensaje: `${recurso} eliminado exitosamente`,
                datos: registro
            });
        } catch (error) {
            responderError(res, error);
        }
    });

    return router;
};

module.exports = crearCrudRouter;
