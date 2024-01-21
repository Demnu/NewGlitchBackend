import express, { Application, Request, Response, NextFunction } from 'express';
import { logLevelEnum } from '../Domain/Entities/logs';
import { createLog } from '../Utilities/Logs/makeLog';

// Define the threshold for a response time that is considered too high (in milliseconds)
const RESPONSE_TIME_THRESHOLD_MS = 1000; // Example: 1000ms or 1 second

const requestLoggerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ip = req.ip ? req.ip.replace(/^::ffff:/, '') : 'n/a';
  const startTime = process.hrtime();
  const body = req.body;
  const queryParams = req.query;

  // Log the start of the request with body and query params
  // await createLog(
  //   'informational',
  //   `Received a request from ${ip} to ${req.path}. Body: ${JSON.stringify(body)}, Query Params: ${JSON.stringify(queryParams)}`,
  //   __filename
  // );

  res.on('finish', async () => {
    const status = res.statusCode;
    const isSuccess = status >= 200 && status < 400 && status < 500;

    const [seconds, nanoseconds] = process.hrtime(startTime);
    const responseTimeMs = seconds * 1000 + nanoseconds / 1e6;

    // Log the response time with body and query params
    if (isSuccess) {
      await createLog(
        'informational',
        `Request from ${ip} to ${
          req.path
        } was successful. Response time: ${responseTimeMs.toFixed(
          2
        )} ms. Body: ${JSON.stringify(body)}, Query Params: ${JSON.stringify(
          queryParams
        )}`,
        __filename
      );
    }

    if (responseTimeMs > RESPONSE_TIME_THRESHOLD_MS) {
      await createLog(
        'warning',
        `Request from ${ip} to ${
          req.path
        } had a high response time: ${responseTimeMs.toFixed(
          2
        )} ms, exceeding the threshold of ${RESPONSE_TIME_THRESHOLD_MS} ms. Body: ${JSON.stringify(
          body
        )}, Query Params: ${JSON.stringify(queryParams)}`,
        __filename
      );
    }
  });

  next();
};

export { requestLoggerMiddleware };
