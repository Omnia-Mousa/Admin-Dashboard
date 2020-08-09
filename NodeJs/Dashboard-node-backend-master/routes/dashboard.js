const express = require('express');
const dashboardRouter = express.Router();
const Product = require('../models/product');
const User = require('../models/user');
const Order = require('../models/order');


dashboardRouter.get('/getProducts', (req, res, next) => {
    Product.findAll({ include: [User] })
        .then(products => {
            res.status(200).json(products)
        })
        .catch(err => {
            res.status(400).json(err)
        })
})

dashboardRouter.get('/getOrders', (req, res, next) => {
    Order.findAll()
        .then(orders => {
            res.status(200).json(orders)
        })
        .catch(err => {
            res.status(400).json(err)
        })
})


dashboardRouter.patch('/editStatus/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = req.body;

        await Product.update({ status: updatedProduct.status, }, { where: { id: id } })
        res.status(200).json("status updated successfully");
    } catch (err) {
        res.status(400).json(err)
    }
}
)

dashboardRouter.get('/getone/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const prod = await Product.findOne({ where: { id: id }, include: [User] });
        res.status(200).json(prod);
    } catch (err) {
        res.status(400).json(err)
    }
})


dashboardRouter.post("/addProduct", async (req, res, next) => {
    try {
        const title = req.body.title;
        const price = req.body.price;
        const imageUrl = req.body.imageUrl;
        const description = req.body.description;
        const amount = req.body.amount;
        const status = req.body.status;
        const category = req.body.category;
        const rate = req.body.rate;
        const userId = req.body.userId
        await Product.create({
            title: title,
            price: price,
            imageUrl: imageUrl,
            description: description,
            amount: amount,
            status: status,
            category: category,
            rate: rate,
            userId: userId

        });


        res.json({
            message: "Product added successfully"
        });
    } catch (err) {
        res.json(err);
    }
});

dashboardRouter.delete('/Delete/:id',async(req,res)=>{
    const { id } = req.params;
      try{
       await Product.destroy({
        where: {
          id:id}
        })
       
          res.status(200).json("deleted");
      }catch(err){
  res.status(401).json(err)
      }
  })

  dashboardRouter.patch('/Edit/:id',async(req,res)=>{
    try{
      const {id}=req.params;
      const updatedProduct=req.body;
   
  await Product.update({
  title:updatedProduct.title,
  price:updatedProduct.price,
  imageUrl:updatedProduct.imageUrl,
   description:updatedProduct.description,
  amount:updatedProduct.amount,
  category:updatedProduct.category,
  rate:req.body.rate,
  },{
  where:{id:id}})
  
  res.status(200).json("product data updated successfully");
  console.log("donnne");
  }catch(err){
    res.status(400).json(err)
  }
  })

module.exports = dashboardRouter;