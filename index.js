'use strict'

var app = require("./app");
var mongo = require ('mongodb') 
var MongoClient = require('mongodb').MongoClient;
var config_db = require('./src/config/config');
var url = "mongodb+srv://"+config_db.user+":"+config_db.password+"@"+config_db.host+"/myFirstDatabase?retryWrites=true&w=majority";
var port = process.env.PORT || 3900;

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    app.listen(port, ()=>{
        console.log("Servidor conectado!");
    })
    db.close();
  });