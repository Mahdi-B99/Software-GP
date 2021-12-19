const express= require("express")
const router = express.Router()
const bodyParser= require("body-parser")
const cors= require("cors")
const axios = require("axios")
const { urlencoded } = require("body-parser")
const multer = require('multer')
 require('dotenv').config()
const jwt= require('jsonwebtoken')
const UsersOperations = require("../DbOperations/UsersDbOperations");
const bcrypt = require('bcrypt');
const RefreshTokenDbOperation = require("../DbOperations/RefreshTokenDbOperation")
const UsersDbOperations = require("../DbOperations/UsersDbOperations")
const path = require("path")
const fs = require('fs');
const corsOptions = {
   exposedHeaders: 'Authorization',
 };
router.use(cors(corsOptions))
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
   extended: true
}))

const storage = multer.diskStorage({
   destination: path.join(__dirname,'../public_html/','uploads'),
   filename: function(req,file,cb){
      cb(null,Date.now() + '-' + file.originalname )
   }
})
const upload= multer({storage:storage})
router.post("/signup" , async (req,res)=>{
   try {
      const hashedPassword = await bcrypt.hash(req.body.user.password, 10)
     

      await UsersOperations.addNewUser(req.body.user.username,req.body.user.email,hashedPassword,function (err,callback){
         if(err)
         console.log(err)
         
         if(callback === undefined) return res.json({success:true,message:"Signed up successfully!"})
         else {
           let userInfo=JSON.stringify(callback)
           userInfo=JSON.parse(userInfo)

           let message="";
           if(userInfo[0].userName === req.body.user.username && userInfo[0].email === req.body.user.email)
              message= "username and email are taken"
           else if(userInfo[0].userName === req.body.user.username)
              message= "username is taken"
            else { message="Email is taken"}
           return res.json({success:false,message:message})
         }
      })
   } catch(error) {
      console.log(error)
   }
  
})
router.post("/editProfile", upload.single('image'),async (req,res)=>{
   let image;
 if(req.file !== undefined)
     image =fs.readFileSync(req.file.path)
   
let {username} = req.body
let {email} = req.body
let {password} = req.body
let {currentName} = req.body
let {currentEmail} = req.body


const hashedPassword = await bcrypt.hash(password,10)
await UsersDbOperations.editUserInfo(username,email,hashedPassword,image,currentName,currentEmail, async function(err,callback){
if(err)
console.log(err)
if(callback === undefined) return res.json({success:false})
else {
  if(callback.message === "Info Updated Successfully !") {
     callback.password=password
      await UsersDbOperations.getUserPhoto(callback.userName,function(err,result){
        if(err)
        console.log(err)
        return res.json({success:true,message:"Profile Updated Successfully!",info:callback,avatar:result}) 
        
     })
   }

  let user=JSON.stringify(callback)
  user=JSON.parse(user)
  let message="";
  if(user[0].userName === username && user[0].email === email)
     message= "username and email are taken"
  else if(user[0].userName === username){
     message= "username is taken"
  }
   else { message="Email is taken"}
  return res.json({success:false,message:message})
}
})
})

router.get("/imageDownload", async (req,res)=>{
   
   await UsersDbOperations.getUserPhoto(req.query.username,function(err,callback){
      if(err)
      console.log(err)
      if(callback === null) return res.json({message:"no photo"})
      return res.json(callback)
   })
})

router.post("/token", async (req,res)=>{
   const refreshToken= req.body.token;
   if(refreshToken === null) return res.json({message:"token is empty"})
   await RefreshTokenDbOperation.getRefreshToken(refreshToken,function(err,callback){
      if(err)
       console.log(err)
      
        
        if(callback === undefined) return res.json({status:403})
        jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET, (err,user)=>{
           if(err)
           return res.json({
              success: false,
              message: "Invalid refresh token"
            })
            else {
           const accessToken=generateAccessToken(user)
           res.json({success:true,
             accessToken:accessToken})
            }
        })

      
   })
})

router.delete("/logout",async (req,res)=>{
  await RefreshTokenDbOperation.deleteRefreshToken(req.body.token)
   res.sendStatus(204)

})

router.post("/login", async (req,res)=>{
   let user;
   
   try {
     await UsersOperations.findUser(req.body.user.username,function(err,callback){
       if(err)
       return console.log(err)
       else {
         authUser(callback)
       }
    })
   
   } catch (error) {
      console.log(error)
   }
   const authUser = async (resp)=>{
      user=resp;
      if(user === undefined)
      return res.json({success:false,msg:"User does not exist"})
      
      bcrypt.compare(req.body.user.password, user.password, function(err,result){
        if(err)
        console.log(err)
         if(result){
            user =JSON.stringify(user)
            user= JSON.parse(user)
            user.password=req.body.user.password
            const accessToken= generateAccessToken(user)
            const refreshToken= jwt.sign(user,process.env.REFRESH_TOKEN_SECRET)
             RefreshTokenDbOperation.addRefreshToken(refreshToken)
            res.json({ accessToken: accessToken, refreshToken: refreshToken})
         }
         else {
            res.json({success:false,msg:"incorrect password"})
         }
      })
   }
})
function generateAccessToken(user){
  return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
}

router.get("/protected", authenticateToken,async (req,res)=>{
   res.json({success:true,user:req.user})
})

router.get("/userInfo", async(req,res)=>{
   try {
     await UsersOperations.findUser(req.query.userName,function(err,callback){
         if(err)
         return console.log(err)
         else {
         
           res.send(callback)
         }
      })
      
   } catch (error) {
      console.log(error)
   }
  
})
router.post("/Predict", async (req,res)=>{
   
   try {
    var dataToSend;
    let Val = req.body.Val
    var url = `http://localhost:5000/?text=${Val}`
    url = encodeURI(url)
     dataToSend= await axios.get(url)
     res.json(dataToSend.data)
     
   } catch (error) {
       console.log(error)
   }
   
})

router.get("/",cors(), async (req,res)=>{
})

router.get("/rec", (req,res)=>{
    var genre=req.query.genres
    
})

function authenticateToken(req,res,next){
const authHeader = req.headers['authorization']
const token =authHeader && authHeader.split(' ')[1]

jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,user)=>{
   if(user){
      req.user=user
      next()
   }else if(err.message === "jwt expired"){
      return res.sendStatus(401)
   }else {
      console.log(err)
      return res.sendStatus(403)
   }
  
})
}



module.exports = router