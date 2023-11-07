import { db } from '../../../dbConnection';
const listBeansQuery = async () => {
  const beans = await db.query.beans.findMany({});
  return beans;
};

export { listBeansQuery };
