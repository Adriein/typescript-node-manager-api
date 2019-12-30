import Database from "../database/Database";
import { SearchParameters } from "../domain/Types";

export default abstract class LocalSync<T> {
  public db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  public async findOne(searchParams: SearchParameters): Promise<T> {
    try {
      const tableName: string = searchParams.table;
      delete searchParams[tableName];
      const fieldName = Object.keys(searchParams)[1];

      const [props] = await this.db.query(
        `SELECT * FROM ${tableName} WHERE ${fieldName}='${searchParams[fieldName]}'`
      );

      if (!props) {
        throw new Error(`Register not found in ${tableName}`);
      }

      return props;
    } catch (error) {
      throw error;
    }
  }

  public async find(searchParams: SearchParameters): Promise<T[]> {
    try {
      const tableName: string = searchParams.table;
      delete searchParams.table;
      const fieldNames: string[] = Object.keys(searchParams);

      let whereStatement: string[] = [];

      for (const field of fieldNames) {
        whereStatement = [
          ...whereStatement,
          `${field}='${searchParams[field]}'`
        ];
      }

      const props = await this.db.query(
        `SELECT * FROM ${tableName} WHERE ${whereStatement.join("AND ")}`
      );

      if (!props) {
        throw new Error(`Register not found in ${tableName}`);
      }

      return props;
    } catch (error) {
      throw error;
    }
  }

  // public abstract getAllEntities<T>(): T[];

  // public abstract updateEntity<T>(entity: T): T;

  public abstract async save(props: T): Promise<number>;

  // public abstract deleteEntity<T>(id: number): T;

  public abstract async findAll(): Promise<T[]>;
}
