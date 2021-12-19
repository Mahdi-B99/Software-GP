import "./Profile.css";
import Avatar from "react-avatar";
import {BsFilterCircleFill} from "react-icons/bs";
import Prediction from "./components/Prediction";

import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PropTypes from "prop-types"
import axios from "axios";
function Profile(props){
  Profile.propTypes={
    profileInfo: PropTypes.object,
    avatar: PropTypes.string,
  }
  const [showFilters,setShowFilters]=useState(false)
  const [profileInfo,setProfileInfo]=useState([])
  const [userExist,setUserExist]=useState(true)
  const [photo,setPhoto]=useState("")
  const  filterMenu= ()=>{
    setShowFilters(!showFilters)
  }
  let params= useParams()

  function timeout(ms){
    return new Promise((resolve)=>setTimeout(resolve,ms));
  }
  
  useEffect(  ()=>{

    const getProfileUser = async ()=>{
      if(params.username === props.profileInfo.userName && props.profileInfo !== undefined){
      setProfileInfo(props.profileInfo)
      setPhoto(props.avatar)
      setUserExist(true)
      }
     else {
            await timeout(500)
       try {
          let response = await axios.get(`http://localhost:3001/userInfo?userName=${params.username}`)
          if(response.data){
            setProfileInfo(response.data)
            setUserExist(true)
            let result = await axios.get(`http://localhost:3001/imageDownload?username=${params.username}`)
            if(result.data.length){
            let img = new Buffer.from(result.data[0].image.data).toString("base64")
          setPhoto("data:image/png;base64," +img)
            }
          }
          else { 
            setUserExist(false)
          }
       } catch (error) {
         console.log(error)
       }
     } 
  
    }
   getProfileUser();
  },[params.username,props.profileInfo,props.avatar])
 
    return (
        <>
        {userExist === true ? (
          <>
           <div className="profile-container">
           <div className="profile">
                <div className="profile-content">
                    <Avatar 
                      size="160px"
                      round="80px"
                      src={photo}
                      height="200px"
                      width="30%"
                      className="Avatar"        
                     />
                  <div className="username">
                       {profileInfo.userName}
                      </div>
                 </div>
                 {params.username === props.profileInfo.userName ? (
                 <Link style={{textDecoration:"none"}} to={{pathname:"/EditProfile/"+props.profileInfo.userName}}>
               <div className="edit-profile">
                  <button>Edit Profile
                 </button>
                     </div>
                     </Link>): ""}
                 
             </div>
             
         </div>
         <div className="new-section">
             <div className="section-info"><div className="section-title">Prediction History</div> <div className="filter"><BsFilterCircleFill onClick={filterMenu} className="filter-icon" ></BsFilterCircleFill></div></div>
             {showFilters ?( 
               <div className="filters-menu-container">
             <div className="filters-menu"> 
              <ul>Sort By Date
              <li>Ascending</li>
              <li>Decending</li>
              </ul>
              <ul>Filter By Date
              <li>Today</li>
              <li>This Week</li>
              <li>This Month</li>
              <li>This Year</li>
              </ul>
              </div>
              </div>
               ): "" }
             <Prediction  fullView={false} />
             <Prediction  fullView={false} />
             <Prediction  fullView={false} />
             <Prediction  fullView={false} />
             <Prediction  fullView={false} />
             <Prediction  fullView={false} />
              </div>
              </>
        ): (<div style={{color:"white",marginTop:"40vh"}}>ERROR 404 NOT FOUND !</div>)}
       
             
        </>
    )
}
export default Profile;