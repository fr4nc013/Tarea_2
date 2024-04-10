var express = require('express');
var router = express.Router();
var productos = require('../public/javascripts/Productos');

/*function requireLogin(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    } else {
        res.redirect('/login');
    }
}*/

router.get('/', function(req, res, next) {
    console.log(req.session)
    if (req.session.user){
        res.render("gestionA",{
            title:"padrote",
            Usuario:req.session.user,
            layout:"/layout",
            products:productos

        });
    }else{
        res.render('login')
    }
});    
 //   "gestionA", { title: "Padrote", products: productos });


module.exports = router;