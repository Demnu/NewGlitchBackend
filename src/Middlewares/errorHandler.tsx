import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';
import { createLog } from '../Utilities/Logs/makeLog';

const errorHandler = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ip = req.ip ? req.ip.replace(/^::ffff:/, '') : 'n/a';
  const path = req.path;
  const body = req.body;
  const queryParams = req.query;

  if (error instanceof ZodError) {
    const validationError = fromZodError(error).message;

    // Log validation error with body and query params
    await createLog(
      'error',
      `Validation error from ${ip} to ${path}: ${validationError}. Body: ${JSON.stringify(
        body
      )}, Query Params: ${JSON.stringify(queryParams)}`,
      __filename
    );

    res.status(400).json({
      message: 'Validation error',
      errors: validationError
    });
  } else {
    // Log generic server error with body and query params
    await createLog(
      'error',
      `Internal server error from ${ip} to ${path}: ${
        error.message
      }. Body: ${JSON.stringify(body)}, Query Params: ${JSON.stringify(
        queryParams
      )}`,
      __filename
    );

    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message
    });
  }
};

export { errorHandler };
