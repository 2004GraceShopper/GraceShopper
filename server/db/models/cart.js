const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('guest', {
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
  Purchased: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Cart
