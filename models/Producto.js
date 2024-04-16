const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    producto: { type: String, required: true },
    cantidad: { type: Number, required: true },
    precio: { type: Number, required:true}
});

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;
