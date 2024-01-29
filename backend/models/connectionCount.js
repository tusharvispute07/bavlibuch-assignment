import mongoose from "mongoose";

const connectionCountSchema = new mongoose.Schema({
    count:{
        type: Number,
        default: 0
    }
})

export const ConnectionCount = mongoose.model('ConnectionCount', connectionCountSchema)