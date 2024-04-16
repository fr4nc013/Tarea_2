/*const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto');


router.post('/gestionA/editar-producto/:id', async (req, res) => {
    const idProducto = req.params.id;

    try {
        const { nombre, cantidad, precio } = req.body;

        await Producto.findByIdAndUpdate(idProducto, { nombre, cantidad, precio });

        res.redirect('/gestionA');
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).send('Error interno del servidor');
    }
});
module.exports = router;*/
