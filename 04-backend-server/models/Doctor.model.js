const { Schema, model } = require('mongoose');

const DoctorSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  hospital: {
    type: Schema.Types.ObjectId,
    ref: 'Hospital',
  },
});

DoctorSchema.method('toJSON', function () {
  // this -> current object instance
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model('Doctor', DoctorSchema);
