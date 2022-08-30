import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { dateArray, monthArray, yearArray } from '../../../Helper/Datehelper';
import { CreateAlert } from '../../../utility/Alert';
import './SignUp.scss'


import axios from 'axios'


function SignUp(props) {

   const [input, setInput] = useState({
      first_name: '',
      surname:'',
      email: '',
      password: '',
      date: '',
      month: '',
      year: '',
      gender: '',
   })

 
  // handelFormInput
  const handleInput = (e) => {
      const target = e.target
      const value = target.value
      setInput((prev) => ({
          ...prev,
         [target.name]: value
      }))
  }

//  Handle Form Submit
 const handleSubmit = async (e) => {
     e.preventDefault()
     const {first_name, surname, email, password, date, month, year, gender } = input
     if(!first_name || !surname || !email || !password || !date || !month || !year || !gender){
      CreateAlert('','All fields are required!', 'warning')        
     } else {
        try {
          await axios({
             method: 'post',
             url: 'http://localhost:5050/api/user',
             data:{
               ...input,
             }
          }).then( res => {
             if(res.status === 200) {
               CreateAlert('','Successfully Signed Up! Please Verify your Account.', 'success')
                props.setModal(false)
           
             }   
          })
        } catch (error) {
          
        }
     }

  
 }

 
  return (
    <Modal
      show={props.modal}
      onHide={props.handlemodal}
      dialogClassName='sign_upModal'
      centered  
     >
    <Modal.Header closeButton>
       <div className="modal-top">
        <h2 className='Sign-Up font-Helvetica font-bold'> Sign Up</h2>
           <span className='quick-and-easy'>It's quick and easy.</span>
        </div>
    </Modal.Header>
    
    <Modal.Body>
         <div className="signup_form ">
              <form action="" onSubmit={handleSubmit} >
                   <div className="flex items-center justify-between">
                        <input name='first_name' onChange={handleInput} className='basis-[49%]' type="text" placeholder='First name' value={input.first_name} />
                        <input name='surname' onChange={handleInput}  className='basis-[49%]' type="text" placeholder='Surname' value={input.surname}/>
                   </div>
                   <div className='my-2'>
                       <input name='email' onChange={handleInput} className='w-full' type="text" placeholder='Mobile number or email' value={input.email} />
                   </div>
                   <div className='my-2'>
                       <input name='password' onChange={handleInput} className='w-full' type="password" placeholder='New password' value={input.password}/>
                   </div>
                   <div>Date of birth</div>
                   <div className='my-2 flex justify-between gap-x-2'> 
                        <select value={input.date} name='date' onChange={handleInput} className='grow'  id="">
                         <option value=''>...</option>
                           {
                            dateArray.map( i => 
                                <option value={i}>{i}</option>
                              )
                           }
                        </select> 
                        <select value={input.month} name='month' onChange={handleInput} className='grow'  id="">
                         <option value=''>...</option>
                           {
                            monthArray.map( i => 
                                <option value={i}>{i}</option>
                              )
                           }
                        </select> 
                        <select value={input.year} name='year' onChange={handleInput} className='grow' id="">
                           <option value=''>...</option>
                           {
                            yearArray.map( i => 
                                <option value={i}>{i}</option>
                              )
                           }
                        </select>
                        
                   </div>
                   <div>Gender</div>
                   <div className='my-2 flex items-center gap-x-2'>
                         <div className='radio-wrap grow border flex justify-between items-center p-2'>
                           <label htmlFor="female">Female</label>
                           <input  onChange={handleInput} type="radio" name="gender" id='female' value="female" />
                         </div>
                         <div className='radio-wrap grow border flex justify-between items-center p-2'>
                           <label htmlFor="male">Male</label>
                           <input  onChange={handleInput}  type="radio" name="gender" id='male' value="male" />
                         </div>

                         <div className='radio-wrap grow border flex justify-between items-center p-2'>
                           <label htmlFor="custom">Custom</label>
                           <input  onChange={handleInput}  type="radio" name="gender" id='custom' value="custom" />
                         </div>        
                   </div>
                   <div className='my-2'>
                        <p className='text-[11px]'>People who use our service may have uploaded your contact information to Facebook. <a href="#">Learn more.</a></p>
                   </div> 
                   <div className='my-2'>
                        <p className='text-[11px]'>By clicking Sign Up, you agree to our <a href="#">Terms,</a>  <a href="#">Privacy Policy</a> and <a href="#">Cookies Policy.</a>  You may receive SMS notifications from us and can opt out at any time.</p>
                   </div>
                   <div className="submit-btn text-center">
                      <input type="submit" className='text-[17px] h-[36px] px-[16px] font-bold text-[#fff] hover:text-[#fff] inline-block w-[197px]' value='Sign Up' />
                  </div>
              </form>
         </div>
    </Modal.Body>
    </Modal>
  )
}

export default SignUp