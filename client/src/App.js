import axios from "axios";
import Cookies from "js-cookie";
import { useContext, useEffect } from "react";
import { Routes,Route } from "react-router-dom";
import ForgotPass from "./Components/Pages/ForgotPass/ForgotPass";
import HomePage from "./Components/Pages/HomePage/HomePage";
import Login from "./Components/Pages/LoginPage/Login";
import ResetPassword from "./Components/Pages/ResetPassword/ResetPassword";
import VerifyPage from "./Components/Pages/Verifypage/VerifyPage";
import Authchecker from "./Middlewares/AuthChecker";
import RedirectAuth from "./Middlewares/RedirectAuth";
import AuthContext from "./States/Context";



function App() {
     
   const {dispatch} = useContext(AuthContext)

   useEffect(() => {
      try {
         axios({
               method: "get",
               url: "http://localhost:5050/api/user/me",
               headers: {
                    authorization: `Bearer ${Cookies.get('token')}`
                }
           }).then( res => {
               dispatch({type:"LOG-IN", payload:res.data.data})
           }).catch(err => {
               console.log(err);
           });
      } catch (error) {
          
      }
   },[dispatch])


   return (
        <Routes>
             <Route path="/" element={ <Authchecker><HomePage/></Authchecker> }/> 
             <Route path="/login" element={ <RedirectAuth><Login/></RedirectAuth> } />
             <Route path="/user/:id/verify/:token" element={ <VerifyPage/> } />
             <Route path="/forgotpassword" element={ <ForgotPass/> } />
             <Route path="/resetpassword/:token" element={ <ResetPassword/> } />
        </Routes>    
    
   );
}

export default App
