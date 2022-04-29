'use strict'

var express = require("express");
var ProductController = require("../controllers/product");
var router = express.Router();

    router.post("/saveProduct", ProductController.saveProduct);
    router.get("/getProducts", ProductController.getProducts);
    router.get("/findProducts/:title", ProductController.findProducts);

module.exports = router;