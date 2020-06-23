const router = require('express').Router()
const jwt = require('jsonwebtoken')
const verifyToken = require('./verifyToken')
const {Product, User, Cart, Item} = require('../db/models')
module.exports = router

// Add to cart.
// For adding a Product to a Cart through item.
// Create the Item by using userInstance.addCart(cartInstance)
// Then access the item directly and assign its quantity.
// Test for protected route! - successful!
router.put(
  `/add/:productId/:quantity/:cartId`,
  verifyToken,
  async (req, res, next) => {
    console.log('**PUT api/carts/:add/:productId/:quantity/:cartId**')
    try {
      //Protecting Routes
      const decoded = jwt.verify(req.token, 'secretkey')
      if (!decoded) {
        res.send(403)
      } else {
        //Alison starts here
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
      }
    } catch (error) {
      console.log('Error while adding to cart in backend: ', error)
      next(error)
    }
  }
)


// Delete from cart:
// I need productId and cartId
router.delete('/:cartId/:productId', async (req, res, next) => {
  try {
    // This deletes the associated item in the Item table, then separately updates the Cart instance.
    // If the cart instance is not updated, on the front end the items won't removed from the cart.
    const cartIdInt = parseInt(req.params.cartId)
    const theCart = await Cart.findOne({
      where: {
        id: cartIdInt
      },
      include: [
        {
          model: Product,
          as: Item,
          require: true
        }
      ]
    })
    const itemToDelete = await Item.findOne({
      where: {
        productId: req.params.productId,
        cartId: req.params.cartId
      }
    })
    const product = await Product.findOne({
      where: {
        id: req.params.productId
      }
    })
    const productIdInt = parseInt(req.params.productId)
    
    // Delete the item:
    await Item.destroy({
      where: {
        productId: req.params.productId,
        cartId: req.params.cartId
      }
    })
    
    // Update the cart:
    theCart.items = theCart.items.filter(item => item !== productIdInt)
    theCart.totalQuantity = theCart.totalQuantity - itemToDelete.quantity
    theCart.totalPrice =
      theCart.totalPrice - itemToDelete.quantity * product.price
    await theCart.save()

    // Return the updated eager-loaded cart:
    const updatedCart = await Cart.findOne({
      where: {
        id: cartIdInt
      },
      include: [
        {
          model: Product,
          as: Item,
          require: true
        }
      ]
    })
    res.json(updatedCart)
  } catch (error) {
    console.log('Error deleting item from cart', error)
    next(error)
  }
})
