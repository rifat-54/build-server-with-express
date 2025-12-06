import  { Request, Response } from "express";
import { pool } from "../../config.ts/db";
import { userServices } from "./user.services";

const createUser = async (req: Request, res: Response) => {
  // console.log(req.body);
 

  try {
    const result =await userServices.createUser(req.body)

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

const getUser=async(req:Request,res:Response)=>{
  
    try {
      const result=await userServices.getUser()
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
}

const getSingleUser=async(req:Request,res:Response)=>{
  const id=req.params.id
  try {
    // const result=userServices.getSingleUser(id as string)
    const result=await userServices.getSingleUser(id!)


    //   console.log(result);
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
}

const updateUser=async(req:Request,res:Response)=>{
  const id=req.params.id;
  const{name,email}=req.body;
  try {
    const result= await userServices.updateUser(name,email,id!)

      
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
}

const deleteUser=async(req:Request,res:Response)=>{
  const id=req.params.id;
  try {
    const result=await userServices.deleteUser(id!)
    // console.log(result);
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
}

export const userController={
    createUser,
    getUser,
    getSingleUser,
    updateUser,
    deleteUser
}
