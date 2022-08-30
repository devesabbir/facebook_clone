import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config({path:'../.env'})

export const CreateToken = (payload,expiresIn = '1d') => {
   return jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: expiresIn
  })
}

  