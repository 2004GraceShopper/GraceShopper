const router = require('express').Router()
const {Product, User, Cart, Item} = require('../db/models')
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
        productId: req.params.productId
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

    // All good? Send back a yay!
    res.json('Yay')
  } catch (error) {
    console.log('Error while adding to cart in backend: ', error)
    next(error)
  }
})

// router.put('/addToCart/:productId/:userId', async (req, res, next) => {
//     try {
//         console.log("req.session:", req.session)
//         console.log("req.sessionID: ", req.sessionID)

//         const theProduct = await Product.findByPk(req.params.productId)

//         // I need to eager load the cart that belongs to User that is NOT purchased.
//         const theCart = await Cart.findOrCreate({
//           where: {
//             userId: req.params.userId
//           },
//           defaults: {
//             items: [],
//             userId: req.params.userId
//           }
//         })

//         // This might need to be theCart.addProduct(theProduct); I'm not sure.
//         const theItem = await theProduct.addCart(theCart)
//         // After making the Item row, we need to add qty to that item row
//         theItem.quantity = req.body.qty
//         await theItem.save();
//         res.json("Yay");
//     } catch (error) {
//         console.log("req.params.productId", req.params.productId)
//         next(error)
//     }
// })
