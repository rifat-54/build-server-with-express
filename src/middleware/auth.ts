//higher order function return kore function k
import { Request,Response,NextFunction } from "express"
import jwt from "jsonwebtoken"
import config from "../config.ts";
const auth=()=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        const token=req.headers.authorization;
        console.log("token->",token);
        if(!token){
            return res.status(500).json({
                success:false,
                message:"unauthorized access!!"
            })
        }
        const decoded=jwt.verify(token,config.jwtSecret as string)
        console.log(decoded);
        next()
    }
}

export default auth;