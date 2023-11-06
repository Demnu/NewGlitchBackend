import { createLog } from '../Utilities/Logs/makeLog';
import { OrderExtended } from '../Utilities/Ordermentum/formatOrdersFromOrdermentum';
import { OrderMongo } from './MongoModels/ordersMongoSchema';
import { ProductMongo } from './MongoModels/productMongoSchema';
import { mongoDb } from './mongoConnection';
import 'dotenv/config';

interface OrderProductsMongoType {
  name: string;
  amount: number;
}

interface OrderMongoType {
  orderID: string;
  date: Date;
  products: OrderProductsMongoType[];
  customerID: string;
  customerName: string;
  supplierName: string;
}

const removeHtmlProducts = async () => {
  const db = await mongoDb(process.env.MONGO_URI || '');

  // Async/Await approach
  try {
    const invalidProducts = await ProductMongo.find({
      id: { $regex: '<style|style="border-bottom', $options: 'i' }
    }).lean();

    invalidProducts.forEach((p) => removeProductFromMongo(p.id));
  } catch (error) {
    console.error(error);
  }
};

const removeProductFromMongo = async (idToBeRemoved: string) => {
  try {
    await ProductMongo.deleteOne({ id: idToBeRemoved });
    console.log(`Product: ${idToBeRemoved} removed`);
  } catch (error) {}
};

const addOrderToMongo = async (order: OrderMongoType) => {
  try {
    await OrderMongo.create(order);
    createLog(
      'informational',
      `Order: ${order.orderID}, ${order.customerName}, ${new Date(
        order.date
      ).toLocaleDateString()} saved to mongoDB!`,
      __filename
    );
  } catch (error: any) {
    // console.log(
    //   `Error! Order: ${order.customerName}, ${new Date(
    //     order.date
    //   ).toLocaleDateString()} not saved to mongoDB!`,
    //   error
    // );
  }
};

const addProductToMongo = async (product: string) => {
  try {
    await ProductMongo.create({ id: product });
    createLog(
      'informational',
      `Product: ${product} saved to mongoDB`,
      __filename
    );
  } catch (error) {
    // console.log(`Error! Product: ${product} not saved to mongoDB`, error);
  }
};

export { removeHtmlProducts };
