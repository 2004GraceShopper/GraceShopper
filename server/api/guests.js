const router = require('express').Router()
const {Guest} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  console.log('**POST api/guests**')
  try {
    const guest = await Guest.create(req.body)
    res.status(201).send(guest)
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
