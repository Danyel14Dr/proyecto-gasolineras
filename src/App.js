import React, { useState } from "react";
import LocationInput from "./components/LocationInput";
import Filters from "./components/Filters";
import GasStationList from "./components/GasStationList";

function App() {
  const [userLocation, setUserLocation] = useState(null);
  const [filters, setFilters] = useState({});
  const [filtersDraft, setFiltersDraft] = useState({});

  // Al pulsar el botón, aplicamos los filtros temporales
  const handleConsultar = () => {
    setFilters(filtersDraft);
  };

  return (
    <div className="container-fluid my-4" style={{ marginTop: "2rem" }}>
      <div className="container mb-4">
        <h1>Buscador de Gasolineras Mediante API España</h1>
        <Filters setFilters={setFiltersDraft} />
      <button className="btn btn-primary mt-2" onClick={handleConsultar}>Consultar</button>
      <pre>{JSON.stringify(filters, null, 2)}</pre>
      </div>
      {userLocation && (
        <div style={{ marginTop: "1rem" }}>
          <h4>Tu ubicación actual:</h4>
          <p>
            Latitud: {userLocation.lat} <br />
            Longitud: {userLocation.lng}
          </p>
        </div>
      )}
      <div className="container">
        <GasStationList userLocation={userLocation} filters={filters} />
      </div>
      <footer className="footer-galaxy text-light mt-5 py-3" style={{ fontFamily: 'Fira Mono, Consolas, monospace', borderTop: "2px solid #00ff99", position: "relative", overflow: "hidden" }}>
        <div className="container text-center position-relative" style={{ zIndex: 2 }}>
          <span style={{ color: "#00ff99" }}>&lt;/&gt;</span> <br />
          <span>Actividad 3. Uso de una API en aplicación de componentes</span> <br />
          <span>Materia: Desarrollo de Aplicaciones en Red</span> <br />
          <span>Docente: EDGAR GERMAN MOLINA MADRIGAL</span> <br />
          <span>Alumno: Daniel Deaquino Hernández</span> <br />
          <span>Ingeniería en Sistemas Computacionales</span>
        </div>
      </footer>
    </div>
    
  );
}

export default App;


