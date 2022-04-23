const { Router } = require('express');
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/user.controller');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/fieldValidator.middleware');
const {
  validateJWT,
  validateAdminRole,
  validateAdminRoleOrSameUser,
} = require('../middlewares/validateJWT.middleware');
const { validRoleCheck } = require('../helpers/validRoles.helper');

/*
 * Base Url: /api/user
 */
const router = Router();

router.get('/', [validateJWT, validateAdminRole], getUsers);

router.post(
  '/',
  [
    check('name', 'The name is required').notEmpty(),
    check('password', 'The password is required').notEmpty(),
    check('email', 'The email is required').notEmpty().isEmail(),
    validRoleCheck,
    fieldValidator,
  ],
  createUser
);

router.put(
  '/:id',
  [
    validateJWT,
    validateAdminRoleOrSameUser,
    check('id', 'The id must have the correct structure').isMongoId(),
    check('name', 'The name is required').notEmpty(),
    check('email', 'The email is required').notEmpty().isEmail(),
    validRoleCheck,
    fieldValidator,
  ],
  updateUser
);

router.delete(
  '/:id',
  [
    validateJWT,
    validateAdminRole,
    check('id', 'The id must have the correct structure').isMongoId(),
    fieldValidator,
  ],
  deleteUser
);

module.exports = router;
