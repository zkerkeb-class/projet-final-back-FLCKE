
import express from "express";
import cors from "cors";
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerDocs from './swagger.js'; // Assurez-vous que le chemin est correct
import authRoutes from './routes/authRoutes.js'; // Assurez-vous que le chemin est correct
import userRoutes from "./routes/usersRoutes.js"; // Assurez-vous que le chemin est correct
import propertiesRoutes from "./routes/propertiesRoutes.js"; // Assurez-vous que le chemin est correct
import leasesRoutes from "./routes/leasesRoutes.js"; // Assurez-vous que le chemin est correct
import contratRoutes from "./routes/contratRoutes.js"; // Assurez-vous que le chemin est correct
//const authRoutes = require("./routes/authRoutes"); // Assurez-vous que le chemin est correct
//const userRoutes = require("./routes/usersRoutes"); // Assurez-vous que le chemin est correct


const app = express();
app.use(express.json()); // Middleware pour parser le JSON dans les requêtes

app.use(cors({ origin: "http://localhost:5173", credentials: true })); // Middleware pour activer CORS


app.get("/", (req, res) => {
    res.send("API OK ✅");
});
app.use("/api/user", userRoutes); // Assurez-vous que le chemin est correct
//app.use("/api/local", localRoutes); // Assurez-vous que le chemin est correct
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api/auth", authRoutes); // Assurez-vous que le chemin est correct
app.use("/api/properties", propertiesRoutes); // Assurez-vous que le chemin est correct
app.use("/api/leases", leasesRoutes); // Assurez-vous que le chemin est correct
app.use("/api/generate-contrat", contratRoutes);
export default app; // Exporter l'application Express pour les tests