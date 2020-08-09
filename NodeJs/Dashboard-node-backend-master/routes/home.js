const express = require('express')
const Product = require('../models/product');
const User = require('../models/user');
const { use } = require('./user');
const homerouter = express.Router();

homerouter.get('/', (req, res, next) => {

    Product.findAll({where:{status: "active"},include: [User]})
        .then(products => {
            console.log(products)
            res.status(200).json(products)
        })
        .catch(err => {
            res.status(400).json(err)
        })
        //hghgh
})

homerouter.get('/category/:category', (req, res, next) => {
    console.log("category",req.params.category)
    Product.findAll({ where: {category: req.params.category} ,include: [User]})
        .then(products => {
            res.status(200).json(products)
        })
        .catch(err => {
            res.status(400).json(err)
        })
})

homerouter.get('/productowner/:id', (req, res, next) => {
    // console.log("id",req.params.id)
    Product.findAll({ where: { userId: req.params.id } })
        .then(products => {
            res.status(200).json(products)
        })
        .catch(err => {
            res.status(400).json(err)
        })
})

homerouter.get('/owner/:id', (req, res, next) => {
    // console.log("id",req.params.id)
    User.findAll({ where: { id: req.params.id } })
        .then(products => {
            res.status(200).json(products)
        })
        .catch(err => {
            res.status(400).json(err)
        })
})
module.exports = homerouter