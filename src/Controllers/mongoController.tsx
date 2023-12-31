import { Request, Response, Router } from 'express';
import readRecipesFromMongoCommand from '../CQRS/Mongo/Commands/readRecipesFromMongoCommand';

const router = Router();

router.get(
  '/readRecipesFromMongo',
  readRecipesFromMongoCommand
  /*
    #swagger.ignore = true
  */
);

export default router;
