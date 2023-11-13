import { inArray } from 'drizzle-orm';
import { db } from '../../../../dbConnection';
import {
  Calculation,
  calculations
} from '../../../../Domain/Entities/calculations';
import { orders } from '../../../../Domain/Entities/orders';
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

  // set all orders to state calculated
  await db
    .update(orders)
    .set({ orderStatus: 'calculated' })
    .where(
      inArray(
        orders.id,
        calulationRequest.ordersCalculatedInformation.map((o) => o.id)
      )
    );

  return '';
};

export { saveCalculationCommand };
