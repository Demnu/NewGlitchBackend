import { eq, sql } from 'drizzle-orm';
import { db } from '../../../../dbConnection';
import { MarkAsNotRecipeRequestDto } from './markAsNotRecipeRequestDto';
import { orders } from '../../../../Domain/Entities/orders';
import { products } from '../../../../Domain/Entities/products';

const markAsNotRecipeCommand = async (request: MarkAsNotRecipeRequestDto) => {
  const product = await db.query.products.findFirst({
    where: eq(products.productName, request.productName)
  });
  if (product == null) {
    throw Error(
      `Error marking product as not recipe! Product ${request.productName} does not exist`
    );
  } else {
    const result = await db
      .insert(products)
      .values(product)
      .returning({ insertedId: orders.id })
      .onConflictDoUpdate({
        target: orders.id,
        set: {
          possiblyCoffee: false
        }
      });
  }
};
export { markAsNotRecipeCommand };
