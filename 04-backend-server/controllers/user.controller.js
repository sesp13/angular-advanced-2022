const { request, response } = require('express');

const getUsers =
  (req = request, res = response) => {
    return res.json({
      ok: true,
      msg: 'Welcome to the jungle',
    });
  };

module.exports = {
  getUsers,
};
