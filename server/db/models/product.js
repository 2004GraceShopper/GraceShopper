const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  publisher: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    //pennies -- INTEGER -- hook: convert to dollar amount
    type: Sequelize.INTEGER,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  imageUrl: {
    type: Sequelize.STRING
    //default value
  },
  quantityInStock: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 20
  }
})

module.exports = Product
