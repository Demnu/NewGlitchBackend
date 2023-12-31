import { Log, LogLevelEnum } from '../../Domain/Entities/logs';
import { db } from '../../dbConnection';
import { logs } from '../../Domain/Entities/logs';

const createLog = async (
  logLevel: LogLevelEnum,
  message: string,
  source_file: string
) => {
  const log: Log = {
    logLevel: logLevel,
    message: message,
    sourceFile: source_file,
    createdAt: new Date().toUTCString()
  };
  try {
    await db.insert(logs).values(log);
  } catch (error) {
    console.error(error);
  }
};

export { createLog };
