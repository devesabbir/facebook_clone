import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { CreateAlert } from '../../../utility/Alert';

function VerifyPage() {
   const params = useParams()
   const navigate = useNavigate()

   useEffect( () => {
      axios({
          method: 'POST',
          url: 'http://localhost:5050/api/user/verify',
          data: {
              ...params
          }
      }).then ( res => {
          CreateAlert('','Your Account is verify successfully', 'success')
          navigate('/login')

      }).catch ( err => {
          CreateAlert('','An error occurred while verifying your account', 'error')
      })

   },[params,navigate])


  return (
    <div>
        <h1 className="text-4xl">Verify Your Account</h1>  
    </div>
  )
}

export default VerifyPage