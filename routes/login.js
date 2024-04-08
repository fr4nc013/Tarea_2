var express = require('express');
var router = express.Router();
var usuarios = require('../modelU/Usuario');

router.get('/', function(req, res, next) {
    res.render("login",{title:"login"});
});

router.post('/', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.userPassword;

    // Verificar las credenciales del usuario
    var user = usuarios.find((user) => user.nUsuario === username && 
                                     user.contrasena === password);

    if (user) {
        // Autenticación exitosa, redirigir a la página principal
        res.redirect('/gestionA');
    } else {
        // Autenticación fallida, mostrar mensaje de error
        res.render('login', { title: 'login', error: 'Credenciales incorrectas' });
    }
});
  module.exports = router;