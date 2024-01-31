import { Request, Response, NextFunction } from 'express';
import { CreateBlendRequestDtoSchema } from '../CQRS/Blends/Commands/CreateBlend/createBlendRequestDto';
import { createBlendCommand } from '../CQRS/Blends/Commands/CreateBlend/createBlendCommand';
import { listBlendsQuery } from '../CQRS/Blends/Commands/Queries/ListBlendsQuery/listBlendsQuery';

const createBlendController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parsedReq = CreateBlendRequestDtoSchema.parse(req.body);
    const result = await createBlendCommand(parsedReq);
    res.status(200).send({ blendId: result });
  } catch (error) {
    next(error);
  }
};

const listBlendController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await listBlendsQuery();
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
export { createBlendController, listBlendController };
