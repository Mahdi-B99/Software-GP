import Avatar from "react-avatar";
import "./EditProfile.css";
import { useState } from "react";
function EditProfile(){
const [Change,setChange] = useState(false);
const photoChangeHandler = () => {
    setChange(!Change);
}
    return (
          <div className="edit-profile-container">
              <h1>Edit Profile</h1>
              
              <div className="avatar-username">
                  <Avatar className="Avatar" src="test-image.jpg" size="120px" round="60px" />
                  <div className="photo-change">
                      <label htmlFor="photoUpload" onClick={photoChangeHandler}>Change</label>
                      <form encType="multipart/form-data" method="POST">
                          <input className="photo-change-input" id="photoUpload" accept="image/jpeg,image/png" type="file"/> 
                          </form>
                      
                     
                      </div>
                      <div className="username">Mahdi Barham</div> 
                      <div className="remove-pic"><button>Remove Photo</button></div>

              </div>
              <div className="info-form-container">
              <form className="info-change-form" method="POST">
         <div className="info-changer">
             <div>Username</div>
          <input className="info-changer-input" type="text" defaultValue="Mahdi Barham" />
          </div>               
          <div className="info-changer">
              <div>Email</div>
          <input className="info-changer-input" type="email" defaultValue="mahdibarham.99@gmail.com"  />
          </div>
          <div className="info-changer">
              <div>Password</div>
          <input className="info-changer-input" type="password" defaultValue="Mahdi Barham" />
          </div>
          <input type="submit" value="Save" className="save-info-btn" />
          </form>
          </div>
        
          </div>


    )
}
export default EditProfile;