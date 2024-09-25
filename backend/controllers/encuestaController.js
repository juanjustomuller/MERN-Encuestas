import Encuesta from "../model/Encuesta.js";
import Restriccion from "../model/Restriccion.js";

export const crearEncuesta = async (req, res) => {
  try {
    const datos = new Encuesta({
      id: req.body.id,
      pregunta: req.body.pregunta,
      opciones: req.body.opciones,
    });
    datos
      .save()
      .then((respuesta) => res.json(respuesta))
      .catch((error) => res.status(500).json(error));
  } catch (error) {
    res.status(500).json(error);
  }
};

export const editarEncuesta = async (req, res) => {
  try {
    Encuesta.findOneAndUpdate(
      { id: req.body.id },
      {
        pregunta: req.body.pregunta,
        opciones: req.body.opciones,
      },
      { new: true }
    )
      .then((respuesta) => res.json(respuesta))
      .catch((error) => res.status(500).json(error));
  } catch (error) {
    res.status(500).json(error);
  }
};

export const buscarEncuestaById = async (req, res) => {
  try {
    const id = req.params.id;

    Encuesta.findOne({ id })
      .then((respuesta) => {
        respuesta
          ? res.json(respuesta)
          : res.status(401).json({ mensaje: "No existe" });
      })
      .catch((error) => res.status(500).json(error));
  } catch (error) {
    res.status(500).json(error);
  }
};

export const todasLasEncuestas = async (req, res) => {
  try {
    Encuesta.find()
      .then((respuesta) => res.json(respuesta))
      .catch((error) => res.status(500).json(error));
  } catch (error) {
    res.status(500).json(error);
  }
};

export const eliminarEncuesta = async (req, res) => {
  try {
    const id = req.body.id; //saco del cuerpo de la solicitud el id, no del parametro de la url(params)
    Encuesta.findOneAndDelete({ _id: id }) //el _id seria el "real" q nos da mongoDB, el id sin guion es el que requerimos nosotros en el modelo
      .then((respuesta) => {
        respuesta
          ? res.json(respuesta)
          : res.status(400).json({ mensaje: "No existe" });
      })
      .catch((error) => res.status(500).json(error));
  } catch (error) {
    res.status(500).json(error);
  }
};

export const guardarVoto = async (req, res) => {
  try {
    const { encuestaId, opcionId, ip } = req.body;

    Restriccion.findOne({ ip, encuestaId })
    .then((voto) => {
      if (voto) {
        res.status(400).json({ mensaje: "Usted ya voto en esta encuesta" });
      } else {
        Encuesta.updateOne(
          {
            id: encuestaId,
            "opciones.id": opcionId,
          },
          { $inc: { "opciones.$.votos": 1 } }
        )
          .then((respuesta) => {
            if (respuesta.modifiedCount > 0) {
              //registra el voto y restringe la participacion
              let restric = new Restriccion({
                ip: req.body.ip,
                encuestaId,
              });
              restric
                .save()
                .then((respuesta) => res.json({ mensaje: `Voto Registrado!, con id: ${respuesta._id}` }))
                .catch((error) => res.status(500).json(error));
              //FIN de restriccion
            } else {
              res.status(400).json({ mensaje: "Voto NO Registrado!" });
            }
          })
          .catch((error) => res.status(500).json(error));
      }
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
