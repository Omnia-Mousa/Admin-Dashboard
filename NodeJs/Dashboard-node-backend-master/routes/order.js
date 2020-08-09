const { Router } = require('express');
const Order = require('../models/order');
const Product = require('../models/product');
const User = require('../models/user');
const orderRouter = Router();

//post
orderRouter.post("/add", async (req, res, next) => {

    try {
        const orderId = req.body.orderId;
        const sourceAddress = req.body.sourceAddress;
        const destinationAddress = req.body.destinationAddress;
        const status = req.body.status;
        const amount = req.body.amount;
        const arrivalTime = req.body.arrivalTime;
        const totalPrice = req.body.totalPrice;
        const productOwnerID = req.body.productOwnerID;
        const productId = req.body.productId
        const userId = req.body.userId;

        await Order.create({
            orderId: orderId,
            sourceAddress: sourceAddress,
            destinationAddress: destinationAddress,
            status: status,
            amount: amount,
            arrivalTime: arrivalTime,
            totalPrice: totalPrice,
            productOwnerID: productOwnerID,
            productId: productId,
            userId: userId,

        });


        res.json({
            message: "Order added successfully"
        });
    } catch (err) {
        res.json(err);
    }
});

//get all
orderRouter.get('/', async (req, res) => {
    try {
        const orders = await Order.findAll({include: [User]});
        // const ordres = await Order.getProduct()
        res.json(orders);
    } catch (err) {
        res.json(err);
    }
})

//get by id

orderRouter.get('/:id', async (req, res) => {
    const {id} = req.params;
    console.log(id)
    try {
        const order = await Order.findAll({
            where: {
               id: id
            }

        });
        res.json(order);
    } catch (err) {
        res.json(err)
    }
})


//Delete by id
orderRouter.delete('/:id', function (req, res) {
    Order.findByPk(req.params.id).then(function (order) {
        order.destroy();
    }).then((order) => {
        res.sendStatus(200);
    });
});

//update by id
orderRouter.patch('/Edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedorder = req.body;

        await Order.update({
            orderId: updatedorder.orderId,
            sourceAddress: updatedorder.sourceAddress,
            destinationAddress: updatedorder.destinationAddress,
            status: updatedorder.status,
            amount: updatedorder.amount,
            arrivalTime: updatedorder.arrivalTime,
            totalPrice: updatedorder.totalPrice,
            productOwnerID: updatedorder.productOwnerID,
            productId: updatedorder.productId,
            userId: updatedorder.userId,

        }, {where: { id: id }})

        res.status(200).json("Order data updated successfully");
    } catch (err) {
        res.status(400).json(err)
    }
})

module.exports = orderRouter;