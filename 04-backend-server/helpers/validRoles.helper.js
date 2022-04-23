const { check } = require('express-validator');

const validUserRoles = ['USER_ROLE', 'ADMIN_ROLE'];

const validRoleCheck = check('role', `The role is not supported`)
  .optional()
  .isIn(validUserRoles);

module.exports = {
  validUserRoles,
  validRoleCheck,
};
