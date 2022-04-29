'use strict'

var mongoose = require("mongoose");
var app = require("./app");
var port = 3900;

/* mongoose.Promise = global.Promise; */
mongoose.connect("mongodb+srv://admin:admin@cluster0.j5hgm.mongodb.net/test",{ useNewUrlParser : true })
.then(()=>{
    console.log("Conexion establecida");
    //Crear Servidor y recibir http requests
    app.listen(port, ()=>{
        console.log("Servidor corriendo en http://localhost:"+port);
    })
    
})
.catch((err)=>console.log(err));