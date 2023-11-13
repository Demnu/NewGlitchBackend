import { db } from '../../../../dbConnection';
import {
  Calculation,
  calculations
} from '../../../../Domain/Entities/calculations';
import { MakeCalculationResponseDto } from '../makeCalculationCommand/makeCalculationResponseDto';
import { SaveCalculationRequestDto } from './saveCalculationRequestDto';

const saveCalculationCommand = async (
  calulationRequest: SaveCalculationRequestDto
): Promise<string> => {
  const calculation: Calculation = {
    author: calulationRequest.author,
    createdAt: new Date().toISOString(),
    calculationName: calulationRequest.calculationName,
    ordersCalculatedInfo: JSON.stringify(
      calulationRequest.ordersCalculatedInformation
    ),
    productsTally: JSON.stringify(calulationRequest.productsTally),
    beansTally: JSON.stringify(calulationRequest.beansTally)
  };
  await db.insert(calculations).values(calculation);
  return '';
};

export { saveCalculationCommand };
