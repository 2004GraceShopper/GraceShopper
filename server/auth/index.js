const router = require('express').Router()
const User = require('../db/models/user')
const Cart = require('../db/models/cart')
const Product = require('../db/models/product')
const Item = require('../db/models/item')
module.exports = router

const findOrGetTheCart = async (user, sessionId) => {
  let cartResults
  console.log('req.user in findOrGet: ', user)
  if (user === undefined) {
    cartResults = await Cart.findOrCreate({
      where: {
        mySession: sessionId,
        purchased: false
      },
      include: [
        {
          model: Product,
          as: Item,
          required: true
        }
      ]
    })
  } else {
    cartResults = await Cart.findOrCreate({
      where: {
        userId: user.id,
        purchased: false
      },
      include: [
        {
          model: Product,
          as: Item,
          required: true
        }
      ]
    })
  }
  //console.log("Cart results:", cartResults);
  return cartResults[0]
}

const generateResObj = (user, cart) => {
  return {
    user: user,
    userCart: cart
  }
}

router.post('/login', async (req, res, next) => {
  console.log('**POST auth/login**')
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      let theCart = await findOrGetTheCart(user, req.session.id)
      req.login(
        user,
        err => (err ? next(err) : res.json(generateResObj(user, theCart)))
      )
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  console.log('**POST auth/signup**')
  try {
    const user = await User.create(req.body)
    // Also setting cart:
    let theCart = await findOrGetTheCart(user, req.session.id)
    req.login(
      user,
      err => (err ? next(err) : res.json(generateResObj(user, theCart)))
    )
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  console.log('**POST auth/logout**')
  console.log('req.session.id at LOGOUT: ', req.session.id)
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', async (req, res) => {
  console.log('**GET auth/me**')
  console.log('in routes, req.session.id: ', req.session.id)
  console.log('in routes, req.sessionID: ', req.sessionID)
  console.log('req.user: ', req.user)
  // Also setting cart:
  let theCart = await findOrGetTheCart(req.user, req.session.id)

  res.json(generateResObj(req.user, theCart))
})

router.use('/google', require('./google'))
