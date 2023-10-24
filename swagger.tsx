import 'dotenv/config';
const swaggerAutogen = require('swagger-autogen')();
const host = process.env.SWAGGER_HOST;

const doc = {
  info: {
    title: 'Glitch Backend'
    // description: 'Description'
  },
  host: host
};

const endpointsFiles = ['./src/app.tsx'];
const developmentLocation = './src/swagger_output.json';

const productionLocation = './dist/src/swagger_output.json';
const routes = ['./src/app.tsx'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(developmentLocation, routes, doc);
swaggerAutogen(productionLocation, routes, doc);
