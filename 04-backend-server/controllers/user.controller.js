const { request, response } = require('express');
const User = require('../models/User.model');

const getUsers = async (req = request, res = response) => {
  try {
    const users = await User.find({}, 'name email role google');
    return res.json({
      ok: true,
      msg: 'Get Users',
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error during user creation, please contact the admin',
    });
  }
};

const createUser = async (req = request, res = response) => {
  try {
    const { email, password, name } = req.body;
    // Check duplicated emails
    const emailExits = await User.findOne({ email });
    if (emailExits)
      return res.status(400).json({
        ok: false,
        msg: 'The email was registered',
      });

    const user = new User();
    // Set data
    user.name = name;
    user.email = email;
    user.password = password;
    // Store in db
    await user.save();
    return res.json({
      ok: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error during user creation',
    });
  }
};

module.exports = {
  getUsers,
  createUser,
};
