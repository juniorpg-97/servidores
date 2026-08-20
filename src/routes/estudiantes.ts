import { Router } from "express";

const router = Router();

interface Estudiante {
  id: number;
  nombre: string;
  email: string;
  bootcamp: string;
}

const estudiantes: Estudiante[] = [];

// GET - Obtener todos los estudiantes
router.get("/", (req, res) => {
  res.json(estudiantes);
});

// POST - Crear estudiante
router.post("/", (req, res) => {
  const { nombre, email, bootcamp } = req.body;

  if (!email) {
    return res.status(400).json({
      mensaje: "El email es obligatorio",
    });
  }

  const nuevoEstudiante: Estudiante = {
    id: estudiantes.length + 1,
    nombre,
    email,
    bootcamp,
  };

  estudiantes.push(nuevoEstudiante);

  res.status(201).json(nuevoEstudiante);
});

// PUT - Actualizar estudiante
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);

  const estudiante = estudiantes.find((estudiante) => estudiante.id === id);

  if (!estudiante) {
    return res.status(404).json({
      mensaje: "Estudiante no encontrado",
    });
  }

  estudiante.nombre = req.body.nombre;
  estudiante.email = req.body.email;
  estudiante.bootcamp = req.body.bootcamp;

  res.json(estudiante);
});

// DELETE - Eliminar estudiante
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  const indice = estudiantes.findIndex((estudiante) => estudiante.id === id);

  if (indice === -1) {
    return res.status(404).json({
      mensaje: "Estudiante no encontrado",
    });
  }

  estudiantes.splice(indice, 1);

  res.json({
    mensaje: "Estudiante eliminado correctamente",
  });
});

export default router;
