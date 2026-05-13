import { MongoMemoryServer } from "mongodb-memory-server"
import mongoose from "mongoose";

let memorydb:MongoMemoryServer;

export const connectdb=async()=>{
memorydb=await MongoMemoryServer.create();
const uri=memorydb.getUri();
await mongoose.connect(uri)
}

export const cleardb=async()=>{
    const collection=mongoose.connection.collections;
    for(const key in collection){
        await collection[key]?.deleteMany({})

    }
}


export const closedb=async()=>{
    if(mongoose.connection.readyState !== 0){
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    
        if (memorydb) {
            await memorydb.stop(); // <--- Add this line!
        }
    }
    }