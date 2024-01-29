import mongoose, { mongo } from "mongoose";

const userSchema = mongoose.Schema({
    id: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    friends: {
        type: [String]
    }
})

export const User = mongoose.model('User', userSchema)