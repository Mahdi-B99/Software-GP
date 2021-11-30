import "./Profile.css";
import Avatar from "react-avatar";
import {BsFilterCircleFill} from "react-icons/bs";
import Prediction from "./components/Prediction";

import { Link } from "react-router-dom";
function Profile(){
    return (
        <>
        <div className="profile-container">
          <div className="profile">
               <div className="profile-content">
                   <Avatar 
                     size="160px"
                     round="80px"
                     src="test-image.jpg"
                     height="200px"
                     width="30%"
                     className="Avatar"        
                    />
                 <div className="username">
                       Mahdi Barham
                     </div>
                </div>
                <Link style={{textDecoration:"none"}} to="/EditProfile">
              <div className="edit-profile">
                 <button>Edit Profile
                </button>
                    </div>
                    </Link>
            </div>
            
        </div>
        <div className="new-section">
            <div className="section-info"><div className="section-title">Prediction History</div> <div className="filter"><BsFilterCircleFill className="filter-icon" ></BsFilterCircleFill></div></div>
            <Prediction  fullView={false} />
            <Prediction  fullView={false} />
            <Prediction  fullView={false} />
             </div>
             
        </>
    )
}
export default Profile;