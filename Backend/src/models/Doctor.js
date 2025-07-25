import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  location: {
    type: { type: String, enum: ['Point'], required: true, default: 'Point' },
    coordinates: { type: [Number], required: true }, // [lng, lat]
  },
});

doctorSchema.index({ location: '2dsphere' });

export default mongoose.model('Doctor', doctorSchema);
