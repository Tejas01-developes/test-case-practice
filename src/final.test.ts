import { app } from "./app.js";
import collection from "./schema.js";
import { cleardb, closedb, connectdb } from "./testcongig.js"
import request from 'supertest';
import bcrypt from 'bcrypt';

// describe("register usertest",()=>{
//     beforeAll(async()=>await connectdb());
//     afterEach(async()=>await cleardb());
//     afterAll(async()=>await closedb());

describe("register api test",()=>{

    beforeAll(async()=>await connectdb());
    afterEach(async()=>await cleardb());
    afterAll(async()=>await closedb());

    it("body test",async()=>{
        const response=await request(app).post("/apis/").send({
            name:"test"
        })
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("body not recived")
    })

    it("entry test",async()=>{
        const response=await request(app).post("/apis/").send({
            name:"test",
            email:"t@gmail.com",
            password:"12345"
        })
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("success")


        const findindb=await collection.findOne({email:"t@gmail.com"});
        if(!findindb){
            throw new Error("db is empty")
        }
        expect(findindb).toBeTruthy();
        expect(findindb.name).toBe("test");
        expect(findindb?.password).not.toBe("12345")
    })

    // it("crash",async()=>{
    //     await collection.create({
    //         name:"test",
    //         email:"t@gmail.com",
    //         password:"12345"
    //     })
    //     const response=await request(app).post("/apis/").send({
    //         name:"test",
    //         email:"t@gmail.com",
    //         password:"12345"
    //     })
    //     expect(response.status).toBe(400)
    //     expect(response.body.message).toBe("duplicate")
    // })
})

describe("login api test",()=>{
    beforeAll(async()=>await connectdb());
    afterEach(async()=>await cleardb());
    afterAll(async()=>await closedb());
   
    it("body test",async()=>{
        const resp=await request(app).post("/apis/login").send({
            email:"t@gmail.com"
        })
        expect(resp.status).toBe(400);
        expect(resp.body.message).toBe("body is not there")
    })

    it("successfull login",async()=>{
        const hash=await bcrypt.hash("12345",10)
        await collection.create({
            name:"test",
            email:"t@gmail.com",
            password:hash
        })
        const resp=await request(app).post("/apis/login").send({
            email:"t@gmail.com",
            password:"12345"
        })
        expect(resp.status).toBe(200);
        expect(resp.body.message).toBe("login successfull")

      
    })

    it("wrong password",async()=>{
        const hash=await bcrypt.hash("12345",10)
        await collection.create({
            name:"test",
            email:"t@gmail.com",
            password:hash
        })
        const resp=await request(app).post("/apis/login").send({
            email:"t@gmail.com",
            password:"1234"
        })
        expect(resp.status).toBe(400);
        expect(resp.body.message).toBe("password is incorrect")

      
    })
    
})
// })