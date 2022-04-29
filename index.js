'use strict'

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