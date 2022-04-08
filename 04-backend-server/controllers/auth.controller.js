const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/User.model');
const { generateJWT } = require('../helpers/jwt.helper');

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

module.exports = {
  login,
};
