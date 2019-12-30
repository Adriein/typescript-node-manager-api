export type SearchParameters = { table: string; [key: string]: string };

export type MySQLResponse = {
  fieldCount: number;
  affectedRows: number;
  insertId: number;
  serverStatus: number;
  warningCount: number;
  message: string;
  changedRows: number;
};
