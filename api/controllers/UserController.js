import User from '../models/UserModel.js'
import bcryptjs from "bcryptjs";
import { CreateToken } from '../utility/CreateToken.js';
import { SendMail } from '../utility/SendMail.js';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

// Create CreateUser
export const CreateUser = async (req,res,next) => {
    const {first_name,surname,email,password, date, month, year} = req.body

    if(!first_name || !surname || !email || !password || !date || !month || !year) {
        res.status(400).json({ error: 'name,email && password is required!'})
    }
    else{
        try {
            const salt = await bcryptjs.genSaltSync(10)
            const hashedPassword = await bcryptjs.hash(password, salt)
       
            const user = await User.create({...req.body, password:hashedPassword})       
            const token = CreateToken({_id: user._id}, '2d')

            const verifyLink = `http://localhost:${process.env.R_PORT}/user/${user._id}/verify/${token}`

            SendMail(user.email,'Facebook',`<span>Hello ${user.name} Please Verify Your Account ${verifyLink}` ) 

             res.status(200).json({ success: true, data:req.body})
           } catch (error) {
             next(error);
           } 
    }
} 

// Read User
export const ReadUser =  async (req,res,next) => {
    try {
       const user = await User.find()
       if(!user){
           res.status(400).json({ error: 'Null'})
       }
       if(user){
         res.status(200).json({ success: true, data:user })
       }
    } catch (error) {
        next(error);
    }
}

// Read Single User
export const ReadSingleUser =  async (req,res,next) => {
    const id = req.params.id
    try {

       const user = await User.findById(id)
       if(!user){
           res.status(400).json({ error: 'Null'})
       }
       if(user){
         res.status(200).json({ success: true, data:admin })
       }
    } catch (error) {
        next(error);
    }
}


// Update User
export const UpdateUser = async (req,res,next) => {
    const id = req.params.id
    const {name,email,password} = req.body;
    try {
        const isExist = await User.findById(id)
        if(!isExist){
            res.status(400).json({ error: 'Null'})
        }
        if(isExist){
            if(!name || !email || !password ) {
                res.status(400).json({ error: 'name,email && password is required!'})
            } else {
                 const salt = await bcryptjs.genSaltSync(10)
                 const hashedPassword = await bcryptjs.hash(password, salt)
                 const user = await User.findByIdAndUpdate(isExist._id,{...req.body, password:hashedPassword},{upsert: true}) 
                 res.status(200).json({ success: true, data:user })
            }        
        }
    } catch (error) {
        next(error)
    }

  
}

// Delete User
export const DeleteUser = async (req,res,next) => {
   const id = req.params.id  
   try {
    const isExist = await User.findById(id)
    if(!isExist){
        res.status(400).json({ error: 'Null'})
    }
    if(isExist){
       await User.findByIdAndDelete(isExist._id)
       res.status(200).json({ success: true , delete:isExist})
    } 
   } catch (error) {
      next(error) 
   }
}


//  Verify Account

export const VerifyUser = async (req,res,next) => {
    try {
     
        const { id, token  } = req.body
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        if(!decoded) {
           res.status(401).json({message: 'Token not found'});
        }
        if( decoded ) {
           await User.findByIdAndUpdate(id,{
              isVerified:true
           })
           res.status(200).json({message: 'Account verified successfully', data: decoded})
        }
         
    } catch (error) {
       next(error); 
    }
}


// LoggedIn 
export const LoggedInUser = async (req,res,next) => {
    try {
      const bearer_token =  req.headers.authorization
    
      if(!bearer_token){
         res.status(401).json({ error: 'Unauthorized' })
        
      }
     
      if( bearer_token ) {
          if(bearer_token.length > 6) { 
              let token = bearer_token.split(' ')[1]
              const decode = jwt.verify(token, process.env.SECRET_KEY)
              if(!decode) {
                res.status(400).json({ error: "Invalid Token" })
              }
 
             if(decode){
                const decodeUser = await User.findById(decode.id)
                res.status(200).json({success:true, data:decodeUser})
             }
          }
              
      }

    } catch (error) {
       console.log(error);
    }
}



//  Recover Password Request 
export const RecoverPasswordRequest = async (req, res, next) => {  
    const { email } = req.body

    try {
       const isExist = await User.findOne({ email: email }); 
       if (!isExist) {
          res.status(404).json({ message: 'User Not Found!' });
       }

       if (isExist) {
          const token = CreateToken({id:isExist._id})
          const resetLink = `http://localhost:${process.env.R_PORT}/resetpassword/${token}`

          SendMail(isExist.email,'Password Recovery Link',resetLink)
          res.status(200).json({message:'Reset Password Link Sent!', user: isExist})
       }
 
    } catch (error) {
        
    }
}


//  Reset Password 
export const ResetPassword = async (req,res,next) => {
    const { token, password } = req.body 
    try {
        jwt.verify(token, process.env.SECRET_KEY, async (err, data) => {
         if (err) {  
             res.status(401).json({ message: 'Invalid Request' })    
         }
         if( data){
            const salt = bcryptjs.genSaltSync(10)
            const hashpass = bcryptjs.hashSync(password,salt)

            await User.findByIdAndUpdate(data.id, {password:hashpass})
            res.status(200).json({ message: 'OK, Password updated!' }) 
         }
      })
      
    } catch (error) {
        
    } 
}