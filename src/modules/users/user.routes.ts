import express, { Request, Response } from "express"
import { pool } from "../../config.ts/db";
import { userController } from "./user.controller";
import logger from "../../middleware/logger";
import auth from "../../middleware/auth";

const router=express.Router()

//app.post("/users/")
router.post("/",userController.createUser)

//app.get("/users/")
router.get("/",logger,auth("Admin"),userController.getUser)

//app.get("/users/:id")
router.get("/:id",userController.getSingleUser)

//app.put("/users/:id")
router.put("/:id",userController.updateUser)

//app.delete("/users/:id");
router.delete("/:id",userController.deleteUser)

export const userRoutes=router;