import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function MotoList() {
  const [motos, setMotos] = useState([]);
  const [idDetalleExpandido] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:9010/api/motos')
      .then(response => response.json())
      .then(data => setMotos(data))
      .catch(error => console.error("Hubo un error al cargar las motos:", error));
  }, []);

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("¿Estás seguro de que quieres eliminar esta moto?");
    if (isConfirmed) {
      try {
        await fetch(`http://localhost:9010/api/motos/${id}`, {
          method: 'DELETE',
        });
        setMotos(motos.filter(moto => moto._id !== id));
      } catch (error) {
        console.error("Error al eliminar la moto:", error);
      }
    }
  };

  const goToDetails = (id) => {
    navigate(`/moto/${id}`);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Listado de Motos</h2>
      <Link to="/agregar-moto" className="btn btn-success mb-3">Agregar Nueva Moto</Link>
      <div className="list-group">
        {motos.map(moto => (
          <div key={moto._id} className="list-group-item list-group-item-action">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-1">{moto.marca} {moto.modelo} - <span className="text-muted">Precio: {moto.precio}</span></h5>
              <div>
                <button className="btn btn-primary btn-sm me-2" onClick={() => goToDetails(moto._id)}>Ver Detalles</button>
                <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(moto._id)}>Eliminar</button>
              </div>
            </div>
            {idDetalleExpandido === moto._id && (
              <div className="mt-3">
                <p>Fecha de Recogida: {moto.fecha_recogida}</p>
                <p>Fecha de Devolución: {moto.fecha_devolucion}</p>
                <button className="btn btn-secondary btn-sm" onClick={() => navigate(`/actualizar-moto/${moto._id}`)}>Actualizar</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MotoList;
