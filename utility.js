const {Product, Cart, Item} = require('./server/db/models')

const findOrGetTheCart = async (user, sessionId) => {
  let cartResults
  console.log('req.user in findOrGet: ', user)
  if (user === undefined) {
    console.log('******A guest cart is being created!')
    cartResults = await Cart.findOrCreate({
      where: {
        mySession: sessionId,
        purchased: false
      },
      include: [
        {
          model: Product,
          as: Item,
          required: true
        }
      ]
    })
  } else {
    console.log('******A NEW user cart is being created!')
    cartResults = await Cart.findOrCreate({
      where: {
        userId: user.id,
        purchased: false
      },
      include: [
        {
          model: Product,
          as: Item,
          required: true
        }
      ]
    })
  }
  // console.log("Cart results:", cartResults[0].dataValues);
  // if (cartResults[0].dataValues !== undefined) {
  //     console.log("An actual object should be returned....")
  //     return cartResults[0].dataValues
  // }
  //console.log("cartResults[0]:", cartResults[0])
  return cartResults[0]
}

module.exports = {
  findOrGetTheCart
}
