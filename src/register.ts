import { RequestHandler } from "express";
import collection from "./schema.js";
import bcrypt from 'bcrypt'
export const registeruser:RequestHandler=async(req,resp)=>{
const{name,email,password}=req.body as {
    name:string,
    email:string,
    password:string
}
if(!name || !email || !password){
    return resp.status(400).json({message:"body not recived"})
}
try{
    const hash=await bcrypt.hash(password,10);
    await collection.create({name,email,password:hash})
    return resp.status(200).json({message:"success"})
}catch(err){
    return resp.status(400).json({message:"fail"})
}
}


export const loginuser:RequestHandler=async(req,res)=>{
const {email,password}=req.body as {
    email:string,
    password:string
}
if(!email || !password){
    return res.status(400).json({message:"body is not there"})
}
try{
const result=await collection.findOne({email});
if(!result){
    return res.status(400).json({message:"database is empty"})
}
const compare=await bcrypt.compare(password,result.password);
if(!compare){
    return res.status(400).json({message:"password is incorrect"})
}
return res.status(200).json({mesaage:"login successfull"})
}catch(err){
    return res.status(400).json({message:"login failed"})
}
}