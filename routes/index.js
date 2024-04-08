var express = require('express');
var router = express.Router();
const productos = require('../public/javascripts/Productos')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', products:productos });
});

module.exports = router;
