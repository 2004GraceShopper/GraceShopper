//FORMAT OF TOKEN
//Authorization: Bearer <access_token>

//Verify Token for protecting routes
module.exports = (req, res, next) => {
  //Get auth header value
  const bearerHeader = req.headers.authorization
  //Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    //Split at the space
    //Creates an array using split so now the token is the second value in the array
    const bearer = bearerHeader.split(' ')
    //Get token from array
    const bearerToken = bearer[1]
    //Set the token
    req.token = bearerToken
    //Next Middleware
    next()
  } else {
    //Forbidden
    res.status(403).json('You are not authorized')
  }
}
