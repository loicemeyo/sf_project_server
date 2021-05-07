import {Request, Response, Router} from "express";
import {userService} from "./users.service";

export function getUsersRouter(): Router {
  const userRouter =  Router();
  userRouter.post('/', async (req: Request, res: Response) => {
    try{
      const createdUser = await userService.registerUser(req.body)
      res.status(201).json({message: 'success', createdUser})
    } catch (error){
      res.status(500).json({message: error.message})
    }
  })

  return userRouter;
}
