import app from "./app.js"; 
import db from "./config/db.js";
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 5000;



db(); // Connexion à la base de données MongoDB


app.listen(PORT, () => {
    console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
