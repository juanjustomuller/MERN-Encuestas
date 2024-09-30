import axios from "axios";
import Notificaciones from "./Notificaciones";
import randomColor from "randomcolor";
import SocialShare from "./SocialShare";
import QRCode from "react-qr-code";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faQrcode } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Slide } from "@material-ui/core";
import { Link } from "react-router-dom";

const Resultados = () => {
  const [pregunta, setPregunta] = useState("");
  const [opciones, setOpciones] = useState([{ id: "", opcion: "", votos: 0 }]);
  const [encuestaId, setEncuestaId] = useState(location.href.split("/")[4]);
  const [showQR, setShowQR] = useState(false);

  let totalvotos = 0;
  opciones.map((op) => {
    totalvotos += op.votos;
  });

  const getEncuesta = async () => {
    await axios
      .get(`http://localhost:8800/api/v1/encuestas/${encuestaId}`)
      .then((res) => {
        setEncuestaId(res.data.id);
        setOpciones(res.data.opciones);
        setPregunta(res.data.pregunta);
      })
      .catch((err) => console.log(err));
  };

  const QR = () => (
    <div
      className="w-100 justify-content-center d-flex align-items-center position-fixed fixed-top"
      onClick={() => {
        setShowQR(false);
      }}
      style={{
        height: "100%",
        zIndex: 1,
        backgroundColor: "rgba(135,206,235 ,0.7)",
      }}
    >
      <div className="d-flex flex-column align-items-center bg-white">
        <span className="font-weight-bold ">Scan QR Code</span>
        <QRCode
          value={`${location.origin}/encuesta/${encuestaId}`}
          size={290}
          level={"H"}
          includeMargin={true}
        />
      </div>
    </div>
  );
  const ShowButton = () => (
    <Link
      className="bg-success text-decoration-none font-weight-bold mb-5 px-2 py-4 rounded-lg text-center text-white "
      to={`/encuesta/${encuestaId}`}
    >
      Envía tu opinión
    </Link>
  );

  const [toast, setToast] = useState({
    snackbaropen: false,
    msg: "",
    not: "",
    Transition: Slide,
  });

  const closesnackbar = () => {
    setToast({ snackbaropen: false });
  };

  useEffect(() => {
    getEncuesta();
  }, []);

  return (
    <div className="ui-outer">
      <div className="ui-container py-5 position-relative">
        <div className="mb-5 mb-md-5 pb-md-0 my-4 ">
          <h2
            className=" mb-5 heading w-100"
            style={{
              wordWrap: "break-word",
            }}
          >
            {pregunta}
          </h2>
          <div className="">
            <p className="font-weight-normal text-secondary text-left mb-0 text-sm lg:text-base">
              Total Votos
            </p>
            <h3 className="count font-weight-bold text-primary-dark">
              {totalvotos}
            </h3>
          </div>
          <div className="d-flex flex-column flex-md-row">
            <div className="d-flex w-100 col-12 col-md-8 flex-column">
              <div style={{ position: "relative" }}>
                <div>
                  {opciones.map((x) => (
                    <div
                      className="py-0 bg-white px-3  rounded-lg shadow-lg position-relative"
                      key={x.id}
                    >
                      <div className="d-flex w-100 justify-content-between">
                        <div
                          className="d-flex align-items-center"
                          style={{ width: "88%" }}
                        >
                          <h2
                            className=" font-weight-bold text-primary-dark"
                            style={{
                              wordWrap: "break-word",
                              width: "80%",
                            }}
                          >
                            {x.opcion}
                          </h2>
                        </div>
                        <div className=" ">
                          <h2 className=" font-weight-bold text-primary-dark">
                            {totalvotos === 0
                              ? 0
                              : ((x.votos / totalvotos) * 100).toFixed(0)}
                            %
                          </h2>
                        </div>
                      </div>
                      <div className="w-100 rounded-lg ">
                        <div
                          className="rounded-lg d-block mt-3"
                          style={{
                            width: `${
                              totalvotos === 0
                                ? 0
                                : (x.votos / totalvotos) * 100
                            }%`,
                            height: "0.5rem",
                            backgroundColor: `${randomColor()}`,
                          }}
                        >
                          &nbsp;
                        </div>
                      </div>
                      <p className="mt-3 text-green">{x.votos} Votos</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="d-flex flex-column w-100 col-12 col-md-4 mb-0 rounded-lg ">
          <Notificaciones
            switcher={toast.snackbaropen}
            close={closesnackbar}
            message={toast.msg}
            nottype={toast.not}
          />

          <ShowButton />

          <div className="w-100 bg-white d-flex flex-column border-t border-gray-300 border-top-0 rounded-lg self-start px-3 py-3 ">
            <div className="d-flex flex-column justify-content-between">
              <div className="d-flex flex-row flex-md-column">
                <p className="font-weight-bold d-none d-md-inline-block mt-2 mb-4 text-primary-secondary text-left">
                  Compartir
                </p>
                <button
                  className="bg-warning font-weight-bold mb-4 px-0 py-2 rounded-lg text-center border-0 text-white mr-3 "
                  onClick={() => {
                    setShowQR(true);
                  }}
                >
                  <FontAwesomeIcon className="ml-3 mr-3" icon={faQrcode} />
                  <span className="d-none d-md-inline-block ">
                    Compartir por QRcode
                  </span>
                </button>
                <SocialShare
                  url={`${location.origin}/encuesta/${encuestaId}`}
                  question={pregunta}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {showQR ? <QR /> : null}
    </div>
  );
};

export default Resultados;
