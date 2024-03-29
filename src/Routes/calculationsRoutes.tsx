import { Router } from 'express';
import {
  listCalculationsController,
  makeCalculationController,
  makeRoastingCalculationController,
  saveCalculationController
} from '../Controllers/calculationsController';
import { listCalculationsQuery } from '../CQRS/Calculations/Commands/Queries/listCalculationsQuery/listCalculationsQuery';

const router = Router();

router.post(
  '/makeCalculation',
  makeCalculationController

  /*  
  #swagger.responses[200] = {
  description: 'Recieve a products tally, beans tally and the corresponding order ids!',
  schema: { $ref: '#/definitions/MakeCalculationResponseDto' }
} 
  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Make a calculation!',
            schema: { $ref: '#/definitions/MakeCalculationRequestDto' }
    } */
);

router.post(
  '/makeRoastingCalculation',
  makeRoastingCalculationController

  /*  
  #swagger.responses[200] = {
  description: 'Recieve a roasting calculation!',
  schema: { $ref: '#/definitions/MakeRoastingCalculationResponseDto' }
} 
  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Make a roasting calculation!',
            schema: { $ref: '#/definitions/MakeRoastingCalculationRequestDto' }
    } */
);
router.post(
  '/saveCalculation',
  saveCalculationController

  /*  
  #swagger.responses[200] = {
  description: 'Recieve a products tally, beans tally and the corresponding order ids!',
  schema: { $ref: '#/definitions/SaveCalculationResponseDto' }
} 
  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Make a calculation!',
            schema: { $ref: '#/definitions/SaveCalculationRequestDto' }
    } */
);

router.get(
  '/listCalculations',
  listCalculationsController
  /*  
  #swagger.responses[200] = {
  description: 'Recieve calculations!',
  schema: { $ref: '#/definitions/SavedCalculationDtos' }
} */
);

export default router;
