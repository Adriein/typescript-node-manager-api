import { SearchParameters, MySQLResponse } from "../Types";

export default interface Sync<T> {
  findOneBy(searchParams?: SearchParameters): Promise<T | undefined>;
  save(entity: T): Promise<MySQLResponse>;
  findAll(searchParams?: SearchParameters): Promise<T[]>;
}
