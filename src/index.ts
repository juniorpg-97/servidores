import express from "express";
import estudiantesRouter from "./routes/estudiantes";

const app = express();

const PORT = 3000;

app.use(express.json());

// Endpoint de ayer
app.get("/api/status", function (req, res) {
  res.json({
    status: "Servidor en línea",
    version: "1.0.0",
  });
});

// Router de estudiantes
app.use("/api/estudiantes", estudiantesRouter);

app.listen(PORT, function () {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
