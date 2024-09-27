import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Inicio from "./components/Inicio";
import Demo from './components/Demo';
import Create from './components/Create';


function App() {
  

  return (
    <BrowserRouter>
      <div className="app container">
        <Header />

        <Routes>
          <Route path="/" index element={<Inicio />}/>
          <Route path="/demo/:id" index element={<Demo />}/>
          <Route path="/new" index element={<Create />}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
