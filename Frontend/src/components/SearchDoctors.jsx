import React, { useState } from "react";
import axios from "axios";

const SearchDoctors = () => {
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [doctors, setDoctors] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/doctors/search", {
        params: { lat, lng },
      });
      setDoctors(res.data);
    } catch (err) {
      alert("❌ Error fetching doctors");
    }
  };

  return (
    <div>
      <h2>Search Nearby Doctors</h2>
      <input
        placeholder="Latitude"
        value={lat}
        onChange={(e) => setLat(e.target.value)}
      />
      <input
        placeholder="Longitude"
        value={lng}
        onChange={(e) => setLng(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {doctors.map((doc) => (
          <li key={doc._id}>
            <strong>{doc.name}</strong> - {doc.address}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchDoctors;
