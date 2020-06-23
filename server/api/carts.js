const router = require('express').Router()
const {Product, User, Cart, Item} = require('../db/models')
module.exports = router

// Add to cart.
// For adding a Product to a Cart through item.
// Create the Item by using userInstance.addCart(cartInstance)
// Then access the item directly and assign its quantity.
router.put(`/add/:productId/:quantity/:cartId`, async (req, res, next) => {
  //req.body????--> security threat!^^^

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

    await Item.destroy({
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

    //console.log('to be deleted:', itemToDelete)
    console.log('quantity', itemToDelete.quantity)
    console.log(typeof itemToDelete.quantity)
    console.log('price', product.price)
    console.log('r u working', theCart.totalQuantity, theCart.totalPrice)

    const productIdInt = parseInt(req.params.productId)
    theCart.items = theCart.items.filter(item => item !== productIdInt)
    theCart.totalQuantity = theCart.totalQuantity - itemToDelete.quantity
    theCart.totalPrice =
      theCart.totalPrice - itemToDelete.quantity * product.price
    await theCart.save()

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

    console.log('updatedCart:', updatedCart)
    res.json(updatedCart)
  } catch (error) {
    console.log('Error deleting item from cart', error)
    next(error)
  }
})

router.put('/edit/:method', async (req, res, next) => {
  let cartToSendBack
  const {productId, cartId} = req.body
  const {method} = req.params
  console.log(req.body, method)

  try {
    //Find the item associated with the cart
    const itemToUpdate = await Item.findOne({
      where: {productId: productId, cartId: cartId}
    })
    const product = await Product.findByPk(productId)
    const gamePrice = product.price
    const cartToUpdate = await Cart.findByPk(cartId)
    //increase or decrease that item's quanitiy

    if (method === 'decrease' && itemToUpdate.quantity > 1) {
      itemToUpdate.quantity = itemToUpdate.quantity - 1
      cartToUpdate.totalQuantity = cartToUpdate.totalQuantity - 1
      cartToUpdate.totalPrice = cartToUpdate.totalPrice - gamePrice
    }
    if (method === 'increase') {
      itemToUpdate.quantity = itemToUpdate.quantity + 1
      cartToUpdate.totalQuantity = cartToUpdate.totalQuantity + 1
      cartToUpdate.totalPrice = cartToUpdate.totalPrice + gamePrice
    }

    await itemToUpdate.save()

    //find the price of the game and then update the totalquantity and totalprice for that cart

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
