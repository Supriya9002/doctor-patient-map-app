import Doctor from '../models/Doctor.js';

// @desc Add a new doctor
export const addDoctor = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    const doctor = new Doctor({
      name,
      address,
      location: {
        type: 'Point',
        coordinates: [longitude, latitude],
      },
    });

    await doctor.save();
    res.status(201).json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Find doctors near location
export const findDoctorsNearby = async (req, res) => {
  const { lat, lng } = req.query;
  try {
    const doctors = await Doctor.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          $maxDistance: 5000, // 5km
        },
      },
    });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
