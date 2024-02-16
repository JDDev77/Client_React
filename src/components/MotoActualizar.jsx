import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


function MotoActualizar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [moto, setMoto] = useState({
    marca: '',
    modelo: '',
    precio: '',
    fecha_recogida: '',
    fecha_devolucion: '',
  });

  useEffect(() => {
    fetch(`http://localhost:9010/api/motos/${id}`)
      .then(response => response.json())
      .then(data => setMoto(data))
      .catch(error => console.log(error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMoto({ ...moto, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:9010/api/motos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(moto),
    });
    navigate('/'); // Redirige al usuario de vuelta a la lista de motos después de la actualización
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">Actualizar Moto</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="marca" className="form-label">Marca:</label>
          <input type="text" className="form-control" id="marca" name="marca" value={moto.marca || ''} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="modelo" className="form-label">Modelo:</label>
          <input type="text" className="form-control" id="modelo" name="modelo" value={moto.modelo || ''} onChange={handleChange} />
    </div>
      <div className="mb-3">
        <label htmlFor="precio" className="form-label">Precio:</label>
        <input type="text" className="form-control" id="precio" name="precio" value={moto.precio || ''} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="fecha_recogida" className="form-label">Fecha de Recogida:</label>
        <input type="date" className="form-control" id="fecha_recogida" name="fecha_recogida" value={moto.fecha_recogida || ''} onChange={handleChange} />
      </div>
    <div className="mb-3">
      <label htmlFor="fecha_devolucion" className="form-label">Fecha de Devolución:</label>
      <input type="date" className="form-control" id="fecha_devolucion" name="fecha_devolucion" value={moto.fecha_devolucion || ''} onChange={handleChange} />
    </div>
      <button type="submit" className="btn btn-primary">Actualizar Moto</button>
      </form>
    </div>
);
}

export default MotoActualizar;
