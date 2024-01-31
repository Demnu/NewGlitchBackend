import { Request, Response, NextFunction } from 'express';
import { CreateBlendRequestDtoSchema } from '../CQRS/Blends/CreateBlend/createBlendRequestDto';
import { createBlendCommand } from '../CQRS/Blends/CreateBlend/createBlendCommand';

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
export { createBlendController };
