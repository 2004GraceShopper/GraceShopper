const router = require('express').Router()
const {Product, User, Cart} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  console.log('**GET api/products**')
  console.log('req.session.id at get all games: ', req.session.id)
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  console.log('**GET api/products/:id**')
  try {
    const singleProduct = await Product.findByPk(req.params.id)
    res.json(singleProduct)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body)
    res.json(newProduct)
  } catch (error) {
    next(error)
  }
})
