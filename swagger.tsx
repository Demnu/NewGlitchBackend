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
import { MakeCalculationRequestDtoJsonSchema } from './src/CQRS/Calculations/Commands/makeCalculationCommand/makeCalculationRequestDto';
import { SaveCalculationRequestDtoJsonSchema } from './src/CQRS/Calculations/Commands/saveCalculationCommand/saveCalculationRequestDto';
import { MakeCalculationResponseDtoJsonSchema } from './src/CQRS/Calculations/Commands/makeCalculationCommand/makeCalculationResponseDto';
import { BeanJsonSchema } from './src/Domain/Entities/beans';
import { ListOrdersRequestDtoJsonSchema } from './src/CQRS/Orders/Queries/listOrdersRequestDto';
import { ListCalculationsResponseDtoJsonSchema } from './src/CQRS/Calculations/Commands/Queries/listCalculationsQuery/listCalculationsResponseDto';
import { MarkAsNotRecipeRequestDtoJsonSchema } from './src/CQRS/Recipes/Commands/markAsNotRecipeCommand/markAsNotRecipeRequestDto';
import { ProductDtoJsonSchema } from './src/CQRS/Products/Commands/listProductsWithNoRecipeDto';
import { EditRecipeRequestDtoJsonSchema } from './src/CQRS/Recipes/Commands/editRecipeCommand/editRecipeDto';
import { DeleteRecipeRequestDtoJsonSchema } from './src/CQRS/Recipes/Commands/deleteRecipe/deleteRecipeRequestDto';
import { SaveCalculationResponseDtoJsonSchema } from './src/CQRS/Calculations/Commands/saveCalculationCommand/saveCalculationResponseDto';
import { CreateBlendRequestDtoJsonSchema } from './src/CQRS/Blends/Commands/CreateBlend/createBlendRequestDto';
import { CreateBlendResponseDtoJsonSchema } from './src/CQRS/Blends/Commands/CreateBlend/createBlendResponseDto';
import { ListBlendsQueryRequestDtoJsonSchema } from './src/CQRS/Blends/Commands/Queries/ListBlendsQuery/listBlendsQueryRequestDto';
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
    BeanDto: BeanJsonSchema,
    SaveCalculationRequestDto: SaveCalculationRequestDtoJsonSchema,
    UnsavedCalculations: [MakeCalculationResponseDtoJsonSchema],
    UnsavedCalculation: MakeCalculationResponseDtoJsonSchema,
    SavedCalculationDtos: [ListCalculationsResponseDtoJsonSchema],
    SavedCalculationDto: ListCalculationsResponseDtoJsonSchema,
    MarkAsNotRecipeRequestDto: MarkAsNotRecipeRequestDtoJsonSchema,
    ListProductsWithNoRecipeDtos: [ProductDtoJsonSchema],
    EditRecipeRequestDto: EditRecipeRequestDtoJsonSchema,
    DeleteRecipeRequestDto: DeleteRecipeRequestDtoJsonSchema,
    SaveCalculationResponseDto: SaveCalculationResponseDtoJsonSchema,
    CreateBlendRequestDto: CreateBlendRequestDtoJsonSchema,
    CreateBlendResponseDto: CreateBlendResponseDtoJsonSchema,
    ListBlendsQueryRequestDtos: [ListBlendsQueryRequestDtoJsonSchema]
  },
  host: environment == 'local' ? localAddress : serverAddress
};

const developmentLocation = './src/swagger_output.json';
const routes = ['./src/app.tsx'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(developmentLocation, routes, doc);
