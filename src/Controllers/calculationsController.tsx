import { Request, Response, NextFunction } from 'express';
import { makeCalculationCommand } from '../CQRS/Calculations/Commands/makeCalculationCommand/makeCalculationCommand';
import { MakeCalculationRequestDtoSchema } from '../CQRS/Calculations/Commands/makeCalculationCommand/makeCalculationRequestDto';
import { saveCalculationCommand } from '../CQRS/Calculations/Commands/saveCalculationCommand/saveCalculationCommand';
import { MakeCalculationResponseDtoSchema } from '../CQRS/Calculations/Commands/makeCalculationCommand/makeCalculationResponseDto';
import { SaveCalculationRequestDtoSchema } from '../CQRS/Calculations/Commands/saveCalculationCommand/saveCalculationRequestDto';
import { listCalculationsQuery } from '../CQRS/Calculations/Commands/Queries/listCalculationsQuery/listCalculationsQuery';
import { makeRoastingCalculationCommand } from '../CQRS/RoastingCalculation/makeRoastingCalculationCommand';
import { MakeRoastingCalculationRequestDtoSchema } from '../CQRS/RoastingCalculation/makeRoastingCalculationRequestDto';
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

const makeRoastingCalculationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parsedResult = MakeRoastingCalculationRequestDtoSchema.parse(
      req.body
    );
    const result = await makeRoastingCalculationCommand(parsedResult);
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
    // result is a number but im getting an error
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const listCalculationsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await listCalculationsQuery();
    res.send(result);
  } catch (error) {
    next(error);
  }
};

export {
  makeRoastingCalculationController,
  makeCalculationController,
  saveCalculationController,
  listCalculationsController
};
