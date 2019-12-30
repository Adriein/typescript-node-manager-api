import { SearchParameters } from "../Types";

export default interface Sync<T> {
  findOne(searchParams: SearchParameters): Promise<T>;
  find(searchParams: SearchParameters): Promise<T[]>;
  save(entity: T): Promise<number>;
  findAll(): Promise<T[]>;
}
