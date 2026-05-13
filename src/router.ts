import express from 'express';
import { loginuser, registeruser } from './register.js';

const route=express.Router();


route.post("/",registeruser);
route.post("/login",loginuser)

export default route;