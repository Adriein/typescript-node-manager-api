import LocalSync from "./LocalSync";
import User from "../domain/models/User";
import UserProps from "../domain/interfaces/UserProps";
import { SearchParameters, MySQLResponse } from "../domain/Types";

export default class UserLocalSync extends LocalSync<UserProps> {
  constructor() {
    super();
  }

  public async save(userProps: UserProps): Promise<number> {
    try {
      const response: MySQLResponse = await this.db.query(
        `INSERT INTO user_profile (email, password, user_status) VALUES ('${userProps.email}', '${userProps.password}', '${userProps.user_status}')`
      );

      return response.insertId;
    } catch (error) {
      throw new Error(`Error creating the user. ${error}`);
    }
  }

  public async findAll(): Promise<UserProps[]> {
    try {
      const userProps: UserProps[] = await this.db.query(
        `SELECT * FROM user_profile`
      );

      return userProps;
    } catch (error) {
      throw error;
    }
  }
}
