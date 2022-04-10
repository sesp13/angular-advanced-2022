const fs = require('fs');

const User = require('../models/User.model');
const Hospital = require('../models/Hospital.model');
const Doctor = require('../models/Doctor.model');

const updateImage = async (type, id, filename) => {
  const basePath = `./uploads/${type}`;
  switch (type) {
    case 'users': {
      const user = await User.findById(id);
      if (!user) {
        return { error: `The user ${id} doesn't exists` };
      }
      // Delete old image
      if (user.img != '') deleteImage(`${basePath}/${user.img}`);
      // Update on db
      user.img = filename;
      await user.save();
      break;
    }
    case 'hospitals': {
      const hospital = await Hospital.findById(id);
      if (!hospital) {
        return { error: `The hospital ${id} doesn't exists` };
      }
      // Delete old image
      if (hospital.img != '') deleteImage(`${basePath}/${hospital.img}`);
      // Update on db
      hospital.img = filename;
      await hospital.save();
      break;
    }
    case 'doctors': {
      const doctor = await Doctor.findById(id);
      if (!doctor) {
        return { error: `The doctor ${id} doesn't exists` };
      }
      // Delete old image
      if (doctor.img != '') deleteImage(`${basePath}/${doctor.img}`);
      // Update on db
      doctor.img = filename;
      await doctor.save();
      break;
    }
    default: {
      return { error: `The type ${type} is not supported` };
    }
  }
};

const deleteImage = (path) => {
  if (fs.existsSync(path)) fs.unlinkSync(path);
};

module.exports = {
  updateImage,
  deleteImage,
};
