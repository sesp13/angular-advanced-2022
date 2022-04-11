const { Router } = require('express');
const { check } = require('express-validator');
const {
  createHospital,
  getHospitals,
  updateHospital,
  deleteHospital,
} = require('../controllers/hospital.controller');
const { fieldValidator } = require('../middlewares/fieldValidator.middleware');
const { validateJWT } = require('../middlewares/validateJWT.middleware');

/*
 * Base Url: /api/hospital
 */
const router = Router();

router.get('/', [validateJWT], getHospitals);

router.post(
  '/',
  [
    validateJWT,
    check('name', 'The name field is required').notEmpty(),
    fieldValidator,
  ],
  createHospital
);

router.put(
  '/:id',
  [
    validateJWT,
    check('name', 'The name field is required').notEmpty(),
    check('id', 'The id must have the correct structure').isMongoId(),
    fieldValidator,
  ],
  updateHospital
);

router.delete(
  '/:id',
  [
    validateJWT,
    check('id', 'The id must have the correct structure').isMongoId(),
    fieldValidator,
  ],
  deleteHospital
);

module.exports = router;
