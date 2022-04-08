const { Router } = require('express');
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/user.controller');
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
    check('password', 'The password is required').notEmpty(),
    check('email', 'The email is required').notEmpty().isEmail(),
    fieldValidator,
  ],
  createUser
);

router.put(
  '/:id',
  [
    check('id', 'The id must have the correct structure').isMongoId(),
    check('name', 'The name is required').notEmpty(),
    check('email', 'The email is required').notEmpty().isEmail(),
    check('role', 'The role is required').notEmpty(),
    fieldValidator
  ],
  updateUser
);

router.delete(
  '/:id',
  [
    check('id', 'The id must have the correct structure').isMongoId(),
    fieldValidator
  ],
  deleteUser
);

module.exports = router;
