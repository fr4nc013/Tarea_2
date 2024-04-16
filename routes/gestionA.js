var express = require('express');
var router = express.Router();
var productos = require('../public/javascripts/Productos');
const Producto = require('../models/Producto');


router.get('/', async (req, res) => {

    if (req.session.user && req.session.user.rol === 'admin') {
        try {
            // Obtener los productos de la base de datos
            const productos = await Producto.find();
            // Renderizar la página de gestión de productos con los productos obtenidos y el usuario actual
            res.render('gestionA', { title: 'padrote', Usuario: req.session.Usuario, layout: '/layout', products: productos });
        } catch (error) {
            console.error('Error al obtener productos:', error);
            res.status(500).send('Error interno del servidor');
        }
    } else {
        // Si el usuario no está autenticado como administrador, redirigir al login
        res.redirect('/login');
    }
});

// Ruta para mostrar el formulario de edición de un producto

    router.get('/editar-producto/:id', async (req, res) => {
        try {
            const producto = await Producto.findById(req.params.id);
            res.render('editarProducto', { producto });
        } catch (error) {
            console.error('Error al cargar el formulario de edición:', error);
            res.status(500).send('Error interno del servidor');
        }
    });


    

router.post('/editar-producto/:id', async (req, res) => {
    try {
        console.log('Datos del formulario:', req.body);
        const { nombre, cantidad, precio } = req.body;
        console.log(req.body)
        console.log('ID del producto a actualizar:', req.params.id);

        await Producto.findByIdAndUpdate(req.params.id, { producto:nombre, cantidad, precio });


        res.redirect('/gestionA');
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).send('Error interno del servidor');
    }
});




router.post('/insertar-producto', function(req, res, next) {

    const { nombre, cantidad, precio } = req.body;
    const nuevoProducto = new Producto({
        producto: nombre,
        cantidad: cantidad,
        precio: precio
    });

    nuevoProducto.save()
        .then(producto => {
            res.redirect('/gestionA');
        })
        .catch(error => {
            console.error('Error al insertar el producto:', error);

            res.status(500).send('Error al insertar el producto');
        });
});

// Ruta para manejar la eliminación de productos
router.post('/borrar-producto', async function(req, res, next) {
    const idProducto = req.body.id;

    try {
        await Producto.findByIdAndDelete(idProducto);
        res.redirect('/gestionA');
    } catch (error) {
        console.error('Error al borrar el producto:', error);
        res.status(500).send('Error al borrar el producto');
    }
});


module.exports = router;