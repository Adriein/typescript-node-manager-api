import { Router, Request, Response } from "express";
import User from "../../domain/models/User";
import { MySQLResponse } from "../../domain/Types";
import Validation from "../Validation";
import { validationResult } from "express-validator";

export default class AuthRoutes {
  public router: Router;
  private validator: Validation;
  private model: User

  constructor(router: Router) {
    this.router = router;
    this.validator = new Validation();
    this.model = new User({});
    this.loginRoute();
    this.logoutRoute();
    this.signupRoute();
  }

  private loginRoute() {
    this.router.get(
      "/login",
      [this.validator.requireEmailExists, this.validator.requireValidPassword],
      async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.send(errors);
        }

        const { email } = req.body;

        const user = await this.model.findOneBy({ email });

        req.session!.userId = user?.get('id');

        return res.send(`You are logged in with id: ${req.session?.userId}`);
      }
    );
  }

  private logoutRoute() {
    this.router.get("/logout", (req: Request, res: Response) => {
      req.session = undefined;
      res.send("Logged out");
    });
  }

  private signupRoute() {
    this.router.post(
      "/signup",
      [this.validator.requireEmail, this.validator.requirePassword],
      async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.send(errors);
        }

        const { email, password } = req.body;
        const encryptedPassword = await this.validator.encryptPassword(password);

        const user: User = new User({
          email,
          encryptedPassword,
          user_status: 1
        });

        const response: MySQLResponse = await this.model.save(user);

        req.session!.userId = response.insertId;

        return res.send("The user created correctly");
      }
    );
  }

  
}
