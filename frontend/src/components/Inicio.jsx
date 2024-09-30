import { useEffect, useState } from "react"
import {v4 as uuidv4} from "uuid"
import Slide from "@material-ui/core/Slide";
import Notificaciones from "./Notificaciones";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { TextField } from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faSave,
  faTrashAlt,
  faSpider,
} from '@fortawesome/free-solid-svg-icons';

const Inicio = () => {
  //const apiUrl = typeof process !== "undefined" ? process.env.REACT_APP_API_URL : "http://localhost:8800/api/v1/encuestas"; 
  //console.log("API URL:", apiUrl);
  const navigate = useNavigate();
  const [preguntas, setPreguntas] = useState({
    id: uuidv4(),
    pregunta: "",
    error: false,
  });

  const [campos, setCampos] = useState([
    {id: uuidv4(), opcion: "", error: false},
    {id: uuidv4(), opcion: "", error: false},
  ]);

  const [toast, setToast] = useState({
    //mensajes internos, tost es un "mensaje temporal"
    snackbaropen: false,
    msg: "",
    not: "",
    Transition: Slide,
  });

  const showError = (valor, error) => valor.trim().length === 0 && error
  
  useEffect(() => {
    if (localStorage.getItem("encuestaEliminada") == 0) {
      setToast({ snackbaropen: true, msg: "Encuesta Eliminada", not: "success" });
      localStorage.removeItem("encuestaEliminada");
    }  
    
  }, [])

  const handleClick = (Transition) => () => {
    setToast({
      snackbaropen: true,
      msg: "Copiado en memoria",
      not: "info",
      Transition,
    })
  }

  const slideTransition = (props) => {
    return <Slide {...props} direction="down" />
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const preguntaVacia = preguntas.pregunta.trim().length < 4;
    const opcionesVacias = campos.every((obj) => {
      return obj.opcion.length > 0 
    });

    if(preguntaVacia) {
      setPreguntas({...preguntas, error:true})
    }
    if(!opcionesVacias) {
      setCampos([
        ...campos.map((obj) => {
          if(obj.opcion == ''){
            return {...obj, error: true}
          } else return obj;
        })
      ]);
    } else {
      const data = {id: uuidv4(),pregunta: preguntas.pregunta, opciones: campos};
      console.log(data);
      axios.post('http://localhost:8800/api/v1/encuestas', data)
      .then((res) => {
        localStorage.setItem("encuestaCreada", 0)
        handleClick(slideTransition);
        navigate(`/new/${res.data.id}`)
        //console.log("res.data.id",res.data.id)
      })
      .catch((err) => console.log(err))
      
    }
  }

  const handlePregunta = (id, e) => {
    setPreguntas({id, pregunta: e.target.value});
  }
  
  const handleCambiarCampo = (id, e) => {
    const nuevosCampos = campos.map((i) => {
      if(id === i.id) {
        i[e.target.name] = e.target.value
      }
      return i;
    });
    setCampos(nuevosCampos);
  }

  const handleBorrarCampo = (id) => {
    const valores = [...campos];
    valores.splice(
      valores.findIndex((valor) => valor.id === id), 1
    )
    setCampos(valores);
  }

  const handleAgregarCampos = () => {
    setCampos([
      ...campos,
      {id: uuidv4(), opcion: "", error: false}
    ])
    setToast({
      snackbaropen: true,
      msg: "Se ha agregado una nueva opcion",
      not: "info"
    })
    
  }

  const closesnackbar = (e) => {
    setToast({ snackbaropen: false });
  };

  return (
    <div className="ui-outer ">
    <div className="ui-container py-5 px-5">
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="mx-auto">
          <div className="d-flex justify-content-between flex-column flex-md-row align-items-baseline">
            <div>
              <h3>Crear encuesta</h3>
              <p className="mt-4 mb-0 text-large text-secondary font-medium">
                Complete los campos a continuación
              </p>
            </div>
            <Link
              to="/demo/54bf4315-04a5-4b9d-882d-19e147942ed8"
              className="text-decoration-none"
            >
              <span
                className=" align-self-end font-weight-normal"
                style={{ fontSize: '1.3rem' }}
              >
                Ver encuesta demo
              </span>
            </Link>
          </div>
          <div className="mt-4">
            <div className="d-flex flex-column ">
              <label className="mb-3 w-100 font-weight-bold content-text">
                Pregunta de la encuesta
              </label>
              <TextField
                {...(showError(preguntas.pregunta, preguntas.error) && {
                  ...{
                    error: preguntas.error,
                    helperText: 'Ingrese la pregunta',
                  },
                })}
                id={preguntas.id}
                name="pregunta"
                multiline={true}
                minRows={3}
                className=" w-100 py-4 bg-light rounded-lg px-3 outline-none  border border-gray "
                placeholder="Cuál es tu comida favorita?"
                value={preguntas.pregunta}
                onChange={(event) => handlePregunta(preguntas.id, event)}
              />
            </div>
            <Notificaciones
              switcher={toast.snackbaropen}
              close={closesnackbar}
              message={toast.msg}
              nottype={toast.not}
            />

            {campos.map((item, index) => (
              <div className="options mt-2 flex-column " key={item.id}>
                <div className=" mb-3">
                  <div className="d-flex flex-column">
                    <label className="mb-3 w-100 content-text font-weight-bold">
                      Opción {index + 1}
                    </label>
                    <div className="">
                      <TextField
                        {...(showError(
                          item.opcion,
                          item.error
                        ) && {
                          ...{
                            error: item.error,
                            helperText: 'Ingrese al menos 2 opciones',
                          },
                        })}
                        id={item.id}
                        name="opcion"
                        className=" py-3 rounded-lg px-3 bg-light inputfield focus-shadow  focus-outline-none  border "
                        placeholder={'Opción' + (index + 1)}
                        value={item.opcion}
                        onChange={(event) =>
                          handleCambiarCampo(item.id, event)
                        }
                      />
                      <button
                        hidden={campos.length === 2}
                        onClick={() => handleBorrarCampo(item.id)}
                        className=" delete ml-2"
                      >
                        <FontAwesomeIcon
                          className=" text-danger"
                          icon={faTrashAlt}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAgregarCampos}
              className="btn btn-warning px-5 py-3  rounded-lg font-weight-bold  border-0 text-white "
            >
              <span className="mr-3">
                <FontAwesomeIcon className="ml-2n mx-2" icon={faPlus} />
                Agrega otra opción
              </span>
            </button>
          <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-success  mx-3 px-5 py-3 text-white font-weight-bold border-0 rounded-lg"
            >
              <FontAwesomeIcon className="mr-2 px-2" icon={faSave} />
              Guardar encuesta
            </button>
          </div>
        </div>
      </form>
    </div>
    <p
      className="text-center font-weight-bold"
      style={{ fontSize: '1.3rem', color: 'red' }}
    >
      juanjusto.muller@gmail.com
    </p>

  </div>
  )
}

export default Inicio