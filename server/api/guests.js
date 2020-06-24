const router = require('express').Router()
const {Guest} = require('../db/models')
const Sequelize = require('sequelize')
module.exports = router

router.post('/', async (req, res, next) => {
  console.log('**POST api/guests**')
  console.log('req.login??: ', req.login)
  try {
    Guest.create(req.body)
      .then(function(guest) {
        return res.json(guest)
      })
      .catch(Sequelize.ValidationError, function(msg) {
        // console.log("What's the secret message?: ", msg) // it's a sequelize validation error message!
        return res.status(422).send(msg)
      })
      .catch(function(err) {
        next(err)
      })
  } catch (error) {
    res.json(error)
    next(error)
  }
})
