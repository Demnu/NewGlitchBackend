const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/app.tsx'];

swaggerAutogen(outputFile, endpointsFiles);
