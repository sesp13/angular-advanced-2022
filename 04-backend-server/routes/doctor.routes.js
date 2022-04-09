const { Router } = require('express');
const { check } = require('express-validator');
const {
  createDoctor,
  getDoctors,
  updateDoctor,
  deleteDoctor,
} = require('../controllers/doctor.controller');
const { fieldValidator } = require('../middlewares/fieldValidator.middleware');
const { validateJWT } = require('../middlewares/validateJWT.middleware');

/*
 * Base Url: /api/doctor
 */
const router = Router();

router.get('/', [], getDoctors);

router.post('/', [], createDoctor);

router.put('/:id', [], updateDoctor);

router.delete('/:id', [], deleteDoctor);

module.exports = router;
