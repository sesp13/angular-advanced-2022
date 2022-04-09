const { Router } = require('express');
const { getAll, getDataByCollection } = require('../controllers/search.controller');
const { validateJWT } = require('../middlewares/validateJWT.middleware');

/*
 * Base Url: /api/search
 */
const router = Router();

router.get('/all/:term', [validateJWT], getAll);
router.get('/collection/:collection/:term', [validateJWT], getDataByCollection);

module.exports = router;
