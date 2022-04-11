const { Router } = require('express');
const { check } = require('express-validator');
const {
  login,
  googleSignIn,
  renewToken,
} = require('../controllers/auth.controller');
const { fieldValidator } = require('../middlewares/fieldValidator.middleware');
const { validateJWT } = require('../middlewares/validateJWT.middleware');

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

router.post(
  '/google',
  [check('token', 'The token is required').notEmpty(), fieldValidator],
  googleSignIn
);

router.get('/renew', [validateJWT], renewToken);

module.exports = router;
