const Sequelize = require('sequelize')
const db = require('../db')
// const {validate} = require('../db')

const Guest = db.define('guest', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  billingAddress: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  creditCardNum: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isCreditCard: true
    }
  },
  shippingAddress: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Guest
