import { Router } from 'express';
import {
  createBlendController,
  editBlendController,
  listBlendController
} from '../Controllers/blendsController';
const router = Router();
router.post(
  '/createBlend',
  createBlendController
  /*  
  #swagger.responses[200] = {
  description: 'Recieve the new blends id!',
  schema: { $ref: '#/definitions/CreateBlendResponseDto' }
} 
  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Make a blend!',
            schema: { $ref: '#/definitions/CreateBlendRequestDto' }
    } */
);

router.post(
  '/editBlend',
  editBlendController
  /*  
  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Make a blend!',
            schema: { $ref: '#/definitions/EditBlendRequestDto' }
    } */
);

router.get(
  '/listBlends',
  listBlendController
  /*  
  #swagger.responses[200] = {
  description: 'Recieve the new blends id!',
  schema: { $ref: '#/definitions/ListBlendsQueryRequestDtos' }
}  */
);
export default router;
