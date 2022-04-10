const { request, response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { updateImage, deleteImage } = require('../helpers/update-image.helper');
const path = require('path');
const fs = require('fs');

const uploadImage = async (req = request, res = response) => {
  try {
    // Collect params
    const { collection, id } = req.params;

    // Check if the file exists
    if (!req.files || Object.keys(req.files).length === 0)
      return res.status(400).json({
        ok: false,
        msg: 'No files were uploaded.',
      });

    // Process file
    const file = req.files.image;
    const nameSplitted = file.name.split('.');
    const ext = nameSplitted[nameSplitted.length - 1];

    // Check extension
    const validExtensions = ['png', 'jpg', 'jpeg', 'gif', 'webp'];
    if (!validExtensions.includes(ext))
      return res.status(400).json({
        ok: false,
        msg: 'Invalid image extension',
      });

    // Check types
    const validTypes = ['doctors', 'hospitals', 'users'];
    if (!validTypes.includes(collection))
      return res.status(400).json({
        ok: false,
        msg: `The collection ${collection} is not supported`,
      });

    // Generate new name
    const filename = `${uuidv4()}.${ext}`;

    // Path to save the image
    const uploadPath = `./uploads/${collection}/${filename}`;

    // Use the mv() method to place the file somewhere on your server
    file.mv(uploadPath, async (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          ok: false,
          msg: 'Error in file upload, please check logs',
        });
      }

      // Update image on db
      const updateResult = await updateImage(collection, id, filename);
      if (updateResult?.error) {
        // Delete the new image
        deleteImage(`./uploads/${collection}/${filename}`);
        return res.status(400).json({
          ok: false,
          msg: updateResult?.error,
        });
      }

      return res.status(200).json({
        ok: true,
        msg: `Success file upload`,
        filename,
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: `Error during file upload, please check logs`,
    });
  }
};

const getImage = async (req = request, res = response) => {
  const { collection, photo } = req.params;
  try {
    let pathImg = path.join(__dirname, `../uploads/${collection}/${photo}`);
    if (!fs.existsSync(pathImg)) {
      // Send default image
      pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
    }
    res.sendFile(pathImg);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: `Error getting the image ${collection}/${photo} please check logs`,
    });
  }
};

module.exports = {
  uploadImage,
  getImage,
};
