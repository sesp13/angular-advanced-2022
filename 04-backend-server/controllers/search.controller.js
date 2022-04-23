const { request, response } = require('express');
const User = require('../models/User.model');
const Hospital = require('../models/Hospital.model');
const Doctor = require('../models/Doctor.model');

const getAll = async (req = request, res = response) => {
  const term = req.params.term;
  const regex = new RegExp(term, 'i');
  try {
    // Multiple collection search
    const [users, doctors, hospitals] = await Promise.all([
      User.find({ name: regex }),
      Doctor.find({ name: regex }),
      Hospital.find({ name: regex }),
    ]);

    return res.status(200).json({
      ok: true,
      msg: `Success all search:  ${term}`,
      users,
      doctors,
      hospitals,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error during all search, please check logs',
    });
  }
};

const getDataByCollection = async (req = request, res = response) => {
  const term = req.params.term;
  const collection = req.params.collection.toLowerCase();
  const regex = new RegExp(term, 'i');
  try {
    let content = [];
    switch (collection) {
      case 'users': {
        content = await User.find({ name: regex });
        break;
      }
      case 'hospitals': {
        content = await Hospital.find({ name: regex }).populate(
          'user',
          'name img'
        );
        break;
      }
      case 'doctors': {
        content = await Doctor.find({ name: regex })
          .populate('user', 'name img')
          .populate('hospital', 'name img');
        break;
      }
      default: {
        return res.status(400).json({
          ok: false,
          msg: `Error: The collection ${collection} is not supported`,
        });
      }
    }
    return res.status(200).json({
      ok: true,
      msg: `Success collection ${collection} search: ${term}`,
      content,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error during collection search, please check logs',
    });
  }
};

module.exports = {
  getAll,
  getDataByCollection,
};
