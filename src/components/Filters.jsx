import React, { useState } from "react";

function Filters({ setFilters }) {
  const [empresa, setEmpresa] = useState("");
  const [carburante, setCarburante] = useState("");
  const [ciudad, setCiudad] = useState(""); // <-- Nuevo filtro ciudad
  const [radio, setRadio] = useState(10);

  const handleEmpresaChange = (e) => {
    setEmpresa(e.target.value);
    setFilters({
      empresa: e.target.value,
      carburante,
      ciudad,
      radio
    });
  };

  const handleCarburanteChange = (e) => {
    setCarburante(e.target.value);
    setFilters({
      empresa,
      carburante: e.target.value,
      ciudad,
      radio
    });
  };

  const handleCiudadChange = (e) => {
    setCiudad(e.target.value);
    setFilters({
      empresa,
      carburante,
      ciudad: e.target.value,
      radio
    });
  };

  const handleRadioChange = (e) => {
    const value = Number(e.target.value);
    setRadio(value);
    setFilters({
      empresa,
      carburante,
      ciudad,
      radio: value
    });
  };

  return (
    <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
      <h4>Filtros de búsqueda</h4>
      <label>
        Ciudad (Municipio, Localidad o Provincia):{" "}
        <input
          type="text"
          className="form-control"
          value={ciudad}
          onChange={handleCiudadChange}
          placeholder="Ej: Madrid, Albacete..."
        />
      </label>
      <br />
      <label>
        Empresa (opcional):{" "}
        <input
          type="text"
          className="form-control"
          value={empresa}
          onChange={handleEmpresaChange}
        />
      </label>
      <br />
      <label>
        Tipo de carburante:{" "}
        <select
          className="form-control"
          value={carburante}
          onChange={handleCarburanteChange}
        >
          <option value="">Todos</option>
          <option value="Gasolina 95">Gasolina 95</option>
          <option value="Gasolina 98">Gasolina 98</option>
          <option value="Gasoleo A">Gasoleo A</option>
        </select>
      </label>
      <br />
      {/* El radio puedes quitarlo si quieres, ya no es relevante */}
    </div>
  );
}

export default Filters;


