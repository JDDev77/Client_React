import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MotoList from './components/MotoList.jsx'; // Asegúrate de ajustar el path según la estructura de tu proyecto
import MotosForm from './components/MotosForm.jsx'; // Asegúrate de ajustar el path según la estructura de tu proyecto
import MotoDetalle from './components/MotoDetalle.jsx';
import MotoActualizar from './components/MotoActualizar.jsx'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<MotoList />} /> 
          <Route path="/agregar-moto" element={<MotosForm />} />
          <Route path="/moto/:id" element={<MotoDetalle />} /> 
          <Route path="/actualizar-moto/:id" element={<MotoActualizar />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;