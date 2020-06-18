const router = require('express').Router()
const {Guest} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const guest = await Guest.create(req.body)
    res.json(guest)
  } catch (error) {
    next(error)
  }
})
