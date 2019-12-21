import ModelAttributes from "./ModelAttributes";
import UserLocalSync from "../../repositories/UserLocalSync";
import Sync from "../interfaces/Sync";
import Attributes from "../interfaces/Attributes";
import UserProps from "../interfaces/UserProps";
import { SearchParameters } from "../Types";

export default class User {

  private attributes: Attributes<UserProps>;
  private sync: Sync<User>;

  constructor(attrs: UserProps) {
    this.attributes = new ModelAttributes<UserProps>(attrs);
    this.sync = new UserLocalSync();
  }

  get get(){
    return this.attributes.get;
  }

  set(data: UserProps) {
    this.attributes.set(data);
  }

  findOneBy(searchParams: SearchParameters) {
    return this.sync.findOneBy(searchParams);
  }

  findAll() {
    return this.sync.findAll;
  }

  save(user: User) {
    return this.sync.save(user);
  }

}
