import { Router } from 'express';
import { makeCalculationController } from '../Controllers/calculationsController';

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

export default router;
