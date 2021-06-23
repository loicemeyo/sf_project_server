import {Request, Response, Router} from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {userService} from "./users.service";
import {getConfig} from '../config';
import {sendMail} from '../utils/mailer';

const { jwt: {secretKey, expiresIn}} = getConfig();

export function getUsersRouter(): Router {
  const userRouter =  Router();
  userRouter.post('/', async (req: Request, res: Response) => {
    try{
      const salt = bcrypt.genSaltSync(10); 
      req.body.password = await bcrypt.hash(req.body.password, salt)
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

  userRouter.post('/login', async (req: Request, res: Response) => {
    try{
      const currentUser = await userService.loginUser(req.body) 
      if(!currentUser){
        return res.status(401).json({message: 'No user with that email'})
      } 
      if(!currentUser.isVerified) {
        return res.status(403).json({
          message: 'Unauthorized Access! Unverified Account!'
        })
      } 
      if (bcrypt.compareSync(req.body.password, currentUser.password)) {
        const token = await jwt.sign(currentUser, secretKey, { expiresIn: expiresIn })
        res.status(200).json({message: 'success', role: currentUser.role, token}) 
       } else {
        res.status(401).json({message: 'Wrong password!'})
       }
    } catch (error){
      res.status(500).json({message: error.message})
    }
  })

  return userRouter;
}
