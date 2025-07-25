import React, { useState } from "react";
import axios from "axios";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const DoctorForm = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [marker, setMarker] = useState(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY

  });

  const handleSubmit = async () => {
    if (!name || !address || !marker) return alert("Please fill all fields");

    try {
      const res = await axios.post("http://localhost:5000/api/doctors", {
        name,
        address,
        latitude: marker.lat,
        longitude: marker.lng,
      });
      alert("✅ Doctor added!");
      setName("");
      setAddress("");
      setMarker(null);
    } catch (err) {
      alert("❌ Error adding doctor");
    }
  };

  const handleMapClick = (e) => {
    setMarker({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  };

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div>
      <h2>Add Doctor Location</h2>
      <input
        placeholder="Doctor Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />{" "}
      <br />
      <input
        placeholder="Clinic Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />{" "}
      <br />
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "400px", marginTop: 10 }}
        center={{ lat: 12.9716, lng: 77.5946 }}
        zoom={12}
        onClick={handleMapClick}
      >
        {marker && <Marker position={marker} />}
      </GoogleMap>
      <button onClick={handleSubmit} style={{ marginTop: 10 }}>
        Submit Doctor
      </button>
    </div>
  );
};

export default DoctorForm;
