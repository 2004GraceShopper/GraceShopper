module.exports = (req, res, next) => {
  if (req.session.token) {
    req.token = req.session.token
    next()
  } else {
    res.status(403).json('You are not authorized')
  }
}
