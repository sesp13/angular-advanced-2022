const { request, response } = require('express');
const Doctor = require('../models/Doctor.model');

const getDoctors = async (req = request, res = response) => {
  try {
    return res.status(200).json({
      ok: true,
      msg: 'Get doctors',
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
  try {
    return res.status(200).json({
      ok: true,
      msg: 'Update doctor',
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
  try {
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
  createDoctor,
  updateDoctor,
  deleteDoctor,
};
