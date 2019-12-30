import Sync from "../interfaces/Sync";
import Attributes from "../interfaces/Attributes";
import { SearchParameters } from "../Types";

export default class Model<T> {
  constructor(private attributes: Attributes<T>, private sync: Sync<T>) {}

  get get() {
    return this.attributes.get;
  }

  set(data: T) {
    this.attributes.set(data);
  }

  async findOne(searchParams: SearchParameters): Promise<void> {
    const response: T = await this.sync.findOne(searchParams);

    this.attributes.set(response);
  }

  async find(searchParams: SearchParameters): Promise<T[]> {
    return await this.sync.find(searchParams);
  }

  findAll(): Promise<T[]> {
    return this.sync.findAll();
  }

  save() {
    return this.sync.save(this.attributes.getAll());
  }
}
