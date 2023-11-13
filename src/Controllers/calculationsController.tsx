import { Request, Response, NextFunction } from 'express';
import { makeCalculationCommand } from '../CQRS/Calculations/Commands/makeCalculationCommand/makeCalculationCommand';
import { MakeCalculationRequestDtoSchema } from '../CQRS/Calculations/Commands/makeCalculationCommand/makeCalculationRequestDto';
import { saveCalculationCommand } from '../CQRS/Calculations/Commands/saveCalculationCommand/saveCalculationCommand';
import { MakeCalculationResponseDtoSchema } from '../CQRS/Calculations/Commands/makeCalculationCommand/makeCalculationResponseDto';
import { SaveCalculationRequestDtoSchema } from '../CQRS/Calculations/Commands/saveCalculationCommand/saveCalculationRequestDto';

const makeCalculationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parsedResult = MakeCalculationRequestDtoSchema.parse(req.body);
    const result = await makeCalculationCommand(parsedResult);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const saveCalculationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parsedResult = SaveCalculationRequestDtoSchema.parse(req.body);
    const result = await saveCalculationCommand(parsedResult);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

export { makeCalculationController, saveCalculationController };
