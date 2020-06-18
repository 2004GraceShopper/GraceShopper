const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    const singleProduct = await Product.findByPk(req.params.id)
    res.json(singleProduct)
  } catch (error) {
    next(error)
  }
})
