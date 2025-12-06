import express, { NextFunction, Request, Response } from "express"

import { writeLogger } from "./helper/writeLogger"
import config from "./config.ts"
import initDB, { pool } from "./config.ts/db"
import logger from "./middleware/logger"
import { userRoutes } from "./modules/users/user.routes"
const app = express()
const port = config.port;



// parser
app.use(express.json())
// app.use(express.urlencoded())  //* if send from data than need it



initDB()





app.get('/',logger, (req:Request, res:Response) => {
  res.send('Hello next level developer!')
})

app.use("/users",userRoutes)


// get a single user
app.get("/users/:id",async(req:Request,res:Response)=>{
  const id=req.params.id
  try {
    const result=await pool.query(`
      SELECT * FROM users WHERE id=$1
      `,[id])
      console.log(result);
      if(result.rows.length===0){
        res.status(404).json({
          success:false,
          message:"data not found"
        })
      }else{
        res.status(200).json({
          success:true,
          message:"data found",
          data:result.rows[0] 
        })
      }
  } catch (error) {
    res.send({message:"send feadback"})
  }
})

// delete user
app.delete("/users/:id",async(req:Request,res:Response)=>{
  const id=req.params.id;
  try {
    const result=await pool.query(`DELETE FROM users WHERE id=$1`,[id])
    console.log(result);
    if(result.rowCount===1){
      res.status(403).json({
        success:true,
        message:"user successfully delated!",
        data:null
      })
    }else{
      res.status(404).json({
        success:false,
        message:"user not found!"
      })
    }
  } catch (error:any) {
    res.status(500).json({
      success:false,
      message:error.message,
      details:error
    })
  }
})


//update user
app.put("/users/:id",async(req:Request,res:Response)=>{
  const id=req.params.id;
  const{name,email}=req.body;
  try {
    const result=await pool.query(`
      UPDATE users SET name=$1,email=$2 WHERE id=$3 RETURNING *
      `,[name,email,id])
      if(result.rows.length===0){
        res.status(404).json({
          success:false,
          message:"user not found"
        })
      }else{
        res.status(201).json({
          success:true,
          message:"User is updated!",
          updatedData:result.rows
        })
      }
  } catch (error:any) {
    res.status(500).json({
      success:false,
      message:error.message,
      details:error
    })
  }
})


//todos crud

app.post("/todos",async(req:Request,res:Response)=>{
  const {user_id,title}=req.body;
  console.log(user_id,title);
  try {
    const result=await pool.query(`
      INSERT INTO todos(user_id,title) VALUES($1, $2) RETURNING *
      `,[user_id,title])

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
})

//get todo

app.get("/todos",async(req:Request,res:Response)=>{
  try {
    const result=await pool.query(`
      SELECT * FROM todos
      `)

      res.status(200).json({
          succcess:true,
          message:"all todos data",
          data:result.rows
        })

  } catch (error:any) {
    res.status(500).json({
        success:false,
        message:error.message,
        details:error
      })
  }
})



app.use((req,res)=>{
  res.status(404).json({
    success:false,
    message:"Route not found!",
    path:req.path
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
