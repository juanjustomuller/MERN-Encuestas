import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Demo = () => {
  return (
    <div className="p-3">
      <h2 className=" mb-5 heading">¿Qué tipo de películas te gustan?</h2>
      <div className="flex flex-column w-75 mr-auto mx-auto">
        <div className="py-3 w-100 mb-4 shadow-lg hover-zoom px-2  rounded bg-white">
          <label
            role="button"
            htmlFor="opcion1"
            className="flex align-items-center"
          >
            <input
              type="radio"
              id="opcion1"
              name="opcion"
              value="Aventura"
              className="d-inline-block ml-3 mr-3"
            />
            <h4 className="font-weight-bold text-primary-dark d-inline-block px-2">
              Aventura
            </h4>
          </label>
        </div>
        <div className="py-3 w-100 mb-4 shadow-lg hover-zoom px-2  rounded bg-white">
          <label
            htmlFor="opcion2"
            role="button"
            className="flex align-items-center "
          >
            <input
              type="radio"
              id="opcion2"
              name="opcion"
              value="Ciencia ficción"
              className="d-inline-block ml-3 mr-3"
            />
            <h4 className=" font-weight-bold text-primary-dark d-inline-block px-2">
              Ciencia ficción
            </h4>
          </label>
        </div>
        <div className="py-3 w-100 mb-4 shadow-lg hover-zoom px-2  rounded bg-white">
          <label
            htmlFor="opcion3"
            role="button"
            className="flex align-items-center "
          >
            <input
              type="radio"
              id="opcion3"
              name="opcion"
              value="Miedo"
              className="d-inline-block ml-3 mr-3"
            />
            <h4 className=" font-weight-bold text-primary-dark d-inline-block px-2">
              Miedo
            </h4>
          </label>
        </div>
        <div className="py-3 w-100 mb-4 shadow-lg hover-zoom px-2  rounded bg-white">
          <label
            htmlFor="opcion4"
            role="button"
            className="flex align-items-center "
          >
            <input
              type="radio"
              id="opcion4"
              name="opcion"
              value="Suspenso"
              className="d-inline-block ml-3 mr-3"
            />
            <h4 className=" font-weight-bold text-primary-dark d-inline-block px-2">
              Suspenso
            </h4>
          </label>
        </div>
        <div className="mt-5  ">
          <button className="btn btn-success focus-outline-none d-inline-block py-3 font-weight-bold focus-shadow  text-lg w-25 w-md-auto bg-success text-white px-2 shadow-lg hover-shadow-lg to-green-500 rounded-lg">
            Enviar
          </button>
          <div className="mx-4 d-inline-block"></div>
          <Link className="" to="/">
            <h5 className=" mr-2 d-inline-block display-8 float-right text-secondary font-weight-normal">
              Ver Resultados <FontAwesomeIcon icon={faChevronRight} />
            </h5>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Demo;
