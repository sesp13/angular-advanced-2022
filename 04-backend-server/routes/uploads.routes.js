const { Router } = require('express');
const { uploadImage } = require('../controllers/uploads.controller');
const { validateJWT } = require('../middlewares/validateJWT.middleware');
const fileUpload = require('express-fileupload');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/fieldValidator.middleware');

/*
 * Base Url: /api/uploads
 */
const router = Router();

// Use this middleware to upload files
router.use(fileUpload());

router.put(
  '/:collection/:id',
  [
    validateJWT,
    check('id', 'The id must have the correct structure').isMongoId(),
    fieldValidator
  ],
  uploadImage
);

module.exports = router;
