import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Login.css";
import { faLock, faUser} from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Cookies from "universal-cookie";
function Login(){

const [user,setUser]=useState({})
const [logStatus,setLogStatus]=useState("")
const navigate = useNavigate()
    const changeHandler= (e)=>{
      setUser({...user,[e.target.name]: e.target.value});
    }
    const cookies=new Cookies()
    
    const submitHandler= async (e)=>{
        e.preventDefault();
        try {
            let response =await axios.post("http://localhost:3001/login",{ user })
             if(response.data.success === false){
                 if(response.data.msg === "User does not exist"){
                     setLogStatus("Invalid Username")
                 }
                 else if(response.data.msg === "incorrect password"){
                     setLogStatus("incorrect password")
                 }
             } else {
                const { accessToken, refreshToken } =  response.data;
               
               
                cookies.set("access", accessToken,{path:"/",maxAge: 3600})
                cookies.set("refresh", refreshToken,{path:"/",maxAge:172800})
               
                
               
                navigate("/")
             }
            
            
            
             
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="login-form-container">
         <div className="login-form">
             <div className="login-form-title">Login</div>
             <div>
                 <form onSubmit={submitHandler} onChange={changeHandler} className="login-input">
                 <FontAwesomeIcon className="icon" icon={faUser} />
                 <input name="username" className="login-email-input" type="text"  placeholder="Email or Username" aria-autocomplete="both" required />
                 {logStatus === "Invalid Username" ? (<div className="login-fail-msg">{logStatus}</div>):""}
                 <hr className="row-break" />
                 <FontAwesomeIcon className="icon" icon={faLock} />
                 <input name="password" className="login-password-input" type="password"   placeholder="Password" aria-autocomplete="both" required />
                 {logStatus === "incorrect password" ? (<div className="login-fail-msg">{logStatus}</div>):""}
                 <hr  className="row-break" />
                 <a className="reset-password" href="#ResetPassword">Forgot your password?</a>
                 <hr  className="row-break" />
                 <input className="login-btn" type="submit" value="Login" />
                 <hr  className="row-break" />
                <div>Don't have an account?
                    <a className="create-account" href="#Signup"> Sign up</a>
                </div> 
               
                 </form>
             </div>
         </div>


     </div>


    )
}
export default Login;
