import {Request, Response, Router} from "express";
import {userService} from "./users.service";
import {sendMail} from '../utils/mailer';

export function getUsersRouter(): Router {
  const userRouter =  Router();
  userRouter.post('/', async (req: Request, res: Response) => {
    try{
      const createdUser = await userService.registerUser(req.body)
      if(createdUser){
        sendMail(
          createdUser.email,
          "Account Verification",
          `
          <p>Hello,</p>
          <p>You have a new user account (${createdUser.email}) on the house project platform that needs verification.</p>
          <p>Kindly login to approve/reject</p>
          <br />
          <p>Thank you.</p>
          `
        )
        res.status(201).json({message: 'success', createdUser})
      }
    } catch (error){
      res.status(500).json({message: error.message})
    }
  })

  return userRouter;
}
