import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { accessfilter, customreq } from './accessfilter.js';

jest.mock("jsonwebtoken");

describe("access filter check",()=>{

    let mockreq:Partial<customreq>;
    let mockresp:Partial<Response>;
    let mocknext:NextFunction



beforeEach(()=>{
    mockreq={
        headers:{}
    },

    mockresp={
        status:jest.fn().mockReturnThis(),
        json:jest.fn()
    }
    mocknext=jest.fn();
    process.env.ACCESS_KEY="qazwsxedcrfvtgbyhnujmikolp"
})

afterEach(()=>{
    jest.clearAllMocks()
})


it("should give status 400 if hear i not there",()=>{
    mockreq.headers={authorization:"Bearer"}
    accessfilter(mockreq as customreq,mockresp as Response,mocknext)
    expect(mockresp.status).toHaveBeenCalledWith(400)
    expect(mockresp.json).toHaveBeenCalledWith({message:"access token is not there"})
 
    expect(mocknext).not.toHaveBeenCalled()

})

it("should give status 400 if token is invalid",()=>{
    mockreq.headers={authorization:"Bearer invalid_token"};
    (jwt.verify as jest.Mock).mockImplementation(()=>{
        throw new Error("invalid signature")
    })         
    accessfilter(mockreq as customreq,mockresp as Response,mocknext)
    expect(jwt.verify).toHaveBeenCalledWith("invalid_token","qazwsxedcrfvtgbyhnujmikolp")
    expect(mockresp.status).toHaveBeenCalledWith(400)
    expect(mockresp.json).toHaveBeenCalledWith({message:"access filter failed"})
    expect(mocknext).not.toHaveBeenCalled()

})

it("should run next() if token is valid",()=>{
    mockreq.headers={authorization: "Bearer valid_token"}
    const mockpayload={id:"12345",key:"qazwsxedcrfvtgbyhnujmikolp"} as {
        id:string,
        key:string
    }
    (jwt.verify as jest.Mock).mockReturnValue(mockpayload)         
    accessfilter(mockreq as customreq,mockresp as Response,mocknext)
    expect(jwt.verify).toHaveBeenCalledWith("valid_token","qazwsxedcrfvtgbyhnujmikolp")
    expect(mockreq.id).toBe("12345")
    expect(mocknext).toHaveBeenCalledTimes(1)
    expect(mockresp.status).not.toHaveBeenCalled()
    expect(mockresp.json).not.toHaveBeenCalled()
    

})





    
})