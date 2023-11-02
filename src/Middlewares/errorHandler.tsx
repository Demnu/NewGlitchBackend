// errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';

const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ZodError) {
    const validationError = fromZodError(error).message;
    res.status(400).json({
      message: 'Validation error',
      errors: validationError
    });
  } else {
    // Handle generic server errors
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message
    });
  }
};

export { errorHandler };
