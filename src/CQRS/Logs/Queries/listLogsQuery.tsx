import { db } from '../../../dbConnection';

const listLogsQuery = async () => {
  const logs = await db.query.logs.findMany({ limit: 200 });

  // Sorts in descending order by createdAt
  const orderedLogs = logs.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB.getTime() - dateA.getTime();
  });

  const formattedLogs = orderedLogs.map((log) => {
    return `Date: ${log.createdAt}, Level: ${log.logLevel}, Message: ${log.message}, Source: ${log.sourceFile}`;
  });

  return formattedLogs.join('<br><br>');
};

export { listLogsQuery };
