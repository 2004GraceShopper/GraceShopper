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

//delete from cart:
// i need productId and cartId
router.delete('/:cartId/:productId', async (req, res, next) => {
  try {
    //this deleted the associated item in the Item table, but not in the cart items object in the db
    //on the front end the items are removed from the cart
    const deletedItem = await Item.destroy({
      where: {
        productId: req.params.productId,
        cartId: req.params.cartId
      },
      //works the same regardless of:
      //include: Cart //goal : delete item from cart's items array
      include: [
        {
          model: Cart
        }
      ]
    })

    // if (theCart.items.indexOf(productIdInt) === -1) {
    //   let moreItemsArray = [...theCart.items, productIdInt] // FYI pushing to theCart.items array does change it, but Sequelize doesn't recognize the change when saving.
    //   theCart.items = moreItemsArray
    // }
    // theCart.totalQuantity += quantityInt
    // theCart.totalPrice += quantityInt * theProduct.price
    // await theCart.save()

    //magic methods

    console.log('deletedItem:', deletedItem)
    res.json(deletedItem)
  } catch (error) {
    console.log('Error deleting item from cart', error)
    next(error)
  }
})
