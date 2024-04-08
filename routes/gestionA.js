var express = require('express');
var router = express.Router();
var usuarios = require('../modelU/Usuario');

router.get('/', function(req, res, next) {
    res.render("gestionA",{title:"Padrote"});
});

module.exports = router;