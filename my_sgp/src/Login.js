import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Login.css";
import { faLock, faUser} from '@fortawesome/free-solid-svg-icons';

function Login(){

    return (
        <div className="login-form-container">
         <div className="login-form">
             <div className="login-form-title">Login</div>
             <div>
                 <form method="POST" className="login-input">
                 <FontAwesomeIcon className="icon" icon={faUser} />
                 <input className="login-email-input" type="email" placeholder="Email or Username" aria-autocomplete="both" required />
                 <hr className="row-break" />
                 <FontAwesomeIcon className="icon" icon={faLock} />
                 <input className="login-password-input" type="password" placeholder="Password" aria-autocomplete="both" required />
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
