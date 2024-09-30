import { useEffect, useState } from "react";
//import {v4 as uuidv4} from "uuid"
import Slide from "@material-ui/core/Slide";
import Notificaciones from "./Notificaciones";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const Encuesta = () => {
  const navigate = useNavigate();
  const [pregunta, setPregunta] = useState("");
  const [opciones, setOpciones] = useState([{ id: "", opcion: "", votos: 0 }]);
  const [encuestaId, setEncuestaId] = useState(location.href.split("/")[4]);
  const [ip, setIp] = useState("");
  const [voto, setVoto] = useState({ opcion: "" });

  const [toast, setToast] = useState({
    //mensajes internos, tost es un "mensaje temporal"
    snackbaropen: false,
    msg: "",
    not: "",
    Transition: Slide,
  });

  const closesnackbar = (e) => {
    setToast({ snackbaropen: false });
  };

  const getIp = async () => {
    await axios
      .get("https://api.ipify.org?format=json")
      .then((res) => {
        setIp(res.data.ip);
      })
      .catch((err) => console.log(err));
  };

  const getEncuesta = async () => {
    const encuesta = await axios
      .get(`http://localhost:8800/api/v1/encuestas/${encuestaId}`)
      .then((res) => {
        setEncuestaId(res.data.id);
        setOpciones(res.data.opciones);
        setPregunta(res.data.pregunta);
      })
      .catch((err) => console.log(err));
  };

  const prepararVoto = ({ item }) => {
    setVoto({
      encuestaId,
      opcionId: item.id,
      ip,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //alert(JSON.stringify(voto))
    if (voto) {
      const info = await axios
        .post("http://localhost:8800/api/v1/encuestas/votar", voto)
        .then((res) => {
          setToast({
            snackbaropen: true,
            msg: "Gracias por su participacion!, Voto Registrado",
            not: "success",
          });
          setTimeout(() => {
            navigate(`/resultado/${encuestaId}`)
          }, 3000)
        })
        .catch((err) => {
          setToast({
            snackbaropen: true,
            msg: "Usted ya habia votado!",
            not: "error",
          });
        });
    } else {
      setToast({
        snackbaropen: true,
        msg: "Debe seleccionar una opcion",
        not: "error",
      });
    }
  };

  useEffect(() => {
    //alert(encuestaId)
    getIp();
    getEncuesta();
  }, []);

  return (
    <div className="ui-outer">
      <div className="ui-container py-5 px-5">
        <div>
          <h2
            className=" mb-5 w-100 heading"
            style={{
              wordWrap: "break-word",
            }}
          >
            {pregunta}
          </h2>
          <div className="flex flex-column w-75 mr-auto ml-auto">
            <form>
              {opciones.map((item) => (
                <div
                  className="py-3 w-100 mb-4 shadow-lg hover-zoom px-2 rounded bg-white"
                  key={item.id}
                >
                  <label
                    role="button"
                    htmlFor={item.id}
                    className="flex align-items-center"
                  >
                    <input
                      type="radio"
                      id={item.id}
                      name="opcion"
                      value={item.opcion}
                      checked={voto.opcionId === item.id}
                      onChange={() => prepararVoto({ item })}
                      className="d-inline-block ml-3 mr-3"
                    />

                    <h4 className="font-weight-bold text-primary-dark d-inline-block px-2">
                      {item.opcion}
                    </h4>
                  </label>
                </div>
              ))}
              <Notificaciones
                switcher={toast.snackbaropen}
                close={closesnackbar}
                message={toast.msg}
                nottype={toast.not}
              />

              <div className="mt-5 d-flex flex-column flex-md-row">
                <div className="col-0 col-md-8 d-flex px-0 justify-content-center justify-content-md-start">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="focus-outline-none py-3 font-weight-bold focus-shadow w-50 bg-success border-0 text-white px-2 shadow-lg hover-shadow-lg rounded-lg"
                  >
                    Enviar mi respuesta
                  </button>
                </div>
                <div className="col-0 col-md-4 mt-4 px-0">
                  <Link to={`/resultado/${encuestaId}`}>
                    <h5 className=" display-8 float-right text-secondary font-weight-normal">
                      Ver resultados <FontAwesomeIcon icon={faChevronRight} />
                    </h5>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Encuesta;
