import express, { Application, Request, Response } from "express";
import { getUsersRouter } from "../users/users.routes";
import { getBookingsRouter } from "../bookings/bookings.routes";
import { checkUserAuthenticated } from "../users/helpers";

declare global{
  namespace Express {
    interface Request {
        currentUser: { role: string, email: string } | null
    }
  }
}

export class App {
  private expressApp: Application;

  constructor() {
    this.expressApp = this.createApplication();
  }

  private createApplication(): Application {
    const app = express();
    app.use(express.json());
    app.get("/", (req: Request, res: Response) => {
      console.log(req.method);
      res.status(200).send("okay, welcome");
    });

    app.use('/users', getUsersRouter());
    app.use('/bookings', checkUserAuthenticated, getBookingsRouter())
    return app;
  }

  public start(port: number): void {
    //validate port
    //makes sure some other stuff are okay
    this.expressApp.listen(port, () => {
      console.log(`the application server is listening on port: ${port}`);
    });
  }
}
