import 'dotenv/config';
const swaggerAutogen = require('swagger-autogen')();
const localAddress = process.env.LOCAL_ADDRESS;
const serverAddress = process.env.SERVER_ADDRESS;
const environment = process.env.ENVIRONMENT;
console.log(localAddress);
console.log(serverAddress);
console.log(environment);
const doc = {
  info: {
    title: 'Glitch Backend'
    // description: 'Description'
  },
  host: environment == 'local' ? localAddress : serverAddress
};

const endpointsFiles = ['./src/app.tsx'];
const developmentLocation = './src/swagger_output.json';

const productionLocation = './dist/src/swagger_output.json';
const routes = ['./src/app.tsx'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(developmentLocation, routes, doc);

swaggerAutogen(productionLocation, routes, doc);
