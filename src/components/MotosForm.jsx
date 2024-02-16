import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MotosForm() {
    const [moto, setMoto] = useState({
        marca: '',
        modelo: '',
        precio: '',
        fecha_recogida: '',
        fecha_devolucion: ''
    });

    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setMoto(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch('http://localhost:9010/api/motos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(moto)
        });

        if (response.ok) {
            const data = await response.json();
            alert(data.message || 'Moto añadida con éxito');
            navigate('/');
        } else {
            alert('Hubo un problema al añadir la moto');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-3">Agregar Nueva Moto</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="marca" className="form-label">Marca:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="marca"
                        name="marca"
                        value={moto.marca}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="modelo" className="form-label">Modelo:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="modelo"
                        name="modelo"
                        value={moto.modelo}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="precio" className="form-label">Precio:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="precio"
                        name="precio"
                        value={moto.precio}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="fecha_recogida" className="form-label">Fecha de Recogida:</label>
                    <input
                        type="date"
                        className="form-control"
                        id="fecha_recogida"
                        name="fecha_recogida"
                        value={moto.fecha_recogida}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="fecha_devolucion" className="form-label">Fecha de Devolución:</label>
                    <input
                        type="date"
                        className="form-control"
                        id="fecha_devolucion"
                        name="fecha_devolucion"
                        value={moto.fecha_devolucion}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Agregar Moto</button>
            </form>
        </div>
    );
}

export default MotosForm;
