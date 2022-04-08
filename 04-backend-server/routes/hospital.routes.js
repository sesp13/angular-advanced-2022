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

router.get('/', [], getHospitals);

router.post('/', [], createHospital);

router.put('/:id', [], updateHospital);

router.delete('/:id', [], deleteHospital);

module.exports = router;
