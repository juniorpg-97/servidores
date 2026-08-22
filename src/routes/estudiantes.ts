import { Router } from "express";

const router = Router();

interface Estudiante {
  id: number;
  nombre: string;
  email: string;
  bootcamp: string;
}

const estudiantes: Estudiante[] = [];

// GET - filtrado por frontend
router.get("/", (req, res) => {
  // #swagger.description = 'Obtiene la lista de estudiantes y permite filtrar por bootcamp'
  const bootcamp = req.query.bootcamp;

  if (bootcamp) {
    const estudiantesFiltrados = estudiantes.filter(
      (estudiante) => estudiante.bootcamp === bootcamp,
    );

    return res.status(200).json(estudiantesFiltrados);
  }

  res.status(200).json(estudiantes);
});

// GET - Obtener un estudiante por ID
router.get("/:id", (req, res) => {
  // #swagger.description = 'Obtiene un estudiante por su ID'
  const id = Number(req.params.id);

  const estudiante = estudiantes.find((estudiante) => estudiante.id === id);

  if (!estudiante) {
    return res.status(404).json({
      error: "Estudiante no encontrado",
    });
  }

  res.status(200).json(estudiante);
});

// POST - Crear un estudiante
router.post("/", (req, res) => {
  // #swagger.description = 'Crea un nuevo estudiante'
  const { nombre, email, bootcamp } = req.body;

  if (!email) {
    return res.status(400).json({
      error: "El campo email es obligatorio",
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

// PUT - Actualizar un estudiante
router.put("/:id", (req, res) => {
  // #swagger.description = 'Actualiza los datos de un estudiante por su ID'
  const id = Number(req.params.id);

  const estudiante = estudiantes.find((estudiante) => estudiante.id === id);

  if (!estudiante) {
    return res.status(404).json({
      error: "Estudiante no encontrado",
    });
  }

  const { nombre, email, bootcamp } = req.body;

  estudiante.nombre = nombre;
  estudiante.email = email;
  estudiante.bootcamp = bootcamp;

  res.status(200).json(estudiante);
});

// DELETE - Eliminar un estudiante
router.delete("/:id", (req, res) => {
  // #swagger.description = 'Elimina un estudiante por su ID'
  const id = Number(req.params.id);

  const indice = estudiantes.findIndex((estudiante) => estudiante.id === id);

  if (indice === -1) {
    return res.status(404).json({
      error: "Estudiante no encontrado",
    });
  }

  const estudianteEliminado = estudiantes.splice(indice, 1);

  res.status(200).json(estudianteEliminado[0]);
});

export default router;
