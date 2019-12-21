import { check, ValidationChain } from "express-validator";
import crypto from "crypto";
import util from "util";
import User from "../domain/models/User";

export default class Validation {
  private model: User;
  private scrypt = util.promisify(crypto.scrypt);

  constructor() {
    this.model = new User({});
  }

  get requireEmail(): ValidationChain {
    return check("email")
      .trim()
      .normalizeEmail()
      .isEmail()
      .withMessage("Must be valid email")
      .custom(async email => {
        const existingUser = await this.model.findOneBy({
          email
        });
        if (existingUser) {
          throw new Error("Email in use");
        }
      });
  }

  get requirePassword(): ValidationChain {
    return check("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters");
  }

  get requireEmailExists(): ValidationChain {
    return check("email")
      .trim()
      .normalizeEmail()
      .isEmail()
      .withMessage("Must provide a valid email")
      .custom(async email => {
        const existingUser = await this.model.findOneBy({
          email
        });

        if (!existingUser) {
          throw new Error("Email not found");
        }
      });
  }

  get requireValidPassword(): ValidationChain {
    return check("password")
      .trim()
      .custom(async (password, { req }) => {
        const { email }  = req.body;
        const user = await this.model.findOneBy({
          email
        });

        if(!await this.comparePassword(password, user?.get('encryptedPassword')!)){
            throw new Error('Invalid password');
        }

      });
  }

  async comparePassword(
    givenPassword: string,
    storedPassword: string
  ): Promise<boolean> {
    const [hashed, salt] = storedPassword.split(".");
   
    const hashedGiven: any = await this.scrypt(givenPassword, salt, 64);
    return hashedGiven.toString("hex") == hashed;
  }
  async encryptPassword(password: string): Promise<string> {
    const saltedPassword: string = crypto.randomBytes(8).toString("hex");
    const buffer: any = await this.scrypt(password, saltedPassword, 64);

    return `${buffer.toString("hex")}.${saltedPassword}`;
  }

  
}
