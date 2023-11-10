import 'dotenv/config';
const swaggerAutogen = require('swagger-autogen');
const localAddress = process.env.LOCAL_ADDRESS;
const serverAddress = process.env.SERVER_ADDRESS;
const environment = process.env.ENVIRONMENT;
import {
  OrderDtoJsonSchema,
  ProductExtendedJsonSchema,
  OrderStatusEnumJsonSchema
} from './src/CQRS/Orders/Queries/orderDto';
import { RecipeDtoJsonSchema } from './src/CQRS/Recipes/Queries/recipesDto';
import { CreateRecipeRequestDtoJsonSchema } from './src/CQRS/Recipes/Commands/createRecipeRequestDto';
import { MakeCalculationRequestDtoJsonSchema } from './src/CQRS/Calculations/Commands/makeCalculationRequestDto';
import { MakeCalculationResponseDtoJsonSchema } from './src/CQRS/Calculations/Commands/makeCalculationResponseDto';
import { BeanJsonSchema } from './src/Domain/Entities/beans';
import { ListOrdersRequestDtoJsonSchema } from './src/CQRS/Orders/Queries/listOrdersRequestDto';
console.log();
const doc = {
  info: {
    title: 'Glitch Backend'
  },
  definitions: {
    // if swagger doc parameters look glitched just re-run npm run dev or npm run generate-swagger
    OrderDtos: [OrderDtoJsonSchema],
    OrderDto: OrderDtoJsonSchema,
    ListOrdersRequestDto: ListOrdersRequestDtoJsonSchema,
    RecipeDto: RecipeDtoJsonSchema,
    RecipeDtos: [RecipeDtoJsonSchema],
    RecipeRequestDto: CreateRecipeRequestDtoJsonSchema,
    MakeCalculationRequestDto: MakeCalculationRequestDtoJsonSchema,
    MakeCalculationResponseDto: MakeCalculationResponseDtoJsonSchema,
    ProductExtendedJsonSchema: ProductExtendedJsonSchema,
    OrderStatusEnum: OrderStatusEnumJsonSchema,
    BeanDtos: [BeanJsonSchema],
    BeanDto: BeanJsonSchema
  },
  host: environment == 'local' ? localAddress : serverAddress
};

const developmentLocation = './src/swagger_output.json';
const routes = ['./src/app.tsx'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(developmentLocation, routes, doc);
