import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrayingHands } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <header>
      <div className="header">
        <div className="d-flex flex-column align-items-center">
          <div className="d-flex flex-column align-items-baseline">
            <Link to="/" className="page-link">
              <FontAwesomeIcon className="mr-2 mt-3" icon={faPrayingHands} />
              Encuestas MERN
            </Link>
          </div>
          <p className="mt-2 mb-0 fst-italic" style={{ fontSize: "1.125rem" }}>
            Crea y responde encuestas anonimas
          </p>
        </div>
      </div>

      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            Inicio
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/demo/54bf4315-04a5-4b9d-882d-19e147942ed8" className="nav-link active" aria-current="page">
                  Demo
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link" >
                  Crear Nueva
                </Link>
              </li>
     
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Buscar"
                aria-label="Buscar"
              />
              <button className="btn btn-outline-success" type="submit">
                Buscar
              </button>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
