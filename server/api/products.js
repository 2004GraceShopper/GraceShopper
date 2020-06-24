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

router.get('/categories/:tag', async (req, res, next) => {
  console.log(req.params.tag)
  try {
    const games = await Product.findByTag(req.params.tag)
    !games ? res.sendStatus(404) : res.json(games)
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

//should be protected
router.post('/', async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body)
    res.json(newProduct)
  } catch (error) {
    next(error)
  }
})

//should be protected
router.put('/:id', async (req, res, next) => {
  try {
    const [numberOfAffectedRows, updatedProduct] = await Product.update(
      req.body,
      {
        where: {id: req.params.id},
        returning: true,
        plain: true
      }
    )
    res.json(updatedProduct)
  } catch (error) {
    next(error)
  }
})

//should be protected
router.delete('/', async (req, res, next) => {
  try {
    const deletedProduct = await Product.destroy({
      where: {id: req.body.id}
    })
    !deletedProduct ? res.sendStatus(404) : res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
