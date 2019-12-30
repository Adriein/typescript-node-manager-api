import { Router, Request, Response } from "express";
import User from "../../domain/models/User";
import Middelwares from "../Middelwares";
import Monitoring from "../../domain/models/Monitoring";

export default class UserRoutes {
  public router: Router;
  private user: User;
  private monitoring: Monitoring;
  private middelware = new Middelwares();

  constructor(router: Router) {
    this.router = router;
    this.user = User.buildUser({});
    this.monitoring = Monitoring.buildMonitoring({});
    this.adminDashboard();
  }

  private adminDashboard() {
    this.router.get(
      "/admin/dashboard/users_overview",
      this.middelware.requireAuth,
      async (req: Request, res: Response) => {
        res.send(
          await this.monitoring.getPendingMonitoringsByUser(
            await this.user.findAll()
          )
        );
      }
    );
  }
}
