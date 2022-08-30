import bcryptjs from "bcryptjs"
import User from '../models/UserModel.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()


export const LoginController = async (req, res, next) => {
    let {email, password} = req.body
    try {
       const loginUser = await User.findOne({email}) 
       if(!loginUser) {
          res.status(404).json({ message: 'Your Email Not found!'})
        } 
       
       if(loginUser){
          const passCheck = await bcryptjs.compare(password, loginUser.password)
          if(!passCheck){
              res.status(401).json({ message: 'Password does not match' })
          }

          if(passCheck){
              // Token
              const token = jwt.sign({id:loginUser._id}, process.env.SECRET_KEY,{expiresIn:'20m'})

            let {_id, isAdmin, password, ...loginUserInfo} = loginUser._doc  
              res.cookie('access_token',token).status(200).json({ 
                  token:token,
                  data:loginUserInfo
              })
          }
       }

    } catch (error) {
        next(error)
    } 
}


