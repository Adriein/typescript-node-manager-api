import Model from "./Model";
import MonitoringProps from "../interfaces/MonitoringProps";
import MonitoringLocalSync from "../../repositories/MonitoringLocalSync";
import ModelAttributes from "./ModelAttributes";
import UserProps from "../interfaces/UserProps";
import ActiveUserOverview from "../interfaces/ActiveUserOverview";

export default class Monitoring extends Model<MonitoringProps> {
  static buildMonitoring(attrs: MonitoringProps): Monitoring {
    return new Monitoring(
      new ModelAttributes<MonitoringProps>(attrs),
      new MonitoringLocalSync()
    );
  }

  async getPendingMonitoringsByUser(
    users: UserProps[]
  ): Promise<ActiveUserOverview[]> {
    const result: ActiveUserOverview[] = [];

    for (const user of users) {
      const pendingMonitorings = await this.find({
        table: "monitoring",
        user_id: user.id?.toString()!,
        pending: "1"
      });

      result.push({ name: user.email!, pending: pendingMonitorings.length });
    }

    return result;
  }
}
