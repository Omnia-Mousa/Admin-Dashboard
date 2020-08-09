const {Router}=require('express');
const path=require('path');
const Product = require('../models/product');
const User=require('../models/user');
const checkAuth = require('../middlewares/authentication');
const ProductRouter=Router();
const multer=require('multer');

const storage=multer.diskStorage({
  destination:'./upload/images',
  filename:(req,file,cb)=>{
    return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})
const upload=multer({storage:storage})

//var now = require("date-now")
const cors = require('cors');




ProductRouter.post("/create",upload.single('imageUrl'),async (req, res, next) => {
 console.log("data from anguler",req.body,req.file,req.files);
  
    try{
     const title= req.body.title;
     const price= req.body.price;
    //  const imageUrl=req.file.filename;
     const description=req.body.description;
     const amount=req.body.amount;
     const status=req.body.status;
     const category=req.body.category;
     const rate=req.body.rate;
const newP= await Product.create({
  title: title,
  price:price,

  imageUrl:`http://localhost:5000/api/store/create/${req.file.filename}`,
  // product:`http://localhost:5000/api/store/create/${imageUrl}`,

  // imageUrl:url+"/images/"+req.file.filename,
  description:description,
  amount: amount,
  status:status,
  category:category,
  rate:rate,

 });
    console.log(newP)
   

    res.status(201).json(newP);

    res.json({
      message: "Product added successfully"
    });


}catch(err){
    res.json(err);
}
  });

// ProductRouter.get('/getByUserId/:id',async (req,res)=>{
//   const {id}=req.params;
//   try{
//     await Product.findAll({
//       where:{
//         userId:id,
//         userType:'store'
//       }
//     })
//     res.status(200).json("provided");
//   }catch(err){
//     res.status(400).json(err);
//   }
// })

  ProductRouter.get('/getone/:id',async(req,res)=>{
    const {id} = req.params;
    try{
      console.log("oooooo")
     const prod= await Product.findOne({
        where: {
          id:id}
      });
  console.log("opop")
          res.status(200).json(prod,"this product");
      }catch(err){
  res.status(400).json(err)
      }
  })

  //////////////////////////////////////////////
  // ProductRouter.get('/getUserId/:id',async(req,res)=>{
  //   const {id} = req.params;
  //   try{
  //     console.log("oooooo")
  //    const prod= await Product.findAll({ where: { id:id}, include : [User]});
  //     console.log("opop")
  //         res.json({prod});
  //     }catch(err){
  // res.json(err)
  //     }
  // })

 ////////////////////////////////////////////////
ProductRouter.get('/', async(req,res)=>{
  
  try{
    const products=await Product.findAll(
      {
        where: {
          status: 'active'}
        }
       
    );
    
    res.status(200).json(products);
  }catch(err){
      res.status(401).json(err);
  }
})

ProductRouter.delete('/Delete/:id',async(req,res)=>{
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



ProductRouter.patch('/Edit/:id',async(req,res)=>{
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
module.exports=ProductRouter;