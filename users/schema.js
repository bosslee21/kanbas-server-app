// setting constraints for our data for users. 

import mongoose from "mongoose";

const schema  = new mongoose.Schema({
    username: {type:String, unique: true, required: true},
    password: {type:String, required: true},
    email: String,
    role: {
        type: String ,
        enum: ["ADMIN", "USER", "STUDENT","FACULTY"], 
        default: "STUDENT"
    },
    salary: {type: Number, default: 75000},
    married: {type: Boolean, default: false},
    dob: {type: Date, default: Date.now},
    firstName: String,
    lastName: String,
},
{collection: "users"}
); // where we want to store. we created a collection so we specify store in user.

export default schema;