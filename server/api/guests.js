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
        console.log('.then ran!')
        return res.json(guest)
      })
      .catch(Sequelize.ValidationError, function(msg) {
        console.log("What's the secret message?: ", msg)
        return res.status(422).send(msg)
      })
      .catch(function(err) {
        next(err)
      })

    // const helperFunc = (err) => {
    //   res.json(err)
    //   next(err)
    // }
    // req.login(
    //   guest,
    //   err => (err ? res.json(err) : res.json(guest))
    // )
    const help = () => {
      console.log('help!')
    }
  } catch (error) {
    res.json(error)
    next(error)
  }
})
