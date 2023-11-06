import { desc } from 'drizzle-orm';
import { db } from '../../../dbConnection';
import { logs } from '../../../Domain/Entities/logs';

// Function to map log levels to colors
const getLogLevelColor = (level) => {
  switch (level) {
    case 'emergency':
      return 'red';
    case 'alert':
      return 'orange';
    case 'critical':
      return 'orangered';
    case 'error':
      return 'tomato';
    case 'warning':
      return 'yellow';
    case 'notice':
      return 'lightblue';
    case 'informational':
      return 'blue';
    case 'debug':
      return 'grey';
    default:
      return 'black'; // Default color
  }
};

const listLogsQuery = async () => {
  const logsList = await db.query.logs.findMany({
    limit: 400,
    orderBy: [desc(logs.id)]
  });

  const formattedLogs = logsList.map((log) => {
    const logColor = getLogLevelColor(log.logLevel);
    return (
      `Date: ${log.createdAt}<br>` +
      `Level: <span style="color: ${logColor};">${log.logLevel}</span><br>` +
      `Message: ${log.message}<br>` +
      `Source: ${log.sourceFile}<br>`
    );
  });

  return formattedLogs.join('<br><br>');
};

export { listLogsQuery };
