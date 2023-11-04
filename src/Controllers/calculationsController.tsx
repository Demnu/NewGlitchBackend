import { Request, Response, NextFunction } from 'express';
import { makeCalculationCommand } from '../CQRS/Calculations/Commands/makeCalculationCommand';
import { MakeCalculationRequestDtoSchema } from '../CQRS/Calculations/Commands/makeCalculationRequestDto';

const makeCalculationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    MakeCalculationRequestDtoSchema.parse(req.body);
    const result = await makeCalculationCommand(req.body);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

export { makeCalculationController };
