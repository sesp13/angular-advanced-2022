const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/User.model');
const { generateJWT } = require('../helpers/jwt.helper');
const { googleVerify } = require('../helpers/googleVerify.helper');

const login = async (req = request, res = response) => {
  const { email, password } = req.body;
  try {
    // Check email
    const dbUser = await User.findOne({ email });
    if (!dbUser)
      return res.status(404).json({
        ok: false,
        msg: 'Invalid data',
      });

    // Check password
    const validPassword = bcryptjs.compareSync(password, dbUser.password);
    if (!validPassword)
      return res.status(400).json({
        ok: false,
        msg: 'Invalid user / password',
      });

    // Generate JWT
    const token = await generateJWT(dbUser.id);

    return res.status(200).json({
      ok: true,
      msg: 'Login',
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error in login, please check logs',
    });
  }
};

const googleSignIn = async (req = request, res = response) => {
  try {
    const googleToken = req.body.token;
    const { name, email, picture } = await googleVerify(googleToken);

    const userDB = await User.findOne({ email });
    let user;
    if (!userDB) {
      // The user doesn't exists
      user = new User({
        name,
        email,
        // Set a deafult password, this user will only be able to log using this method
        password: '_',
        img: picture,
        google: true,
      });
    } else {
      // The user exists
      user = userDB;
      user.google = true;
    }

    // Save on db
    await user.save();

    // Generate JWT
    const token = await generateJWT(user.id);

    return res.status(200).json({
      ok: true,
      msg: 'Success google sign in',
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      ok: false,
      msg: 'Invalid token, please check logs',
    });
  }
};

const renewToken = async (req = request, res = response) => {
  const uid = req.uid;
  try {
    // Generate new token
    const token = await generateJWT(uid);
    // Get user
    const user = await User.findById(uid);
    
    return res.status(200).json({
      ok: true,
      msg: 'Renew token',
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error in renew, please check logs',
    });
  }
};

module.exports = {
  login,
  googleSignIn,
  renewToken,
};
