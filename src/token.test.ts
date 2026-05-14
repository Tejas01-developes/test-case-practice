import jwt from 'jsonwebtoken';
import { accesstoken, refreshtoken } from './token.js';


jest.mock("jsonwebtoken");

describe("token middleware check",()=>{

beforeEach(()=>{
jest.clearAllMocks();

process.env.ACCESS_KEY="accesskey"
process.env.REFRESH_KEY="refreshkey"
})

it("should generate accesstoken",async()=>{
    (jwt.sign as jest.Mock).mockReturnValue("access token string")
    const res=accesstoken("12345");
    expect(res).toBe("access token string")
    expect(jwt.sign).toHaveBeenCalledWith(
        {id:"12345"},
        "accesskey",
        {expiresIn:"15m"}
    )
})

it("should generate refreshtoken",async()=>{
    (jwt.sign as jest.Mock).mockReturnValue("refresh token string")
    const res=refreshtoken("12345");
    expect(res).toBe("refresh token string")
    expect(jwt.sign).toHaveBeenCalledWith(
        {id:"12345"},
        "refreshkey",
        {expiresIn:"7d"}
    )
})

})