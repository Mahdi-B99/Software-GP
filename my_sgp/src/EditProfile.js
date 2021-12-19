import Avatar from "react-avatar";
import "./EditProfile.css";
import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types"
import {AiOutlineClose} from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";

function EditProfile(props){
    EditProfile.propTypes={
        profileInfo: PropTypes.object,
        isAuth: PropTypes.bool,
        updateUser: PropTypes.func,
        avatar: PropTypes.string,
    }
const [userInfo,setUserInfo]=useState({username:props.profileInfo.userName,email:props.profileInfo.email,password:props.profileInfo.password,file:[props.profileInfo.image]});
const[status,setStatus]=useState(Boolean)
const [message,setMessage]=useState("")
const [avatarMenu,setAvatarMenu]=useState(false)
const [imageView,setImageView]=useState(false)
const params = useParams()
const navigate = useNavigate()
const cookies= new Cookies();
const [photo,setPhoto]=useState({})



if(userInfo.username === undefined && props.profileInfo.userName !== undefined){
    setUserInfo({username:props.profileInfo.userName,email:props.profileInfo.email,password:props.profileInfo.password,file:props.profileInfo.image})
    
}
if(photo === undefined && props.profileInfo.image !== null){
let image = new Buffer.from(props.profileInfo.image.data).toString("base64")
setPhoto(image)
}
const submitHandler= async (e)=>{
    e.preventDefault();
  try {
    const formData= new FormData();
    formData.append('image', userInfo.file);
    formData.append('username', userInfo.username)
    formData.append('email', userInfo.email)
    formData.append('password', userInfo.password)
    formData.append('currentName', props.profileInfo.userName)
    formData.append('currentEmail', props.profileInfo.email)
      let response = await axios.post("http://localhost:3001/editProfile", formData)
     
      setStatus(response.data.success)
      setMessage(response.data.message)
      if(response.data.success === true){
        const photo= new Buffer.from(response.data.avatar[0].image.data).toString("base64")
        let img="data:image/png;base64," + photo
      let user = {username:response.data.info.userName,password:response.data.info.password}
      let result =await axios.post("http://localhost:3001/login",{user})
      cookies.set("access", result.data.accessToken,{path:"/",maxAge: 3600})
      cookies.set("refresh", result.data.refreshToken,{path:"/",maxAge:172800})
      await props.updateUser(response.data.info,img)
      navigate("/editProfile/"+ response.data.info.userName)
      } 
  } catch (error) {
      console.log(error)
  }
}

const changeHandler = (e)=>{
    if(e.target.name === "image")
    setUserInfo({...userInfo,file:e.target.files[0]})
    else {
    setUserInfo({...userInfo,[e.target.name]: e.target.value});
    }
}

const handleAvatarClick = (e) =>{
       setAvatarMenu(!avatarMenu)

       if(e.target.name === "view")
        handleImageView();
}
const handleImageView = ()=>{
    setImageView(!imageView);   
}
if(props.profileInfo.userName !== undefined || typeof(cookies.get("access")) === 'undefined'){
if(props.profileInfo.userName !== params.username ){
    
   navigate("/")
}
}
    return (
        <>
        
        {imageView === true ? (
            <div className="image-view">
               <AiOutlineClose className="close-image-view" onClick={handleImageView} />

                <img src={props.avatar} height="100%" width="100%" alt="test" />
                </div>
        ) : ""}
        
          <div className="edit-profile-container">
              <h1>Edit Profile</h1>

              <div className="avatar-username">
                  <Avatar name={props.profileInfo.userName} className="Avatar" src={props.avatar} size="120px" round="60px" onClick={handleAvatarClick} />
                  
                  <div className="username">{props.profileInfo.userName}</div> 
                    

                 {avatarMenu === true ? (
                 <div className="avatar-menu">
                      <button name="view" onClick={handleAvatarClick}>View</button>
                      <label name="change" className="photo-change-label" htmlFor="photoUpload" >Change</label>
                  </div>): ""} 
                  
                     
              </div>
              <div className="info-form-container">
              <form className="info-change-form" encType="multipart/form-data" onSubmit={submitHandler} onChange={changeHandler} >
              <input name="image" className="photo-change-input"  id="photoUpload" accept="image/jpeg,image/png" type="file"  /> 

         <div className="info-changer">
             <div>Username</div>
          <input name="username" className="info-changer-input" type="text" placeholder={props.profileInfo.userName} />
          </div>       
          {(status === false && (message === "username is taken" || message === "username and email are taken"))? (<div className="msg">Username is taken</div>):""}
        
          <div className="info-changer">
              <div>Email</div>
          <input name="email" className="info-changer-input" type="email" placeholder={props.profileInfo.email}  />
          </div>
          {(status === false && (message === "Email is taken" || message === "username and email are taken"))? (<div className="msg">Email is taken</div>):""}

          <div className="info-changer">
              <div>Password</div>
          <input name="password" className="info-changer-input" type="password" placeholder={props.profileInfo.password} />
          </div>
          <input type="submit" value="Save" className="save-info-btn" />
          </form>
          </div>
        
          </div>

          </>
    )
}
export default EditProfile;