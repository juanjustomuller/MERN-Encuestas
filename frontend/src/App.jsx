import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Inicio from "./components/Inicio";
import Demo from './components/Demo';
import Create from './components/Create';
import Encuesta from './components/Encuesta';
import Resultados from './components/Resultados';


function App() {
  

  return (
    <BrowserRouter>
      <div className="app container">
        <Header />

        <Routes>
          <Route path="/" index element={<Inicio />}/>
          <Route path="/demo/:id" element={<Demo />}/>
          <Route path="/new/:id" element={<Create />}/>
          <Route path="/encuesta/:id" element={<Encuesta />}/>
          <Route path="/resultado/:id" element={<Resultados />}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
