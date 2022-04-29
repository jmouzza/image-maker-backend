'use strict'

//var Product = require("../models/product")
var validator = require("validator");
var mongo = require ('mongodb') 
var MongoClient = require('mongodb').MongoClient;
var config_db = require('../src/config/config');
var url = "mongodb+srv://"+config_db.user+":"+config_db.password+"@"+config_db.host+"/myFirstDatabase?retryWrites=true&w=majority"; 

var controller = {
    test:(req,res) => {
        return res.send("PAGINA TEST");
    },
    getProducts: (req,res) => {
        MongoClient.connect(url, function(err, db) {
            if (err) {
                return res.send(err);
            };
            var dbo = db.db("test");
            dbo.collection("products").find({}).toArray(function(err, result) {
                if (err) {
                    return res.status(400).send({
                        status: 400,
                        message: "Ocurrió un error al buscar los productos"
                    });
                };
                db.close();
                return res.status(200).send({
                    status: 200,
                    products: result
                });
            });
          });
            
        
    },
    findProducts: (req,res) => {
        var titulo = req.params.title;
        if(!titulo || titulo == null){
            return res.status(400).send({
                status: 400,
                message: "Ocurrió un problema con los datos enviados"
            });
        }
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("test");
            dbo.collection("products").find({titulo: { $regex: '.*' + titulo + '.*' }}).toArray(function(err, result) {
                if (err) {
                    return res.status(400).send({
                        status: 400,
                        message: "Ocurrió un error al buscar los productos"
                    });
                };
                db.close();
                return res.status(200).send({
                    status: 200,
                    products: result
                });
            });
        });
    },
    saveProduct: (req,res) => {
        var params = req.body;
        try {
            var validarTitulo = !validator.isEmpty(params.titulo);
            var validarPrecio = !validator.isEmpty(params.precio);
            var validarDescripcion = !validator.isEmpty(params.descripcion);
            var validarImg = !validator.isEmpty(params.img);
            
        } catch (error) {
            return res.status(400).send({
                status: 400,
                message: "Ocurrió un problema con los datos enviados"
            });
        }
        if(validarTitulo&&validarPrecio&&validarDescripcion&&validarImg){
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("test");
                var myobj = { 
                    titulo: params.titulo,
                    precio: params.precio,
                    descripcion: params.descripcion,
                    img: params.img,
                };
                dbo.collection("products").insertOne(myobj, function(err, respuesta) {
                  if (err) throw err;
                    db.close();
                    return res.status(200).send({
                        status: 200,
                        product:respuesta,
                        message:"Producto: "+ myobj.titulo + " creado satisfactoriamente"
                    });
                });
              });          
        }else{
            return res.status(400).send({
                status: 400,
                message: "Ocurrió un problema con los datos enviados"
            });
        }
    }
}

module.exports = controller;