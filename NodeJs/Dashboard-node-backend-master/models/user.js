const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Type: {
        type: Sequelize.ENUM,
        values: ['user', 'admin', 'shop' , 'Shipping'],
        defaultValue: 'user',
        allowNull: false
    },
    fName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    shopName: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        defaultValue : "active"
    },
    address: {
        type: Sequelize.STRING
    },
    gender: Sequelize.STRING,
    phone: Sequelize.STRING,
    DOB: Sequelize.STRING    
})

module.exports = User;
