import { useContext } from "react"
import { Navigate } from "react-router-dom"
import AuthContext from "../States/Context"


const RedirectAuth = ({children}) => {
   const { state } = useContext(AuthContext)
   return state.isUserLoggedIn ? <Navigate to="/" /> : children
}

export default RedirectAuth
