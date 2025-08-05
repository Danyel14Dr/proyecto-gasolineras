import React, { useEffect, useState } from "react";

// Tamaño de página para paginación
const PAGE_SIZE = 10;

/**
 * Componente principal para mostrar la lista de gasolineras.
 * - Recibe filtros desde el componente padre (ciudad, empresa, carburante)
 * - Descarga los datos de la API pública de gasolineras de España
 * - Filtra los resultados según los criterios seleccionados
 * - Incluye buscador rápido y paginación
 * - Presenta los datos en tabla Bootstrap
 */
function GasStationList({ filters }) {
  // Lista completa descargada de la API
  const [stations, setStations] = useState([]);
  // Lista filtrada (final para mostrar)
  const [filtered, setFiltered] = useState([]);
  // Página actual para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  // Estado de carga
  const [loading, setLoading] = useState(false);
  // Estado del filtro rápido (input de texto)
  const [quickFilter, setQuickFilter] = useState("");

  // Efecto para cargar los datos desde la API al montar el componente
  useEffect(() => {
    setLoading(true);
    fetch('https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/')
      .then(res => res.json())
      .then(data => {
        setStations(data.ListaEESSPrecio || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Efecto para filtrar y ordenar los datos cada vez que cambian los filtros o el filtro rápido
  useEffect(() => {
    let results = stations;

    // Filtro por ciudad, municipio, localidad o provincia
    if (filters.ciudad) {
      const ciudadFiltro = filters.ciudad.toLowerCase();
      results = results.filter(gas =>
        (gas["Municipio"] && gas["Municipio"].toLowerCase().includes(ciudadFiltro)) ||
        (gas["Localidad"] && gas["Localidad"].toLowerCase().includes(ciudadFiltro)) ||
        (gas["Provincia"] && gas["Provincia"].toLowerCase().includes(ciudadFiltro))
      );
    }
    // Filtro por tipo de carburante
    if (filters.carburante) {
      let carburanteKey = "";
      if (filters.carburante === "Gasolina 95") carburanteKey = "Precio Gasolina 95 E5";
      if (filters.carburante === "Gasolina 98") carburanteKey = "Precio Gasolina 98 E5";
      if (filters.carburante === "Gasoleo A") carburanteKey = "Precio Gasoleo A";
      results = results.filter(gas =>
        carburanteKey && gas[carburanteKey] && gas[carburanteKey] !== "-"
      );
    }
    // Filtro por empresa (rótulo)
    if (filters.empresa) {
      const empresaFiltro = filters.empresa.toLowerCase();
      results = results.filter(gas =>
        gas["Rótulo"] && gas["Rótulo"].toLowerCase().includes(empresaFiltro)
      );
    }
    // Filtro rápido adicional (texto libre)
    if (quickFilter.trim() !== "") {
      const q = quickFilter.trim().toLowerCase();
      results = results.filter(gas =>
        (gas["Rótulo"] && gas["Rótulo"].toLowerCase().includes(q)) ||
        (gas["Dirección"] && gas["Dirección"].toLowerCase().includes(q)) ||
        (gas["Municipio"] && gas["Municipio"].toLowerCase().includes(q)) ||
        (gas["Provincia"] && gas["Provincia"].toLowerCase().includes(q))
      );
    }

    // Ordenar alfabéticamente por empresa y dirección
    results = results.sort((a, b) =>
      (a["Rótulo"] || "").localeCompare(b["Rótulo"] || "") ||
      (a["Dirección"] || "").localeCompare(b["Dirección"] || "")
    );

    setFiltered(results);
    setCurrentPage(1); // Reinicia la paginación al aplicar filtros

    // (Opcional) Muestra en consola un ejemplo real de los datos filtrados
    if (results.length > 0) {
      console.log("Gasolineras:", results[0]);
    }
  }, [stations, filters, quickFilter]);

  // Cálculo de paginación
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const displayed = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  // Renderizado principal
  if (loading) return (
    <div className="text-center my-4">
      <div className="spinner-border text-primary"></div>
    </div>
  );

  return (
    <div className="my-4">
      {/* Título de la tabla con ícono */}
      <h4>
        <i className="fas fa-gas-pump text-success"></i> Gasolineras encontradas
      </h4>
      {filtered.length === 0 ? (
        // Mensaje cuando no hay resultados
        <div className="alert alert-warning mt-3">
          <i className="fas fa-exclamation-circle"></i> No se encontraron resultados para tu búsqueda.
        </div>
      ) : (
        <>
          {/* Input de filtro rápido sobre la tabla */}
          <div className="mb-3 d-flex justify-content-end">
            <input
              type="text"
              className="form-control w-auto"
              placeholder="🔎 Filtrar resultados..."
              value={quickFilter}
              onChange={e => {
                setQuickFilter(e.target.value);
                setCurrentPage(1); // Reinicia paginación
              }}
              style={{ minWidth: 220, fontFamily: "inherit" }}
            />
          </div>

          {/* Tabla de resultados con Bootstrap */}
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead className="table-dark">
                <tr>
                  <th><i className="fas fa-building"></i> Empresa</th>
                  <th><i className="fas fa-map-marker-alt"></i> Dirección</th>
                  <th><i className="fas fa-city"></i> Municipio</th>
                  <th><i className="fas fa-tags"></i> Provincia</th>
                  <th><i className="fas fa-gas-pump"></i> G. 95</th>
                  <th><i className="fas fa-gas-pump"></i> G. 98</th>
                  <th><i className="fas fa-gas-pump"></i> Gasóleo A</th>
                  <th><i className="fas fa-clock"></i> Horario</th>
                </tr>
              </thead>
              <tbody>
                {displayed.map((gas, idx) => (
                  <tr key={idx}>
                    <td><strong>{gas["Rótulo"]}</strong></td>
                    <td>{gas["Dirección"]}</td>
                    <td>{gas["Municipio"]}</td>
                    <td>{gas["Provincia"]}</td>
                    <td>{gas["Precio Gasolina 95 E5"] || "-"}</td>
                    <td>{gas["Precio Gasolina 98 E5"] || "-"}</td>
                    <td>{gas["Precio Gasoleo A"] || "-"}</td>
                    <td>{gas["Horario"]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Navegación de paginación Bootstrap */}
          {totalPages > 1 && (
            <nav>
              <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => setCurrentPage(1)}>
                    <i className="fas fa-angle-double-left"></i>
                  </button>
                </li>
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
                    <i className="fas fa-angle-left"></i>
                  </button>
                </li>
                <li className="page-item active">
                  <span className="page-link">
                    {currentPage} / {totalPages}
                  </span>
                </li>
                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
                    <i className="fas fa-angle-right"></i>
                  </button>
                </li>
                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => setCurrentPage(totalPages)}>
                    <i className="fas fa-angle-double-right"></i>
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </>
      )}
    </div>
  );
}

export default GasStationList;


