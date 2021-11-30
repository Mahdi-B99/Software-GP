import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Signup.css";
import { faLock, faUser , faAt} from '@fortawesome/free-solid-svg-icons';

function Signup() {

    return (
     <div className="signup-form-container">
         <div className="signup-form">
             <div className="signup-form-title">Sign up</div>
             <div>
                 <form method="POST" className="signup-input">
                 <FontAwesomeIcon className="icon" icon={faUser}/>
                 <input type="text" className="username-input" placeholder="Username" aria-autocomplete="both"required />
                 <hr className="row-break" />
                 <FontAwesomeIcon className="icon" icon={faAt} />
                 <input className="email-input" type="email" placeholder="Email" aria-autocomplete="both" required />
                 <hr className="row-break" />
                 <FontAwesomeIcon className="icon" icon={faLock} />
                 <input className="password-input" type="password" placeholder="Password" aria-autocomplete="both" required />
                 <hr  className="row-break" />
                 <input className="signup-btn" type="submit" value="Sign up" />
                 </form>
             </div>
         </div>


     </div>

    )
}
export default Signup;