//higher order function return kore function k
import { Request,Response,NextFunction } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../config.ts";
import { error } from "console";
const auth=(...role:string[])=>{
    
    return async (req:Request,res:Response,next:NextFunction)=>{
       try {
         const token=req.headers.authorization;
        console.log("token->",token);
        if(!token){
            return res.status(500).json({
                success:false,
                message:"unauthorized access!!"
            })
        }
        const decoded=jwt.verify(token,config.jwtSecret as string)  as JwtPayload
        console.log(decoded);
        req.user=decoded;
        if(role.length && !role.includes(decoded.role)){
            return res.status(500).json({
                error:"unauthorized!!"
            })
        }
        next()
       } catch (error:any) {
        res.status(500).json({
            success:false,
            message:error.message
        })
       }
    }
}

export default auth;