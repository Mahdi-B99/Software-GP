import { Link } from "react-router-dom";
import "./Navbar.css";
import PropTypes from "prop-types";
import Avatar from "react-avatar";
import { useState } from "react";
function Navbar(props){
Navbar.propTypes={
    isAuth: PropTypes.bool,
}
const [Menu,setMenu] = useState("hidden");
const accMenu = () => {
    if(Menu === "hidden")
    setMenu("block");
    else setMenu("hidden");
    
}
    return ( <>
        <div className="Navbar">
            <Link className="home-link"  to={"/"}>
            <div className="Website-name">
               <button> MGC</button>
            
            </div>
            </Link>
            {props.isAuth === false ? (
            <div className="unAuth-User">
                 
                 <Link className="link" to={"/Signup"} >
                <div className="Signup">
                    
                    <button className="signup-button" >Sign up</button>
                    
                    </div>
                    </Link>
                    <Link className="link" to={"/Login"} >
                <div className="Login">
                    <button className="login-button">Login</button>
                    </div>
                    </Link>
                    </div>
                    ) : ( <>
                        <div className="Auth-User">
                            <Avatar src="test-image.jpg" size="50px" round="25px" className="auth-user-icon"  onClick={accMenu}/>
                            {Menu === "block" ? (
                            
                            <div className="drop-menu">
                      <Link className="menu-item" to="/Profile">
                      <div className="menu-item">
                   <button onClick={accMenu}>
              My Profile
                 </button>
            </div>
            </Link>
            <Link className="menu-item" to="/EditProfile">
              <div  className="menu-item">
           <button onClick={accMenu}> 
          Edit Profile
           </button>
           </div>
           </Link>
           <Link className="menu-item" to="/">
           <div  className="menu-item">
            <button onClick={accMenu}> 
            Logout
                </button>
           </div>
           </Link>
        </div> ) : ""}
                       
                        
        </div>
         </>  )}
                     
               
            
        </div>
        
   </>
    )
}
export default Navbar;