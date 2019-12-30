import LocalSync from "./LocalSync";
import MonitoringProps from "../domain/interfaces/MonitoringProps";
import { SearchParameters, MySQLResponse } from "../domain/Types";

export default class MonitoringLocalSync extends LocalSync<MonitoringProps> {
  constructor() {
    super();
  }

  public async save(userProps: MonitoringProps): Promise<number> {
    try {
      const response: MySQLResponse = await this.db.query(
        `INSERT INTO user_profile (email, password, user_status) VALUES ('${userProps.email}', '${userProps.password}', '${userProps.user_status}')`
      );

      return response.insertId;
    } catch (error) {
      throw new Error(`Error creating the user. ${error}`);
    }
  }

  public async findAll(): Promise<MonitoringProps[]> {
    try {
      const userProps: MonitoringProps[] = await this.db.query(
        `SELECT * FROM monitoring`
      );

      return userProps;
    } catch (error) {
      throw error;
    }
  }
}
