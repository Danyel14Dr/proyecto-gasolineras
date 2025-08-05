import React, { useEffect, useState } from "react";

const PAGE_SIZE = 10;

function GasStationList({ filters }) {
  const [stations, setStations] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Cargar datos desde la API al montar
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

  // Filtrar y paginar
  useEffect(() => {
    let results = stations;

    if (filters.ciudad) {
      const ciudadFiltro = filters.ciudad.toLowerCase();
      results = results.filter(gas =>
        (gas["Municipio"] && gas["Municipio"].toLowerCase().includes(ciudadFiltro)) ||
        (gas["Localidad"] && gas["Localidad"].toLowerCase().includes(ciudadFiltro)) ||
        (gas["Provincia"] && gas["Provincia"].toLowerCase().includes(ciudadFiltro))
      );
    }
    if (filters.carburante) {
      let carburanteKey = "";
      if (filters.carburante === "Gasolina 95") carburanteKey = "Precio Gasolina 95 E5";
      if (filters.carburante === "Gasolina 98") carburanteKey = "Precio Gasolina 98 E5";
      if (filters.carburante === "Gasoleo A") carburanteKey = "Precio Gasoleo A";
      results = results.filter(gas =>
        carburanteKey && gas[carburanteKey] && gas[carburanteKey] !== "-"
      );
    }
    if (filters.empresa) {
      const empresaFiltro = filters.empresa.toLowerCase();
      results = results.filter(gas =>
        gas["Rótulo"] && gas["Rótulo"].toLowerCase().includes(empresaFiltro)
      );
    }

    results = results.sort((a, b) =>
      (a["Rótulo"] || "").localeCompare(b["Rótulo"] || "") ||
      (a["Dirección"] || "").localeCompare(b["Dirección"] || "")
    );

    setFiltered(results);
    setCurrentPage(1); // Reset al cambiar filtros
  }, [stations, filters]);

  // Calcular datos de paginación
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const displayed = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  if (loading) return <div className="text-center my-4"><div className="spinner-border text-primary"></div></div>;

  return (
    <div className="my-4">
      <h4>
        <i className="fas fa-gas-pump text-success"></i> Gasolineras encontradas
      </h4>
      {filtered.length === 0 ? (
        <div className="alert alert-warning mt-3">
          <i className="fas fa-exclamation-circle"></i> No se encontraron resultados para tu búsqueda.
        </div>
      ) : (
        <>
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
          {/* Paginación Bootstrap */}
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

