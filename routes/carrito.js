var express = require('express');
var router = express.Router();
var session = require('express-session');
const productos = require('../public/javascripts/Productos');

router.get('/', (req,res,next) =>{
    var Itbis=req.session.subtotal*0.18;
    var Total=req.session.subtotal+Itbis;
    var idCarrito = Math.floor(Math.random() * 999);

    res.render('carrito',{
        products:productos,
        carritoCompra: req.session.cart,
        subtotalCompra: req.session.subtotal,
        ItbisCompra:Itbis,
        totalCompra:Total,
        UIDCarrito: idCarrito
    })
});

router.post('/', function(req,res,next){
    var idProductoU = parseInt(req.body.productoIdU);
    
    console.log(req.body)

    req.session.cart = req.session.cart.filter(producto => producto.UID !== idProductoU);

    var Subtotal = req.session.cart.reduce((acc, producto) => acc + producto.subtotalCantidad, 0);
    var Itbis = Subtotal * 0.18;
    var Total = Subtotal + Itbis;

    req.session.subtotal = Subtotal;
    req.session.ItbisCompra = Itbis;
    req.session.totalCompra = Total;
    res.redirect('/carrito');
});

module.exports = router;