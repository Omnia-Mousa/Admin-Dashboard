const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Slider = sequelize.define('slider', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
   
  },
  title: Sequelize.STRING,
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: "active"
  }
}
);

module.exports = Slider;