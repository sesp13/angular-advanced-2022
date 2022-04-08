const { Router } = require('express');
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/user.controller');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/fieldValidator.middleware');
const { validateJWT } = require('../middlewares/validateJWT.middleware');

/*
 * Base Url: /api/user
 */
const router = Router();

router.get('/', [validateJWT], getUsers);

router.post(
  '/',
  [
    check('name', 'The name is required').notEmpty(),
    check('password', 'The password is required').notEmpty(),
    check('email', 'The email is required').notEmpty().isEmail(),
    fieldValidator,
  ],
  createUser
);

router.put(
  '/:id',
  [
    validateJWT,
    check('id', 'The id must have the correct structure').isMongoId(),
    check('name', 'The name is required').notEmpty(),
    check('email', 'The email is required').notEmpty().isEmail(),
    check('role', 'The role is required').notEmpty(),
    fieldValidator,
  ],
  updateUser
);

router.delete(
  '/:id',
  [
    validateJWT,
    check('id', 'The id must have the correct structure').isMongoId(),
    fieldValidator,
  ],
  deleteUser
);

module.exports = router;
