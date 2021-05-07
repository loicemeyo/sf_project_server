import express, { Application, Request, Response } from "express";
// import { getUsersRouter } from "../users/users.routes";

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

    // app.use('/users', getUsersRouter());
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
