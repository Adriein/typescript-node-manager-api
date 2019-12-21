import mysql, { Connection } from "mysql";
import util from "util";

export default class Database {
  private static instance: Database;
  private connection: Connection;

  private constructor() {
    this.connection = this.setUpDataBase();
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }

  private setUpDataBase(): Connection {
    return mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "movie_db"
    });
  }

  public query(sqlStatement: string): Promise<any> {
    return util
      .promisify(this.connection.query)
      .call(this.connection, sqlStatement);
  }
}
