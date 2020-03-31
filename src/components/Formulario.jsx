import React, { Fragment, useState } from 'react';
import uuid from 'uuid/v4';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {
    
    //Crear State de Citas
    const [cita, actulizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: '',
    });

    const [ error, actualizarError ] = useState(false);

    //Funcion que se ejecuta cuando el user escribe en el input
    const actualizarState = e => {
        actulizarCita({
            ...cita,
            [e.target.name] : e.target.value
        })
    };

    // Extraer los valores
    const { mascota, propietario, fecha, hora, sintomas } = cita;

    // Function para agregar cita

    const submitCita = e => {
        e.preventDefault();
        console.log(mascota);
        // Validar
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
            actualizarError(true);
            return;
        }
        //Eliminar mensaje de error
        actualizarError(false);

        //Asigar un ID
        cita.id = uuid();


        //Crear la cita
        crearCita(cita);

        //Reinicar el form
        actulizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: '',
        })
    }

    return ( 
        <Fragment>
            <h2>Crear cita</h2>
            {error ? <p className="alerta-error">Todos los campos son obligatorios</p>: null}
            <form
                onSubmit={submitCita}
            >
                <label>Nombre Mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={actualizarState}
                    value={mascota}
                />
                <label>Nombre Dueño</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre Dueño de la mascota"
                    onChange={actualizarState}
                    value={propietario}
                />
                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />
                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />
                <label>Sintomas</label>
                <textarea
                    name="sintomas"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={sintomas}
                />
                <button
                    type="submit"
                    className="u-full.width button-primary"
                    onChange={actualizarState}
                >agregar cita</button>
            </form>
        </Fragment>
    );
}

// asignar los tipos de datos que se estan usando
Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}

export default Formulario;