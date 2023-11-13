import { desc } from 'drizzle-orm';
import { calculations } from '../../../../../Domain/Entities/calculations';
import { db } from '../../../../../dbConnection';
import { SaveCalculationRequestDto } from '../../saveCalculationCommand/saveCalculationRequestDto';
import { ListCalculationsResponseDto } from './listCalculationsResponseDto';

const listCalculationsQuery = async () => {
  const calculationsFromDb = await db.query.calculations.findMany({
    orderBy: [desc(calculations.createdAt)]
  });
  const formattedCalculations: ListCalculationsResponseDto[] =
    calculationsFromDb.map((c) => {
      const calculationTemp: ListCalculationsResponseDto = {
        id: c.id,
        author: c.author,
        createdAt: c.createdAt,
        calculationName: c.calculationName,
        beansTally: JSON.parse(c.beansTally as string),
        productsTally: JSON.parse(c.productsTally as string),
        ordersCalculatedInformation: JSON.parse(
          c.ordersCalculatedInfo as string
        )
      };
      return calculationTemp;
    });
  return formattedCalculations;
};

export { listCalculationsQuery };
