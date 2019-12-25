import Database from "../database/Database";
import { SearchParameters } from "../domain/Types";

export default abstract class LocalSync<T> {
  public db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  public abstract async findOneBy(searchParams?: SearchParameters): Promise<T>;

  // public abstract getAllEntities<T>(): T[];

  // public abstract updateEntity<T>(entity: T): T;

  public abstract async save(props: T): Promise<number>;

  // public abstract deleteEntity<T>(id: number): T;

  public abstract async findAll(): Promise<T[]>;
}