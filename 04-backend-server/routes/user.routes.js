const { Router } = require('express');
const { getUsers } = require('../controllers/user.controller');

/*
 * Base Url: /api/users/
 */
const router = Router();

router.get('/', getUsers);

module.exports = router;
