const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const { v4: uuidv4 } = require('uuid');



const Order = sequelize.define('order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    orderId:Sequelize.INTEGER,
    sourceAddress: {
        type: Sequelize.STRING,
        allowNull: false
    },
    destinationAddress: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        defaultValue : "pending"
    },
    amount: Sequelize.STRING,
    arrivalTime: Sequelize.DATE,
    totalPrice: Sequelize.INTEGER,
    productOwnerID: Sequelize.STRING,
    productId:Sequelize.STRING,
    userId : Sequelize.INTEGER
})

module.exports = Order;