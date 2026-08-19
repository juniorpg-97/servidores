import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

interface Estudiante {
  id: number;
  nombre: string;
  email: string;
  bootcamp: string;
}

const estudiantes: Estudiante[] = [];

// Endpoint de ayer
app.get("/api/status", (req, res) => {
  res.json({
    status: "Servidor en línea",
    version: "1.0.0",
  });
});

// GET - Obtener todos los estudiantes
app.get("/api/estudiantes", (req, res) => {
  res.json(estudiantes);
});

// POST - Crear estudiante
app.post("/api/estudiantes", (req, res) => {
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
app.put("/api/estudiantes/:id", (req, res) => {
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
app.delete("/api/estudiantes/:id", (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
