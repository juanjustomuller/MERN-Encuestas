import { useEffect, useState } from "react";
import Slide from "@material-ui/core/Slide";
import Notificaciones from "./Notificaciones";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Create = () => {
  const [encuestaId, setEncuestaId] = useState(""); //estado de el id de la encuesta
  const [id, setId] = useState(""); //estado del id "verdadero" de la encuesta (pq tiene dos id)
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

  useEffect(() => {
    if (localStorage.getItem("encuestaCreada") == 0) {
      setToast({ snackbaropen: true, msg: "Encuesta Creada", not: "success" });
      localStorage.removeItem("encuestaCreada");
    }
    //console.log(location.origin) //agarra directamente la url de origen ej:https://localhost:5173
  }, []);


  const slideTransition = (props) => {
    return <Slide {...props} direction="down" />
  }

  const handleClick = (Transition) => () => {
    setToast({
      snackbaropen: true,
      msg: "Copiado en memoria",
      not: "info",
      Transition,
    })
  }

  return (
    <div className="ui-outer">
      <div className="ui-container py-5">
        <div className="bg-white w-75 d-flex flex-column border border-gray mx-auto rounded-lg shadow-lg">
          <div className="px-5 pt-4 pb-4">
            <div className="d-flex flex-column">
              <h5 className="text-primary-dark">Enlace de su encuesta (Click en el enlace para copiar)</h5>
              <div className="d-flex w-100">
                <Notificaciones
                  switcher={toast.snackbaropen}
                  close={closesnackbar}
                  msg={toast.msg}
                  nottype={toast.not}
                />

                <CopyToClipboard
                  text={`${location.origin}/encuesta/${encuestaId}`}
                >
                  <input
                    type="text"
                    name="link"
                    id="encuestaId"
                    readOnly
                    value={`${location.origin}/encuesta/${encuestaId}`}
                    className="w-100 cursor-pointer outline-none my-3 border px-4 bg-gray-200 text-secondary rounded"
                    onClick={handleClick(slideTransition)}
                  />
                </CopyToClipboard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
