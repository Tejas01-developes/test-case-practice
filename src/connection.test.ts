import mongoose from 'mongoose';
import dbconnect from './dbconnect.js';

jest.mock("mongoose");


describe("dbconnection check",()=>{
    let consolespy:jest.SpyInstance
  beforeEach(()=>{
    jest.clearAllMocks();

    process.env.DB_URL="mongodb://fake:27017";

    consolespy=jest.spyOn(console,"log").mockImplementation();
  })
afterEach(()=>{
    consolespy.mockRestore()
})

it("shouldconnect to the database",async()=>{
    (mongoose.connect as jest.Mock).mockResolvedValueOnce("mongodb://fake:27017")
    await dbconnect.connect();
    expect(mongoose.connect).toHaveBeenCalledWith("mongodb://fake:27017")
    expect(consolespy).toHaveBeenCalledWith("mongodb://fake:27017")
})

it("should not connect to the database and send error",async()=>{
    (mongoose.connect as jest.Mock).mockRejectedValueOnce(new Error("network timeout"))
    await dbconnect.connect();
    expect(dbconnect.connect()).rejects.toThrow("database connection failed")
    expect(consolespy).not.toHaveBeenCalled()
})

})
