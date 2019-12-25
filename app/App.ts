import express from "express";
import cookieSession from "cookie-session";
import { Router } from "express";
import bodyParser from "body-parser";
import AuthRoutes from "./api/routes/auth/AuthRoutes";
import AdminRoutes from "./api/routes/admin/AdminRoutes";


export default class App {
  private app: express.Application;
  private router: Router;

  constructor() {
    this.app = express();
    this.router = express.Router();
  }

  public init(): void {
    this.setUpEnvironment();
    this.setUpMiddelwares();
    this.setUpRoutes();
    this.startServer();
  }

  private setUpEnvironment(): void {
    this.app.set("port", process.env.PORT || 3000);

    console.log(`App Environment: PORT: ${this.app.get("port")} CONFIG: DEV `);
  }

  private setUpMiddelwares(): void {
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cookieSession({keys: ['fjrufjhruf']}));
  }

  private setUpRoutes() {
    const authRoutes = new AuthRoutes(this.router);
    const adminRoutes = new AdminRoutes(this.router);

    this.app.use(authRoutes.router);
  }

  private startServer() {
    this.app.listen(this.app.get("port"), () => {
      console.log(`Server running...`);
    });
  }
}
