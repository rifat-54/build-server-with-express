import { pool } from "../../config.ts/db"
import { Response } from "express";
const createTodo=async(user_id:string,title:string)=>{
     const result=await pool.query(`
          INSERT INTO todos(user_id,title) VALUES($1, $2) RETURNING *
          `,[user_id,title])

return result;

}

const getTodo=async(res:Response)=>{
    const result=await pool.query(`
      SELECT * FROM todos
      `)

      res.status(200).json({
          succcess:true,
          message:"all todos data",
          data:result.rows
        })

}


export const todoServices={
    createTodo,
    getTodo
}