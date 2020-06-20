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
    type: Sequelize.STRING,
    defaultValue:
      'https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=612&h=320&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2016%2F07%2Fjumanji.jpg'
  },
  quantityInStock: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 20
  }
})

module.exports = Product
