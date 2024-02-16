import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, redirect } from 'react-router-dom';


function MotoDetalle() {
  const { id } = useParams();
  const [moto, setMoto] = useState(null);

  const navigate = useNavigate()

  useEffect(() => {
    fetch(`http://localhost:9010/api/motos/${id}`)
      .then(response => response.json())
      .then(data => {
        setMoto(data);
        console.log(data);
      })
      .catch(error => console.error("Error al cargar la moto:", error));
  }, [id]);

  if (!moto) return <div className="d-flex justify-content-center"><div className="spinner-border" role="status"><span className="visually-hidden">Cargando...</span></div></div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Detalles de la Moto</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{moto.modelo}</h5>
          <p className="card-text"><strong>Marca:</strong> {moto.marca}</p>
          <p className="card-text"><strong>Modelo:</strong> {moto.modelo}</p>
          <p className="card-text"><strong>Precio:</strong> {moto.precio}</p>
          <p className="card-text"><strong>Fecha de Recogida:</strong> {moto.fecha_recogida}</p>
          <p className="card-text"><strong>Fecha de Devolución:</strong> {moto.fecha_devolucion}</p>
          <button className='btn btn-info' onClick={() =>  navigate("/")}>Volver al listado de motos</button>
        </div>
      </div>
    </div>
    
  );
}

export default MotoDetalle;
