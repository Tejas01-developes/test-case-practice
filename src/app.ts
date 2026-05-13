import express from 'express';
import route from './router.js';

export const app=express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use("/apis",route);

app.listen(3000,()=>{
    console.log("server started on the port")
})