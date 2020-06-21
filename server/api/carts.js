const router = require('express').Router()
const {Product, User, Cart, Item} = require('../db/models')
//const { Sequelize } = require('sequelize/types')
module.exports = router

router.get('/:cartId', async (req, res, next) => {
  console.log('cartId?', req.params.cartId)
  try {
    let cartIdInt = req.params.cartId

    //this might break when multiple carts exist for given user
    const theItems = await Cart.findAll({
      where: {
        id: cartIdInt
      },
      include: [
        {
          model: Product,
          as: Item,
          required: true
          // attributes: [Item.quantity] //--- eager items code block isnt run
          //attributes: ['quantity'] //--- eager items code block doesnt run

          // where: {
          //   state: Sequelize.col(Item.lockedPrice,Item.quantity) --- error message: sequelize/types
          // }
        }
      ]
    })

    console.log('Server side GET request theItems', theItems)
    res.json(theItems)
  } catch (error) {
    next(error)
  }
})

// Finds or creates a cart for the guest.
router.post('/guest', async (req, res, next) => {
  console.log('Oh hey! It ran the post to create a guest cart!')
  try {
    console.log('in cart.js, req.session.id: ', req.session.id)
    console.log('in cart.js, req.sessionID: ', req.sessionID)
    const theCart = await Cart.findOrCreate({
      where: {
        mySession: req.session.id,
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

// Add to cart.
// For adding a Product to a Cart through item.
// Create the Item by using userInstance.addCart(cartInstance)
// Then access the item directly and assign its quantity.
router.put(`/add/:productId/:quantity/:cartId`, async (req, res, next) => {
  console.log('This is a back-end put request to add to a cart.')
  try {
    const theCart = await Cart.findByPk(req.params.cartId)
    const theProduct = await Product.findByPk(req.params.productId)
    // This might need to be theCart.addProduct(theProduct); I'm not sure.
    // The below code finds or creates an item, and sets its quantity appropriately.
    const maybeTheItem = await Item.findOne({
      // Will be null or an item instance
      where: {
        productId: req.params.productId,
        cartId: req.params.cartId
      }
    })
    let theItem
    let quantityInt = parseInt(req.params.quantity)
    if (maybeTheItem) {
      theItem = maybeTheItem
      theItem.quantity += quantityInt
    } else {
      const theItemArray = await theProduct.addCart(theCart)
      theItem = theItemArray[0]
      theItem.quantity = quantityInt
    }
    // After making or finding the Item row, we need to add qty to that item row
    await theItem.save()

    // Now that the item is all set, time to update the cart!
    console.log('logic: ', theCart.items.indexOf(req.params.productId))
    let productIdInt = parseInt(req.params.productId)
    if (theCart.items.indexOf(productIdInt) === -1) {
      let moreItemsArray = [...theCart.items, productIdInt] // FYI pushing to theCart.items array does change it, but Sequelize doesn't recognize the change when saving.
      theCart.items = moreItemsArray
    }
    theCart.totalQuantity += quantityInt
    theCart.totalPrice += quantityInt * theProduct.price
    await theCart.save()

    // All good? Send back the updated cart, which is just an object.
    // Note: this is different from how the cart was an array through findOrCreate.
    res.json(theCart)
  } catch (error) {
    console.log('Error while adding to cart in backend: ', error)
    next(error)
  }
})
