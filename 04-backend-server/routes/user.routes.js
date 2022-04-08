const { Router } = require('express');
const { getUsers, createUser } = require('../controllers/user.controller');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/fieldValidator.middleware');

/*
 * Base Url: /api/users/
 */
const router = Router();

router.get('/', getUsers);

router.post(
  '/',
  [
    check('name', 'The name is required').notEmpty(),
    check('password', 'The password is requred').notEmpty(),
    check('email', 'The email is required').notEmpty().isEmail(),
    fieldValidator
  ],
  createUser
);

module.exports = router;
