import { Router } from 'express';
import {
  makeCalculationController,
  saveCalculationController
} from '../Controllers/calculationsController';

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
  '/saveCalculation',
  saveCalculationController

  /*  
  #swagger.parameters['body'] = {
            in: 'body',
  description: 'Save a calculation you have just made!',
            schema: { $ref: '#/definitions/SaveCalculationRequestDto' }
    } */
);

export default router;
