const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
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
    const { email, password } = req.body;
    // Check duplicated emails
    const emailExits = await User.findOne({ email });
    if (emailExits)
      return res.status(400).json({
        ok: false,
        msg: 'The email was registered',
      });

    // Set data
    const user = new User(req.body);

    // encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

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
      msg: 'Error during user creation, please check logs',
    });
  }
};

const updateUser = async (req = request, res = response) => {
  // TODO implement validation token
  const uid = req.params.id;
  try {
    const userDb = await User.findById(uid);
    if (!userDb) {
      return res.status(404).json({
        ok: false,
        msg: `Not user found with id ${uid}`,
      });
    }

    // Updates
    const { password, google, email, ...fields } = req.body;
    // Check email
    if (userDb.email != email) {
      const emailExists = await User.findOne({ email: email });
      if (emailExists) {
        return res.status(400).json({
          ok: false,
          msg: 'The email is already used',
        });
      }
      else {
        // Set email
        fields.email = email;
      }
    }
    
    const userUpdated = await User.findByIdAndUpdate(uid, fields, {
      new: true,
    });

    return res.status(200).json({
      ok: true,
      msg: 'Update user',
      user: userUpdated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error during user creation, please check logs',
    });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
};
