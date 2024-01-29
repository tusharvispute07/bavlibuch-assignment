import mongoose from "mongoose";

export default function mongooseConnect(){
    const uri = process.env.MONGODB_URI
    return mongoose.connect(uri)
}