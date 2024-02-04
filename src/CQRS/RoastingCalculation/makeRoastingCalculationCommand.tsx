import { eq, inArray } from 'drizzle-orm';
import { db } from '../../dbConnection';
import { calculations } from '../../Domain/Entities/calculations';
import { recipes } from '../../Domain/Entities/recipes';
import { MakeRoastingCalculationRequestDto } from './makeRoastingCalculationRequestDto';

type ProductTallyType = {
  id: string;
  productName: string;
  amountOrdered: number;
  hasRecipe: boolean;
};

type RoastingCalculationHashMap = {
  [blendId: number]: {
    blendId: number;
    amount: number;
    blendName: string;
  };
};

const makeRoastingCalculationCommand = async (
  request: MakeRoastingCalculationRequestDto
) => {
  let productCalculations: {
    [productId: string]: {
      amountOrdered: number;
      totalAmountOfBeans: number;
      blendId: number;
      blendName: string;
    };
  } = {};
  // validate calculation Id
  if (!(await isCalculationIdValid(request))) {
    throw new Error(
      'Error making roasting calculation, calculationId does not exist'
    );
  }
  const roastingCalculation: RoastingCalculationHashMap = {};

  // get calculation
  const calculation = await db.query.calculations.findFirst({
    where: eq(calculations.id, request.calculationId)
  });

  if (!!calculation?.productsTally) {
    let productsTally: ProductTallyType[] = JSON.parse(
      calculation.productsTally as string
    );

    productsTally.forEach((product) => {
      productCalculations[product.id] = {
        amountOrdered: product.amountOrdered,
        totalAmountOfBeans: 0,
        blendId: -1,
        blendName: ''
      };
    });

    const result = await db.query.recipes.findMany({
      where: inArray(recipes.productId, Object.keys(productCalculations)),
      with: { blends: true, recipe_beans: true }
    });

    result.forEach((r) => {
      if (
        !!r.blends &&
        Object.keys(productCalculations).some((pc) => pc === r.productId)
      ) {
        // calculate total amount of beans
        const totalAmountOfBeans = r.recipe_beans.reduce(
          (acc, rb) => acc + rb.amountOrdered,
          0
        );
        productCalculations[r.productId] = {
          amountOrdered: productCalculations[r.productId].amountOrdered,
          totalAmountOfBeans: totalAmountOfBeans,
          blendId: r.blends.id,
          blendName: r.blends.blendName
        };
      }
    });
    for (let productId in productCalculations) {
      let product = productCalculations[productId];
      // Access properties of the current product
      if (product.blendId > 0) {
        if (roastingCalculation[product.blendId]) {
          roastingCalculation[product.blendId] = {
            amount:
              roastingCalculation[product.blendId].amount +
              product.amountOrdered * product.totalAmountOfBeans,
            blendId: product.blendId,
            blendName: product.blendName
          };
        } else {
          roastingCalculation[product.blendId] = {
            amount: product.amountOrdered * product.totalAmountOfBeans,
            blendId: product.blendId,
            blendName: product.blendName
          };
        }
      }
    }
  }
  let readableResult = Object.entries(roastingCalculation).map(
    ([blendId, roastingCalculation]) => ({
      blendId: roastingCalculation.blendId,
      amount: roastingCalculation.amount,
      blendName: roastingCalculation.blendName
    })
  );

  return readableResult;
};

const isCalculationIdValid = async (
  request: MakeRoastingCalculationRequestDto
) => {
  const result = await db
    .select()
    .from(calculations)
    .where(eq(calculations.id, request.calculationId));
  return result.length > 0;
};

export { makeRoastingCalculationCommand };
