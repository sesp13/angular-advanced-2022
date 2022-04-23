const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

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

const validateAdminRole = async (req = request, res = response, next) => {
  const uid = req.uid;
  try {
    const userDb = await User.findById(uid);
    if (!userDb)
      return res.status(404).json({
        ok: false,
        msg: `The user doesn't exists`,
      });

    // Check role
    if (userDb.role !== 'ADMIN_ROLE')
      return res.status(403).json({
        ok: false,
        msg: `The user doesn't have privileges`,
      });

    // Everything ok go ahead
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: `Internal server error, please talk with the admin`,
    });
  }
};

// check admin role or if the user to update has the same id of authUser
const validateAdminRoleOrSameUser = async (
  req = request,
  res = response,
  next
) => {
  // User from the token
  const uid = req.uid;
  // User to update
  const id = req.params.id;
  try {
    const userDb = await User.findById(uid);
    if (!userDb)
      return res.status(404).json({
        ok: false,
        msg: `The user doesn't exists`,
      });

    // Check role
    if (userDb.role !== 'ADMIN_ROLE' && uid != id)
      return res.status(403).json({
        ok: false,
        msg: `The user doesn't have privileges`,
      });

    // Everything ok go ahead
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: `Internal server error, please talk with the admin`,
    });
  }
};

module.exports = {
  validateJWT,
  validateAdminRole,
  validateAdminRoleOrSameUser,
};
