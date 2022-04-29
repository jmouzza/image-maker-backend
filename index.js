'use strict'

/* var mongoose = require("mongoose");
var app = require("./app");
var port = 3900;

mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://admin:admin@cluster0.j5hgm.mongodb.net/test",{useUnifiedTopology: true,useNewUrlParser: true})
.then(()=>{
    console.log("Conexion establecida");
    //Crear Servidor y recibir http requests
    app.listen(port, ()=>{
        console.log("Servidor corriendo en http://localhost:"+port);
    })
    
})
.catch((err)=>console.log(err)); */
var port = 3900;
var app = require("./app");
var mongo = require ('mongodb') 
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://admin:admin@cluster0.j5hgm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"; 
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    app.listen(port, ()=>{
        console.log("Servidor corriendo en http://localhost:"+port);
    })
    db.close();
  });