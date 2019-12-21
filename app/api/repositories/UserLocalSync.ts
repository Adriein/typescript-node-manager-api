import LocalSync from "./LocalSync";
import User from "../domain/models/User";
import UserProps from "../domain/interfaces/UserProps";
import { SearchParameters, MySQLResponse } from "../domain/Types";

export default class UserLocalSync extends LocalSync<User> {
  constructor() {
    super();
  }

  public async findOneBy(searchParams: SearchParameters): Promise<User | undefined> {
    try {
      const fieldName = Object.keys(searchParams)[0];
      const [user] = await this.db.query(
        `SELECT * FROM user_profile WHERE ${fieldName}='${searchParams[fieldName]}'`
      );

      if (!user) {
        return undefined;
      }

      const { id, email, password, user_status } = user;
      const encryptedPassword = password;
      return new User({ id, email, encryptedPassword, user_status });
    } catch (error) {
      throw error;
    }
  }

  public async save(user: User): Promise<MySQLResponse> {
    try {
      return await this.db.query(
        `INSERT INTO user_profile (email, password, user_status) VALUES ('${user.get(
          "email"
        )}', '${user.get("encryptedPassword")}', '${user.get("user_status")}')`
      );
    } catch (error) {
      throw new Error(`Error creating the user. ${error}`);
    }
  }

  public async findAll(): Promise<User[]> {
    try {
      const users: UserProps[] = await this.db.query(
        `SELECT * FROM user_profile`
      );

      return users.map(
        (user: UserProps): User => {
          const { email, encryptedPassword, user_status } = user;
          return new User({ email, encryptedPassword, user_status });
        }
      );
    } catch (error) {
      throw error;
    }
  }
}
