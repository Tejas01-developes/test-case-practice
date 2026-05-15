import { NextFunction, Response } from 'express';
import jwt, {  JwtPayload } from 'jsonwebtoken';

export const accessfilter=(req:JwtPayload,resp:Response,next:NextFunction)=>{
    const token=req.header.authorization
    const access=token?.split(" ")[1];

    if(!access){
        return resp.status(400).json({message:"access token is not there"})
    }
    const decode=jwt.verify(access,process.env.ACCESS_SECRET as string) as JwtPayload

    decode.id=req.id
    next()

}
