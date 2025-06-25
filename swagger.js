// const swaggerJsDoc = require('swagger-jsdoc');
import swaggerJsDoc from 'swagger-jsdoc';
// Configuration de Swagger
export const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Gestion Locative",
            version: "1.0.0",
            description: "API pour la gestion locative (utilisateurs, propriétés, baux, paiements, etc.)"
        },
        servers: [
            { url: "http://localhost:5000" }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            },
            schemas: {
                User: {
                    type: "object",
                    properties: {
                        _id: { type: "string" },
                        fullName: { type: "string" },
                        email: { type: "string" },
                        phone: { type: "string" },
                        role: { type: "string", enum: ["proprietaire", "locataire", "admin"] }
                    }
                },
                Property: {
                    type: "object",
                    properties: {
                        _id: { type: "string" },
                        owner_id: { type: "string" },
                        name: { type: "string" },
                        address: { type: "string" },
                        rent_price: { type: "number" },
                        status: { type: "string", enum: ["disponible", "louer"] }
                    }
                },
                Lease: {
                    type: "object",
                    properties: {
                        _id: { type: "string" },
                        property_id: { type: "string" },
                        tenant_id: { type: "string" },
                        start_date: { type: "string", format: "date" },
                        end_date: { type: "string", format: "date" },
                        rent_date: { type: "number" },
                        status: { type: "string", enum: ["En attente", "actif", "termine", "suspendu"] }
                    }
                },
                Payement: {
                    type: "object",
                    properties: {
                        _id: { type: "string" },
                        amount: { type: "number" },
                        date: { type: "string", format: "date" },
                        user: { type: "string" },
                        property: { type: "string" },
                        status: { type: "string", enum: ["pending", "completed", "failed"] }
                    }
                }
            }
        },
        security: [{ bearerAuth: [] }]
    },
    apis: ["./routes/*.js"], 
  };
const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default swaggerDocs; // Exporter la documentation Swagger pour l'utiliser dans le serveur Express                                                                                              