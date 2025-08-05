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
    <form
      className="d-flex align-items-end flex-wrap gap-2"
      style={{ maxWidth: 900 }}
      onSubmit={e => { e.preventDefault(); setFilters({ empresa, carburante, ciudad, radio }); }}
    >
      <div>
        <label className="form-label mb-1">
          Ciudad (Municipio, Localidad o Provincia):
        </label>
        <input
          type="text"
          className="form-control"
          value={ciudad}
          onChange={handleCiudadChange}
          placeholder="Ej: Madrid, Albacete..."
          style={{ minWidth: 170 }}
        />
      </div>
      <div>
        <label className="form-label mb-1">Empresa (opcional):</label>
        <input
          type="text"
          className="form-control"
          value={empresa}
          onChange={handleEmpresaChange}
          style={{ minWidth: 120 }}
        />
      </div>
      <div>
        <label className="form-label mb-1">Tipo de carburante:</label>
        <select
          className="form-control"
          value={carburante}
          onChange={handleCarburanteChange}
          style={{ minWidth: 130 }}
        >
          <option value="">Todos</option>
          <option value="Gasolina 95">Gasolina 95</option>
          <option value="Gasolina 98">Gasolina 98</option>
          <option value="Gasoleo A">Gasoleo A</option>
        </select>
      </div>
      <div>
      </div>
    </form>
  );
}

export default Filters;


