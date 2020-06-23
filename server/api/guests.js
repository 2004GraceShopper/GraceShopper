const router = require('express').Router()
const jwt = require('jsonwebtoken')
const verifyToken = require('./verifyToken')
const {Guest} = require('../db/models')
module.exports = router

//route protection- successful!
router.post('/', verifyToken, async (req, res, next) => {
  console.log('**POST api/guests**')
  try {
    const decoded = jwt.verify(req.token, 'secretkey')
    if (!decoded) {
      res.send(403)
    } else {
      const guest = await Guest.create(req.body)
      res.status(201).send(guest)
    }
  } catch (error) {
    next(error)
  }
})

// router.put('/:id/cart', async (req, res, next) => {
//     try {
//         const newItem = await Item.create({
//             quantity: 1,
//             productId
//         })
//     } catch (error) {
//         next(error)
//     }
// })
