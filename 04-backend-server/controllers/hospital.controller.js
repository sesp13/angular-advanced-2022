const { request, response } = require('express');
const Hospital = require('../models/Hospital.model');

const getHospitals = async (req = request, res = response) => {
  try {
    const hospitals = await Hospital.find().populate('user', 'name img');
    return res.status(200).json({
      ok: true,
      msg: 'Get hospitals',
      hospitals,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error: Get hospital please check logs',
    });
  }
};

const createHospital = async (req = request, res = response) => {
  const uid = req.uid;
  try {
    const hospital = new Hospital(req.body);
    // Set uid
    hospital.user = uid;

    //Save
    await hospital.save();

    return res.status(200).json({
      ok: true,
      msg: 'Create hospital',
      hospital,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error: Create hospital please check logs',
    });
  }
};

const updateHospital = async (req = request, res = response) => {
  const uid = req.uid;
  const name = req.body.name;
  const id = req.params.id;
  try {
    // Get hospital
    const hospitalDB = await Hospital.findById(id);
    if (!hospitalDB)
      return res.status(404).json({
        ok: false,
        msg: `The hospital ${id} doesn't exists`,
      });

    // Update hospital
    const hospitalChanges = {
      user: uid,
      ...req.body,
    };

    const hospitalUpdated = await Hospital.findByIdAndUpdate(
      id,
      hospitalChanges,
      { new: true }
    );

    return res.status(200).json({
      ok: true,
      msg: 'Update hospital',
      hospital: hospitalUpdated,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error: Update hospital please check logs',
    });
  }
};

const deleteHospital = async (req = request, res = response) => {
  const id = req.params.id;
  try {
    const hospitalDB = await Hospital.findById(id);
    if (!hospitalDB)
      return res.status(404).json({
        ok: false,
        msg: `The hospital ${id} doesn't exists`,
      });

    // Delete hospital
    await Hospital.findByIdAndDelete(id);

    return res.status(200).json({
      ok: true,
      msg: 'Delete hospital',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error: Delete hospital please check logs',
    });
  }
};

module.exports = {
  getHospitals,
  createHospital,
  updateHospital,
  deleteHospital,
};
