const Sequelize = require('sequelize')
const db = require('../db')
const {validate} = require('../db')

const Guest = db.define('guest', {
  billingAddress: {
    type: Sequelize.STRING,
    allowNull: false
  },
  creditCardNum: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      isCreditCard: true
    }
  },
  shippingAddress: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Guest
