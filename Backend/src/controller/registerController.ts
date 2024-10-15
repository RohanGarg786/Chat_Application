import { Request, Response } from "express"
import { userSchemaValidation } from "../validations/userValidation";
import { prisma } from "../database/db";
import { createToken, verifyToken } from "../service/authentication";
import bcrypt from 'bcrypt'

export const registerUserController = async (req: Request, res: Response): Promise<any>=>{
   try {
    const {error} = userSchemaValidation.validate(req.body);

    if(error){
        return res.status(400).json({error:error});
    }

    const data = req.body;

    const existingUser =  await prisma.user.findUnique({
        where:{
            phone : data.phone
        }
    });

    if(existingUser){
        return res.status(409).json({
            success:false,
            message:"User already exists try another Phone number"
        })
    }

    const hashedPassword = await bcrypt.hash(data.password,10);

    const newUser = await prisma.user.create({
       data:{
        name:data.name,
        phone:data.phone,
        password:hashedPassword,
        avatar:data.avatar
       }
    })

    return res.status(200).json({
        success:true,
        data:newUser
    })
   } catch (error) {
    res.status(500).json({
        success:false,
        error:error
    })
   }

    
}

export const loginUserController = async(req:Request, res: Response): Promise<any> =>{
    try {
        
        const {error} = req.body;
        if(error){
        return res.status(400).json({error:error.details[0].message});
        }

        const data = req.body;
console.log("before------------------")
        const user = await prisma.user.findUnique({
            where:{
                phone: data.phone,
            }
        });
        console.log("AF/ter=================",user)

        if(!user){
            return res.status(400).json({
                success:false,
                message:user
            })
        }
        console.log("AF/ter++++++++++===================",user)

        const newPassword = await bcrypt.compare(data.password,user.password);
        console.log("Passwowrd=================",newPassword)

        if(!newPassword){
            return res.status(400).json({
                success:false,
                error:error
            })
        }
        console.log("AF/ter-------------------=================")

        const token = await createToken(data.phone);
        console.log(token)
        const options ={
            expires:new Date(Date.now()+90*24*60*60*1000),
            httpOnly:true,
        };

        return res.status(201).cookie("token",token,options).json({
            success:true,
            message:"User loggin successfully",
            token:token
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            error:error
        })
    }
}

export const userDetailsController = async (req:Request, res: Response):Promise<any>=>{
    const {token} = req.cookies;
    if(!token){
        return res.status(401).json({
            message:"Please login first",
        });
    }

    const phones = await verifyToken(token);

    if (phones && typeof phones === 'string') {
        const isExisting = await prisma.user.findUnique({
            where: {
                phone: phones,
            },
        });

        // Handle the found user here
        if (isExisting) {
            return res.status(200).json(isExisting);
        } else {
            return res.status(404).json({ message: "User not found" });
        }
    } else {
        return res.status(401).json({ message: "Invalid token" });
    }
}