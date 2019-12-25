import { Router, Request, Response } from "express";
import User from "../../domain/models/User";
import Middelwares from "../Middelwares";



export default class AdminRoutes {
  public router: Router;
  private user: User
  private middelware = new Middelwares();

  constructor(router: Router) {
    this.router = router;
    this.user = User.buildUser({});
    this.adminDashboard();
  }

  private adminDashboard() {
    this.router.get(
      "/admin/dashboard",
      this.middelware.requireAuth,
      async (req: Request, res: Response) => {  

        return res.send(await this.user.findAll());
      }
    );
  }
}
