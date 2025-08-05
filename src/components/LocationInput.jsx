import React, { useState } from "react";

// Coordenadas de algunas ciudades de España (puedes agregar más)
const SPAIN_CITIES = [
  { name: "Madrid", lat: 40.416775, lng: -3.70379 },
  { name: "Barcelona", lat: 41.3870194, lng: 2.1678584 },
  { name: "Valencia", lat: 39.4699075, lng: -0.3762881 },
  { name: "Sevilla", lat: 37.3886303, lng: -5.9953403 },
];

function LocationInput({ setUserLocation }) {
  const [selectedCity, setSelectedCity] = useState("");

  const handleGeo = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          alert("No se pudo obtener la ubicación.");
        }
      );
    } else {
      alert("Tu navegador no soporta geolocalización.");
    }
  };

  const handleCityChange = (e) => {
    const city = SPAIN_CITIES.find(
      (c) => c.name === e.target.value
    );
    if (city) {
      setSelectedCity(city.name);
      setUserLocation({ lat: city.lat, lng: city.lng });
    }
  };

  return (
    <div>
      <button onClick={handleGeo}>Obtener mi ubicación</button>
      <span style={{ margin: "0 10px" }}>|</span>
      <label>
        O elige una ciudad de España:&nbsp;
        <select value={selectedCity} onChange={handleCityChange}>
          <option value="">Selecciona ciudad</option>
          {SPAIN_CITIES.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default LocationInput;

