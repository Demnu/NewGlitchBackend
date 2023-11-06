import { Request, Response, NextFunction } from 'express';
import { listLogsQuery } from '../CQRS/Logs/Queries/listLogsQuery';

const listLogsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await listLogsQuery();
    res.send(result);
  } catch (error) {
    next(error);
  }
};
export { listLogsController };
