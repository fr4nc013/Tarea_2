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

            req.session.user = user;
            return res.redirect('/gestionA');
        } else {

            return res.render('login', { title: 'login', error: 'Credenciales incorrectas' });
        }
    });

    /*router.get('/gestionA', function(req, res, next) {
        res.render("gestionA", { title: "Padrote", products: productos });
    });*/
    module.exports = router;