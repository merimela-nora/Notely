import { Request as ExpressRequest, Response, response } from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
// import cloudinary from "../utilis/Cloudinary";
// import verifyToken from "../middlewares/verifyToken";


const prisma = new PrismaClient();

//endpoint for userdetails
export const userDetails =async(req:any , res: any)=>{
  try {
    const userName= req.params.username
    console.log(userName);
    const user= await prisma.user.findUnique({
      where: {username : userName},
    }
    );
    res.status(201).json({user});
   } 
   catch(error){
    res.status(500).json({message:"user not found"});
   }
}
