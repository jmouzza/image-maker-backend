'use strict'

var validator = require("validator");
const product = require("../models/product");
var Product = require("../models/product")

var controller = {
    getProducts: (req,res) => {
        Product.find({}).exec((err,products)=>{
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
        })
    },
    findProducts: (req,res) => {
        var titulo = req.params.title;
        if(!titulo || titulo == null){
            return res.status(400).send({
                status: 400,
                message: "Ocurrió un problema con los datos enviados"
            });
        }
        
        Product.find({titulo: { $regex: '.*' + titulo + '.*' }})
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
            var product = new Product();
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
            })            
        }else{
            return res.status(400).send({
                status: 400,
                message: "Ocurrió un problema con los datos enviados"
            });
        }
    }
}

module.exports = controller;