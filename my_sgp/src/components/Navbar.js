import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import PropTypes from "prop-types";
import NavDrawer from "./NavDrawer";
import Avatar from "react-avatar";
import { useEffect, useState } from "react";
import { useMediaQuery, useTheme } from "@material-ui/core";
import Cookies from "universal-cookie";
import axios from "axios";

function Navbar(props){
Navbar.propTypes={
    isAuth: PropTypes.bool,
    userInfo: PropTypes.object,
    avatar: PropTypes.string,
}
const cookies=new Cookies();
const navigate = useNavigate();
const [Menu,setMenu] = useState("hidden");
const [photo,setPhoto]=useState("")
const accMenu =  async (e) => {
    if(Menu === "hidden")
    setMenu("block");
    else setMenu("hidden");
    if(e.target.name === "logout"){
        let token= cookies.get("refresh");
        cookies.remove("access")
        cookies.remove("refresh")
        cookies.remove("username")
     await axios.delete("http://localhost:3001/logout",{data:{token:token}} )
       navigate("/");
    }

}


const theme = useTheme();
const mobile = useMediaQuery(theme.breakpoints.down("xs"))
    return ( <>
        <div className="Navbar">
            <div className="header">
                {mobile ? (
                   <NavDrawer className="nav-drawer" isAuth={props.isAuth} />
                ) : ""}
            
            <Link className="home-link"  to={"/"}>
            <div className="Website-name">
               <button> MGC</button>
            
            </div>
            </Link>
            </div>
            
            {props.isAuth === false ? (
            <div className="unAuth-User">
             {mobile ? "":( <>
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

                    </> )}

                
                    </div>
                    ) : ( <>
                        <div className="Auth-User">
                            <Avatar src={props.avatar} size="50px" round="25px" className="auth-user-icon"  onClick={accMenu}/>
                            {Menu === "block" ? (
                            
                            <div className="drop-menu">
                      <Link className="menu-item" to={{pathname:`/Profile/${props.userInfo.userName}`}}>
                      <div className="menu-item">
                   <button onClick={accMenu}>
              My Profile
                 </button>
            </div>
            </Link>
            <Link className="menu-item" to={{pathname:`/EditProfile/${props.userInfo.userName}`}}>
              <div  className="menu-item">
           <button onClick={accMenu}> 
          Edit Profile
           </button>
           </div>
           </Link>
           <Link className="menu-item" to="/">
           <div  className="menu-item">
            <button name="logout" onClick={accMenu}> 
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