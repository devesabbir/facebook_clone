import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    first_name:{
         type:String,
         required:true,
         trim: true,
       },
    surname:{
       type:String,
       required:true,
       trim: true

    },
    email:{
        type:String,
        unique:true,
        trim: true,
        required:true
    },
    password:{
        type:String,
        required:true,
        trim: true,
    },
    date:{
       type:String,  
    },
    month:{
        type:String,  
     },
    year:{
       type:String,  
     },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isVerified:{
        type:Boolean,
        default:false
    }
},{
    timestamps : true
})


const User = mongoose.model('User', UserSchema)
export default User