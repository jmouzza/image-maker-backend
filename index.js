'use strict'

var mongoose = require("mongoose");
var app = require("./app");
var port = 3900;

//Crear Servidor y recibir http requests
app.listen(port, ()=>{
    console.log("Servidor corriendo en http://localhost:"+port);
})
/* mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/products",{ useNewUrlParser : true })
.then(()=>{
    console.log("Conexion establecida");
    
}); */