import express from "express";
import { buscarEncuestaById, crearEncuesta, editarEncuesta, eliminarEncuesta, guardarVoto, todasLasEncuestas } from "../controllers/encuestaController.js";

const router = express.Router();

//CREAR Y GUARDAR
router.post("/", crearEncuesta);

//ACTUALIZAR o EDITAR 
router.put("/edit", editarEncuesta);

//OBTENER ENCUESTA POR ID
router.get("/:id", buscarEncuestaById);

//OBTENER TODAS LAS ENCUENTAS
router.get("/", todasLasEncuestas);

//ELIMINAR ENCUESTA
router.delete("/", eliminarEncuesta);

//CREAR Y GUARDAR  VOTOS
router.post("/votar", guardarVoto)

export default router;