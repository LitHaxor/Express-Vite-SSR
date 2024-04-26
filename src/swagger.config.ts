import { Express } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi, { SwaggerOptions } from "swagger-ui-express";

export const configureSwagger = (app: Express) => {
  const options: SwaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Task API",
        version: "1.0.0",
        description: "API documentation for managing tasks",
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
    },
    apis: ["./src/controller/*.ts"],
  };

  const specs = swaggerJsdoc(options);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

  console.log(`swagger docs available at http://localhost:3000/api-docs`);
};
