const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/User.model');
const { generateJWT } = require('../helpers/jwt.helper');

const getUsers = async (req = request, res = response) => {
  try {
    // From which register the information will be taken
    const from = Number(req.query.from) || 0;
    // The size of the pages to take
    const size = Number(req.query.size) || 5;

    const [users, total] = await Promise.all([
      User.find({}, 'name email role google img').skip(from).limit(size),
      User.countDocuments(),
    ]);

    return res.json({
      ok: true,
      msg: 'Get Users',
      users,
      total,
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

    // Create token
    const token = await generateJWT(user.id);

    return res.json({
      ok: true,
      msg: 'Create user',
      user,
      token,
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
      } else {
        // Set email, only allow non google users to update it
        if (!userDb.google) {
          fields.email = email;
        } else if (email !== userDb.email) {
          return res.status(400).json({
            ok: false,
            msg: 'Google users cannot change their email',
          });
        }
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

const deleteUser = async (req = request, res = response) => {
  const uid = req.params.id;
  try {
    const dbUser = await User.findById(uid);
    if (!dbUser)
      return res.status(404).json({
        ok: false,
        msg: `Not user found with id ${uid}`,
      });

    // Delete user
    await User.deleteOne({ _id: dbUser._id });

    return res.status(200).json({
      ok: true,
      msg: 'Delete user',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error during user deletion, please check logs',
    });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
