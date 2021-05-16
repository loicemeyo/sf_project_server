import {Request, Response, Router} from "express";
import jwt from "jsonwebtoken"
import {userService} from "./users.service";
import {getConfig} from '../config';

const { jwt: {secretKey, expiresIn}} = getConfig();

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

  userRouter.post('/login', async (req: Request, res: Response) => {
    try{
      const currentUser = await userService.loginUser(req.body) 
      if(!currentUser){
        return res.status(401).json({message: 'No user with that email'})
      } 
      if(!currentUser.isVerified) {
        res.status(403).json({message: 'Unauthorized Access! Unverified Account'})
      } else if( 
        currentUser.isVerified 
        && (req.body.password !== currentUser.password)) {
          res.status(401).json({message: 'Wrong password!'})
      } else {
        const token = await jwt.sign(currentUser, secretKey, { expiresIn: expiresIn })
        res.status(200).json({message: 'success', role: currentUser.role, token})
      }
    } catch (error){
      res.status(500).json({message: error.message})
    }
  })

  return userRouter;
}
