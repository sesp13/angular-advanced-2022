const { request, response } = require('express');
const Doctor = require('../models/Doctor.model');

const getDoctors = async (req = request, res = response) => {
  try {
    const doctors = await Doctor.find()
      .populate('user', 'name img')
      .populate('hospital', 'name img');
    return res.status(200).json({
      ok: true,
      msg: 'Get doctors',
      doctors,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error: Get doctors please check logs',
    });
  }
};

const getDoctorById = async (req = request, res = response) => {
  try {
    const id = req.params.id;
    const doctor = await Doctor.findById(id)
      .populate('user', 'name img')
      .populate('hospital', 'name img');

    if (!doctor)
      return res.status(404).json({
        ok: false,
        msg: `The doctor with id ${id} not found`,
      });

    return res.status(200).json({
      ok: true,
      msg: 'Get doctor by Id',
      doctor,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error: Get doctors please check logs',
    });
  }
};

const createDoctor = async (req = request, res = response) => {
  try {
    const uid = req.uid;
    const doctor = new Doctor({
      user: uid,
      ...req.body,
    });
    // Save doctor
    await doctor.save();

    return res.status(200).json({
      ok: true,
      msg: 'Create doctor',
      doctor,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error: Create doctor please check logs',
    });
  }
};

const updateDoctor = async (req = request, res = response) => {
  const uid = req.uid;
  const id = req.params.id;
  try {
    const doctorDb = await Doctor.findById(id);
    if (!doctorDb)
      return res.status(404).json({
        ok: false,
        msg: `The doctor ${id} doesn't exists`,
      });

    const doctorChanges = {
      user: uid,
      ...req.body,
    };

    // Update
    const doctorUpdated = await Doctor.findByIdAndUpdate(id, doctorChanges, {
      new: true,
    });

    return res.status(200).json({
      ok: true,
      msg: 'Update doctor',
      doctor: doctorUpdated,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error: Update doctor please check logs',
    });
  }
};

const deleteDoctor = async (req = request, res = response) => {
  const id = req.params.id;
  try {
    const doctorDb = await Doctor.findById(id);
    if (!doctorDb)
      return res.status(404).json({
        ok: false,
        msg: `The doctor ${id} doesn't exists`,
      });

    // Delete doctor
    await Doctor.findByIdAndDelete(id);

    return res.status(200).json({
      ok: true,
      msg: 'Delete doctor',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error: Delete doctor please check logs',
    });
  }
};

module.exports = {
  getDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
};
