import { Request,Response } from "express";
import { pool } from "../../config.ts/db";
import { todoServices } from "./todo.services";



const createTodo=async(req:Request,res:Response)=>{
  const {user_id,title}=req.body;
  console.log(user_id,title);
  try {
    const result=await todoServices.createTodo(user_id,title)

      // console.log(result);
      res.status(201).json({
        success:true,
        message:"Todo created!",
        data:result.rows
      })

  } catch (error:any) {
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
}

const getTodo=async(req:Request,res:Response)=>{
    
  try {
    const result=await todoServices.getTodo(res)
  } catch (error:any) {
    res.status(500).json({
        success:false,
        message:error.message,
        details:error
      })
  }
}

export const todoController={
    createTodo,
    getTodo
}

