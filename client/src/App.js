import { Routes,Route } from "react-router-dom";
import HomePage from "./Components/Pages/HomePage/HomePage";
import Login from "./Components/Pages/LoginPage/Login";
import VerifyPage from "./Components/Pages/Verifypage/VerifyPage";
import Authchecker from "./Middlewares/AuthChecker";
import RedirectAuth from "./Middlewares/RedirectAuth";



function App() {
   return (
        <Routes>
             <Route path="/" element={ <Authchecker><HomePage/></Authchecker> }/> 
             <Route path="/login" element={<RedirectAuth><Login/></RedirectAuth> } />
             <Route path="/user/:id/verify/:token" element={<VerifyPage/>} />
        </Routes>    
    
   );
}

export default App
