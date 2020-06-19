const router = require('express').Router()
const {Product, User, Cart} = require('../db/models')
module.exports = router

// Finds or creates a cart for the guest.
router.post('/guest', async (req, res, next) => {
  console.log('Oh hey! It ran the post to create a guest cart!')
  try {
    console.log('in cart.js, sessionId: ', req.sessionID)
    const theCart = await Cart.findOrCreate({
      where: {
        mySession: req.sessionID,
        purchased: false
      }
    })
    res.json(theCart)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

// Finds or creates a cart for the user.
router.post('/:userId', async (req, res, next) => {
  console.log('This is the post request to create a user cart.')
  try {
    const theCart = await Cart.findOrCreate({
      where: {
        userId: req.params.userId,
        purchased: false
      }
    })
    res.json(theCart)
  } catch (error) {
    console.log(error)
    next(error)
  }
})
