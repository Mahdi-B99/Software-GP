import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Signup.css";
import { faLock, faUser , faAt} from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import axios from "axios";
function Signup() {
   
    const[userVals,setUserVals]=useState({})
    const[status,setStatus]=useState(Boolean)
    const [message,setMessage]=useState("")

    const userInputHandler= (e)=>{
        setUserVals({...userVals,[e.target.name]: e.target.value});
  
      }
       
        
        const submitHandler= async (e)=>{
            e.preventDefault();

           try {
            let response =await axios.post("http://localhost:3001/signup",{ user:userVals })
             console.log(response)
             setStatus(response.data.success)
             setMessage(response.data.message)
           } catch (error) {
               
           }
        }
    return (
     <div className="signup-form-container">
         <div className="signup-form">
             <div className="signup-form-title">Sign up</div>
             {status === true? (<div className="success-msg">{message}</div>): ""}
             <div>
                 <form onSubmit={submitHandler} onChange={userInputHandler} className="signup-input">
                 <FontAwesomeIcon className="icon" icon={faUser}/>
                 <input name="username" type="text" className="username-input" placeholder="Username"  aria-autocomplete="both"required />
                 {(status === false && (message === "username is taken" || message === "username and email are taken"))? (<div className="fail-msg">Username is taken</div>):""}
                 <hr className="row-break" />
                 <FontAwesomeIcon className="icon" icon={faAt} />
                 <input name="email" className="email-input" type="email" placeholder="Email"   aria-autocomplete="both" required />
                 {(status === false && (message === "Email is taken" || message === "username and email are taken"))? (<div className="fail-msg">Email is taken</div>):""}
                 <hr className="row-break" />
                 <FontAwesomeIcon className="icon" icon={faLock} />
                 <input name="password" className="password-input" type="password" placeholder="Password" aria-autocomplete="both" required />
                 <hr  className="row-break" />
                 <input className="signup-btn" type="submit" value="Sign up" />
                 </form>
             </div>
         </div>


     </div>

    )
}
export default Signup;