
import { useReducer } from "react"
import AuthContext from "./Context"


const initialState = {
    isUserLoggedIn :false,
    user:{}
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'LOG-IN':
            return ({
                ...state,
                isUserLoggedIn: true,
                user: action.payload
            })
         case 'LOG-OUT':
             return ({
                ...state,
                isUserLoggedIn:false
             })
      
        default:
           return state
    } 
}



const Provider = ({children}) => {

   const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <AuthContext.Provider value = {{ state, dispatch }} >
              {children}
        </AuthContext.Provider>
    )

}

export default Provider