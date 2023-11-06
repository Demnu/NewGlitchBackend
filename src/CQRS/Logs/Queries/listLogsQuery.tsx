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

  let formattedLogs = '<div style="font-family: monospace;">';

  logsList.forEach((log) => {
    const logColor = getLogLevelColor(log.logLevel);

    // Format the date in a more readable way
    const date = new Date(log.createdAt);
    const formattedDate = date.toLocaleString('en-AU', {
      timeZone: 'Australia/Sydney'
    });

    formattedLogs += `
      <div style="margin-bottom: 10px;">
        <div><strong>Date:</strong> ${formattedDate}</div>
        <div><strong>Level:</strong> <span style="color: ${logColor};">${log.logLevel.toUpperCase()}</span></div>
        <div><strong>Message:</strong> ${log.message}</div>
        <div><strong>Source:</strong> ${log.sourceFile}</div>
      </div>`;
  });

  formattedLogs += '</div>';

  return formattedLogs;
};

export { listLogsQuery };
