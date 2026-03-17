import { useState } from "react";
import "./App.css";
import Boton from "./components/Boton";
import InputText from "./components/InputText";

function App() {
  const [numero1, setNumero1] = useState(0);
  const [numero2, setNumero2] = useState(0);
  const [resultado, setResultado] = useState(0);

  // Validación de números positivos
  const validar = () => {
    if (numero1 < 0 || numero2 < 0) {
      alert("Ingrese solo números positivos");
      limpiar();
      return false;
    }
    return true;
  };

  // Funciones
  const sumar = () => {
    if (validar()) setResultado(numero1 + numero2);
  };

  const restar = () => {
    if (validar()) setResultado(numero1 - numero2);
  };

  const multiplicar = () => {
    if (validar()) setResultado(numero1 * numero2);
  };

  const dividir = () => {
    if (!validar()) return;
    if (numero2 === 0) {
      alert("No se puede dividir por cero");
      return;
    }
    setResultado(numero1 / numero2);
  };

  const limpiar = () => {
    setNumero1(0);
    setNumero2(0);
    setResultado(0);
  };

  //codigo para el TODO: Administrador de tareas

  const [tarea, setTarea] = useState("");
  const [tareas, setTareas] = useState([]);

  // Crear la función que guarda las tareas

  /*const agregarTarea = () => {
    if (tarea.trim() !== "") {
      setTareas([...tareas, tarea]); // "..." (spread operator) hace una copi de lo queya se encuentra en tareas para que no se pierda el valor que ya estaba
      setTarea("");
    }
  };*/

  const agregarTarea = () => {
    if (tarea.trim() !== "") {
      const nuevaTareaObj = {
        id: Date.now(), // tiempo actual como ID único
        texto: tarea,
        completada: false
      };
      setTareas([...tareas, nuevaTareaObj]);
      setTarea("");
    }
  };

  const eliminarTarea = (id) => {
    const nuevasTareas = tareas.filter((t) => t.id !== id);
    setTareas(nuevasTareas);
  };

  const finalizarTarea = (id) => {
    const nuevasTareas = tareas.map((t) => {
      if (t.id === id) {
        return { ...t, completada: !t.completada };
      }
      return t;
    });
    setTareas(nuevasTareas);
  };

  return (
    <>
      <div className="container mt-5 p-4 border rounded shadow bg-light">
        <h1 className="text-center mb-4">Calculadora con Hooks</h1>

        <div className="row justify-content-center">
          <div className="col-md-6">
            <InputText
              label="Número 1"
              placeholder="Ingrese número 1"
              value={numero1}
              onChange={(e) => setNumero1(Number(e.target.value))}
              type="number"
            />

            <InputText
              label="Número 2"
              placeholder="Ingrese número 2"
              value={numero2}
              onChange={(e) => setNumero2(Number(e.target.value))}
              type="number"
            />

            <div className="d-flex flex-wrap gap-2 justify-content-center mt-4">
              <Boton label="Sumar" onClick={sumar} className="btn-primary" />
              <Boton label="Restar" onClick={restar} className="btn-success" />
              <Boton
                label="Multiplicar"
                onClick={multiplicar}
                className="btn-info"
              />
              <Boton
                label="Dividir"
                onClick={dividir}
                className="btn-warning"
              />
              <Boton label="Limpiar" onClick={limpiar} className="btn-danger" />
            </div>

            <div className="alert alert-warning mt-4 text-center">
              <h3>Resultado: {resultado}</h3>
            </div>
          </div>
        </div>
      </div>
      <br />
      <h1>TODO: Administrador de Tareas</h1>
      <InputText
        label="Ingrese tarea"
        placeholder="Ingrese tarea"
        value={tarea}
        onChange={(e) => setTarea(e.target.value)}
        type="text"
      />

      <Boton label="Agregar tarea" onClick={agregarTarea} />

      <h2>Lista de tareas:</h2>
      <ul className="list-group">
        {tareas.map((t) => (
          <li
            key={t.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span
              style={{ textDecoration: t.completada ? "line-through" : "none" }}
            >
              {t.texto}
            </span>

            <div>
              <button
                className={`btn btn-sm me-2 ${
                  t.completada ? "btn-warning" : "btn-success"
                }`}
                onClick={() => finalizarTarea(t.id)}
              >
                {t.completada ? "Reabrir" : "Finalizar"}
              </button>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => eliminarTarea(t.id)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
