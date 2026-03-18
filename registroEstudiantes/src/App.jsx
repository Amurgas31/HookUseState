import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import InputText from './components/InputText';
import './App.css'

function App() {
  // Estados para los campos del formulario
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [carnet, setCarnet] = useState("");

  // Estado para la lista de estudiantes
  const [listaEstudiantes, setListaEstudiantes] = useState([]);

  const agregarEstudiante = () => {
    // Validación de campos vacíos
    if (!nombre.trim() || !edad || !carnet.trim()) {
      alert("Todos los campos son obligatorios");
      return;
    }

    // Validación de Nombre (solo letras y espacios)
    // Usando una expresión regular (Regex)
    // a-zA-Z (letras básicas)
    // áéíóúÁÉÍÓÚüÜ (tildes y diéresis)
    // ñÑ (letra eñe)
    // ' (apóstrofe)
    // \s (espacios)
    const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ'\s]+$/;
    if (!nombreRegex.test(nombre)) {
      alert("El nombre contiene caracteres no permitidos. Use solo letras, tildes o apóstrofes.");
      return;
    }

    // Validación de Edad (no negativa y mayor a cero)
    if (Number(edad) <= 0) {
      alert("La edad debe ser un número positivo mayor a cero");
      return;
    }

    // Validación de Carnet (solo números)
    const carnetRegex = /^[0-9]+$/;
    if (!carnetRegex.test(carnet)) {
      alert("El carnet debe contener únicamente números");
      return;
    }

    const nuevoEstudiante = {
      id: Date.now(),
      nombre,
      edad,
      carnet
    };

    setListaEstudiantes([...listaEstudiantes, nuevoEstudiante]);

    // Limpiar campos
    setNombre("");
    setEdad("");
    setCarnet("");
  };

  return (
    <div className="container-fluid min-vh-100 py-5 bg-light">
      <div className="card shadow mx-auto" style={{ maxWidth: '700px' }}>
        <div className="card-body p-4 text-center">
          <h1 className="display-5 mb-4 fw-bold">Registro de Estudiantes</h1>

          {/* Formulario */}
          <div className="mb-4">
            <InputText label="Nombre" placeholder="Ingrese nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            <InputText label="Edad" placeholder="Ingrese edad" type="number" value={edad} onChange={(e) => setEdad(e.target.value)} />
            <InputText label="Carnet" placeholder="Ingrese carnet" value={carnet} onChange={(e) => setCarnet(e.target.value)} />

            <button className="btn btn-primary w-100 py-2 fs-5 mt-2" onClick={agregarEstudiante}>
              Agregar
            </button>
          </div>

          <hr />
          <h2 className="my-4">Listado:</h2>

          {/* Listado de Estudiantes */}
          <div className="list-group">
            {listaEstudiantes.map((est) => (
              <div key={est.id} className="list-group-item list-group-item-light d-flex justify-content-between align-items-center mb-2 border rounded shadow-sm py-3">
                <span className="fw-bold">Nombre: <span className="text-secondary fw-normal">{est.nombre}</span></span>
                <span className="fw-bold border-start ps-3">Edad: <span className="text-secondary fw-normal">{est.edad}</span></span>
                <span className="fw-bold border-start ps-3">Carnet: <span className="text-secondary fw-normal">{est.carnet}</span></span>
              </div>
            ))}
          </div>

          {listaEstudiantes.length === 0 && (
            <p className="text-muted mt-3">No hay estudiantes registrados.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
