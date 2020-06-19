const router = require('express').Router()
const {Product, User, Cart} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const singleProduct = await Product.findByPk(req.params.id)
    res.json(singleProduct)
  } catch (error) {
    next(error)
  }
})

// For adding a Product to a Cart through item.
// First create the Item by using userInstance.addCart(cartInstance)
// Then access the item directly and assign its quantity.
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
