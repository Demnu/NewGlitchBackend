import { createLog } from '../Utilities/Logs/makeLog';
import { OrderExtended } from '../Utilities/Ordermentum/formatOrdersFromOrdermentum';
import { OrderMongo } from './MongoModels/ordersMongoSchema';
import { ProductMongo } from './MongoModels/productMongoSchema';
import { mongoDb } from './mongoConnection';
import 'dotenv/config';

interface OrderProductsMongoType {
  id: string;
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

const saveOrdersAndProductsToMongo = async (orders: OrderExtended[]) => {
  const db = await mongoDb(process.env.MONGO_URI || '');
  const orderIds = orders.map((o) => o.id);
  const ordersMongo = await OrderMongo.find({ _id: { $in: orderIds } }).lean();
  const filteredOrders = orders.filter(
    (o) => !ordersMongo.some((om) => om.orderID === o.id)
  );

  // add orders
  filteredOrders.forEach((order) => {
    const orderProducts: OrderProductsMongoType[] = order.orderProducts.map(
      (op) => {
        const product = order.products.find((p) => p.id === op.productId);
        return {
          amount: op.amountOrdered,
          id: product?.productName || 'ERROR'
        };
      }
    );
    const mongoOrder: OrderMongoType = {
      orderID: order.invoiceNumber ?? order.id,
      date: new Date(order.createdAt),
      products: orderProducts,
      customerID: '',
      customerName: order.customerName,
      supplierName: order.supplierName
    };

    // add products
    addOrderToMongo(mongoOrder);
    order.products.forEach((p) => {
      addProductToMongo(p.productName);
    });
  });
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
    console.log(
      `Error! Order: ${order.customerName}, ${new Date(
        order.date
      ).toLocaleDateString()} not saved to mongoDB!`,
      error
    );
  }
};

const addProductToMongo = async (product: string) => {
  if (product.includes('Straight Up Blend 1kg Wholesale (sgl)')) {
    const t = 0;
  }
  try {
    await ProductMongo.create({ id: product });
    createLog(
      'informational',
      `Product: ${product} saved to mongoDB`,
      __filename
    );
  } catch (error) {
    console.log(`Error! Product: ${product} not saved to mongoDB`, error);
  }
};

export { saveOrdersAndProductsToMongo };
