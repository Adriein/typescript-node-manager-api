import ModelAttributes from "./ModelAttributes";
import UserLocalSync from "../../repositories/UserLocalSync";
import Model from "./Model";
import UserProps from "../interfaces/UserProps";

export default class User extends Model<UserProps> {
  static buildUser(attrs: UserProps): User {
    return new User(new ModelAttributes<UserProps>(attrs), new UserLocalSync());
  }

  public exists(): boolean {
    return this.get("email") ? true : false;
  }
}
