import { SearchParameters } from "../Types";

export default interface Sync<T> {
  findOneBy(searchParams?: SearchParameters): Promise<T>;
  save(entity: T): Promise<number>;
  findAll(): Promise<T[]>;
}
