import e, { Request, Response } from "express";
import { pool } from "../../config.ts/db";
import { userServices } from "./user.services";

const createUser = async (req: Request, res: Response) => {
  // console.log(req.body);
  const { name, email } = req.body;

  try {
    const result =await userServices.createUser(name,email)

    res.status(201).json({
      success: true,
      message: "data inserted successfully!",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "data not inserted!",
    });
  }
};

export const userController={
    createUser
}
