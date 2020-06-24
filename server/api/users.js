const router = require('express').Router()
const jwt = require('jsonwebtoken')
const verifyToken = require('./verifyToken')
const {User} = require('../db/models')
const {Cart} = require('../db/models')
module.exports = router

router.get('/', verifyToken, async (req, res, next) => {
  console.log('**GET api/users**')
  try {
    const decoded = jwt.verify(req.token, 'secretkey')
    if (!decoded) {
      res.send(403)
    } else {
      const users = await User.findAll({
        // explicitly select only the id and email fields - even though
        // users' passwords are encrypted, it won't help if we just
        // send everything to anyone who asks!
        attributes: ['id', 'email']
      })
      res.json(users)
    }
  } catch (err) {
    next(err)
  }
})

// User creation.
router.post('/', async (req, res, next) => {
  console.log('**POST api/users**')
  try {
    const user = await User.create(req.body)
    res.status(201).send(user)
  } catch (error) {
    next(error)
  }
})
