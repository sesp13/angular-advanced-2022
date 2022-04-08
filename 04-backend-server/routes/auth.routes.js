const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controller');
const { fieldValidator } = require('../middlewares/fieldValidator.middleware');

/*
 * Base Url: /api/login/
 */

const router = Router();

router.post(
  '/',
  [
    check('email', 'The email field is required').notEmpty().isEmail(),
    check('password', 'The password field is required').notEmpty(),
    fieldValidator,
  ],
  login
);

module.exports = router;
