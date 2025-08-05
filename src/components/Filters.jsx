import React, { useState } from "react";

/**
 * Componente Filters
 * - Permite seleccionar filtros para la búsqueda de gasolineras
 * - Recoge ciudad (municipio, localidad o provincia), empresa y tipo de carburante
 * - Cada cambio en los campos actualiza el estado local y comunica los filtros al componente padre mediante setFilters
 * - Uso de Bootstrap para inputs estilizados
 */
function Filters({ setFilters }) {
  // Estados para cada filtro
  const [empresa, setEmpresa] = useState("");
  const [carburante, setCarburante] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [radio, setRadio] = useState(15); // No usado, pero puedes adaptarlo si se requiere

  // Maneja cambios en el filtro de empresa
  const handleEmpresaChange = (e) => {
    setEmpresa(e.target.value);
    setFilters({
      empresa: e.target.value,
      carburante,
      ciudad,
      radio
    });
  };

  // Maneja cambios en el filtro de carburante
  const handleCarburanteChange = (e) => {
    setCarburante(e.target.value);
    setFilters({
      empresa,
      carburante: e.target.value,
      ciudad,
      radio
    });
  };

  // Maneja cambios en el filtro de ciudad
  const handleCiudadChange = (e) => {
    setCiudad(e.target.value);
    setFilters({
      empresa,
      carburante,
      ciudad: e.target.value,
      radio
    });
  };

  // Maneja cambios en el filtro de radio (opcional)
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
      {/* Filtro de Ciudad, Municipio, Localidad o Provincia */}
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
      {/* Filtro por empresa (opcional) */}
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
      {/* Filtro por tipo de carburante */}
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
      {/* Radio button para distancia (no lo usamos aquí, opcional) */}
    </div>
  );
}

export default Filters;


