//? middle were

import { NextFunction, Request, Response } from "express";
import { writeLogger } from "../helper/writeLogger";

const logger=(req:Request,res:Response,next:NextFunction)=>{
  const text=`[${new Date().toISOString()}] ${req.method} ${req.path}\n`;
//   console.log(text);
  writeLogger(text)
  next()
}

export default logger;

