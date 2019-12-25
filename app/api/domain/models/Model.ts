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

  async findOneBy(searchParams: SearchParameters): Promise<void> {
    
    const response: T = await this.sync.findOneBy(searchParams);
    console.log(response);
    
    this.attributes.set(response);
  }

  findAll(): Promise<T[]> {
    return this.sync.findAll();
  }

  save() {
    return this.sync.save(this.attributes.getAll());
  }
}
