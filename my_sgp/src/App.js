import './App.css';
import Navbar from './components/Navbar';
import { Routes,Route } from "react-router-dom";
import HomePage from './HomePage';
import Signup from './Signup';
import Login from './Login';
import ResetPassword from './ResetPassword';
import Profile from './Profile';
import Prediction from './components/Prediction';
import { useEffect, useState,useCallback } from 'react';
import { useLocation,useNavigate } from 'react-router';
import EditProfile from './EditProfile';
import axios from "axios"
import Cookies from 'universal-cookie';
function App() {
  const [Auth,setAuth]=useState(false);
  const [err,setErr]=useState("")
  const[user,setUser]=useState({})
  const[userName,setUserName]=useState("")
  const location = useLocation();
  const navigate = useNavigate();
  const cookies=new Cookies();
  const [avatar,setAvatar]=useState("")
  

 function timeout(ms){
   return new Promise((resolve)=>setTimeout(resolve,ms));
 }

 

  
 
 const refresh =useCallback( async refreshToken =>{
  let response= await axios.post("http://localhost:3001/token", {token:refreshToken})
  
    if(response.data.message === "token is empty"){
      setErr("token is empty")
      return false;
    }
    else if (response.data.status === 403 ){
      setErr("Invalid refresh token")
      return false
    }
    else {
 
      const accessToken = response.data.accessToken;
      cookies.set("access",accessToken,{path:"/",maxAge:15});
      return accessToken;
    }
  },[cookies])


const hasAccess=useCallback(async(accessToken,refreshToken)=>{
    if(!refreshToken){ 
      setErr("token is empty")
      return null;
    }
    
   
    if(typeof(cookies.get("access")) === 'undefined'){
      accessToken= await refresh(refreshToken)
      return accessToken;
    }
    return accessToken;
},[cookies,refresh])

 const requestLogin= useCallback(async (accessToken,refreshToken)=>{
  let response = await axios.get(`http://localhost:3001/protected`, { headers: { 'authorization' : `Bearer ${accessToken}` }})
      if(response.status === 403){
        setErr("User not Logged in")
        return false
      }
        else if(response.status === 401){
             setErr("Login again")
             const accessToken= refresh(refreshToken)
             return await requestLogin(accessToken, refreshToken)
        }
      
      else {
        setErr("User Logged in !")
        
       return response.data

      }
   },[refresh])

   useEffect( ()=>{ 
    const protectedContent = async ()=>{
      let accessToken= cookies.get("access");
      let refreshToken= cookies.get("refresh");
      
      await timeout(500);
     
      accessToken= await hasAccess(accessToken,refreshToken);
    
      if(!accessToken){
        if(Auth ===true)
        setAuth(false)
        if(user !== {})
        setUser({})
        if(location.pathname === "/EditProfile")
         navigate("/login");
      } else {
       
        if(location.pathname === "/login" || location.pathname === "/signup")
          navigate("/");
          
        let result= await requestLogin(accessToken,refreshToken)
        if(result.success){
        

         if(user.length ===0 || user.userName !== result.user.userName){
         setUser(result.user)
         }
         if(user !== undefined && avatar.length === 0){
          
         let obj= await axios.get(`http://localhost:3001/imageDownload?username=${user.userName}`)
         if(obj.data.length){
          let img = new Buffer.from(obj.data[0].image.data).toString("base64")
          setAvatar("data:image/png;base64," +img)
         }
          
         }
         if(Auth ===false)
         setAuth(true);
        } 
      }
    
    }
    protectedContent();
    

   },[cookies,Auth,navigate,hasAccess,refresh,location.pathname,requestLogin,user,avatar])
    
   const updateUser = (data,img)=>{
     setUser(data);
     setAvatar(img)
   }

 
  return (
    <div className="App" >
      <Navbar isAuth={Auth} avatar={avatar} userInfo={user}/>
      <Routes>
        <Route path="/" element={<HomePage />} exact/>
        <Route path="/Signup" element={<Signup />} exact />
        <Route path="/Login" element={<Login/>} exact />
        <Route path="/ResetPassword" element={<ResetPassword/>} exact />
        <Route path="/Profile/:username" element={<Profile profileInfo={user} avatar={avatar} />}/>
        <Route path="/Prediction" element={<Prediction/>} exact />
        <Route path="/EditProfile/:username" element={<EditProfile isAuth={Auth} updateUser={updateUser} avatar={avatar} profileInfo={user}/>} exact />
      </Routes>
     
    </div>
  );
}

export default App;
