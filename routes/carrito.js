var express = require('express');
var router = express.Router();
var session = require('express-session');
const productos = require('../public/javascripts/Productos');

router.get('/', (req,res,next) =>{
    var Itbis=req.session.subtotal*0.18;
    var Total=req.session.subtotal+Itbis;
    res.render('carrito',{
        products:productos,
        carritoCompra: req.session.cart,
        subtotalCompra: req.session.subtotal,
        ItbisCompra:Itbis,
        totalCompra:Total
    })
});

module.exports = router;