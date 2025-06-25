# API Gestion Locative

**Nom Prénom** :  
*Louis-Carlos Francisco*

---

## Fonctionnalités principales

- **CRUD complet** :  
  - Routes pour créer, lire, mettre à jour et supprimer des ressources (utilisateurs, propriétés, baux, paiements…).
- **Structure MVC** :  
  - Découpage du code en Controllers, Models, Middlewares, Routes et Utils pour une architecture claire et maintenable.
- **Authentification JWT** :  
  - Système d’inscription, connexion, génération de token JWT à la connexion.
- **Routes protégées** :  
  - Middleware de vérification du token JWT pour sécuriser les routes sensibles.
- **Base de données MongoDB** :  
  - Utilisation de Mongoose pour la modélisation et l’interaction avec la base de données.
- **Validation des données** :  
  - Vérification des champs obligatoires, des types (string, number, etc.) dans les modèles Mongoose.
- **Gestion des codes HTTP** :  
  - Retour des statuts appropriés (200, 201, 400, 401, 403, 404, 500…) selon le résultat de chaque requête.

---

## Bonus réalisés

- Génération de PDF pour les contrats de location.
- Système de notifications par email (Nodemailer).
- Cron automatique pour la génération mensuelle des paiements.
- Documentation Swagger intégrée (`/api-docs`).
- Upload d’images avec Cloudinary.
- Limiteur de requêtes (Rate Limiting).
- Gestion avancée des rôles (propriétaire/locataire).
- Sécurité renforcée (hashage des mots de passe, vérification des droits…).

---

## Lancer le projet

1. **Installer les dépendances**
   ```bash

   npm install
2. **Configurer les variables d’environnement**

Crée un fichier .env à la racine et complète-le avec tes informations MongoDB, JWT, Cloudinary, etc.

3. **Démarrer le serveur**
    ```bash

    npm run dev
4. **Accéder à la documentation API**

Swagger : http://localhost:5000/api-docs
