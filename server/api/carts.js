const router = require('express').Router()
const {Product, User, Cart, Item} = require('../db/models')
module.exports = router

// Add to cart.
// For adding a Product to a Cart through item.
// Create the Item by using userInstance.addCart(cartInstance)
// Then access the item directly and assign its quantity.
router.put(`/add/:productId/:quantity/:cartId`, async (req, res, next) => {
  console.log('**PUT api/carts/:add/:productId/:quantity/:cartId**')
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
    const theUpdatedCart = await Cart.findByPk(req.params.cartId, {
      include: [
        {
          model: Product,
          as: Item,
          required: true
        }
      ]
    })
    res.json(theUpdatedCart)
  } catch (error) {
    console.log('Error while adding to cart in backend: ', error)
    next(error)
  }
})

router.put('/edit/', async (req, res, next) => {
  let cartToSendBack
  const {productId, cartId, edit} = req.body
  console.log(req.body, productId, cartId, edit)
  try {
    //Find the item associated with the cart
    const itemToUpdate = await Item.findOne({
      where: {productId: productId, cartId: cartId}
    })
    //increase or decrease that item's quanitiy
    itemToUpdate.quantity = itemToUpdate.quantity + 1

    itemToUpdate.save()
    console.log(itemToUpdate, 'ITEM')
    //find the price of the game and then update the totalquantity and totalprice for that cart
    const product = await Product.findByPk(productId)
    const gamePrice = product.price
    const cartToUpdate = await Cart.findByPk(cartId)

    cartToUpdate.totalQuantity = cartToUpdate.totalQuantity + 1
    cartToUpdate.totalPrice = cartToUpdate.totalPrice + gamePrice
    await cartToUpdate.save()
    //find the cart associated with the guest by checking cartId
    cartToSendBack = await Cart.findByPk(cartId, {
      include: [
        {
          model: Product,
          as: Item,
          required: true
        }
      ]
    })
    // return the updated cart
    res.json(cartToSendBack)
  } catch (error) {
    next(error)
  }
})
