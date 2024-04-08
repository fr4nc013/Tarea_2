var express = require('express');
var router = express.Router();
var usuarios = require('../modelU/Usuario');
var productos = require('../public/javascripts/Productos')

router.get('/login/', function(req, res, next) {
    res.render("gestionA",{title:"Padrote", products:productos});
});

module.exports = router;