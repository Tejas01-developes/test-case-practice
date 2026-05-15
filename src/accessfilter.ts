import { NextFunction, Request, Response } from 'express';
import jwt, {  JwtPayload } from 'jsonwebtoken';

export interface customreq extends Request{
id:string | number
}

export const accessfilter=(req:customreq,resp:Response,next:NextFunction)=>{
    const token=req.headers.authorization
    const access=token?.split(" ")[1];

    if(!access){
        return resp.status(400).json({message:"access token is not there"})
    }
    try{
    const decode=jwt.verify(access,process.env.ACCESS_SECRET as string) as JwtPayload

   req.id=decode.id
    next()
    }catch(err){
        return resp.status(400).json({message:"access filter failed"})
    }

}
