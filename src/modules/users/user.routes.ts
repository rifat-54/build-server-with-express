import express, { Request, Response } from "express"
import { pool } from "../../config.ts/db";
import { userController } from "./user.controller";

const router=express.Router()

router.post("/",userController.createUser)

router.get("/",async(req:Request,res:Response)=>{
  

    try {
      const result=await pool.query(`
    SELECT * FROM users
    `)
        res.status(200).json({
          succcess:true,
          message:"alll users data",
          data:result.rows
        })

    } catch (error:any) {
      res.status(500).json({
        success:false,
        message:error.message,
        details:error
      })
    }
    // console.log("get user ");
})

export const userRoutes=router;