'use strict'

var validator = require("validator");
var Product = require("../models/product")

var mongo = require ('mongodb') 
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://admin:admin@cluster0.j5hgm.mongodb.net/test"; 


var controller = {
    test:(req,res) => {
        return res.send("PAGINA TEST");
    },
    getProducts: (req,res) => {
       
        /* Product.find({}).exec((err,products)=>{
            if(err){
                return res.status(400).send({
                    status: 400,
                    message: "Ocurrió un error al buscar los productos"
                });
            }
            return res.status(200).send({
                status: 200,
                products
            });
        }) */

        MongoClient.connect(url, function(err, db) {
            if (err) {
                return res.send(err);
            };
            return res.send(db);
            var dbo = db.db("test");
            //Find all documents in the customers collection:
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
        
        /* Product.find({titulo: { $regex: '.*' + titulo + '.*' }})
            .collation( { locale: 'es', strength: 2 } )
            .exec((err,products)=>{
                if(err){
                    return res.status(400).send({
                        status: 400,
                        message: "Ocurrió un error al buscar los productos"
                    });
                }
                return res.status(200).send({
                    status: 200,
                    products
                });
            }); */
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("test");
                //Find all documents in the customers collection:
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
            /* var product = new Product();
            product.id = params.id;
            product.titulo = params.titulo;
            product.precio = params.precio;
            product.descripcion = params.descripcion;
            product.img = params.img; 
            product.save((err,saved)=>{
                if(err||!saved){
                    return res.status(400).send({
                        status: 400,
                        message: "Ocurrió un problema al guardar los datos"
                    });
                }
                return res.status(200).send({
                    status: 200,
                    product,
                    message:"Producto: "+ product.titulo+ " creado satisfactoriamente"
                });
            })  */
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("test");
                var myobj = { 
                    id: params.id,
                    titulo: params.titulo,
                    precio: params.precio,
                    descripcion: params.descripcion,
                    img: params.img,
                };
                dbo.collection("products").insertOne(myobj, function(err, res) {
                  if (err) throw err;
                    db.close();
                    return res.status(200).send({
                        status: 200,
                        product,
                        message:"Producto: "+ myobj + " creado satisfactoriamente"
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