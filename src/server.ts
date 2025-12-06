import express, { NextFunction, Request, Response } from "express"

import config from "./config.ts"
import initDB, { pool } from "./config.ts/db"
import logger from "./middleware/logger"
import { userRoutes } from "./modules/users/user.routes"
import { todoRoutes } from "./modules/todos/todo.routes.js"
import { authRouter } from "./modules/auth/auth.routes.js"
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



//todos crud


app.use("/todos",todoRoutes)

// auth routes
app.use("/auth",authRouter)





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
