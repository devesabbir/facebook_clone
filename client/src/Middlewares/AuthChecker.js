import { useContext } from "react"
import { Navigate } from "react-router-dom"
import AuthContext from "../States/Context"


const Authchecker = ({children}) => {
   const {state} = useContext(AuthContext)
   
   return state.isUserLoggedIn ? children : <Navigate to="login" />
}

export default Authchecker
