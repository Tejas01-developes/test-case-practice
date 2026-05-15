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






    
})