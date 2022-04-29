'use strict'

var mongoose = require("mongoose");
var app = require("./app");
var port = 3900;

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/products",{ useNewUrlParser : true })
    .then(()=>{
        console.log("Conexion establecida");

        //Crear Servidor y recibir http requests
        app.listen(port, ()=>{
            console.log("Servidor corriendo en http://localhost:"+port);
        })
    });