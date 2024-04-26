# Project Name: Express-Vite-SSR (Task Schedular)

## Description
This project is a task scheduler application.

## Installation
To install the project dependencies, run the following command:
```bash
npm install
```

## Usage
To start the project, run:
```bash
npm start
```
This will compile the TypeScript code and start the server.

For development with live-reload, you can use:
```bash
npm run dev
```

## Scripts
- **start**: Compiles TypeScript code and starts the server.
- **dev**: Starts the server with live-reload for development.
- **test**: Placeholder for running tests.

## Dependencies
- **argon2**: Password hashing library.
- **autoprefixer**: PostCSS plugin to parse CSS and add vendor prefixes.
- **axios**: Promise-based HTTP client for the browser and Node.js.
- **class-transformer**: Decorator-based transformation library.
- **class-validator**: Validation library for classes and DTOs.
- **compression**: Middleware for compressing HTTP responses.
- **cors**: Middleware for enabling Cross-Origin Resource Sharing.
- **dotenv**: Module to load environment variables from a .env file.
- **express**: Web framework for Node.js.
- **jsonwebtoken**: Library for generating and verifying JSON Web Tokens.
- **morgan-body**: Middleware for logging HTTP requests and responses.
- **nodemon**: Utility for auto-restarting the server during development.
- **pg**: PostgreSQL client for Node.js.
- **postcss**: Tool for transforming CSS with JavaScript plugins.
- **react**: JavaScript library for building user interfaces.
- **react-dom**: React package for working with the DOM.
- **react-hot-toast**: Toast notifications for React applications.
- **react-router-dom**: Declarative routing for React applications.
- **reflect-metadata**: Polyfill for Metadata Reflection API.
- **swagger-jsdoc**: Swagger integration for Express using JSDoc comments.
- **swagger-ui-express**: Swagger UI integration for Express.
- **tailwindcss**: Utility-first CSS framework.
- **typeorm**: ORM for TypeScript and JavaScript.
- **typeorm-naming-strategies**: Additional naming strategies for TypeORM.
- **vite**: Next generation frontend tooling.
- **vite-plugin-ssr**: Vite plugin for Server-Side Rendering (SSR).

## Dev Dependencies
- **@types/compression**: TypeScript type definitions for compression.
- **@types/express**: TypeScript type definitions for Express.
- **@types/jsonwebtoken**: TypeScript type definitions for jsonwebtoken.
- **@types/react**: TypeScript type definitions for React.
- **@types/react-dom**: TypeScript type definitions for React DOM.
- **@types/swagger-jsdoc**: TypeScript type definitions for swagger-jsdoc.
- **@types/swagger-ui-express**: TypeScript type definitions for swagger-ui-express.
- **ts-node**: TypeScript execution environment for Node.js.
- **typescript**: TypeScript compiler.

---
## Example .env

```.env
PORT=3000
NODE_ENV=development
DATABASE_URL=postgres://lithasan:@localhost:5432/task
JWT_SECRET=secret
```
