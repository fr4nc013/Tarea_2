var express = require('express');
var router = express.Router();
const productos = require('../public/javascripts/Productos')
var session = require('express-session')
const Producto = require('../models/Producto');



/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const productos = await Producto.find();
    res.render('index', { title: 'Express', products: productos });
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).send('Error al obtener productos');
  }
});


router.post('/', async function(req, res, next) {
  try {
    const idProducto = req.body.productoId;
    const quantity = parseInt(req.body.cantidadProducto);

    // Buscar el producto por su ID en la base de datos
    const producto = await Producto.findById(idProducto);

    if (producto) {
      // Calcular el subtotal del producto
      const subtotalCantidad = quantity * producto.precio;

      // Agregar el producto al carrito en la sesión
      req.session.cart = req.session.cart || [];
      req.session.cart.push({
        id: producto._id,
        UID: Math.floor(Math.random() * 999999),
        producto: producto.producto,
        cantidad: quantity,
        precio: producto.precio,
        moneda: producto.moneda,
        subtotalCantidad: subtotalCantidad,
        itbis: 0.18,
      });

      // Calcular el subtotal total del carrito
      const subtotal = req.session.cart.reduce((total, item) => total + item.subtotalCantidad, 0);
      req.session.subtotal = subtotal;

      return res.redirect('/');
    } else {
      return res.redirect('/');
      //res.status(404).send('Producto no encontrado');
    }
  } catch (error) {
    console.error('Error al agregar producto al carrito:', error);
    res.status(500).send('Error al agregar producto al carrito');
  }
});

module.exports = router;