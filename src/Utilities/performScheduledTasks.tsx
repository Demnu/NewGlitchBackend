import { getOrdersFromOrdermentum } from '../CQRS/Ordermentum/Commands/saveOrdersFromOrdermentumCommand';
import { getProductsFromOrdermentum } from '../CQRS/Ordermentum/Commands/saveProductsFromOrdermentumCommand';
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
  createLog('informational', `Starting to read orders!`, __filename);
  try {
    await getOrdersFromOrdermentum();
    createLog(
      'informational',
      `Orders successfully retrieved from ordermentum and saved to database`,
      __filename
    );
  } catch (error) {
    createLog(
      'critical',
      `Error! Orders unsuccessfully retrieved from ordermentum and saved to database ${error}`,
      __filename
    );
  }

  createLog('informational', `done reading orders!`, __filename);
};

export { performScheduledTasks };
