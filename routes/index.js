var express = require('express');
var router = express.Router();
const productos = require('../public/javascripts/Productos')
var session = require('express-session')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', products:productos });
});

router.post('/', function(req, res, next){
  var idProducto = parseInt(req.body.productoId);
  var quantity = parseInt(req.body.cantidadProducto);
  var productosC = productos.find((productosC) => parseInt(productosC.id) === parseInt(idProducto));
  var Subtotal=0

  if (productosC) {
    req.session.cart= req.session.cart || [] 
    req.session.cart.push({
        id: productosC.id,
        producto: productosC.producto,
        cantidad: quantity,
        precio: productosC.precio,
        moneda: productosC.moneda,
        subtotalCantidad: quantity * productosC.precio,        
        itbis: 0.18,
        
    });

    req.session.cart.forEach(element => {
    Subtotal+=element.subtotalCantidad
    });
    req.session.subtotal=Subtotal
    req.session.itbis=null
    req.session.total=null
    return res.redirect('/');
} else {
    return res.redirect('/');
    //res.status(404).send('Producto no encontrado');
}
});
module.exports = router;