import { getOrdersFromOrdermentum } from '../CQRS/Ordermentum/Commands/saveOrdersFromOrdermentumCommand';
import { getProductsFromOrdermentum } from '../CQRS/Ordermentum/Commands/saveProductsFromOrdermentumCommand';
import { removeHtmlProducts } from '../Legacy/removeHtmlProducts';
import { createLog } from './Logs/makeLog';

const performScheduledTasks = async () => {
  //   try {
  //     await getProductsFromOrdermentum();
  //     createLog(
  //       'informational',
  //       `Products successfully retrieved from ordermentum and saved to database`,
  //       __filename
  //     );
  //   } catch (error) {
  //     createLog(
  //       'error',
  //       `Error! Products unsuccessfully retrieved from ordermentum and saved to database`,
  //       __filename
  //     );
  //   }
  // await removeHtmlProducts();

  try {
    getOrdersFromOrdermentum();
  } catch (error) {
    createLog(
      'error',
      `Error! Orders unsuccessfully retrieved from ordermentum and saved to database`,
      __filename
    );
  }
};

export { performScheduledTasks };
