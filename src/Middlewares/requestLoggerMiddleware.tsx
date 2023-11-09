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
  // Extract the IP from the request and remove the IPv4-mapped IPv6 prefix if present
  const ip = req.ip.replace(/^::ffff:/, '');
  const startTime = process.hrtime();

  // Log the start of the request
  await createLog(
    'informational',
    `Received a request from ${ip} to ${req.path}`,
    __filename
  );

  // Wait until the response has finished
  res.on('finish', async () => {
    // Determine if the response was successful based on the status code
    const status = res.statusCode;
    const success =
      status >= 200 && status < 400 ? 'successful' : 'unsuccessful';

    const [seconds, nanoseconds] = process.hrtime(startTime);
    const responseTimeMs = seconds * 1000 + nanoseconds / 1e6;

    // Log the response time
    await createLog(
      success ? 'informational' : 'error',
      `Request from ${ip} to ${
        req.path
      } was ${success}. Response time: ${responseTimeMs.toFixed(2)} ms`,
      __filename
    );

    // Check if the response time exceeds the threshold and log a warning if it does
    if (responseTimeMs > RESPONSE_TIME_THRESHOLD_MS) {
      await createLog(
        'warning',
        `Request from ${ip} to ${
          req.path
        } had a high response time: ${responseTimeMs.toFixed(
          2
        )} ms exceeding the threshold of ${RESPONSE_TIME_THRESHOLD_MS} ms`,
        __filename
      );
    }
  });

  next();
};

export { requestLoggerMiddleware };
