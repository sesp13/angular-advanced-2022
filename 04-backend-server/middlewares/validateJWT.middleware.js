const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req = request, res = response, next) => {
  // Read token
  const token = req.header('x-token');
  if (!token)
    return res.status(401).json({
      ok: false,
      msg: 'No token found',
    });

  // verify jwt
  try {
    const { uid } = jwt.verify(token, process.env.JWTKEY);
    // Set uid in the request
    req.uid = uid;
    // Valid token, go ahead
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      ok: false,
      msg: 'Invalid Token',
    });
  }
};

module.exports = {
  validateJWT,
};
