import React, { Fragment, useState, useEffect } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import Clima from "./components/Clima";
import Error from "./components/Error";

function App() {
  const [busqueda, guardarBusqueda] = useState({
    ciudad: "",
    pais: ""
  });

  const { ciudad, pais } = busqueda;

  const [consultar, guardarConsultar] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const [error, guardarError] = useState(false);

  useEffect(() => {
    const consultarAPI = async () => {
      if (consultar === true) {
        const APIKEY = "59bcf9d35096032d7b662cd87b26f0d5";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${APIKEY}`;

        const respuesta = await fetch(url);
        const result = await respuesta.json();
        guardarResultado(result);
        guardarConsultar(false);
      }
    };

    if (resultado.cod === "404") {
      guardarError(true);
    } else {
      guardarError(false);
    }

    consultarAPI();
    //eslint-disable-next-line
  }, [consultar]);

  let componete;

  if (error) {
    componete = <Error mensaje='No hay resultados' />;
  } else {
    componete = <Clima resultado={resultado} />;
  }

  return (
    <Fragment>
      <Header titulo='Clima React App' />

      <div className='contenedor-form'>
        <div className='container'>
          <div className='row'>
            <div className='col m6 s12'>
              <Formulario
                busqueda={busqueda}
                guardarBusqueda={guardarBusqueda}
                guardarConsultar={guardarConsultar}
              />
            </div>
            <div className='col m6 s12'>{componete}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
