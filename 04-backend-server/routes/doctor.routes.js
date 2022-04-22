const { Router } = require('express');
const { check } = require('express-validator');
const {
  createDoctor,
  getDoctors,
  updateDoctor,
  deleteDoctor,
  getDoctorById,
} = require('../controllers/doctor.controller');
const { fieldValidator } = require('../middlewares/fieldValidator.middleware');
const { validateJWT } = require('../middlewares/validateJWT.middleware');

/*
 * Base Url: /api/doctor
 */
const router = Router();

router.get('/', [validateJWT], getDoctors);

router.get('/:id', [validateJWT], getDoctorById);

router.post(
  '/',
  [
    validateJWT,
    check('name', 'The name field is required').notEmpty(),
    check(
      'hospital',
      'The field hospital is required and it must have the correct structure'
    )
      .notEmpty()
      .isMongoId(),
    fieldValidator,
  ],
  createDoctor
);

router.put(
  '/:id',
  [
    validateJWT,
    check('name', 'The name field is required').notEmpty(),
    check(
      'hospital',
      'The field hospital is required and it must have the correct structure'
    )
      .notEmpty()
      .isMongoId(),
    check('id', 'The id must have the correct structure').isMongoId(),
    fieldValidator,
  ],
  updateDoctor
);

router.delete(
  '/:id',
  [
    validateJWT,
    check('id', 'The id must have the correct structure').isMongoId(),
    fieldValidator,
  ],
  deleteDoctor
);

module.exports = router;
