import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import {getConfig} from '../config';

export interface IsUserLoggedIn {
  isLogged: boolean,
  user: { 
    role: string, 
    email: string 
  } | null
}

const { jwt: {secretKey}} = getConfig();

export const verifyToken = (req: Request): IsUserLoggedIn => {
  const { authorization = '' } = req.headers
  const token = authorization.slice(7)

  if (!token) {
    return {
      isLogged: false,
      user: null
    }
  }

  try {
    const currentUser = jwt.verify(token, secretKey) as { role: string, email: string }
    return {
      isLogged: true,
      user: currentUser
    }
  } catch (err) {
    return {
      isLogged: false,
      user: null
    }
  }
}

export const checkUserIsAdmin = (req:Request, res:Response, next: NextFunction) => {
  const currentUser = verifyToken(req)

  if(!currentUser){
    return res.status(403).json({message: 'Unauthorized Access! Invaild token!'})
  } 
  if(currentUser.isLogged && (currentUser.user?.role) === 'admin'){
    req.currentUser = currentUser.user
    next()
  } else {
    res.status(403).json({message: 'Unauthorized Access! Admin only!'})
  }
}

export const checkUserAuthenticated = (req: Request, res:Response, next: NextFunction) => {
  const currentUser = verifyToken(req)

  if(currentUser.isLogged){
    req.currentUser = currentUser.user
    next()
  } else {
    res.status(403).json({message: 'Unauthorized Access! Invaild token!'})
  }
}
