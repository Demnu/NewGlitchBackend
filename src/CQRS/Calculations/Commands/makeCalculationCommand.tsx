import { inArray } from 'drizzle-orm';
import { db } from '../../../dbConnection';
import { MakeCalculationRequestDto } from './makeCalculationRequestDto';
import { orders } from '../../../Domain/Entities/orders';
import { recipes } from '../../../Domain/Entities/recipes';
import {
  BeanTally,
  MakeCalculationResponseDto,
  OrdersCalculatedInfo,
  ProductTally
} from './makeCalculationResponseDto';
import { orders_products } from '../../../Domain/Entities/orders_products';

interface RecipeMap {
  beans: BeanRecipeInfo[];
}
interface BeanRecipeInfo {
  beanName: string;
  beanId: number;
  amount: number;
}

const makeCalculationCommand = async (
  calulationRequest: MakeCalculationRequestDto
): Promise<MakeCalculationResponseDto> => {
  const orderIds = calulationRequest.orderIds;
  if (await areDuplicateOrderIds(orderIds)) {
    throw new Error('Duplicate order IDs provided.');
  }
  const existingOrderIds = await db
    .select()
    .from(orders)
    .where(inArray(orders.id, orderIds));

  // Check if all requested orderIds exist in the database
  const allOrderIdsExist = orderIds.every((id) =>
    existingOrderIds.find((result) => id === result.id)
  );
  if (!allOrderIdsExist) {
    throw new Error('Invalid orderIDs provided');
  }

  const orderProducts = await db.query.orders_products.findMany({
    where: inArray(orders_products.orderId, orderIds),
    with: {
      product: true
    }
  });

  const productsTally: Map<string, ProductTally> = new Map();

  orderProducts.map((orderProduct) => {
    // add products in order to product tally
    addProductAmount(
      productsTally,
      orderProduct.productId,
      orderProduct.product.productName,
      orderProduct.amountOrdered
    );
  });

  // get corresponding recipes and create recipe map
  const productsTallyKeys = [...productsTally.keys()];
  const recipesFromDb = await db.query.recipes.findMany({
    where: inArray(recipes.productId, productsTallyKeys),
    with: {
      recipe_beans: { with: { bean: true } }
    }
  });
  const recipeMap: Map<string, RecipeMap> = new Map();
  recipesFromDb.map((recipe) => {
    recipeMap.set(recipe.productId, {
      beans: recipe.recipe_beans.map((recipeBean) => {
        return {
          beanId: recipeBean.beanId,
          amount: recipeBean.amountOrdered,
          beanName: recipeBean.bean.beanName
        };
      })
    });
  });

  // calculate bean tally
  const beansTally: Map<number, BeanTally> = new Map();
  productsTallyKeys.forEach((productTallyKey) => {
    const productTally = productsTally.get(productTallyKey);
    if (productTally != undefined) {
      if (recipeMap.has(productTallyKey)) {
        productTally.hasRecipe = true;
        const tempRecipe = recipeMap.get(productTallyKey);
        tempRecipe?.beans.forEach((bean) => {
          // amountNeededToBeRoasted is calculated by getting the amount ordered of a product with a recipe multiplied
          // by the amount associated with each bean in the recipe
          const amountNeededToBeRoasted =
            bean.amount * productTally.amountOrdered;
          addBeanAmount(
            beansTally,
            bean.beanId,
            bean.beanName,
            amountNeededToBeRoasted
          );
        });
      }
    }
  });

  // create orders calculated information
  const ordersCalculatedInformation: OrdersCalculatedInfo[] =
    existingOrderIds.map((order) => {
      return {
        orderId: order.id,
        createdAt: order.createdAt,
        customerName: order.customerName
      };
    });

  return {
    ordersCalculatedInformation: ordersCalculatedInformation,
    productsTally: Array.from(productsTally.values()),
    beansTally: Array.from(beansTally.values())
  };
};

const addProductAmount = (
  productTally: Map<string, ProductTally>,
  productId: string,
  productName: string,
  amountToAdd: number
) => {
  const currentProductInfo = productTally.get(productId);

  if (currentProductInfo) {
    // Product exists, update the amount
    currentProductInfo.amountOrdered += amountToAdd;
    productTally.set(productId, currentProductInfo);
  } else {
    // Product does not exist, add new entry
    productTally.set(productId, {
      productId: productId,
      productName: productName,
      amountOrdered: amountToAdd,
      hasRecipe: false
    });
  }
};

const addBeanAmount = (
  beanTally: Map<number, BeanTally>,
  beanId: number,
  beanName: string,
  amountNeededToBeRoasted: number
) => {
  const currentBeanTally = beanTally.get(beanId);

  if (currentBeanTally) {
    // Bean exists, update the amount
    currentBeanTally.amountNeededToBeRoasted += amountNeededToBeRoasted;
    beanTally.set(beanId, currentBeanTally);
  } else {
    // Product does not exist, add new entry
    beanTally.set(beanId, {
      beanId: beanId,
      beanName: beanName,
      amountNeededToBeRoasted: amountNeededToBeRoasted
    });
  }
};

const areDuplicateOrderIds = async (orderIds: string[]): Promise<boolean> => {
  const hasDuplicates = orderIds.length !== new Set(orderIds).size;
  return hasDuplicates;
};

export { makeCalculationCommand };
