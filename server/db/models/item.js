const Sequelize = require('sequelize')
const db = require('../db')

const Item = db.define('item', {
  lockedPrice: {
    type: Sequelize.INTEGER
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Item
