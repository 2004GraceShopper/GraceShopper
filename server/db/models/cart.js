const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  items: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  },
  totalQuantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  totalPrice: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  purchased: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Cart
