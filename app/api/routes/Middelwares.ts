import { NextFunction, Request, Response } from "express";

export default class Middelwares {
  constructor() {}

  requireAuth(req: Request, res: Response, next: NextFunction) {
    if (!req?.session?.userId) {
      return res.send("Forbidden");
    }

    next();
  }
}
