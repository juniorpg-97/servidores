import express from "express";
import cors from "cors";
import estudiantesRouter from "./routes/estudiantes";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "../swagger_output.json";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));

app.use("/api/estudiantes", estudiantesRouter);

app.get("/", (req, res) => {
  res.json({
    status: "Servidor en línea",
    mensaje: "API de estudiantes funcionando",
  });
});

app.get("/api/status", (req, res) => {
  res.json({
    status: "Servidor en línea",
    version: "1.0.0",
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
