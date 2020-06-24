const router = require('express').Router()
const {Product, User, Cart, Item} = require('../db/models')
const {findOrGetTheCart} = require('../../utility')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const purchasedCartsE = await Cart.findAll({
      where: {
        userId: req.body.userId,
        purchased: true
      },
      include: [
        {
          model: Product,
          as: Item,
          required: true
        }
      ]
    })
    res.json(purchasedCartsE)
  } catch (error) {
    console.log('Error while fetching history in backend: ', error)
    next(error)
  }
})
