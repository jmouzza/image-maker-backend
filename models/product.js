'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ProductSchema = Schema({
    id: Number,
    titulo: String,
    precio: Number,
    descripcion: String,
    img: String
});

module.exports = mongoose.model("Product",ProductSchema);