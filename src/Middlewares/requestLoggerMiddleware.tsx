import express, { Application, Request, Response, NextFunction } from 'express';
import { logLevelEnum } from '../Domain/Entities/logs';
import { createLog } from '../Utilities/Logs/makeLog';

const requestLoggerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Extract the IP from the request
  const ip = req.ip;
  // Log the start of the request
  await createLog(
    'informational',
    `Received a request from ${ip} to ${req.path}`,
    'requestLoggerMiddleware'
  );

  // Wait until the response has finished
  res.on('finish', async () => {
    // Determine if the response was successful based on the status code
    const status = res.statusCode;
    const success =
      status >= 200 && status < 400 ? 'successful' : 'unsuccessful';

    // Log the result of the request
    await createLog(
      success ? 'informational' : 'error',
      `Request from ${ip} to ${req.path} was ${success}`,
      __filename
    );
  });

  next();
};

export { requestLoggerMiddleware };
